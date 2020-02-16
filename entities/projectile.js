function Projectile(game, spritesheet, direction, startX, startY) {
    if (direction === "right"){
        this.animation = new Animation(spritesheet, 128, 128, 14, .05, 14, false, 1);
        this.speed = 900;
    } 
    if (direction === "left"){
        this.animation = new Animation(spritesheet, 128, 128, 14, .05, 14, false, 1);
        this.speed = -900;
    }
    this.x = startX;
    this.y = startY;
    
    this.game = game;
    this.ctx = game.ctx;
    this.timeAlive = 0;
    this.live = 1; 
    this.underworld = false;
    var that = this;
    document.addEventListener("keydown", function (e) {
        console.log(e);
		//Running right 
		if (e.code === "Space"){
            console.log("underworld: " + that.underworld);
            e.preventDefault();
            that.underworld = !that.underworld;
        }
    });
    console.log("projectile");
}

Projectile.prototype = new Entity();
Projectile.prototype.constructor = Projectile;

Projectile.prototype.draw = function () {
    //if (this.underworld) return;
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

Projectile.prototype.update = function () {
    if (this.timeAlive > 20) this.speed = 0;
    this.x += this.game.clockTick * this.speed;
    if (this.x > 1200) this.x = -230;
    if (this.x < -230) this.x = 1200;
    Entity.prototype.update.call(this);
    //console.log("this position: " + this.x);
    this.timeAlive ++;
}


