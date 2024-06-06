import QuickResponse from "./QuickResponse/QuickResponse";
import React, { useState } from "react";

function App() {
  const [decodedText, setDecodedText] = useState([]);
  function handleQuickResponse(data) {
    console.log(data);
    setDecodedText((prevState) => [...prevState, data]);
    console.log("decodedText", decodedText);
  }

  return (
    <div>
      {console.log(decodedText)}
      <QuickResponse
        handleQuickResponse={handleQuickResponse}
        decodedText={decodedText}
      ></QuickResponse>

      {decodedText.length > 0 ? (
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">Count</th>
              <th scope="col">Format</th>
              <th scope="col">Result</th>
            </tr>
          </thead>
          {decodedText.map((data, i) => (
            <tbody key={i}>
              <tr>
                <th scope="row">{i}</th>
                <td>{data.result.format.formatName}</td>
                <td>{data.decodedText}</td>
              </tr>
            </tbody>
          ))}
        </table>
      ) : null}
    </div>
  );
}

export default App;
