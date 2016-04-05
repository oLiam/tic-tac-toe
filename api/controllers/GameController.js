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

        sails.sockets.blast('newGame', { name: gameName });
    },

    join: function (req, res) {
        //req.session.userId = sails.sockets.getId(req);

        sails.sockets.join(req, req.body.gameName,  function(err) {
            if (err) {
                return res.serverError(err);
            }

            return res.json({
                message: 'joined game'
            });
        });

        GameService.join(req);
    }
};