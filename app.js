const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const changeLineWidth = document.querySelector("#line-width")
const observeColor = document.querySelector("#color")
const chooseColor = Array.from(document.getElementsByClassName("color-option"))
const modeChange = document.querySelector("#mode-change")
const eraser = document.querySelector("#eraser")
const destroy = document.querySelector("#destroy")


canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = changeLineWidth.value



let isPainting = false;
let isFilling = false;


function drawingEvent(e){
    if(isPainting){
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.stroke();
    }
    else{
        ctx.moveTo(e.offsetX, e.offsetY)
    }
}
function startDrawEvent(){
    isPainting = true;
}
function endDrawEvent(){
    isPainting = false;
}
function lineWidthChange(e){
    ctx.beginPath();
    ctx.lineWidth = e.target.value;
}
function colorObserveEvent(e){
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
        modeChange.innerText = "채우기"
        isFilling = false;
        ctx.fillRect(0,0,800,800)
    }
    else{
        modeChange.innerText = "선"
        isFilling = true;
    }

}
function fillingEvent(){
    if(isFilling){
        ctx.fillRect(0,0,800,800)
    }
}

function eraseEvent(){
    ctx.beginPath();
    ctx.strokeStyle = "white";
    isFilling = false;
    modeChange.innerText = "채우기"
}
function destroyEvent(){
    ctx.beginPath();
    ctx.fillStyle = "white"
    ctx.fillRect(0,0,800,800)
    
}


canvas.addEventListener("mousemove", drawingEvent)
canvas.addEventListener("mousedown", startDrawEvent)
canvas.addEventListener("click", fillingEvent)
canvas.addEventListener("mouseup", endDrawEvent)
canvas.addEventListener("mouseleave", endDrawEvent)
changeLineWidth.addEventListener("change", lineWidthChange)
observeColor.addEventListener("change", colorObserveEvent)
chooseColor.forEach((color)=>{color.addEventListener("click", chooseColorEvent)})
modeChange.addEventListener("click", modeChangeEvent)
eraser.addEventListener("click", eraseEvent);
destroy.addEventListener("click", destroyEvent)