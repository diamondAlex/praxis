let setPage = () =>{
    let root = document.getElementById("root")
    let board = document.createElement("div")
    board.id = "board"
    board.className = "board"
    let util = document.createElement("div")
    util.id = "util"

    root.appendChild(board)
    root.appendChild(util)
}

function addResetButton(){
    let div = document.getElementById("util")
    let button = document.createElement("button")
    button.innerHTML = "reset"
    button.addEventListener("click", () =>{
        board.position("start")
        game.reset()
    })
    div.appendChild(button)
}

function setInterface(){
    setPage()
    addResetButton()
}

setInterface()
