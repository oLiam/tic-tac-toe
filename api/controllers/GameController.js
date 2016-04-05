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

    create: function (req, res) {
        var gameName = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4);
        GameService.create(gameName);

        sails.sockets.blast('newGame', {name: gameName});
    },

    join: function (req, res) {
        req.session.gameName = req.body.gameName;

        sails.sockets.join(req, req.body.gameName, function (err) {
            if (err) {
                return res.serverError(err);
            }
        });

        GameService.join(req);

        return res.json({game: req.body.gameName});
    },

    set: function (req, res) {
        var gameName = req.session.gameName;

        var role = GameService.role(req);

        if (role != 'Error') {
            sails.sockets.broadcast(gameName, 'setMove', {
                userSet: sails.sockets.getId(req),
                boxId: req.body.boxId,
                role: role
            });
        }
        return res.json({game: req.body.gameName});
    }
};