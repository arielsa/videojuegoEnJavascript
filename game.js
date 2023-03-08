const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');    

let cuadrado;
let elementSize;


window.addEventListener('load',canvasSize);
window.addEventListener('resize',canvasSize);

function canvasSize (){

    if (window.innerHeight>window.innerWidth){
        cuadrado = window.innerWidth*0.8;
       // console.log(cuadrado + ' A alto superior');
    } else{
        cuadrado = window.innerHeight*0.8;
        //console.log(cuadrado + ' B ancho superior');
    }
    canvas.setAttribute('width',cuadrado);
    canvas.setAttribute('height',cuadrado);

    startGame();    
    /*
    let ancho = window.innerWidth * 0.75;
    let alto = window.innerHeight * 1;
    console.log('ancho:'+ancho);
    console.log('alto'+alto);
    console.log('....');
    //si el ancho es superior al alto remplazar ancho por alto y viceversa
    if(ancho>alto){ancho=alto}
    if(alto>ancho){alto=ancho}
    if (alto == ancho ){
        canvas.setAttribute('width',ancho);
        canvas.setAttribute('height',alto);
        console.log('ancho nuevo:'+ancho);
        console.log('alto nuevo '+alto);
        console.log('....');
    }*/

}
function startGame (){
   // game.fillRect(0,0,100,50)    
  elementSize = (cuadrado /10)-1;

  game.font = elementSize + 'px Verdana';
  game.textAlign='';  

  for (let i = 0; i < 10; i++) {
    game.fillText(emojis.W, elementSize * i , elementSize);    
  }       
}

