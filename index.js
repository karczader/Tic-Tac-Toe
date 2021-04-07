const PLAYER_X='X';
const PLAYER_O='O';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const fieldsSelector=document.querySelectorAll('[data-pos]');
const activePlayerSelector=document.querySelector('#activePlayer');
const winningMessageElementSelector = document.querySelector('.winningMessage');
const winningMessageTextElementSelector = document.querySelector('[data-winning-message-text]');
const button1Selector=document.querySelector('#button1');
const button2Selector=document.querySelector('#button2');


let xTurn=true;
startGame();
button1Selector.addEventListener('click', startGame);
button2Selector.addEventListener('click', startGame);

function startGame(){
    fieldsSelector.forEach(item => {
        item.classList.remove('board__item-X', 'board__item-O');
        item.classList.add('board__item');
        item.removeEventListener('click', handleClick)
        item.addEventListener('click', handleClick, { once: true })
    })
    changeMoveText(xTurn);
    winningMessageElementSelector.classList.remove('show')
}

function handleClick (e){
    const item=e.target;
    const currentClass=xTurn ? PLAYER_X: PLAYER_O;
    addMark(item, currentClass);

    if(ifWin(currentClass)) {
        endGame(true, currentClass);
    }
    else if (ifTie()){
        endGame(false, currentClass);
    }

    swapTurns();
}

function addMark(item, currentClass){
    item.classList.add(`board__item-${currentClass}`);
}

function changeMoveText(xTurn){
    if (xTurn) activePlayerSelector.innerHTML=`Move: X`;
    else activePlayerSelector.innerHTML=`Move: O`;
}

function swapTurns(){
    xTurn=!xTurn;
    changeMoveText(xTurn);
}

function ifWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
          return fieldsSelector[index].classList.contains(`board__item-${currentClass}`)
        })
    })
}

function ifTie(){
    return [...fieldsSelector].every(item => {
        return item.classList.contains('board__item-X') || item.classList.contains('board__item-O')
      })

}

function endGame(status, currentClass){
    if (status) //jesli wygrana
    {
        activePlayerSelector.innerText=``;
        winningMessageTextElementSelector.innerText = `${xTurn ? "X" : "O"} Win!`
    }
    else //remis
        winningMessageTextElementSelector.innerText = 'Draw!'
    winningMessageElementSelector.classList.add('show');
}

