let url = "http://localhost:8080/"

const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'

function resetServer(){
    let res =  fetch(url + "reset", {
        method:"POST",
    })
}

async function checkMove(move){
    console.log("in check move")
    let res = await fetch(url + 'valid', {
        method:"POST",
        body:move
    })
    let text = await res.text()
    if(text === "0"){
        console.log("should snapback, whatever the fuck that is")
        return "snapback"
    }
    else{
        console.log("shouldnt snapback")
        return null
    }
}

async function onDrop (source, target, piece, newPos, oldPos, orientation) {
    let move = source + target
    return checkMove(move)
}

var board = Chessboard('myBoard',{
    draggable: true,
    dropOffBoard: 'trash',
    onDrop: onDrop
})


board.start()

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
