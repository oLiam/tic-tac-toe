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
    io.socket.post('/leave', {gameName: gameName}, function (resData, jwres) {

        //render('index', {games: resData}, function (html) {
        //    document.body.innerHTML = html;
        //});
    });
}

io.socket.on('newGame', function (game){
    $('.games-list').append('<li id="'+ game.name +'" onclick="joinGame('+"'"+ game.name +"'"+')">'+ game.name +'</li>');
});

io.socket.on('deleteGame', function (game){
    $("#"+game.name +"").remove();
});