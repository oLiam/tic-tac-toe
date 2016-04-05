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

            console.log('Game is created')
        }
    },

    join: function (req) {
        console.log(games[req.body.gameName].users);
        //if (games[req.body.gameName].users )
        games[req.body.gameName].users.push(sails.sockets.getId(req));

        console.log('Game is joined')
        console.log(games);
    },

    role: function (req) {
        var userId = sails.sockets.getId(req);
        var gameName = req.body.gameName;
        var userX = games[req.body.gameName].users[0];
        var userO = games[req.body.gameName].users[1];
        if (userId == userX) {
            return 'X';
        }
        else if (userId == userO) {
            return 'O'
        }
    }
};