let url = "http://localhost:8080/check"

async function checkMove(move){
    console.log("in check move")
    let res = await fetch(url, {
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

var board1 = Chessboard('myBoard',{
    draggable: true,
    dropOffBoard: 'trash',
    onDrop: onDrop
})

board1.start()
