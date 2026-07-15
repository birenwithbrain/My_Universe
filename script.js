const intro = document.getElementById("intro");
const loader = document.getElementById("loader");

const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");

const overlay = document.getElementById("overlay");
const startBtn = document.getElementById("startBtn");

// const spaceMusic = new Audio("D:\\Programming\\WebDev\\Fun_Projects\\My_Universe\\assets\\ambient-space.mp3");
const spaceMusic = new Audio("assets\\ambient-space.mp3");

spaceMusic.loop = true;
spaceMusic.volume = 0;

const loadingSteps = [
    "Initiating Process...",
    "Initializing Quantum Field...",
    "Collecting Cosmic Dust...",
    "Creating Gravity Wells...",
    "Igniting First Stars...",
    "Universe Ready."
];

const loaderTitle = document.getElementById("loaderTitle");
const loaderFill = document.getElementById("loaderFill");
const loaderPercent = document.getElementById("loaderPercent");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerStar.x = canvas.width / 2;
    centerStar.y = canvas.height / 2;

    nebulae[0].x = canvas.width * 0.35;
    nebulae[0].y = canvas.height * 0.45;

    nebulae[1].x = canvas.width * 0.65;
    nebulae[1].y = canvas.height * 0.55;
});

let centerStar = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 3,
    visible: false,
    pulse: 0,
    energy: 0
};

function fadeMusicIn(){

    let volume = 0;

    const fade = setInterval(()=>{

        volume += 0.01;

        spaceMusic.volume = Math.min(volume,0.25);

        if(volume >= 0.25){

            clearInterval(fade);

        }

    },120);

}

function startUniverse(){

    overlay.style.transition = "opacity 1.5s ease";

    overlay.style.opacity = "0";

    setTimeout(()=>{

        overlay.style.display = "none";

        beginUniverse();

    },1500);

    
}

function beginUniverse(){

    centerStar.visible = true;
    centerStar.radius = 3;

    const charge = setInterval(()=>{

        centerStar.energy += 0.03;

        if(centerStar.energy >= 1){

            centerStar.energy = 1;
            clearInterval(charge);

        }

    },30);

}


function changeLoaderText(text){

    loaderTitle.style.opacity = "0";

    setTimeout(() => {

        loaderTitle.textContent = text;

        loaderTitle.style.opacity = "1";

    },300);

}



const loadingMilestones = [
    { percent: 0, text: "Initializing Quantum Field..." },
    { percent: 28, text: "Collecting Cosmic Dust..." },
    { percent: 56, text: "Creating Gravity Wells..." },
    { percent: 82, text: "Igniting First Stars..." },
    { percent: 100, text: "Universe Ready." }
];

function runLoader(){

    let progress = 0;
    let currentStep = 0;

    const interval = setInterval(()=>{

        progress++;

        loaderFill.style.width = progress + "%";
        loaderPercent.textContent = progress + "%";

        if(
            currentStep < loadingMilestones.length &&
            progress >= loadingMilestones[currentStep].percent
        ){

            changeLoaderText(
                loadingMilestones[currentStep].text
            );

            currentStep++;

        }

        if(progress >= 100){

            clearInterval(interval);

            setTimeout(startUniverse,1000);

        }

    },55);

}



