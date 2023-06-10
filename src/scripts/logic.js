let url = "http://localhost:8080/check"

function checkMove(move){
    console.log("in check move")
    fetch(url, {
        method:"POST",
        body:move
    })
    .then((res) => res.text())
    .then((text) => console.log(text))
}

function onDrop (source, target, piece, newPos, oldPos, orientation) {
    let move = source + target
    checkMove(move)
}

var board1 = Chessboard('myBoard',{
    draggable: true,
    dropOffBoard: 'trash',
    onDrop: onDrop
})

board1.start()
