function createGame() {
    io.socket.post('/create', function (resData, jwres) {

    });
}

function joinGame(gameName) {
    io.socket.post('/join', {gameName: gameName}, function (resData, jwres) {
        if(jwres.statusCode == '500') {
            document.getElementById('error').innerHTML = 'This game is full!';
            return;
        }

        render('game', {resData: resData}, function (html) {
            document.body.innerHTML = html;
        });
    });
}

function leave(gameName) {

}

io.socket.on('newGame', function (game){
    $('.games-list').append('<li onclick="joinGame('+"'"+ game.name +"'"+')">'+ game.name +'</li>');
});