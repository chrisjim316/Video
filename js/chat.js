var skylink = new Skylink();

skylink.init({
  appKey: '4cf2aed8-70a8-478b-a88e-aba3ba381bdd',
  defaultRoom: 'demoRoom'
});

function setName() {
var input = document.getElementById('name');
skylink.setUserData({
name: "Temp Display Name" //input.value
});
}

function joinRoom() {
skylink.joinRoom();
}

function leaveRoom() {
skylink.leaveRoom();
}

function sendMessage() {
var input = document.getElementById('text');
skylink.sendP2PMessage(input.value);
input.value = '';
}

function addMessage(message, className) {
var chatbox = document.getElementById('chatOutput'),
div = document.createElement('div');
div.className = className;
div.textContent = message;
chatbox.appendChild(div);
}

skylink.on('peerJoined', function(peerId, peerInfo, isSelf) {
var user = 'You';
if(!isSelf) {
user = peerInfo.userData.name || peerId;
}
addMessage(user + ' joined the room', 'action');
});


skylink.on('peerLeft', function(peerId, peerInfo, isSelf) {
var user = 'You';
if(!isSelf) {
user = peerInfo.userData.name || peerId;
}
addMessage(user + ' left the room', 'action');
});

skylink.on('incomingMessage', function(message, peerId, peerInfo, isSelf) {
var user = 'You',
className = 'you';
if(!isSelf) {
user = peerInfo.userData.name || peerId;
className = 'message';
}
addMessage(user + ': ' + message.content, className);
});
