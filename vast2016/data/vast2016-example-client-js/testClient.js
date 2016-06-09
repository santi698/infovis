var Client = require("./client");

var uid = "<assigned user id>";
new Client(uid, "vast2016.labworks.org:80", 
	function(ws, message) {
		if(message.type === "control")
		{
			// control message from the server
			message.body.forEach(function(d) {
				if(d.state === "GOOD" && d.streamIds)
				{
					// control message for selecting a stream to add
					ws.send(JSON.stringify({
							uid: uid,
							streamId: d.streamIds[0]
						}));
				}
				else if(d.state === "BAD")
				{
					// Uh oh - handle the error
					console.error(d);
				}
			});
		}
		else
		{
			// data message
			console.log(message);
		}
	}
);