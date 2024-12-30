from flask import Flask, jsonify
import json

# Initialize the Flask app
app = Flask(__name__)

@app.route('/vote')
def receiveVote():
  return True

#Run Flask server
if __name__ == "__main__":
  app.run(host="127.0.0.1", port=5001, debug=True)