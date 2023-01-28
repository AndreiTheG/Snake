function createTable() {
    const tbl = document.createElement("table");
    const tbdy = document.createElement("tbody");
    const fruitLine = {val: Math.floor(Math.random() * 16)};
    const fruitCol = {val: Math.floor(Math.random() * 18)};
    if (fruitLine.val == 0) {
        ++fruitLine.val;
    } else if (fruitLine.val == 16) {
        --fruitLine.val;
    }
    if (fruitCol.val == 0) {
        ++fruitCol.val;
    } else if (fruitCol.val == 18) {
        --fruitCol.val;
    }
    const snakeLine = {x: 8}, snakeCol = {y: 9};
    const snake = {value: []};
    const len = {size: 0};
    for (let i = 0; i <= 16; ++i) {
        const tr = document.createElement("tr");
        for (let j = 0; j <= 18; ++j) {
            const td = document.createElement("td");
            if (i != 0 && j != 0 && i != 16 && j != 18) {
                td.id = i * 100 +  j;
                console.log(td.id);
                td.appendChild(document.createTextNode(' '));
                if (i == snakeLine.x && (j == snakeCol.y || j == snakeCol.y - 1 || j == snakeCol.y - 2)) {
                    snake.value[len.size] = i * 100 + j;
                    ++len.size;
                    td.style.backgroundColor = 'yellow';
                } else if (i == fruitLine.val && j == fruitCol.val) {
                    td.style.backgroundColor = 'red';
                } else {
                    td.style.backgroundColor = 'lawngreen';
                }
                td.style.border = '2px solid black';
            } else {
                td.id = i * 100 + j;
                td.appendChild( document.createTextNode(' '));
                td.style.backgroundColor = 'green';
            }
            tr.appendChild(td);
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    document.body.appendChild(tbl);
    tbl.setAttribute("border", "2");
    tbl.id = 'gameTable';
    document.getElementById('button').disabled = true;
    let interval, arrowRight = true, arrowUp = false, arrowLeft = false, arrowDown = false;
    const eatenFruit = {val: false}, isBody = {value: false};
    interval = setInterval(function output() { if (arrowRight == true) {  
        moveRight(snake, snakeLine, snakeCol, len, eatenFruit, isBody);
        if (eatenFruit.val == true) {
            eatenFruit.val = false;
        }
        randomFruit(snake, len, snakeLine, snakeCol, fruitLine, fruitCol, eatenFruit);
        if (snakeCol.y == 18 || isBody.value == true) {
            clearInterval(interval);
            let gameMessage = document.getElementById('EndOfTheGame');
            gameMessage.innerHTML = 'Game over! <br>' + 'Your score is ' + (len.size - 3) + '🍎!';
            let replayButton = document.createElement("button");
            replayButton.innerHTML = "Replay";
            replayButton.classList = "btn btn-secondary";
            replayButton.id = "Replay";
            replayButton.onclick = "ReplayGame()";
            document.body.appendChild(replayButton);
        }
    } }, 300);
    window.addEventListener("keydown", function move(event) {
        if (event.key == 'ArrowRight' && arrowLeft == false && snakeLine.x >= 1 && snakeLine.x <= 15 &&
            snakeCol.y >= 1 && snakeCol.y <= 17) {
            clearInterval(interval);
            arrowRight = true;
            arrowLeft = false;
            arrowUp = false;
            arrowDown = false;
            const isSnakeBody = {value: false};
            interval = setInterval(function output() {
                moveRight(snake, snakeLine, snakeCol, len, eatenFruit, isSnakeBody);
                if (eatenFruit.val == true) {
                    eatenFruit.val = false;
                }
                randomFruit(snake, len, snakeLine, snakeCol, fruitLine, fruitCol, eatenFruit);
                if (snakeCol.y == 18 || isSnakeBody.value == true) {
                    clearInterval(interval);
                    let gameMessage = document.getElementById('EndOfTheGame');
                    gameMessage.innerHTML = 'Game over! <br>' + 'Your score is ' + (len.size - 3) + '🍎!';
                    let replayButton = document.createElement("button");
                    replayButton.innerHTML = "Replay";
                    replayButton.classList = "btn btn-secondary";
                    replayButton.id = "Replay";
                    replayButton.onclick = "ReplayGame()";
                    document.body.appendChild(replayButton);
                }
            }, 300); 
        } else if (event.key == "ArrowLeft" && arrowRight == false && snakeLine.x >= 1 && snakeLine.x <= 15 &&
        snakeCol.y >= 1 && snakeCol.y <= 17) {
            arrowRight = false;
            arrowLeft = true;
            arrowUp = false;
            arrowDown = false;
            clearInterval(interval);
            const isSnakeBody = {value: false};
            interval = setInterval(function output() {
                moveLeft(snake, snakeLine, snakeCol, len, eatenFruit, isSnakeBody);
                if (eatenFruit.val == true) {
                    eatenFruit.val = false;
                }
                randomFruit(snake, len, snakeLine, snakeCol, fruitLine, fruitCol, eatenFruit);
                if (snakeCol.y == 0 || isSnakeBody.value == true) {
                    clearInterval(interval);
                    let gameMessage = document.getElementById('EndOfTheGame');
                    gameMessage.innerHTML = 'Game over! <br>' + 'Your score is ' + (len.size - 3) + '🍎!';
                    let replayButton = document.createElement("button");
                    replayButton.innerHTML = "Replay";
                    replayButton.classList = "btn btn-secondary";
                    replayButton.id = "Replay";
                    replayButton.onclick = "ReplayGame()";
                    document.body.appendChild(replayButton);
                }
            }, 300); 
        }
        if (event.key == 'ArrowUp' && arrowDown == false && snakeLine.x >= 1 && snakeLine.x <= 15 &&
        snakeCol.y >= 1 && snakeCol.y <= 17) {
            arrowRight = false;
            arrowLeft = false;
            arrowUp = true;
            arrowDown = false;
            clearInterval(interval);
            const isSnakeBody = {value: false};
            interval = setInterval(function output() {
                moveUp(snake, snakeLine, snakeCol, len, eatenFruit, isSnakeBody);
                if (eatenFruit.val == true) {
                    eatenFruit.val = false;
                }
                randomFruit(snake, len, snakeLine, snakeCol, fruitLine, fruitCol, eatenFruit);
                if (snakeLine.x == 0 || isSnakeBody.value == true) {
                    clearInterval(interval);
                    let gameMessage = document.getElementById('EndOfTheGame');
                    gameMessage.innerHTML = 'Game over! <br>' + 'Your score is ' + (len.size - 3) + '🍎!';
                    let replayButton = document.createElement("button");
                    replayButton.innerHTML = "Replay";
                    replayButton.classList = "btn btn-secondary";
                    replayButton.id = "Replay";
                    replayButton.onclick = "ReplayGame()";
                    document.body.appendChild(replayButton);
                }
            }, 300); 
        } else if (event.key == 'ArrowDown' &&  arrowUp == false && snakeLine.x >= 1 && snakeLine.x <= 15 &&
        snakeCol.y >= 1 && snakeCol.y <= 17) {
            arrowRight = false;
            arrowLeft = false;
            arrowUp = false;
            arrowDown = true;
            clearInterval(interval);
            const isSnakeBody = {value: false};
            interval = setInterval(function output() {
                moveDown(snake, snakeLine, snakeCol, len, eatenFruit, isSnakeBody);
                if (eatenFruit.val == true) {
                    eatenFruit.val = false;
                }
                randomFruit(snake, len, snakeLine, snakeCol, fruitLine, fruitCol, eatenFruit);
                if (snakeLine.x == 16 || isSnakeBody.value == true) {
                    clearInterval(interval);
                    let gameMessage = document.getElementById('EndOfTheGame');
                    gameMessage.innerHTML = 'Game over! <br>' + 'Your score is ' + (len.size - 3) + '🍎!';
                    let replayButton = document.createElement("button");
                    replayButton.innerHTML = "Replay";
                    replayButton.classList = "btn btn-secondary";
                    replayButton.id = "Replay";
                    replayButton.onclick = "ReplayGame()";
                    document.body.appendChild(replayButton);
                }
            }, 300); 
        }
    });
}

function Replay() {
    window.location.refresh();
}

function randomFruit(snake, len, snakeLine, snakeCol, fruitLine, fruitCol, eatenFruit) {
    if (snakeLine.x == fruitLine.val && snakeCol.y == fruitCol.val) {
        let isBorderCell = true;
        eatenFruit.val = true;
        while (isBorderCell == true) {
            fruitLine.val = Math.floor(Math.random() * 16);
            fruitCol.val = Math.floor(Math.random() * 18);
            console.log("FruitLine: " + fruitLine.val + " FruitCol: " + fruitCol.val + "");
            if (fruitLine.val >= 1 && fruitLine.val <= 15 && fruitCol.val >= 1 
                && fruitCol.val <= 17 && (fruitLine.val != snakeLine.x || fruitCol.val != snakeCol.y)) {
                let cell = fruitLine.val * 100 + fruitCol.val, isTrue = false;
                for (let i = 0; i < len.size && isTrue == false; ++i) {
                    if (cell == snake.value[i]) {
                        isTrue = true;
                    }
                }
                if (isTrue == false) {
                    isBorderCell = false;
                }
            }
        }
        let fruit = document.getElementById(fruitLine.val * 100 + fruitCol.val);
        fruit.style.backgroundColor = 'red';
    }
}

function snakeBehaviour(len, snake, snakeLine, snakeCol, isSnakeBody, eatenFruit, prevTail) {
    let nextValue = snakeLine.x * 100 + snakeCol.y;
    if (eatenFruit.val == true) {
        ++len.size;
        snake.value[len.size - 1] = nextValue;
        let elem = document.getElementById(nextValue);
        elem.style.backgroundColor = 'yellow';
    } else {
        let cell = document.getElementById(nextValue);
        if (cell.style.backgroundColor == 'yellow') {
            isSnakeBody.value = true;
        }
        for (let i = 0; i < len.size - 1; ++i) {
            snake.value[i] = snake.value[i + 1];
        } 
        snake.value[len.size - 1] = nextValue;
        for (let i = 0; i < len.size; ++i) {
            let elem = document.getElementById(snake.value[i]); 
            elem.style.backgroundColor = 'yellow';
        }
        let elem = document.getElementById(prevTail);
        elem.style.backgroundColor = 'lawngreen';
    }  
}

function moveRight(snake, snakeLine, snakeCol, len, eatenFruit, isSnakeBody) {
    let prevTail= snake.value[0];
    ++snakeCol.y;
    if (snakeCol.y <= 17) {
        snakeBehaviour(len, snake, snakeLine, snakeCol, isSnakeBody, eatenFruit, prevTail);
    }
}

function moveLeft(snake, snakeLine, snakeCol, len, eatenFruit, isSnakeBody) {
    let prevTail = snake.value[0];
    --snakeCol.y;
    if (snakeCol.y >= 1) {
        snakeBehaviour(len, snake, snakeLine, snakeCol, isSnakeBody, eatenFruit, prevTail);
    }
}

function moveUp(snake, snakeLine, snakeCol, len, eatenFruit, isSnakeBody) {
    let prevTail = snake.value[0];
    --snakeLine.x;
    if (snakeLine.x >= 1) {
        snakeBehaviour(len, snake, snakeLine, snakeCol, isSnakeBody, eatenFruit, prevTail);
    }
}

function moveDown(snake, snakeLine, snakeCol, len, eatenFruit, isSnakeBody) {
    let prevTail = snake.value[0];
    ++snakeLine.x;
    if (snakeLine.x <= 15) {
        snakeBehaviour(len, snake, snakeLine, snakeCol, isSnakeBody, eatenFruit, prevTail);
    }
}