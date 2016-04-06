function setMove(boxId) {
    io.socket.post('/set', {boxId: boxId}, function (resData, jwres) {
        document.getElementById('error').innerHTML = resData.message;
    });


}

io.socket.on('setMove', function (data) {
    if (data.role == 'O') {
        document.getElementById('turn').innerHTML = 'X';
    }
    else {
        document.getElementById('turn').innerHTML = 'O';
    }
    document.getElementById('error').innerHTML = '';
    document.getElementById(data.boxId).innerHTML = data.role;

    check();
});

function check() {
    var currentGame = document.querySelector("h1").innerHTML,
        box1 = document.getElementById('1').innerHTML,
        box2 = document.getElementById('2').innerHTML,
        box3 = document.getElementById('3').innerHTML,
        box4 = document.getElementById('4').innerHTML,
        box5 = document.getElementById('5').innerHTML,
        box6 = document.getElementById('6').innerHTML,
        box7 = document.getElementById('7').innerHTML,
        box8 = document.getElementById('8').innerHTML,
        box9 = document.getElementById('9').innerHTML;

    if (box1 == 'O' && box2 == 'O' && box3 == 'O' || box4 == 'O' && box5 == 'O' && box6 == 'O' || box7 == 'O' && box8 == 'O' && box9 == 'O' || box1 == 'O' && box4 == 'O' && box7 == 'O' || box2 == 'O' && box5 == 'O' && box8 == 'O' || box3 == 'O' && box6 == 'O' && box9 == 'O' || box1 == 'O' && box5 == 'O' && box9 == 'O' || box3 == 'O' && box5 == 'O' && box7 == 'O') {
        alert('O gewonnen');

        leave(currentGame);
    }
    else if (box1 == 'X' && box2 == 'X' && box3 == 'X' || box4 == 'X' && box5 == 'X' && box6 == 'X' || box7 == 'X' && box8 == 'X' && box9 == 'X' || box1 == 'X' && box4 == 'X' && box7 == 'X' || box2 == 'X' && box5 == 'X' && box8 == 'X' || box3 == 'X' && box6 == 'X' && box9 == 'X' || box1 == 'X' && box5 == 'X' && box9 == 'X' || box3 == 'X' && box5 == 'X' && box7 == 'X') {
        alert('X gewonnen');

        leave(currentGame);
    }
}