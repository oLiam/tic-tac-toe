function setMove(boxId) {
    // X or O moet nog toegevoegd worden.
    io.socket.post('/set', {boxId: boxId}, function (resData, jwres) {

    });

    check();
}

function check() {
    var box1 = document.getElementById('1').innerHTML;
    var box2 = document.getElementById('2').innerHTML;
    var box3 = document.getElementById('3').innerHTML;
    var box4 = document.getElementById('4').innerHTML;
    var box5 = document.getElementById('5').innerHTML;
    var box6 = document.getElementById('6').innerHTML;
    var box7 = document.getElementById('7').innerHTML;
    var box8 = document.getElementById('8').innerHTML;
    var box9 = document.getElementById('9').innerHTML;

    var horizontalT = box1 && box3 && box5;
    var horizontalM = box2 && box5 && box7;
    var horizontalB = box3 && box7 && box9;
    var verticalL = box1 && box4 && box7;
    var verticalM = box2 && box5 && box8;
    var verticalR = box3 && box6 && box9;
    var diagonalTL = box1 && box5 && box9;
    var diagonalTR = box3 && box5 && box7;

    if( horizontalT == 'O' || horizontalM == 'O' || horizontalB == 'O' || verticalL == 'O' || verticalM == 'O' || verticalR == 'O' || diagonalTL == 'O' || diagonalTR == 'O') {
        alert('O gewonnen')
    }
    else if( horizontalT == 'X' || horizontalM == 'X' || horizontalB == 'X' || verticalL == 'X' || verticalM == 'X' || verticalR == 'X' || diagonalTL == 'X' || diagonalTR == 'X') {
        alert('X gewonnen')
    }
}

io.socket.on('setMove', function (data){
    if(data.role == 'O') {
    document.getElementById('turn').innerHTML = 'X';
    }
    else {
        document.getElementById('turn').innerHTML = 'O';
    }
    
    document.getElementById(data.boxId).innerHTML = data.role;
});