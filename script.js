const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});

const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {

    console.log("Universe Creation Started");

});