document.addEventListener('DOMContentLoaded',()=>{
    const userGrid = document.querySelector('.grid-user');
    const computerGrid = document.querySelector('.grid-computer');
    const displayGrid= document.querySelector('.grid-display');
    const ships = document.querySelectorAll('.ship')
    const destroyer = document.querySelector('destroyer-container')
    const submarine = document.querySelector('submarine-container')
    const cruiser = document.querySelector('cruiser-container')
    const carrier= document.querySelector('carrier-container')
    const battleship = document.querySelector('battleship-container')
    const startButton = document.querySelector('#start')
    const rotateButton = document.querySelector('#rotate')
    const turnDisplay = document.querySelector('#whose-go')
    const infoDisplay = document.querySelector('#info')
    const userSquares = []
    const computerSquares = []
    const width = 10;
    // Create board
    function createBoard(grid, squares){
        for(let i = 0; i < width*width; i++){
            const square = document.createElement('div')
            square.dataset.id = i
            grid.appendChild(square)
            squares.push(square)
        }
    }
    createBoard(userGrid, userSquares)
    createBoard(computerGrid, computerSquares)

    const shipArray = [
        {
            name: 'destroyer',
            directions: [
                [0, 1],
                [0,width]
            ]
        },
        {
            name:'submarine',
            directions:[
                [0, 1, 2],
                [0, width, width*2]
            ]
        },
        {
            name:'cruiser',
            directions:[
                [0, 1, 2],
                [0, width, width*2]
            ]
        },
        {
            name:'battleship',
            directions:[
                [0, 1, 2, 3],
                [0, width, width*2, width*3]
            ]
        },
        {
            name:'carrier',
            directions:[
                [0, 1, 2, 3, 4],
                [0, width, width*2, width*3, width*4]
            ]
        },
    ]

    // draw computer ships in random locations
    function generate(ship){
        let randomDirection = Math.floor(Math.random() * ship.directions.length) // 0 or 1 cause theres 2 indices in directions
        let current = ship.directions[randomDirection] // grab either the horizontal or vertical (1st or 2nd array in dirs)
        if(randomDirection===0) direction = 1
        if(randomDirection===1) direction = 10
        // she does something very redundant which is basically reinstates the 2 arrays in DIRECTIONS in the parentheses,
        // ship.directions[0].length * direction is the same as ship.directions[1].length * direction... it's the length.
        // Math.random()*computersquares.length is the same as saying random num between 0-100. computerSquares.length is
        // redundant, and really could just be the number 100. so for cruiser, it would be:
        // randomStart = randomNum(0-100) - 3
        let randomStart = Math.floor( Math.random() * computerSquares.length - (ship.directions[0].length * direction) )

        const isTaken = current.some(index=> computerSquares[randomStart + index].classList.contains('taken'))
        const isAtRightEdge = current.some(index=>(randomStart + index) % width === width - 1)
    }


})

//                    38:30
//
// https://www.youtube.com/watch?v=U64vIhh0TyM&t=1504s