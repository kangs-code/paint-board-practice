const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const drawWidth = document.querySelector("#line-width")
const observeColor = document.querySelector("#color-observe")
const colorObtion = Array.from(document.getElementsByClassName("color-option"))
const modeBtn = document.querySelector("#mode-change")
const destroy = document.querySelector("#destroy")
const eraser = document.querySelector("#eraser")



canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = drawWidth.value;

let isPainting = false;
let isFilling = false;


function drawingEvent(e){
    if(isPainting){
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
    else{
        ctx.moveTo(e.offsetX, e.offsetY);
    }
}
function startDrawingEvent(){
    isPainting = true;
}
function endDrawingEvent(){
    isPainting = false;
}
function changeWidth(e){
    ctx.beginPath();
    ctx.lineWidth = e.target.value;
}
function observeColorEvent(e){
    ctx.beginPath();
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
}
function chooseColorEvent(e){
    ctx.beginPath();
    ctx.strokeStyle = e.target.dataset.color;
    ctx.fillStyle = e.target.dataset.color;
    observeColor.value = e.target.dataset.color;
}
function modeChangeEvent(){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill";
    }
    else{
        isFilling = true;
        modeBtn.innerText = "Draw"
    }
}
function fillEvent(){
    if(isFilling){
        ctx.beginPath();
        ctx.fillRect(0,0,800,800)
    }
}
function destroyEvent(){
    ctx.beginPath();
    ctx.fillStyle = "white"
    ctx.fillRect(0,0,800,800)
    isFilling = false;
    modeBtn.innerText = "Fill";
}
function eraserEvent(){
    ctx.beginPath();
    ctx.strokeStyle = "white"
    isFilling = false
}


canvas.addEventListener("mousemove", drawingEvent)
canvas.addEventListener("mousedown", startDrawingEvent)
canvas.addEventListener("mouseup", endDrawingEvent)
canvas.addEventListener("mouseleave", endDrawingEvent)
canvas.addEventListener("click", fillEvent)
drawWidth.addEventListener("change", changeWidth)
observeColor.addEventListener("change", observeColorEvent)
colorObtion.forEach((color)=>color.addEventListener("click", chooseColorEvent))
modeBtn.addEventListener("click", modeChangeEvent);
destroy.addEventListener("click", destroyEvent)
eraser.addEventListener("click", eraserEvent)
