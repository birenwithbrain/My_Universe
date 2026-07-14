const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");

const overlay = document.getElementById("overlay");
const startBtn = document.getElementById("startBtn");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerStar.x = canvas.width / 2;
    centerStar.y = canvas.height / 2;
});

let centerStar = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 3,
    visible: false,
    pulse: 0
};

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (centerStar.visible) {

        centerStar.pulse += 0.05;

        const r =
            centerStar.radius +
            Math.sin(centerStar.pulse) * 0.5;

        const glow =
            18 +
            Math.sin(centerStar.pulse) * 10;

        ctx.beginPath();
        ctx.arc(
            centerStar.x,
            centerStar.y,
            r,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = glow;
        ctx.fill();

    }

    updateParticles();
    drawParticles();

    requestAnimationFrame(draw);
}

let creatingUniverse = false;
let particles = [];

class Particle {

    constructor() {

        this.x = centerStar.x;
        this.y = centerStar.y;

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;

        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.radius = Math.random() * 2 + 1;

        this.alpha = 1;
        this.angle = Math.atan2(
            this.y - centerStar.y,
            this.x - centerStar.x
        );

        this.distance = 0;

        this.rotationSpeed =
            0.015 + Math.random() * 0.02;

    }

    update() {

        if (!creatingUniverse) return;

        this.x += this.vx;
        this.y += this.vy;

        this.vx *= 0.985;
        this.vy *= 0.985;

        this.distance = Math.hypot(
            this.x - centerStar.x,
            this.y - centerStar.y
        );

        if (
            Math.abs(this.vx) +
            Math.abs(this.vy)
            < 0.2
        ) {

            this.angle += this.rotationSpeed;

            this.x =
                centerStar.x +
                Math.cos(this.angle) * this.distance;

            this.y =
                centerStar.y +
                Math.sin(this.angle) * this.distance;

        }

    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;

        ctx.shadowColor = "white";
        ctx.shadowBlur = 10;

        ctx.fill();

    }

}

function createExplosion() {

    particles = [];

    for (let i = 0; i < 300; i++) {

        particles.push(
            new Particle()
        );

    }

}

function updateParticles() {

    for (const particle of particles) {

        particle.update();

    }

}

function drawParticles() {

    for (const particle of particles) {

        particle.draw();

    }

}

draw();

startBtn.addEventListener("click", () => {

    overlay.classList.add("hide");

    setTimeout(() => {

        centerStar.visible = true;
        centerStar.radius = 3;

        setTimeout(() => {

            creatingUniverse = true;
            createExplosion();

        },3000);

    }, 1000);

});