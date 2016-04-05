var games = {};

module.exports = {
    list: function () {
        return games;
    },

    // Create game when the game name doesn't exists in the games array
    create: function (gameName) {
        if (!games[gameName]) {
            games[gameName] = {
                users: []
            };
        }
    },

    join: function (req) {
        //if (games[req.body.gameName].users )
        games[req.body.gameName].users.push(sails.sockets.getId(req));
    },

    role: function (req) {
        var gameName = req.session.gameName;
        var userId = sails.sockets.getId(req);
        var userX = games[gameName].users[0];
        var userO = games[gameName].users[1];

        if (userId == userX) {
            return 'X';
        }
        else if (userId == userO) {
            return 'O';
        }
    }
};