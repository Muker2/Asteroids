const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;




class Player{
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
        this.rotation = 0;
    }

    draw(){

        context.save();
        context.translate(this.position.x, this.position.y);

        context.rotate(this.rotation)
        context.translate(-this.position.x, -this.position.y);

        context.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2, false);
        context.fillStyle = "red";
        context.fill();

        context.beginPath();
        context.moveTo(this.position.x + 30, this.position.y);
        context.lineTo(this.position.x -10, this.position.y - 10);
        context.lineTo(this.position.x -10, this.position.y + 10);
        context.closePath();

        context.strokeStyle = "red";
        context.stroke();
        context.restore();
    }

    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
}
}


class Projectile{
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
        this.radius = 5;
    }

    draw(){
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle ="white";
        context.fill();
    }
    
    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}




const player = new Player({
    position: {x:canvas.width/2, y: canvas.height/2},
    velocity: {x:0, y: 0}
})


const keys = {
    w: {
        pressed: false
    } ,
    a: {
        pressed: false
    } ,
    d: {
        pressed: false
    } 

}

    const SPEED = 3;
    const ROTATION_SPEED = 0.07;
    const projectiles = [];


function animate(){
    window.requestAnimationFrame(animate);
    context.fillStyle = "black";
    context.fillRect(0,0, canvas.width, canvas.height);

    player.update();

    for(let i = projectiles.length -1; i >= 0; i--){
        const projectile = projectiles[i];
        projectile.update();
    }

    player.velocity.x = 0;
    player.velocity.y = 0;
    if(keys.w.pressed){ 
        player.velocity.x = Math.cos(player.rotation) * SPEED;
        player.velocity.y = Math.sin(player.rotation) * SPEED;
    }
    if(keys.d.pressed){
        player.rotation += ROTATION_SPEED;
    }
    else if(keys.a.pressed){
        player.rotation -= ROTATION_SPEED;
    }
    }

animate();

console.log(player);

window.addEventListener("keydown", (event) => {
    switch (event.code){
        case "KeyW":
            keys.w.pressed = true;
            break;
        case "KeyA":
            keys.a.pressed = true;
            break;
        case "KeyD":
            keys.d.pressed = true;
            break;
        case"Space":
            projectiles.push(
                new Projectile({
                position: {
                    x: player.position.x + Math.cos(player.rotation) * 30,
                    y: player.position.y + Math.sin(player.rotation) * 30
                },
                velocity: {
                    x: Math.cos(player.rotation) * 10,
                    y: Math.sin(player.rotation) * 10
                }
            }));
    }

})

window.addEventListener("keyup", (event) => {
    switch (event.code){
        case "KeyW":
            keys.w.pressed = false;
            break;
        case "KeyA":
            keys.a.pressed = false;
            break;
        case "KeyD":
            keys.d.pressed = false;
            break;
    }

})