function createGame() {
    io.socket.post('/create', function (resData, jwres) {

    });
}

function joinGame(gameName) {
    io.socket.post('/join', {gameName: gameName}, function (resData, jwres) {
        render('game', {resData: resData}, function (html) {
            document.body.innerHTML = html;
        });
    });
}

io.socket.on('newGame', function (game){
    console.log(game.name);
    $('.games-list').append('<li onclick="joinGame('+"'"+ game.name +"'"+')">'+ game.name +'</li>');
});