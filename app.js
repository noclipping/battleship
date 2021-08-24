document.addEventListener('DOMContentLoaded',()=>{
    const userGrid = document.querySelector('.grid-user');
    const computerGrid = document.querySelector('.grid-computer');
    const displayGrid= document.querySelector('.grid-display');
    const ships = document.querySelectorAll('.ship')
    const destroyer = document.querySelector('.destroyer-container')
    const submarine = document.querySelector('.submarine-container')
    const cruiser = document.querySelector('.cruiser-container')
    const carrier= document.querySelector('.carrier-container')
    const battleship = document.querySelector('.battleship-container')
    const startButton = document.querySelector('#start')
    const rotateButton = document.querySelector('#rotate')
    const turnDisplay = document.querySelector('#whose-go')
    const infoDisplay = document.querySelector('#info')
    const userSquares = []
    const computerSquares = []
    const width = 10;
    let isHorizontal = true;
    let isGameOver = false;
    let currentPlayer= 'user'
    // Create board
    function createBoard(grid, squares){
        for(let i = 0; i < width*width; i++){
            const square = document.createElement('div')
            square.dataset.id = i
            
            grid.appendChild(square)
            square.addEventListener('mousedown',e=>console.log(i))
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
        let randomStart = Math.abs(Math.floor( Math.random() * computerSquares.length - (ship.directions[0].length * direction) ))
        // had to implement this "negative number checker" because for some reason randomstart throws negatives sometimes but not in the tut. weird. this fixes it though.
        //basically says if it's a negative, just default the randomStart to 1. not the most efficient but it works.
       
       
        const isTaken = current.some(index=> computerSquares[randomStart + index].classList.contains('taken'))
        const isAtRightEdge = current.some(index=>(randomStart + index) % width === width - 1)
        const isAtLeftEdge = current.some(index => (randomStart+index % width===0))
        
        if(!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach(index=>computerSquares[randomStart+index].classList.add('taken',ship.name))

        else generate(ship);
    }
    shipArray.forEach(e=>{generate(e)})
    // rotate ship
    function toggleHoriz(){
        destroyer.classList.toggle('destroyer-container-vertical')
        submarine.classList.toggle('submarine-container-vertical')
        cruiser.classList.toggle('cruiser-container-vertical')
        battleship.classList.toggle('battleship-container-vertical')
        carrier.classList.toggle('carrier-container-vertical')
    }
    function rotate(){
        if(isHorizontal){
            toggleHoriz()
            isHorizontal = false;
        } else{
            toggleHoriz()
            isHorizontal = true;
        }
        console.log(isHorizontal)
    }

    rotateButton.addEventListener('click', rotate)

    // move around user ship
    ships.forEach(ship => ship.addEventListener('dragstart', dragStart))
    userSquares.forEach(square => square.addEventListener('dragstart', dragStart))
    userSquares.forEach(square => square.addEventListener('dragover', dragOver))
    userSquares.forEach(square => square.addEventListener('dragenter', dragEnter))
    userSquares.forEach(square => square.addEventListener('drop', dragDrop))
    userSquares.forEach(square => square.addEventListener('dragend', dragEnd))
   
    let selectedShipNameWithIndex
    let draggedShip
    let draggedShipLength


    ships.forEach(ship=> ship.addEventListener('mousedown', e=>{
        selectedShipNameWithIndex=e.target.id;
    }))
    //1:04:40
    function dragStart(){
        draggedShip = this;
        draggedShipLength = this.childNodes.length
   
    }
    function dragOver(e){
        e.preventDefault()
    }
    function dragEnter(e){
        e.preventDefault()
    }

    function checkIfOverlap(ship){
        
    }
    function dragDrop(){
        let shipNameWithLastId = draggedShip.lastChild.id
        let shipClass = shipNameWithLastId.slice(0,-2)
        let lastShipIndex = parseInt(draggedShip.lastChild.id.substr(-1))
        let shipLastId = lastShipIndex + parseInt(this.dataset.id)
        // this.dataset.id refers to the ID of dropped upon div
        console.log(shipLastId)
        const notAllowedVertical= [99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60]
        const notAllowedHorizontal=[0,10,20,30,40,50,60,70,80,90,1,11,21,31,41,51,61,71,81,91,2,22,32,42,52,62,72,82,92,3,13,23,33,43,53,63,73,83,93] 
        let newNotAllowedHorizontal = notAllowedHorizontal.splice(0,10*lastShipIndex)
        let newNotAllowdeVertical = notAllowedVertical.splice(0,10*lastShipIndex)
        let taken = false
        selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))

        shipLastId = shipLastId-selectedShipIndex
        console.log(shipLastId)
        for(let i = 0; i<draggedShipLength; i++){
            let num = (parseInt(this.dataset.id)+i)
            console.log(userSquares[num], 'num')
            if(userSquares[num].classList.contains('taken')){
                taken = true;
            }
        }

        
        if(isHorizontal && !newNotAllowedHorizontal.includes(shipLastId) && shipLastId<100 && !taken){
            for(let i = 0; i < draggedShipLength; i++){
                userSquares[parseInt(this.dataset.id)- selectedShipIndex +i].classList.add('taken',shipClass)
            } 
        } else if (!isHorizontal && !newNotAllowdeVertical.includes(shipLastId)){
            for(let i = 0; i < draggedShipLength; i++){
                userSquares[parseInt(this.dataset.id) -selectedShipIndex + width*i].classList.add('taken', shipClass)
            }
        } else return

        displayGrid.removeChild(draggedShip)
    }
    function dragEnd(){
        
    }
    //Game Logic
    function playGame(){
        if (isGameOver) return
        if(currentPlayer === 'user'){
            turnDisplay.innerHTML='Your Go'
            computerSquares.forEach(square=>square.addEventListener('click',function(e){
                revealSquare(square)
            }))
        }
        if(currentPlayer === 'computer'){
            turnDisplay.innerHTML='Computers Go'
            setTimeout(computerGo, 1000)
        }
    }
    startButton.addEventListener('click',playGame)
    let destroyerCount = 0
    let submarineCount = 0
    let cruiserCount = 0
    let battleshipCount = 0
    let carrierCount = 0
    
    function revealSquare(square){
        if(!square.classList.contains('boom')){
            if(square.classList.contains('destroyer')) destroyerCount++
            if(square.classList.contains('submarine')) submarineCount++
            if(square.classList.contains('cruiser')) cruiserCount++
            if(square.classList.contains('carrier')) carrierCount++
      
        }
        if(square.classList.contains('taken')){
            square.classList.add('boom')
        } else {
            square.classList.add('miss')
        }
        currentPlayer='computer'
        playGame()
    }
    let cpuDestroyerCount = 0
    let cpuSubmarineCount = 0
    let cpuCruiserCount = 0
    let cpuBattleshipCount = 0
    let cpuCarrierCount = 0

    function computerGo(){
        let random = Math.floor(Math.random() * userSquares.length)
        if(!userSquares[random].classList.contains('boom')){
            userSquares[random].classList.add('boom')
            if(userSquares[random].classList.contains('destroyer')) cpuDestroyerCount++
            if(userSquares[random].classList.contains('submarine')) cpuSubmarineCount++
            if(userSquares[random].classList.contains('cruiser')) cpuCruiserCount++
            if(userSquares[random].classList.contains('carrier')) cpuCarrierCount++

        } else computerGo()
        currentPlayer='user'
        turnDisplay.innerHTML ='Your Go'
    }
    function checkForWins(){
        if(destroyerCount === 2){
            infoDisplay.innerHTML = 'You sunk the computers destroyer'
            destroyerCount = 10
        }
        if(submarineCount === 3){
            infoDisplay.innerHTML = 'You sunk the computers submarine'
            submarineCount = 10
        }
        if(cruiserCount === 3){
            infoDisplay.innerHTML = 'You sunk the computers cruiser'
            cruiserCount = 10
        }
       
        if(battleshipCount === 4){
            infoDisplay.innerHTML = 'You sunk the computers battleship'
            battleshipCount = 10
        }
        if(carrierCount === 5){
            infoDisplay.innerHTML = 'You sunk the computers carrier'
            carrierCount = 10
        }
        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        if(cpuDestroyerCount === 2){
            infoDisplay.innerHTML = 'You sunk the computers cpuDestroyer'
            cpuDestroyerCount = 10
        }
        if(cpuSubmarineCount === 3){
            infoDisplay.innerHTML = 'You sunk the computers cpuSubmarine'
            cpuSubmarineCount = 10
        }
        if(cpuCruiserCount === 3){
            infoDisplay.innerHTML = 'You sunk the computers cpuCruiser'
            cpuCruiserCount = 10
        }
       
        if(cpuBattleshipCount === 4){
            infoDisplay.innerHTML = 'You sunk the computers cpuBattleship'
            cpuBattleshipCount = 10
        }
        if(cpuCarrierCount === 5){
            infoDisplay.innerHTML = 'You sunk the computers cpuCarrier'
            cpuCarrierCount = 10
        }
        if((destroyerCount+submarineCount+cruiserCount+battleshipCount)===50){
            infoDisplay.innerHTML='YOU WIN!'
            isGameOver()
        }
        if((cpuDestroyerCount+cpuSubmarineCount+cpuCruiserCount+cpuBattleshipCount)===50){
            infoDisplay.innerHTML='COMPUTER WINS!'
            isGameOver()
        }
        function gameOver(){
            isGameOver = true;
            startButton.removeEventListener('click', playGame);
        }
        
    }
    
})

//                    42:00
//
// https://www.youtube.com/watch?v=U64vIhh0TyM&t=1504s