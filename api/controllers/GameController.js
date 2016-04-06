/**
 * GameController
 *
 * @description :: Server-side logic for managing quizzes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function (req, res) {
        var games = GameService.list();

        return res.view('index', {games: games});
    },

    lobby: function (req, res) {
        var games = GameService.list();

        console.log('we zijn hiet wer');
        return res.json({games: games});
    },

    create: function (req, res) {
        var gameName = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4);
        GameService.create(gameName);

        sails.sockets.blast('newGame', {name: gameName});
    },

    join: function (req, res) {
        req.session.gameName = req.body.gameName;

        sails.sockets.join(req, req.body.gameName, function (err) {

        });

        var join = GameService.join(req);

        if (join == 'Game is full.') {
            return res.json(500, { error: 'This game is full.' });
        }

        return res.json({game: req.body.gameName});
    },

    leave: function (req, res) {
        sails.sockets.leaveAll(req.body.gameName);

        GameService.delete(req);

        req.session.gameName = '';

        sails.sockets.blast('deleteGame', {name: req.body.gameName});

        var games = GameService.list();

        return res.json({games: games});
    },

    set: function (req, res) {
        var gameName = req.session.gameName;

        var role = GameService.role(req);

        if (role == 'Error') {
            return res.json({message: 'Not your turn!'});
        }
        else if (role == 'Wait') {
            return res.json({message: 'Please wait for someone to join the game.'})
        }
        else {
            sails.sockets.broadcast(gameName, 'setMove', {
                userSet: sails.sockets.getId(req),
                boxId: req.body.boxId,
                role: role
            });
        }
    }
};