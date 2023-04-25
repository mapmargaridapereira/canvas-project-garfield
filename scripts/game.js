class Game {
  constructor(ctx, width, height, player) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.player = player;
    this.intervalId = null;
    this.frames = 0;
    this.food = [];
    this.veggies = [];
  }

  start() {
    this.intervalId = setInterval(this.update, 10); //player speed
  }

  update = () => {
    this.frames++;
    this.clear();
    this.player.newPos();
    this.player.draw();
    this.updateFood();
    this.grabFood();
    this.updateVeggies();
    this.grabVeggies();
  };

  stop() {
    clearInterval(this.intervalId);
  }

  //clears canvas
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  updateFood() {
    for (let i = 0; i < this.food.length; i++) {
      this.food[i].draw();
    }
    if (this.frames % 200 === 0) {
      let foodPositionX = Math.floor(Math.random() * (canvas.width - 20));
      let foodPositionY = Math.floor(Math.random() * (canvas.height - 20));

      this.food.push(
        new Food(foodPositionX, foodPositionY, 20, 20, "green", this.ctx)
      );
    }
    if (this.food.length > 2) {
      this.food.shift(); //clears food after some time
    }
  }
  grabFood = () => {
    for (let i = 0; i < this.food.length; i++) {
      if (this.player.crashWith(this.food[i])) {
        this.food.splice(i, 1);
        console.log("CHOMP");
      }
    }
  };
  updateVeggies() {
    for (let j = 0; j < this.veggies.length; j++) {
      this.veggies[j].draw(); // continue draw enemy
    }
    if (this.frames % 200 === 0) {
      let veggiesPositionX = Math.floor(
        (Math.random() * (canvas.width - 20)) / 2
      );
      let veggiesPositionY = Math.floor(
        (Math.random() * (canvas.height - 20)) / 2
      ); //need to divide so there's not too many on screen

      this.veggies.push(
        new Food(veggiesPositionX, veggiesPositionY, 20, 20, "blue", this.ctx)
      );
    }
  }

  grabVeggies = () => {
    for (let k = 0; k < this.veggies.length; k++) {
      /* if (this.player.crashWith(this.food[i])) {
            this.food.splice(i, 1);*/
      console.log("EW");
      this.updateVeggies();
      if (this.veggies.length > 1) {//not crashing but need to change interval
        this.veggies.splice(k,1); //clears veggies after some time
      }
    }
  }

  checkGameOver(){
    const crashed = this.veggies.some((veg)=>{
        return this.player.crashWith(veg);
    })
    if(crashed){
        ctx.fillStyle = 'black';
        ctx.fillRect(50, 200, 400, 250);
        ctx.font = '32px Helvetica';
        ctx.fillStyle = 'red';
        ctx.fillText('Game Over', 150, 300);
        ctx.fillStyle = 'white';
        ctx.fillText('Your final score', 135, 350);
        this.ctx.fillText(`${this.score}`, 230, 400);
        this.stop();
    }
}
}
