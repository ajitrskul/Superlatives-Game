from flask import Flask, render_template
from flask_socketio import SocketIO
import json

# Initialize the Flask app
app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def client():
    return render_template('player.html')  # Page for clients

@app.route('/host')
def host():
    return render_template('host.html')  # Page for the host

#Handle client connection
@socketio.on('connect')
def handle_connect():
    print('A user connected')

#Send new user to host
@socketio.on('new_user')
def get_user(user):
    print('Name of user: ', user)
    socketio.emit('send_user', user)

#Handle disconnection
@socketio.on('disconnect')
def handle_disconnect():
    print('A client disconnected')

#Start game for all users
@socketio.on('start_game')
def start_game():
    socketio.emit('start_game')

#When receiving a vote emit to host
@socketio.on('vote')
def handle_vote(vote):
    socketio.emit('update_vote', vote)

if __name__ == '__main__':
    socketio.run(app, debug=True)
    #socketio.run(app, host='0.0.0.0', port=80)



# @app.route('/vote')
# def receiveVote():
#   return True

# #Run Flask server
# if __name__ == "__main__":
#   app.run(host="127.0.0.1", port=5001, debug=True)