import flask
import requests

app = flask.Flask(__name__)

def get_chat_member_status(bot_token, channel_username, user_id):
    url = f"https://api.telegram.org/bot{bot_token}/getChatMember"
    params = {
        "chat_id": f"@{channel_username}",
        "user_id": user_id
    }
    response = requests.get(url, params=params)
    return response.json()

@app.route("/")
def Shtrack():
    bot_token = flask.request.args.get("bot_token")
    channel_username = flask.request.args.get("channel_username")
    user_id = flask.request.args.get("user_id")
    
    if not bot_token or not channel_username or not user_id:
        return {"error": "Missing one or more required parameters: bot_token, channel_username, user_id"}
    return get_chat_member_status(bot_token, channel_username, user_id)

if __name__ == "__main__":
    app.run()
