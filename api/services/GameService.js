var games = {};

module.exports = {
    list: function () {
        return games;
    },

    create: function (gameName) {
        if (!games[gameName]) {
            if (Math.random() >= 0.5) {
                var random = 'X';
            }
            else {
                var random = 'O';
            }
            games[gameName] = {
                users: [],
                turn: [random]
            };
        }
    },

    delete: function (req) {
        delete games[req.body.gameName];
    },

    join: function (req) {
        if (games[req.body.gameName].users.length > 1) {
            return 'Game is full.'
        }
        if (games[req.body.gameName].users.length <= 1) {
            games[req.body.gameName].users.push(sails.sockets.getId(req));

            if(games[req.body.gameName].users[0] == sails.sockets.getId(req)) {
                var player = 'Player X';
                var role = games[req.body.gameName].turn[0];
                var res = [player, role];
                return res;
            }
            else if(games[req.body.gameName].users[1] == sails.sockets.getId(req)) {
                var player = 'Player O';
                var role = games[req.body.gameName].turn[0];
                var res = [player, role];
                return res;
            }
        }
    },

    role: function (req) {
        var gameName = req.session.gameName;
        var userId = sails.sockets.getId(req);
        var userX = games[gameName].users[0];
        var userO = games[gameName].users[1];

        if (games[gameName].users[1] == null) {
            return 'Wait';
        }
        else {
            if (userId == userX) {
                if (games[gameName].turn[0] == 'X') {
                    games[gameName].turn[0] = 'O';
                    return 'X';
                }
                else {
                    return 'Error';
                }
            }
            else if (userId == userO) {
                if (games[gameName].turn[0] == 'O') {
                    games[gameName].turn[0] = 'X';
                    return 'O';
                }
                else {
                    return 'Error';
                }
            }
        }
    }
};