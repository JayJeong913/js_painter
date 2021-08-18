

const canvas = document.getElementById("jsCanvas");         // 캔버스
const ctx = canvas.getContext("2d");                        // 캔버스의 context
const range = document.getElementById("jsRange");           // 붓 크기
const mode = document.getElementById("jsMode");             // fill 버튼
const saveBtn = document.getElementById("jsSave");          // save 버튼
const colors = document.getElementsByClassName("jsColor");  // 컬러 선택

const CANVAS_WIDTH = 700;                                   // 캔버스 너비
const CANVAS_HEIGHT = 500;                                  // 캔버스 폭

const INITIAL_COLOR = "#2c2c2c";                            // 디폴트 컬러 ... 블랙

let painting = false;                                       // 선 그리기 flag
let filling = false;                                        // 색 채우기 flag

canvas.width = CANVAS_WIDTH;                                // canvas element는 별도로 width, height를 지정해줘야함
canvas.height = CANVAS_HEIGHT;                              //

ctx.fillStyle = "white";                                    // 저장시 png로 저장되는것을 방지하기 위해 하얀색 배경을 설정
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);            // 

ctx.strokeStyle = INITIAL_COLOR;                            // 선 컬러
ctx.fillstyle = INITIAL_COLOR;                              // 채우기 컬
ctx.lineWidth = 2.5;                                        // 선의 굵기 조절

///////////////////////////////////////////////////////////////////////////////////////////

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

function handleCanvasClick(){
    
    if(filling){
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);        // context.fillRect(X좌표, Y좌표, width, height)를 fillStyle의 컬러로 채운다.
    }
}

function handleRightClick(event){   // 우클릭으로 저장하지 않도록, 우클릭했을 때 무반응처리
    event.preventDefault();
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

    // click ... 
    canvas.addEventListener("click",handleCanvasClick);

    // contextment : 캔버스에서 우클릭 했을 때 표시되는 기능
    canvas.addEventListener("contextmenu",handleRightClick);
}

///////////////////////////////////////////////////////////////////////////////////////////

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
}

// Array.from() : argument를 받아서 array로 반환
// Array.from()으로 반환받은 array의 각각의 아이템(color)에 대해 
// click 이벤트 발생했을 때 handleColroClick이라는 function을 호출할 수 있도록 foreach 처리
Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));

///////////////////////////////////////////////////////////////////////////////////////////

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

if(range){
    range.addEventListener("input",handleRangeChange);
}

///////////////////////////////////////////////////////////////////////////////////////////

function handleModeClick(event){
    
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint"
    }
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

///////////////////////////////////////////////////////////////////////////////////////////

function handleSaveBtnClick(event){

    // 캔버스의 데이터를 읽어와서 url로 반환해준다.
    // const image = canvas.toDataURL("image/jpeg"); ... jpeg로도 가능, 디폴트는 png
    const image = canvas.toDataURL(); 

    // 해당 url을 다운로드 받을 a 태그를 만든다. 
    const link = document.createElement("a");
    link.href = image;  // href에는 이미지의 링크를 넣는다.
    link.download = "image";  // download는 다운로드할 이미지의 이름을 넣는다. 확장자명을 넣으면 확장자로 저장됨
    
    // 다운로드 링크를 클릭하게 처리 함
    link.click();
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveBtnClick);
}
