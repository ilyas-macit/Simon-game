var gamePattern = []
var colors = ["green", "red", "blue", "yellow"]
var selectedButton
var level = 0
var i = 0
var isOver = false


function randomNumber(){
    return Math.floor(Math.random() * 4)
}


function nextSequence(){
    var color = colors[randomNumber()]
    gamePattern.push(color)
    level++
    $('h1').text('level '+level)
    blinkAnim($('#'+color))

}

function blinkAnim(element){
    element.fadeOut(100)
    element.fadeIn(100)
}

function gameOver(){
    const wrong = new Audio("sounds/wrong.mp3")
    wrong.play()
    $('h1').text("Game Over")
    isOver = true
    $('body').addClass('game-over')
    setTimeout(() => {
        $('body').removeClass('game-over')
    }, 200);
    
}

function playSound(element){
    var audio = new Audio("sounds/"+element+".mp3")
    audio.play()
}
function pressAnim(btn){
    $('#'+btn).addClass('pressed')
    setTimeout(() => {
        $('#'+btn).removeClass('pressed')
    },100)
}

$(document).on('keypress',function() {
    if(!isOver)
        nextSequence()
})

$(document).click(function(event){
    selectedButton = event.target.id
    if(!isOver){
        pressAnim(selectedButton)
        if(gamePattern[i] === selectedButton)
        {
            playSound(selectedButton)
            i++
        }
        else{
            gameOver()
        }
        if(i === gamePattern.length){
            i=0
            setTimeout(() => {
                nextSequence()
            }, 500);  
        }
    }
    
})
