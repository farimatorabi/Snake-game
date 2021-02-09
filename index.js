const grid = document.querySelector('.grid');
const startButton = document.getElementById('start')
const scoreDisplay = document.getElementById('score')
let squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let appleIndex = 0 
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0


function creatGrid() {

      for (let i = 0; i < width*width; i++) {

            const square = document.createElement('div')
      
            square.classList.add('square')
      
            grid.appendChild(square)

            squares.push(square)

      }
}

creatGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))


function startGame() {

      //remove snake from grid
      currentSnake.forEach(index => squares[index].classList.remove('snake'))
      
      //remove apple
      squares[appleIndex].classList.remove('apple')

      clearInterval(timerId)
      currentSnake = [2,1,0]
      score = 0
      //re add new score to the board
      scoreDisplay.textContent = score
      
      direction = 1
      intervalTime = 1000
      speed = 0.9
      generateApple()

      //re add the class of snake to our new currentSnake
      currentSnake.forEach(index => squares[index].classList.add('snake'))

      timerId = setInterval(move, intervalTime)

}


function move() {

      if (
            (currentSnake[0] % width === 0 && direction === -1) ||  //if snake has hit the left wall
            (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit the top wall
            (currentSnake[0] % width === width-1 && direction === 1) || //if snake has hit the right wall
            (currentSnake[0] + width >= width*width && direction === width) || //if snake has hit the bottom wall
            squares[currentSnake[0] + direction].classList.contains('snake')  //if snake has hit itself
      )   
      return clearInterval(timerId)


      const tail = currentSnake.pop()

      squares[tail].classList.remove('snake')

      currentSnake.unshift(currentSnake[0] + direction)   


      //deal with snake head gets apple
      if(squares[currentSnake[0]].classList.contains('apple')) {
            //remove the class of apple
            squares[currentSnake[0]].classList.remove('apple')

            //grow our snake by adding class of snake to it
            squares[tail].classList.add('snake')

            //grow our snake array
            currentSnake.push(tail)
            
            //generate new apple
            generateApple()

            //add one to the score
            score++

            //display our score
            scoreDisplay.textContent = score

            //speed up our snake
            clearInterval(timerId)
            intervalTime = intervalTime * speed
            timerId = setInterval(move, intervalTime)
      }




      squares[currentSnake[0]].classList.add('snake')
}


function generateApple() {

      do {
            appleIndex = Math.floor(Math.random() * squares.length)

      } while (squares[appleIndex].classList.contains('snake'))
      squares[appleIndex].classList.add('apple')

}

generateApple()


function control(e) {
      
      if (e.keyCode === 39) {
            console.log('right pressed')
            direction = 1
      } else if (e.keyCode === 38) {
            console.log('up pressed')
            direction = -width
      } else if (e.keyCode === 37) {
            console.log('left pressed')
            direction = -1
      } else if (e.keyCode === 40) {
            console.log('down pressed')
            direction = +width
      }

}

document.addEventListener("keyup", control)

startButton.addEventListener("click", startGame)