// NOTE: this example uses the chess.js library:
// https://github.com/jhlywa/chess.js

var board = null
var game = new Chess()
var piece_status = false
var playerColor = "w"

var moves = []

document.addEventListener("keypress", (e) =>{
    if(e.key == "KeyF"){
        board.flip()
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

//rename cause it does all moves
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

    addMoveToList(source,target)
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

    if(game.turn() != playerColor){
        //for now using this fen, even tho it's generated every call
        getMoveFromEngine(game.fen())
    }
}

//merge with ondrop
function playEngineMove (source, target) {
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

    board.move(source+"-"+target)

    addMoveToList(source,target)
    piece_status = false
    updateStatus()
}

function addMoveToList(source,target){
    let moveList = document.getElementById("moveList")
    moveList.innerHTML = ""
    moves.push(source+target)
    let i = 0
    for(let move of moves){
        if(i%2 == 0){
            moveList.innerHTML = moveList.innerHTML + move + " - "
        }
        else{
            moveList.innerHTML = moveList.innerHTML + move  + "<br>"
        }
        i++
    }
}

function getMoveFromEngine(fen){
    let url = "http://localhost:8081/"
    fetch(url, {
        method:"POST",
        body: fen
    })
    .then((ret) => {
        ret.body.getReader().read()
        .then(({done,value}) =>{
            if(!done){
                let json = JSON.parse(String.fromCharCode(...value))
                let move = json.move
                setEval(json.eval)
                playEngineMove(move.slice(0,2),move.slice(2,4))
            }
        })
    })
}

function setEval(eval){
    let evalPanel = document.getElementById("eval")
    evalPanel.innerHTML = eval
}

function clearPanel(){
    document.getElementById("moveList").innerHTML = ""
}

var config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
}

board = Chessboard('board', config)

//EVENTS
document.getElementById("color").addEventListener("change", (e) =>{
    playerColor = e.target.value.slice(0,1)
    console.log(playerColor)
})

document.getElementById("reset").addEventListener("click", () =>{
    board.position("start")
    clearPanel()
    game.reset()
})
