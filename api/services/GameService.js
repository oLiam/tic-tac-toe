var games = {};

module.exports = {
    list: function () {
        return games;
    },

    // Create game when the game name doesn't exists in the games array
    create: function (gameName) {
        if (!games[gameName]) {
            if (Math.random() >= 0.5) {
                var random = 'X';
            }
            else {
                var random = 'Y';
            }
            games[gameName] = {
                users: [],
                turn: [random],
                status: ['0']
            };
        }
    },

    delete: function (req) {

    },

    join: function (req) {
        if (games[req.body.gameName].users.length > 1) {
            games[req.body.gameName].status = 1;
            return 'Game is full.'
        }
        if (games[req.body.gameName].users.length <= 1) {
            if (games[req.body.gameName].status == '0') {
                games[req.body.gameName].users.push(sails.sockets.getId(req));
            }
        }
        console.log(games);
    },

    role: function (req) {
        var gameName = req.session.gameName;
        var userId = sails.sockets.getId(req);
        var userX = games[gameName].users[0];
        var userO = games[gameName].users[1];

        console.log(games);

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
};