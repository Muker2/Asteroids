const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


context.fillStyle = "black";
context.fillRect(0,0, canvas.width,     canvas.height);

class Player{
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
    }

    draw(){

        context.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2, false);
        context.fillStyle = "red";
        context.fill();

        context.moveTo(this.position.x + 30, this.position.y);
        context.lineTo(this.position.x -10, this.position.y - 10);
        context.lineTo(this.position.x -10, this.position.y + 10);
        context.closePath();

        context.strokeStyle = "red";
        context.stroke();
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
    } 
}

function animate(){
    window.requestAnimationFrame(animate);
    player.update();
    if(keys.w.pressed) player.velocity.x = 3;
    }

animate();

console.log(player);

window.addEventListener("keydown", (event) => {
    switch (event.code){
        case "KeyW":
            keys.w.pressed =true;
            console.log("W")
            break;
        case "KeyA":
            console.log("A")
            break;
        case "KeyD":
            console.log("D")
            break;
    }

})