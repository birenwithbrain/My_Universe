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

    ctx.fillStyle = "rgba(15,20,40,0.05)";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    if (centerStar.visible) {

        centerStar.pulse += 0.05;

        const r =
            centerStar.radius +
            Math.sin(centerStar.pulse) * 0.5;

        const glow =
            35 +
            Math.sin(centerStar.pulse) * 20;

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
        ctx.beginPath();

        ctx.arc(
            centerStar.x,
            centerStar.y,
            r * 4,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.fill();

    }


    updateParticles();
    if (creatingUniverse) {

        galaxyRotation += 0.0015;

    }
    drawParticles();

    updateShootingStars();
    drawShootingStars();

    const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        200,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.8
    );

    gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.1)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    requestAnimationFrame(draw);
}

let creatingUniverse = false;
let galaxyRotation = 0;
let particles = [];
let shootingStars = [];

class Particle {

    constructor() {

        this.x = centerStar.x;
        this.y = centerStar.y;

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;

        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        if (Math.random() < 0.08) {

            this.radius = Math.random() * 3 + 3;

        } else {

            this.radius = Math.random() * 1.5 + 0.8;

        }

        const colors = [
            "#ffffff",
            "#dbeafe",
            "#93c5fd",
            "#c4b5fd",
            "#67e8f9"
        ];

        this.color =
            colors[Math.floor(Math.random() * colors.length)];

        this.twinkle =
            Math.random() * Math.PI * 2;

        this.alpha = 1;
        this.angle = Math.atan2(
            this.y - centerStar.y,
            this.x - centerStar.x
        );

        this.distance = 0;

        this.rotationSpeed =
            0.015 + Math.random() * 0.02;

        this.targetDistance =
            Math.random() * 350 + 40;

        this.arm =
            Math.random() < 0.5 ? 0 : Math.PI;

        this.spiralOffset =
            Math.random() * 1.5;

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

            this.distance +=
                (this.targetDistance - this.distance) * 0.02;

            this.angle += this.rotationSpeed;

            const spiralAngle =
                this.angle +
                this.arm +
                this.distance * 0.025 +
                this.spiralOffset +
                galaxyRotation;

            this.x =
                centerStar.x +
                Math.cos(spiralAngle) * this.distance;

            this.y =
                centerStar.y +
                Math.sin(spiralAngle) * this.distance;

        }

    }

    draw() {

        this.twinkle += 0.05;

        const brightness =
            0.5 +
            Math.sin(this.twinkle) * 0.5;

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = this.color;

        ctx.shadowColor = this.color;

        ctx.shadowBlur = 8 + brightness * 12;

        ctx.globalAlpha = brightness;

        ctx.fill();

        ctx.globalAlpha = 1;

    }

}

class ShootingStar {

    constructor() {

        this.x = -100;
        this.y = Math.random() * canvas.height * 0.5;

        this.speed = 18 + Math.random() * 8;

        this.length = 150;

        this.alpha = 1;

    }

    update() {

        this.x += this.speed;
        this.y += this.speed * 0.25;

        this.alpha -= 0.003;

    }

    draw() {

        ctx.beginPath();

        ctx.moveTo(this.x, this.y);

        ctx.lineTo(
            this.x - this.length,
            this.y - this.length * 0.25
        );

        ctx.strokeStyle = `rgba(255,255,255,${this.alpha})`;

        ctx.lineWidth = 2;

        ctx.shadowBlur = 20;
        ctx.shadowColor = "white";

        ctx.stroke();

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

function updateShootingStars() {

    for (let i = shootingStars.length - 1; i >= 0; i--) {

        shootingStars[i].update();

        if (
            shootingStars[i].alpha <= 0 ||
            shootingStars[i].x > canvas.width + 200
        ) {

            shootingStars.splice(i, 1);

        }

    }

}

function drawShootingStars() {

    for (const star of shootingStars) {

        star.draw();

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

            setTimeout(() => {

                setInterval(() => {

                    if (Math.random() < 0.8) {

                        shootingStars.push(
                            new ShootingStar()
                        );

                    }

                }, 3000);

            }, 5000);

        },3000);

    }, 1000);

});