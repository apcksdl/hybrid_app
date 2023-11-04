// box.js
const obstacles = [];

function updateObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        obstacle.x += obstacle.speedX;
        obstacle.y += obstacle.speedY;
        obstacle.angle += Math.PI / 180; // 1도씩 회전
    }
}

// 충돌 감지 및 반응
function handleCollisions() {
    const collisionDistanceThreshold = 30; // 거리 임계값, 필요에 따라 조정

    for (let i = 0; i < obstacles.length; i++) {
        for (let j = i + 1; j < obstacles.length; j++) {
            const obstacleA = obstacles[i];
            const obstacleB = obstacles[j];

            // 두 장애물 간의 거리 계산
            const dx = obstacleA.x - obstacleB.x;
            const dy = obstacleA.y - obstacleB.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // 만약 두 장애물이 충돌했다면
            if (distance < collisionDistanceThreshold) {
                // 각각의 장애물의 방향을 반대로 변경
                obstacleA.speedX *= -1;
                obstacleA.speedY *= -1;
                obstacleB.speedX *= -1;
                obstacleB.speedY *= -1;
                // 방향 변경 후 장애물 위치 조정
                obstacleA.x += obstacleA.speedX;
                obstacleA.y += obstacleA.speedY;
                obstacleB.x += obstacleB.speedX;
                obstacleB.y += obstacleB.speedY;
            }
        }

        for (let j = 0; j < Player.length; j++) {
            const obstacle = obstacles[i];
            const playerBody = Player[j];

            // 뱀과 장애물 간의 거리 계산
            const dx = playerBody.PosX - obstacle.x;
            const dy = playerBody.PosY - obstacle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // 만약 충돌이 감지되면 게임 종료
            if (distance < collisionDistanceThreshold) {
                gameOver();
                return;
            }
        }

    }
}
let gameStartTime = Date.now(); // 게임 시작 시간을 기록하는 변수
    // 게임 종료 시 호출되는 함수
    function gameOver() {
        // 게임 오버 처리를 구현
        alert("Game Over"); // 간단한 게임 오버 메시지
    
        // 게임 상태 및 객체 초기화
        obstacles.length = 0; // 장애물 초기화
        Player.length = 0; // 플레이어 초기화
    
        // 게임 시작 시간 초기화
        gameStartTime = Date.now();
    
        // 게임을 재시작
        setTimeout(initGame, 1000); // 1초 후에 게임 초기화
    }
    
    function initGame() {
        Player = [new PlayerBody(canvas.width / 2, canvas.height / 2), new PlayerBody(100, 100), new PlayerBody(70, 70)];
        obstacles = []; // 장애물 초기화
        foods = []; // 사과 초기화
    
        // elapsedTime 초기화
        const currentTime = Date.now();
        gameStartTime = currentTime;
    
        // 이전에 예약한 사과 생성 타이머 중지
        clearInterval(appleIntervalId);
    
        // 최초의 사과 생성
        createApple();
    
        // 20초 간격으로 사과 생성을 예약
        appleIntervalId = setInterval(createApple, 20000); // 20000 밀리초 (20초)
    }
    


function drawObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        if (obstacle.shape === 'rect') {
            drawRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height, obstacle.angle, obstacle.color);
        } else if (obstacle.shape === 'triangle') {
            drawTriangle(obstacle.x, obstacle.y, obstacle.size, obstacle.angle, obstacle.color);
        } else if (obstacle.shape === 'circle') {
            drawCircle(obstacle.x, obstacle.y, obstacle.radius, obstacle.color);
        }
    }
}

function createObstacle() {
    const shapes = ['rect', 'triangle', 'circle'];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

    // 장애물 객체 생성
    const obstacle = {
        x: 0,
        y: 0,
        speedX: 0,
        speedY: 0,
        angle: Math.PI / 4, // 각도 설정
        color: 'red', // 색상 설정
        shape: randomShape, // 모양 설정
    };

    // 무작위로 방향 설정
    const direction = Math.floor(Math.random() * 4); // 0, 1, 2, 3 중 하나 선택

    if (direction === 0) {
        // 위에서 아래로
        obstacle.x = Math.random() * canvas.width;
        obstacle.y = -30;
        obstacle.speedY = 3;
    } else if (direction === 1) {
        // 아래에서 위로
        obstacle.x = Math.random() * canvas.width;
        obstacle.y = canvas.height + 30;
        obstacle.speedY = -3;
    } else if (direction === 2) {
        // 왼쪽에서 오른쪽으로
        obstacle.x = -30;
        obstacle.y = Math.random() * canvas.height;
        obstacle.speedX = 3;
    } else {
        // 오른쪽에서 왼쪽으로
        obstacle.x = canvas.width + 30;
        obstacle.y = Math.random() * canvas.height;
        obstacle.speedX = -3;
    }

    // 모양에 따라 크기 설정
    if (randomShape === 'rect') {
        obstacle.width = 50;
        obstacle.height = 30;
    } else if (randomShape === 'triangle') {
        obstacle.size = 40;
    } else if (randomShape === 'circle') {
        obstacle.radius = 20;
    }

    // 장애물 배열에 추가
    obstacles.push(obstacle);
}

function drawRect(x, y, width, height, theta, color) {
    context.save();
    context.beginPath();
    context.translate(x, y);
    context.rotate(theta);
    context.fillStyle = color;
    context.fillRect(-width / 2, -height / 2, width, height);
    context.closePath();
    context.restore();
}

function drawTriangle(x, y, size, theta, color) {
    context.save();
    context.beginPath();
    context.translate(x, y);
    context.rotate(theta);
    context.fillStyle = color;
    context.moveTo(0, -size / 2);
    context.lineTo(-size / 2, size / 2);
    context.lineTo(size / 2, size / 2);
    context.closePath();
    context.fill();
    context.restore();
}

function drawCircle(x, y, radius, color) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
}

function createObstacleWithIncreasingFrequency() {
    // 경과한 시간을 계산합니다.
    const elapsedTime = (Date.now() - gameStartTime) / 1000; // 초로 변환

    // 경과한 시간을 기반으로 간격을 결정합니다.
    let interval = 2000; // 초기 간격은 2초

    if (elapsedTime > 20) {
        interval = 1500; // 20초 이후에는 간격을 1.5초로 줄입니다.
    }
    if (elapsedTime > 40){
        interval = 700; // 40초  이후에는 간격을 0.7초로 줄입니다.
    }

    // 장애물을 생성합니다.
    createObstacle();

    // 다음 장애물 생성을 예약합니다.
    setTimeout(createObstacleWithIncreasingFrequency, interval);
}

