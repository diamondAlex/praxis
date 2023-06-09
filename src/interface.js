let setPage = () =>{
    let root = document.getElementById("root")
    let left = document.createElement("div")
    left.className = "left"
    let board = document.createElement("div")
    board.id = "board"
    board.className = "board"
    let util = document.createElement("div")
    util.id = "util"

    left.appendChild(board)
    left.appendChild(util)
    root.appendChild(left)
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
    button.id = "reset"
    div.appendChild(button)
}

function addRight(){
    let root = document.getElementById('root')
    let right = document.createElement("div")
    right.id = "right"
    right.className = "right"

    root.appendChild(right)
}
function addPanel(){
    let right = document.getElementById("right")
    let moveList = document.createElement("div")
    moveList.className = "panel"
    moveList.id = "moveList"
    let eval = document.createElement("div")
    eval.className = "panel"
    eval.id = "eval"

    right.appendChild(moveList)
    right.appendChild(eval)
}

function setInterface(){
    setPage()
    addRight()
    addResetButton()
    addFlipButton()
    addColorSelect()
    addPanel()
}

setInterface()
