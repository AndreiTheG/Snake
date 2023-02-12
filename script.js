function createTable() {
    const tbl = document.createElement("table");
    const tbdy = document.createElement("tbody");
    const fruitLine = {val: 0};
    const fruitCol = {val: 0};
    let isNotSnake = false;
    while (isNotSnake == false) {
        fruitLine.val =  Math.floor(Math.random() * 16);
        fruitCol.val =  Math.floor(Math.random() * 18);
        if (!(fruitLine.val == 8 && (fruitCol.val == 7 || fruitCol.val == 8 || fruitCol.val == 9))) {
            isNotSnake = true;
        }
    }
    checkTheFruitPosition(fruitLine, fruitCol);
    const snakeLine = {x: 8}, snakeCol = {y: 9};
    const snake = {value: []};
    const len = {size: 0};
    for (let i = 0; i <= 16; ++i) {
        const tr = document.createElement("tr");
        for (let j = 0; j <= 18; ++j) {
            const td = document.createElement("td");
            if (i != 0 && j != 0 && i != 16 && j != 18) {
                td.id = i * 100 +  j;
                td.appendChild(document.createTextNode(' '));
                if (i == snakeLine.x && j >= snakeCol.y - 2 && j <= snakeCol.y) {
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
    Controller(fruitLine, fruitCol, snake, len);
}

function Controller(fruitLine, fruitCol, snake, len) {
    let arrowRight = true, arrowUp = false, arrowLeft = false, arrowDown = false, interval; 
    const eatenFruit = {val: false}, isSnakeBody = {value: false};
    interval = setInterval(function output() { if (arrowRight == true) {  
        moveSnake(interval, snake, len, snakeLine, snakeCol, fruitLine, fruitCol,
            eatenFruit, isSnakeBody, arrowRight, arrowUp, arrowLeft, arrowDown);
    } }, 300);
    console.log(interval);
    window.addEventListener("keydown", function move(event) {
        if (((event.key == 'ArrowRight') || (event.key == 'ArrowUp')
        || (event.key == 'ArrowLeft') || (event.key == 'ArrowDown')) &&
        snakeLine.x >= 1 && snakeLine.x <= 15 && snakeCol.y >= 1 && snakeCol.y <= 17) {
            if (event.key == 'ArrowRight' && arrowLeft == false) {
                arrowRight = true, arrowLeft = false, arrowUp = false, arrowDown = false;
            } else if (event.key == 'ArrowLeft' && arrowRight == false) {
                arrowRight = false, arrowLeft = true, arrowUp = false, arrowDown = false;
            }
            if (event.key == 'ArrowUp' && arrowDown == false) {
                arrowRight = false, arrowLeft = false, arrowUp = true, arrowDown = false;
            } else if (event.key == 'ArrowDown' && arrowUp == false) {
                arrowRight = false, arrowLeft = false, arrowUp = false, arrowDown = true;
            }
            clearInterval(interval); 
            interval = setInterval(function output() {
                moveSnake(interval, snake, len, snakeLine, snakeCol, fruitLine, fruitCol,
                    eatenFruit, isSnakeBody, arrowRight, arrowUp, arrowLeft, arrowDown);
            }, 300);
        } 
    });
}

function checkTheFruitPosition(fruitLine, fruitCol) {
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
}

function moveSnake(interval, snake, len, snakeLine, snakeCol, fruitLine, fruitCol, eatenFruit, isSnakeBody, arrowRight, arrowUp, arrowLeft, arrowDown) {
    let direction;
    if (arrowRight == true) {
        direction = 'right';
    } else if (arrowLeft == true) {
        direction = 'left';
    } else if (arrowUp == true) {
        direction = 'up';
    } else if (arrowDown == true) {
        direction = 'down';
    }
    snakesDirection(snake, snakeLine, snakeCol, len, eatenFruit, isSnakeBody, direction);
    if (eatenFruit.val == true) {
        eatenFruit.val = false;
    }
    randomFruit(snake, len, snakeLine, snakeCol, fruitLine, fruitCol, eatenFruit, isSnakeBody, direction);
    console.log(isSnakeBody.value);
    if (snakeCol.y == 18 || snakeCol.y == 0 || snakeLine.x == 0 || snakeLine.x == 16 || isSnakeBody.value == true) {
        clearInterval(interval);
        let gameMessage = document.getElementById('EndOfTheGame');
        gameMessage.innerHTML = 'Game over! <br>' + 'Your score is ' + (len.size - 3) + '🍎!';
        document.getElementById("refresh").innerHTML = '<button id="Replay" type="button" class="btn btn-secondary" onclick="ReplayGame()">Replay</button>';
    }
}

function ReplayGame() {
    window.location.reload();
}

function randomFruit(snake, len, snakeLine, snakeCol, fruitLine, fruitCol, eatenFruit, isSnakeBody, direction) {
    if (snakeLine.x == fruitLine.val && snakeCol.y == fruitCol.val) {
        let isBorderCell = true;
        eatenFruit.val = true;
        while (isBorderCell == true) {
            fruitLine.val = Math.floor(Math.random() * 16);
            fruitCol.val = Math.floor(Math.random() * 18);
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
        let neighbour = null;
        if (direction == 'down') {
            neighbour = document.getElementById((snakeLine.x + 1) * 100 + snakeCol.y);
        } else if (direction == 'up') {
            neighbour = document.getElementById((snakeLine.x - 1) * 100 + snakeCol.y)
        } else if (direction == 'left') {
            neighbour = document.getElementById(snakeLine.x * 100 + (snakeCol.y - 1));    
        } else if (direction == 'right') {
            neighbour = document.getElementById(snakeLine.x * 100 + (snakeCol.y + 1));
        }
        if (neighbour != null && neighbour.style.backgroundColor == 'yellow') {
            isSnakeBody.value = true;
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
        console.log("isEaten");
    } else {
        for (let i = 0; i < len.size && isSnakeBody.value == false; ++i) {
            if (snake.value[i] == nextValue) {
                isSnakeBody.value = true;
            }
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

function snakesDirection(snake, snakeLine, snakeCol, len, eatenFruit, isSnakeBody, direction) {
    let prevTail = snake.value[0];
    if (direction == 'right') {
        ++snakeCol.y;
    } else if (direction == 'left') {
        --snakeCol.y;
    }
    if (direction == 'up') {
        --snakeLine.x;
    } else if (direction == 'down') {
        ++snakeLine.x;
    }
    if (snakeCol.y >= 1 && snakeCol.y <= 17 && snakeLine.x >= 1 && snakeLine.x <= 15) {
        snakeBehaviour(len, snake, snakeLine, snakeCol, isSnakeBody, eatenFruit, prevTail);
    }
}