function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ctx.fillStyle = "rgba(2,4,12,0.015)";
    ctx.fillStyle = "#02040F";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawNebula();
    drawShockwave();

    if (centerStar.visible) {

        ctx.save();

        let pulseSpeed = 0.05;

        if (centerStar.energy > 0.8) {

            pulseSpeed = 0.12;

        }

        centerStar.pulse += pulseSpeed;

        const r =

            centerStar.radius +

            centerStar.energy * 4 +

            Math.sin(centerStar.pulse) * 0.5;

        let glow =

            30 +

            centerStar.energy * 120 +

            Math.sin(centerStar.pulse) * 20;

        if (centerStar.energy > 0.8) {

            glow += Math.random() * 40;

        }

        ctx.beginPath();

        let shakeX = 0;
        let shakeY = 0;

        if (centerStar.energy > 0.4) {

            const intensity =
                (centerStar.energy - 0.4) * 20;

            shakeX =
                (Math.random() - 0.5) * intensity;

            shakeY =
                (Math.random() - 0.5) * intensity;


            // shakeX = (Math.random() - 0.5) * 7;
            // shakeY = (Math.random() - 0.5) * 7;

        }

        ctx.arc(
            centerStar.x + shakeX,
            centerStar.y + shakeY,
            r,
            0,
            Math.PI * 2
        );

        // ctx.fillStyle = "#ffffff";
        ctx.fillStyle =
            centerStar.energy > 0.8
                ? "#FFFFFF"
                : "#F8FBFF";
                
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = glow;
        ctx.fill();
        ctx.beginPath();

        ctx.arc(
            centerStar.x + shakeX,
            centerStar.y + shakeY,
            r * (4 + centerStar.energy * 4),
            0,
            Math.PI * 2
        );


        ctx.shadowBlur = 0;
        ctx.shadowColor = "transparent";
        
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.fill();

        if (
            centerStar.energy >= 1 &&
            !explosionTriggered
        ) {

            explosionTriggered = true;

            flashAlpha = 1;

            shockwave.active = true;
            shockwave.radius = 12;
            shockwave.alpha = 1;

            setTimeout(() => {

                centerStar.visible = false;
                // creatingUniverse = true;
                // createExplosion();
                createExplosion();

                setTimeout(() => {

                    creatingUniverse = true;
                    galaxyForming = true;

                }, 100);


                setTimeout(() => {

                    setInterval(() => {

                        if (Math.random() < 0.8) {

                            shootingStars.push(
                                new ShootingStar()
                            );

                        }

                    },3000);

                },5000);

                setTimeout(() => {

                    showMessage = true;

                    welcomeY = canvas.height * 0.90;

                    universeScale = 1;
                    showQuotes = false;

                    setTimeout(() => {

                        hideTo = true;

                        setTimeout(() => {

                            showQuotes = true;

                        },700);

                    },4000);

                    setTimeout(() => {

                        showSubtitle = true;

                    },6500);

                    welcomeX = canvas.width / 2;

                },12000);

            },120);

        }

        ctx.restore();

    }


    updateParticles();
    // if (creatingUniverse) {
    if (galaxyForming) {

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
    gradient.addColorStop(1, "rgba(0,0,0,0.04)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (flashAlpha > 0) {

        ctx.fillStyle = `rgba(255,255,255,${flashAlpha})`;

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        flashAlpha *= 0.88;

    }

    if (showMessage) {

        console.log(hideTo, toOpacity);

        messageOpacity += 0.003;

        if (hideTo) {

            if (toOpacity > 0) {

                // toOpacity -= 0.03;
                toOpacity = Math.max(0, toOpacity - 0.03);

            }

            const targetY = canvas.height * 0.83;

            welcomeY +=
                (targetY - welcomeY) * 0.05;

            universeScale +=
                (1.5 - universeScale) * 0.05;

        }

        if(showQuotes){

            quoteOpacity += 0.03;

        }

        if (messageOpacity > 1)
            messageOpacity = 1;

        ctx.save();

        ctx.globalAlpha = messageOpacity;

        ctx.fillStyle = "#FFFFFF";

        ctx.textAlign = "center";

        // ctx.font = "48px Georgia";
        const titleSize =
            Math.min(canvas.width * 0.08, 48);

        ctx.font = `${titleSize}px Georgia`;

        // ctx.fillText(
        //     "Welcome",
        //     canvas.width / 2,
        //     // canvas.height * 0.80
        //     // welcomeY
        // );

        ctx.save();

        // if (!hideTo) {
        ctx.globalAlpha = messageOpacity * toOpacity;

        ctx.fillText(
            "Welcome to",
            canvas.width / 2,
            canvas.height * 0.85
        );

        // }

        ctx.restore();

        // const titleSize2 =
        //     Math.min(canvas.width * 0.5, 48);

        // ctx.font = `${titleSize2}px Georgia`;

        const baseSize =
            Math.min(canvas.width * 0.08,48);

        ctx.font =
        `${baseSize * universeScale}px Georgia`;

        ctx.fillText(
            // "My Universe",
            showQuotes
                ? "“My Universe”"
                : "My Universe",
            canvas.width / 2,
            // canvas.height * 0.90
            welcomeY
        );

        if(showSubtitle){

            subtitleOpacity += 0.02;

            if(subtitleOpacity > 1)
                subtitleOpacity = 1;

        }

        // ctx.font = "20px Georgia";
        const subtitleSize =
            Math.min(canvas.width * 0.05, 20);

        ctx.font = `${subtitleSize}px Georgia`;

        ctx.save();

        ctx.globalAlpha = subtitleOpacity;

        ctx.fillStyle = "rgba(255,255,255,0.75)";

        ctx.fillText(
            "The journey has just begun.",
            canvas.width / 2,
            canvas.height * 0.95
        );

        ctx.restore();

        ctx.restore();

    }

    requestAnimationFrame(draw);
}

