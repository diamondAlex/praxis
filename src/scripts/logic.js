// NOTE: this example uses the chess.js library:
// https://github.com/jhlywa/chess.js

var board = null
var game = new Chess()
var piece_status = false


document.addEventListener("mousedown", (e) =>{
    if ( piece_status && e.which == 3 ) {
        e.preventDefault()
        console.log(board)
    }
})

function onDragStart (source, piece, position, orientation) {
    // do not pick up pieces if the game is over
    if (game.isGameOver()) return false

    // only pick up pieces for the side to move
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false
    }
    piece_status = true
}

function onDrop (source, target) {
    // see if the move is legal
    try{
        var move = game.move({
            from: source,
            to: target,
            promotion: 'q' // NOTE: always promote to a queen for example simplicity
        })
    }
    catch(err){
        return 'snapback' 
    }

    // illegal move
    if (move === null) return 'snapback'

    piece_status = false
    updateStatus()
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd () {
    board.position(game.fen())
}

function updateStatus () {
    var status = ''

    var moveColor = 'White'
    if (game.turn() === 'b') {
        moveColor = 'Black'
    }

    // checkmate? -- not working
    if (game.isCheckmate()) {
        status = 'Game over, ' + moveColor + ' is in checkmate.'
    }

    // draw?
        else if (game.isDraw()) {
            status = 'Game over, drawn position'
        }

    // game still on
    else {
        status = moveColor + ' to move'

        // check?
            if (game.isCheck()) {
                status += ', ' + moveColor + ' is in check'
            }
    }

}

var config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
}
board = Chessboard('myBoard', config)

updateStatus()
//---------------- interface -----------------

function addResetButton(){
    let div = document.getElementById("util")
    let button = document.createElement("button")
    button.innerHTML = "reset"
    button.addEventListener("click", () =>{
        board.position(START_FEN)
        resetServer()
    })
    div.appendChild(button)
}

function setInterface(){
    addResetButton()

}

setInterface()
