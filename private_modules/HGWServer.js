module.exports = function() {
	var io = require('socket.io')();
	var operationList = [];

	io.on('connection', function(socket) {
		for (var i = 0; i < operationList.length; i++) {
			socket.emit('script', operationList[i]);
		}
		socket.on('script', function(data) {
			operationList.push(data);
			io.emit('script', data);
		});
		socket.on('reset', function(data) {
			operationList = [];
			io.emit('script', 'location.reload()');
		})
	});

	io.listen(8001);
}

