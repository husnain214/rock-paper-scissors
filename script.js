const rulesBox = document.getElementById("rules-box")
const rulesBtn = document.getElementById("rules-btn")
const cross1 = document.getElementById("cross1")
const cross2 = document.getElementById("cross2")

const body = document.getElementById("body")

const scoreValue = document.getElementById("score-value")

const paperBtn = document.getElementById("paper-btn")
const scissorsBtn = document.getElementById("scissors-btn")
const rockBtn = document.getElementById("rock-btn")

const firstStage = document.getElementById("step1")
const gameStage = document.getElementById("step2")

const houseBtn = document.getElementById("house-btn")
const userBtn = document.getElementById("user-btn")

const bgCircle = document.getElementById("bgCircle")

const house = document.getElementById("house-move")
const user = document.getElementById("user-move")

const gameResult = document.getElementById("result")
const displayResult = document.getElementById("display-result")
const playBtn = document.getElementById("play-again-btn")

let score = 0
let houseChoice = -1
let userChoice = -1
let sound = ""

const options = [{"name": "paper", "color": "hsl(230, 89%, 62%)"},
                {"name": "rock", "color": "hsl(349, 70%, 56%)"},
                {"name": "scissors", "color": "hsl(39, 89%, 49%)"}
                ]

rulesBtn.addEventListener("click", ()=>{
    rulesBox.classList.remove("hide")
})

cross1.addEventListener("click", ()=>{
    rulesBox.classList.add("hide")
})

cross2.addEventListener("click", ()=>{
    rulesBox.classList.add("hide")
})

function playSound (soundName) {
    if (soundName === "lose") {
        sound = new Audio('./sounds/You Suck.mp3')
    }
    else if (soundName === "tie") {
        sound = new Audio('./sounds/Well dont be too upset.mp3')
    }
    else if (soundName === "win") {
        sound = new Audio('./sounds/victory is mine.mp3')
    }
    else if (soundName === "start") { 
        sound = new Audio('./sounds/saw_theme.mp3')
        sound.volume = 0.1
    }
        
    sound.play()
}

function houseMove () {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            houseChoice = Math.floor(Math.random() * 3)
            
            houseBtn.classList.add(options[houseChoice].name)
            houseBtn.classList.remove("hide")
    
            bgCircle.style.background = "rgba(0, 0, 0, 0)"
    
            house.innerHTML = `<img src="./images/icon-${options[houseChoice].name}.svg" alt="${options[houseChoice].name} icon">`

            let error = false

            if (!error) {
                resolve ("1")
            } 
            else {
                reject("0")
            }
       }, 1000)
    })
}

function disappear () {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            gameStage.style.marginRight = "5%"

            displayResult.classList.remove("hide")

            gameStage.style.gap = "140px"

            gameResult.textContent = verdict(options[userChoice].name, options[houseChoice].name)

            playBtn.classList.remove("hide")

            let error = false

            if (!error) {
                resolve ("1")
            } 
            else {
                reject("0")
            }
       }, 2000)
    })
}

function nextStage (userButton) {
    sound.pause()
    firstStage.classList.add("hide")
    rulesBtn.classList.add("hide")
    gameStage.classList.remove("hide")
    houseBtn.classList.add("hide")

    if (userButton.id === "rock-btn") {
        userChoice = 1
    }
    else if (userButton.id === "paper-btn") {
        userChoice = 0
    }
    else if (userButton.id === "scissors-btn") {
        userChoice = 2
    }

    user.innerHTML = `<img src="./images/icon-${options[userChoice].name}.svg" alt="${options[userChoice].name} icon">`

    userBtn.classList.add(options[userChoice].name)

    startGame()
}

async function startGame () {  
    await houseMove()

    if (window.innerWidth <= 375) {
        disappear()
    } 
    else {
        gameStage.style.marginRight = "5%"

        displayResult.classList.remove("hide")

        gameStage.style.gap = "140px"

        gameResult.textContent = verdict(options[userChoice].name, options[houseChoice].name)

        playBtn.classList.remove("hide")
    }
}

function verdict (user, house) {
    if ((user === "rock" && house === "scissors") || 
        (user === "scissors" && house === "paper") || 
        (user === "paper" && house === "rock")) {
            score++;

            scoreValue.textContent = score;
            playBtn.style.color = options[userChoice].color

            playSound ("win")

            return "YOU WIN"
    } 
    else if (user === house) {
        playSound ("tie")

        return "TIE"
    } 
    else {
        playSound ("lose")

        playBtn.style.color = options[houseChoice].color

        return "YOU LOSE"
    }
}

playBtn.addEventListener ("click", ()=> {
    userBtn.classList.remove(options[userChoice].name)
    houseBtn.classList.remove(options[houseChoice].name)

    house.removeChild(house.firstChild)
    user.removeChild(user.firstChild)

    if (window.innerWidth <= 375) {
        gameStage.style.gap = "5%"
    } else {
        gameStage.style.gap = "300px"
    }

    playBtn.classList.add("hide")
    gameResult.textContent = ""
    displayResult.classList.add("hide")
    gameStage.classList.add("hide")
    firstStage.classList.remove("hide")
    rulesBtn.classList.remove("hide")
    bgCircle.style.background = "rgba(0, 0, 0, 0.151)"

    houseChoice = -1
    userChoice = -1

    playSound ("start")
})

playSound("start")





