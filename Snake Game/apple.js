class Food {
  constructor(PosX, PosY) {
    this.PosX = PosX;
    this.PosY = PosY;
    this.Size = 10; // 먹을 오브젝트의 크기
  }
  // 먹을 오브젝트를 그리는 함수
  Draw() {
    context.beginPath();
    context.arc(this.PosX, this.PosY, this.Size, 0, 2 * Math.PI);
    context.fillStyle = 'green'; // 먹을 오브젝트의 색상
    context.fill();
    context.closePath();
  }
}

// 먹을 오브젝트를 저장하는 배열
const foods = [];

function createApple() {
  // 랜덤한 X와 Y 위치 생성
  const randomX = Math.floor(Math.random() * canvas.width);
  const randomY = Math.floor(Math.random() * canvas.height);
  
  // 생성한 사과를 배열에 추가
  foods.push(new Food(randomX, randomY));
}

// 20초마다 사과 생성
setInterval(createApple, 20000); // 20000 밀리초 (20초)
    
// 먹을 오브젝트와 뱀의 충돌 검사
function checkCollision() {
  for (let i = 0; i < foods.length; i++) {
    let food = foods[i];
    let dx = food.PosX - Player[0].PosX;
    let dy = food.PosY - Player[0].PosY;
    let distance = Math.sqrt(dx * dx + dy * dy);
        
    if (distance < Player[0].Size + food.Size) {
      // 뱀이 먹을 오브젝트와 충돌하면 몸통 추가
      Player.push(new PlayerBody(0, 0)); // 새로운 몸통 생성 (위치는 임의로 설정 가능)
      // 먹은 오브젝트를 배열에서 제거
      foods.splice(i, 1);
    }
  }
}
