

const canvas = document.getElementById("jsCanvas");
canvas.width = 700; // canvas element는 별도로 width, height를 지정해줘야함
canvas.height = 500;

const colors = document.getElementsByClassName("jsColor");

const ctx = canvas.getContext("2d");

ctx.strokeStyle = "#2c2c2c";   // 컬러
ctx.lineWidth = 2.5;    // 선의 굵기 조절

let painting = false; // 그림 그리기의 시작과 끝에 대한 flag

// 캔버스 안에서 마우스 클릭 -> 그림 그리기 시작
// 캔버스 안에서 마우스 클릭 해제 -> 그림 그리기 종료
// 캔버스 밖으로 마우스 이동 -> 그림 그리기 종료

function stopPainting(){
    painting = false;
}

function stargPainting(){
    painting = true;
}

function onMouseMove(event){

    const x = event.offsetX;
    const y = event.offsetY;

    // painting은 디폴트가 false이므로,  클릭이 되어 true가 되면 그리기가 시작된다.
    // 그래서 우선은 보이지 않지만, painting이 false일 때 시작점을 계속 가지고 있다가 ... beginPath(), moveTo()
    // 캔버스 위에서 클릭을 하여 painting이 true가 되는 순간,
    // 시작점과 클릭을 한 해당 위치의 끝점에 선을 채운다. ... lintTo(), stroke()

    if(!painting){
        ctx.beginPath(); // 선을 그려줌, 선의 시작점을 만든다 ... paht는 기본적인 선을 말함
        ctx.moveTo(x,y); // 선에서 왼쪽 끝 점의x는 영역의 왼쪽부터의 거리, y는 영역 위에서부터의 거리
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();   // 현재의 strokestyle로 선을 긋는다.
    }

}

if(canvas){

    // mousermove : 마우스의 움직임 감지
    canvas.addEventListener("mousemove", onMouseMove);
    
    // mouserdown : 클릭된 마우스의 움직임 감지
    canvas.addEventListener("mousedown", stargPainting);

    // mouserdown : 클릭이 해제되는 마우스의 움직임 감지
    canvas.addEventListener("mouseup", stopPainting);

    // mouseleave : 특정 영역에서 마우스가 존재하지 않는 것을 감지
    canvas.addEventListener("mouseleave", stopPainting);

}

function handleColroClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    console.log(ctx.strokeStyle);
}

// Array.from() : argument를 받아서 array로 반환
// Array.from()으로 반환받은 array의 각각의 아이템(color)에 대해 
// click 이벤트 발생했을 때 handleColroClick이라는 function을 호출할 수 있도록 foreach 처리
Array.from(colors).forEach(color => color.addEventListener("click",handleColroClick));