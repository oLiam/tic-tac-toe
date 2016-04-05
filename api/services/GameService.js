var games = {};

module.exports = {
    list: function () {
        return games;
    },

    // Create game when the game name doesn't exists in the games array
    create: function (gameName) {
        if (!games[gameName]) {
            games[gameName] = {
                users: [],
                turn: ['X']
            };
        }
    },

    join: function (req) {
        games[req.body.gameName].users.push(sails.sockets.getId(req));
    },

    role: function (req) {
        var gameName = req.session.gameName;
        var userId = sails.sockets.getId(req);
        var userX = games[gameName].users[0];
        var userO = games[gameName].users[1];

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