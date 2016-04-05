var games = {};

module.exports = {
    list: function () {
        return games;
    },

    // Create game when the game name doesn't exists in the games array
    create: function (gameName) {
        if (!games[gameName]) {
            games[gameName] = {
                users: {}
            };

            console.log('Game is created')
        }
    },

    join: function (req) {
        console.log(games[req.body.gameName].users);
        //if (games[req.body.gameName].users )
        games[req.body.gameName] = {
            users: sails.sockets.getId(req)
        };

        console.log('Game is joined')
        console.log(games);
    }
};