let creatingUniverse = false;
let galaxyForming = false;
let explosionTriggered = false;
let flashAlpha = 0;
let shockwave = {
    active: false,
    radius: 0,
    alpha: 0
};
let galaxyRotation = 0;
let particles = [];
let shootingStars = [];
let showMessage = false;
let quoteOpacity = 0;
let messageOpacity = 0;
let universeOpacity = 1;
let universeScale = 1;
let showQuotes = false;

let showSubtitle = false;
let subtitleOpacity = 0;

let hideTo = false;

let toOpacity = 1;

let welcomeX = 0;
let welcomeY = 0;

let nebulae = [
    {
        x: canvas.width * 0.35,
        y: canvas.height * 0.45,
        radius: 280,
        // color: "110,70,255",
        color: "139,92,246",
        offset: 0
    },
    {
        x: canvas.width * 0.65,
        y: canvas.height * 0.55,
        radius: 320,
        color: "70,170,255",
        // color: "88,246,255",
        offset: Math.PI
    }
];

class Particle {

    constructor() {

        this.x = centerStar.x;
        this.y = centerStar.y;

        this.prevX = this.x;
        this.prevY = this.y;

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

            "#67e8f9",

            "#c4b5fd",

            "#FFE7A3"

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

        // if (!creatingUniverse) return;
        if (!centerStar.visible && !galaxyForming) return;

        this.prevX = this.x;
        this.prevY = this.y;

        this.x += this.vx;
        this.y += this.vy;

        this.vx *= 0.992;
        this.vy *= 0.992;

        this.distance = Math.hypot(
            this.x - centerStar.x,
            this.y - centerStar.y
        );

        // if (
        //     Math.abs(this.vx) +
        //     Math.abs(this.vy)
        //     < 0.2
        // ) {

        if (
            galaxyForming &&
            Math.abs(this.vx) +
            Math.abs(this.vy) < 0.2
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

        ctx.save();

        this.twinkle += 0.05;

        const brightness =
            0.5 +
            Math.sin(this.twinkle) * 0.5;

        if (!galaxyForming) {

            ctx.beginPath();

            const trailX = this.x - this.vx * 6;
            const trailY = this.y - this.vy * 6;

            ctx.moveTo(trailX, trailY);
            ctx.lineTo(this.x, this.y);

            ctx.strokeStyle =
                `rgba(255,255,255,0.15)`;

            ctx.lineWidth = 1;

            ctx.shadowBlur = 6;
            ctx.shadowColor = this.color;

            ctx.stroke();

        }
        
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

        ctx.restore();

    }

}

class ShootingStar {

    constructor() {

        this.x = -100;
        this.y = Math.random() * canvas.height * 0.5;

        this.speed = 10 + Math.random() * 4;

        this.length = 220;

        this.alpha = 1;

    }

    update() {

        this.x += this.speed;
        this.y += this.speed * 0.25;

        this.alpha -= 0.003;

    }

    draw() {

        ctx.save();

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
        ctx.restore();

    }

}

function drawNebula() {

    ctx.save();

    for (const nebula of nebulae) {

        nebula.offset += 0.002;

        const x =
            nebula.x +
            Math.sin(nebula.offset) * 40;

        const y =
            nebula.y +
            Math.cos(nebula.offset) * 40;

        const gradient =
            ctx.createRadialGradient(
                x,
                y,
                0,
                x,
                y,
                nebula.radius
            );

        gradient.addColorStop(
            0,
            `rgba(${nebula.color},0.15)`
        );

        gradient.addColorStop(
            0.45,
            `rgba(${nebula.color},0.08)`
        );

        gradient.addColorStop(
            1,
            `rgba(${nebula.color},0)`
        );

        ctx.fillStyle = gradient;

        ctx.fillRect(
            x - nebula.radius,
            y - nebula.radius,
            nebula.radius * 2,
            nebula.radius * 2
        );

    }
    ctx.restore();

}

function drawShockwave() {

    if (!shockwave.active) return;

    ctx.save();

    ctx.beginPath();

    ctx.arc(
        centerStar.x,
        centerStar.y,
        shockwave.radius,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle =
        `rgba(255,255,255,${shockwave.alpha})`;

    ctx.lineWidth = 3;

    ctx.shadowBlur = 25;
    ctx.shadowColor = "white";

    ctx.stroke();

    ctx.restore();

    shockwave.radius += 18;

    shockwave.alpha *= 0.94;

    if (shockwave.alpha < 0.02) {

        shockwave.active = false;

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


startBtn.addEventListener("click",()=>{

    intro.classList.remove("active");
    loader.classList.add("active");

    spaceMusic.play();
    fadeMusicIn();

    runLoader();

});