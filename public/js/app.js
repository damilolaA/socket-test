var socket = io(),
	name   = getQueryVariable("name") || "Anonymous",
	room   = getQueryVariable("room");

socket.on("connect", function() {
	console.log("connected to socket.io!");

	socket.emit("joinRoom", {
		name: name,
		room: room
	});
});

var roomName = document.getElementsByClassName("room-title")[0];
	
roomName.innerHTML = room;

socket.on("message", function(message) {
	var momentTimestamp = moment.utc(message.timestamp);
	console.log("New message:");
	console.log(message.text);

	var messages = document.getElementsByClassName("messages")[0],
		p        = document.createElement("p"),
		h1       = document.createElement("h3");

	h1.innerHTML = message.name;
	p.innerHTML = ("<strong>" + momentTimestamp.local().format('h:mm a') + ":" + "</strong>"+ " " + message.text);

	messages.append(h1);
	messages.append(p);
	console.log('hey there');
});


var form = document.getElementById("message-form"),
	input = form.getElementsByTagName("input")[0];

form.addEventListener("submit", function(e) {
	e.preventDefault();

	socket.emit("message", {
		name: name,
		text: input.value
	});

	input.value = "";
});