import React, { useEffect } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

let html5QrCode;
var lastResult;

const QuickResponse = (props) => {
  useEffect(() => {
    html5QrCode = new Html5Qrcode("reader", {
      // Use this flag to turn on the feature.
      experimentalFeatures: {
        useBarCodeDetectorIfSupported: true
      }
    });
    console.log(html5QrCode.getState());
  });

  let qrboxFunction = function (viewfinderWidth, viewfinderHeight) {
    let minEdgePercentage = 0.7; // 70%
    let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
    let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
    return {
      width: qrboxSize,
      height: qrboxSize
    };
  };

  const handleClickAdvanced = () => {
    try {
      const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        if (decodedText !== lastResult) {
          lastResult = decodedText;
          props.handleQuickResponse(decodedResult);
          // Handle on success condition with the decoded message.

          console.log(`Scan result ${decodedText}`, decodedResult);
          handleStop();
        }
      };
      html5QrCode
        .start(
          { facingMode: "environment" },

          {
            fps: 30,
            formatsToSupport: [
              Html5QrcodeSupportedFormats.QR_CODE,

              Html5QrcodeSupportedFormats.AZTEC,

              Html5QrcodeSupportedFormats.CODABAR,

              Html5QrcodeSupportedFormats.CODE_39,

              Html5QrcodeSupportedFormats.CODE_93,

              Html5QrcodeSupportedFormats.CODE_128,

              Html5QrcodeSupportedFormats.DATA_MATRIX,

              Html5QrcodeSupportedFormats.MAXICODE,

              Html5QrcodeSupportedFormats.ITF,

              Html5QrcodeSupportedFormats.EAN_13,

              Html5QrcodeSupportedFormats.EAN_8,

              Html5QrcodeSupportedFormats.PDF_417,

              Html5QrcodeSupportedFormats.RSS_14,

              Html5QrcodeSupportedFormats.RSS_EXPANDED,

              Html5QrcodeSupportedFormats.UPC_A,

              Html5QrcodeSupportedFormats.UPC_E,

              Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION
            ],

            qrbox: qrboxFunction
          },

          qrCodeSuccessCallback
        )
        .catch((err) => console.log("error"));
    } catch (error) {
      console.log("Error");
    }
    console.log(html5QrCode.getState());
  };

  const handleStop = () => {
    try {
      html5QrCode
        .stop()
        .then((res) => {
          html5QrCode.clear();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <div id="reader" width="100%" />
        <div style={{ marginLeft: "25%", marginTop: "5px" }}>
          <button
            style={{ padding: "10px" }}
            onClick={() => handleClickAdvanced()}
          >
            Start Scanning
          </button>
          <button
            style={{ padding: "10px", marginLeft: "5px" }}
            onClick={() => handleStop()}
          >
            stop Scanning
          </button>
        </div>
      </div>
    </>
    // <div style={{ position: "relative" }}>
    //   <div id="reader" width="100%" />
    // </div>
  );
};
export default QuickResponse;
