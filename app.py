from flask import Flask, render_template
from flask_socketio import SocketIO
import json

# Initialize the Flask app
app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def client():
    return render_template('../frontend/player/player.html')  # Page for clients

@app.route('/host')
def host():
    return render_template('../frontend/host/host.html')  # Page for the host

# Handle client connection
@socketio.on('connect')
def handle_connect():
    print('A client connected')

# Handle disconnection
@socketio.on('disconnect')
def handle_disconnect():
    print('A client disconnected')

# Custom event for voting
@socketio.on('vote')
def handle_vote(data):
    print(f'Received vote: {data}')
    # Broadcast the vote to the host
    socketio.emit('update_vote', data, broadcast=True, include_self=False)

if __name__ == '__main__':
    socketio.run(app, debug=True)
    #socketio.run(app, host='0.0.0.0', port=5000)



# @app.route('/vote')
# def receiveVote():
#   return True

# #Run Flask server
# if __name__ == "__main__":
#   app.run(host="127.0.0.1", port=5001, debug=True)