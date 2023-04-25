class Player {
  constructor(x, y, w, h, color, ctx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color; //img
    this.image = null;
    this.ctx = ctx;
    this.speedX = 0;
    this.speedY = 0;
    this.direction = "";
    this.playerDead = false

    let img = new Image();
    img.src = "../img/garfield/garfield_head_up.png";
    img.addEventListener('load', () => {
        this.image = img;
    });
  }

  //draws player on the canvas
    draw() { 
      if(this.image){
        this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
      } 
    }

  newPos() {
    if (this.x <= 0) {
/*       this.x = 0; */
      this.playerDead = true
    } else if (this.x + 45 >= 700) {
      //player size minus canvas width
   /*    this.x = 650; */
      this.playerDead = true
       //change here
    }
    this.x += this.speedX;

    if (this.y <= 0) {
/*       this.y = 0; */
      this.playerDead = true
    } else if (this.y + 45 >= 500) {
     /*  this.y = 450; */
      this.playerDead = true
       //change here
    }
    this.y += this.speedY;
    

  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.h;
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.w;
  }

  crashWith(food) {
    return (
      this.bottom() > food.top() &&
      this.top() < food.bottom() &&
      this.right() > food.left() &&
      this.left() < food.right()
    );
  }
  crashWithBorder() {
    return (
    this.top() < 0 || 
    this.bottom() > canvas.height || 
    this.left() < 0 || 
    this.right() > canvas.width
    );
  }
}

class Food {
  constructor(x, y, w, h, color, ctx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = null;
    this.color = color;
    this.ctx = ctx;
  
    let img = new Image();
    img.src = "../img/food.png";
    img.addEventListener('load', () => {
        this.image = img;
    });
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.h;
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.w;
  }

  draw() {
    if(this.image){
      this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    } 
  }
}
class Veggie {
  constructor(x, y, w, h, color, ctx) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = null;
    this.color = color;
    this.ctx = ctx;
  
    let veggieArray = ["veggie.png", "broccoli.png", "salad.png"];
    let randomIndex = Math.floor(Math.random() * veggieArray.length);
    let newImage = new Image();
    newImage.src = "./img/" + veggieArray[randomIndex];
    newImage.addEventListener('load', () => {
        this.image = newImage;
    });
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.h;
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.w;
  }

  draw() {
    if(this.image){
      this.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    } 
  }
}
