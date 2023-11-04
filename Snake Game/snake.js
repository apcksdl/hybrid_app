// 클래스
class PlayerBody {
    constructor(PosX, PosY) {
      this.PosX = PosX;
      this.PosY = PosY;
      this.Size = 20;
      this.DirX = 0;
      this.DirY = 0;
      this.Speed = 5;
      this.Angle = 0;
    }
    Update() {
      this.DirX = mouseX - this.PosX;
      this.DirY = mouseY - this.PosY;
      let scalar = Math.sqrt(this.DirX * this.DirX + this.DirY * this.DirY);
      this.DirX /= scalar;
      this.DirY /= scalar;

      this.PosX += this.DirX * this.Speed;
      this.PosY += this.DirY * this.Speed;
      this.Angle = Math.atan2(this.DirY, this.DirX);
    }
    Draw() {
      context.save();
      context.translate(this.PosX, this.PosY);
      context.rotate(this.Angle);
      context.beginPath();
      context.arc(0, 0, this.Size, 0, 2 * Math.PI);
      context.fillStyle = '#FF6F61';
      context.fill();
      context.closePath();
      context.restore();
    }
  }

  const bodySpacing = 2 / 3; // 수정된 간격 비율

  function onMouseDown() {
    isMouseClicked = true;
    // 가속화할 때 몸통 간의 간격을 줄이기 위한 변수
    const accelerationFactor = 0.9; // 0.9은 예시로, 조절 가능

    for (let i = 1; i < Player.length; i++) {
      let currentBody = Player[i];
      let prevBody = Player[i - 1];
      let distance = bodySpacing * (prevBody.Size + currentBody.Size);

      // 현재 몸통을 머리 방향으로 더 가깝게 이동 (스프링 효과)
      currentBody.PosX = prevBody.PosX - distance * Math.cos(currentBody.Angle) * accelerationFactor;
      currentBody.PosY = prevBody.PosY - distance * Math.sin(currentBody.Angle) * accelerationFactor;
    }
  }
  function onMouseUp() {
    isMouseClicked = false;
  }
  
  