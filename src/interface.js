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

function addColorSelect(){
    let div = document.getElementById("util")
    let select = document.createElement("select")
    select.id = "color"
    let option1 = document.createElement("option")
    option1.value = "white"
    option1.innerHTML = "white"
    option1.selected="selected"
    let option2 = document.createElement("option")
    option2.value = "black"
    option2.innerHTML = "black"
    select.appendChild(option1)
    select.appendChild(option2)
    div.appendChild(select)
}
function addFlipButton(){
    let div = document.getElementById("util")
    let button = document.createElement("button")
    button.innerHTML = "flip"
    button.addEventListener("click", () =>{
        board.flip()
    })
    div.appendChild(button)
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
    addFlipButton()
    addColorSelect()
}

setInterface()
