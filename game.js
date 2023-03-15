const canvas = document.querySelector('#game');
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRigth = document.querySelector('#rigth');


const game = canvas.getContext('2d');
const playerPosition = {
    x:undefined,
    y:undefined,
}
const matafuegoPosition ={
    x:undefined,
    y:undefined,
}

let fuegoPosiciones=[];


let cuadrado;
let elementSize;
let nivel = 0;
let vidas = 3;


window.addEventListener('load',canvasSize);
window.addEventListener('resize',canvasSize);
window.addEventListener('keydown',moveByKey);

btnDown.addEventListener('click',moveDown);
btnUp.addEventListener('click',moveUp);
btnLeft.addEventListener('click',moveLeft);
btnRigth.addEventListener('click',moveRigth);

function canvasSize (){

    if (window.innerHeight>window.innerWidth){
        cuadrado = window.innerWidth*0.75;
       // console.log(cuadrado + ' A alto superior');
    } else{
        cuadrado = window.innerHeight*0.75;
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
  elementSize = (cuadrado /10);
  
  fuegoPosiciones=[];

  game.font = (elementSize-9) + 'px Verdana';
  game.textAlign='end';
  
  let map = maps[nivel];////////////////////////////////


  if(!map){
    gameWin();
    return;
    }



  const mapRows= map.trim().split('\n');
  const mapRowCol=mapRows.map(row=>row.trim().split(''));

  game.clearRect(0,0,cuadrado,cuadrado);  

  mapRowCol.forEach((row,IndexRow) => {
    row.forEach((col,indexCol)=>{
        let llaveEmoji = col;
        let renderEmoji = emojis[llaveEmoji];
        let posicionY= (elementSize-1)*(IndexRow+1);
        let posicionX=(elementSize-1)*(indexCol+1);

        game.fillText(renderEmoji, posicionX, posicionY); 

        if(llaveEmoji=='O'){
            if( playerPosition.x == undefined && playerPosition.y == undefined){
                playerPosition.x=posicionX;
                playerPosition.y=posicionY;
                //console.log('la posicion y es '+playerPosition.y);                
            }      
        }
        else if(llaveEmoji=='I'){
            matafuegoPosition.x=posicionX;
            matafuegoPosition.y=posicionY;
        }
        else if(llaveEmoji=='X'){
            let cordenadax=Number(posicionX);
            let cordenaday=Number(posicionY);

            fuegoPosiciones.push({
                x:cordenadax,
                y:cordenaday,                
            });

        }
        
            

    }             )       }); 
    /////////////////////////////////////////////lo mismo que hacen los for each
    //  for (let i = 1; i <=10; i++) {
    //  for (let j = 1; j <=10; j++) {
    //        let iconoLlave = mapRowCol[i-1][j-1]
    //        game.fillText( emojis[iconoLlave] , (elementSize-1) * j  , (elementSize-1) * i);       
    //    }    
    //  } 
    movePlayer(); 
}

function gameWin(){
    console.log('fin');
    return;
}

function movePlayer(){

    let cordenaday= Number (playerPosition.y);
    let cordenadax= Number (playerPosition.x);
    
    
    let matafuegox= matafuegoPosition.x == cordenadax;
    let matafuegoy= matafuegoPosition.y == cordenaday;
    let matafuegoAlcanzado = matafuegox && matafuegoy;
    
   

    let colicion = fuegoPosiciones.find(fuego=>{
        let fuegoX = fuego.x==cordenadax;
        let fuegoY = fuego.y == cordenaday;
        //console.log('cordenaday'+cordenaday.toFixed(0)+ 'fuego y'+ fuego.y.toFixed(0) );
       // console.log('cordenadax'+cordenadax.toFixed(0)+ 'fuego x'+ fuego.x.toFixed(0) );
        return fuegoX && fuegoY;
    });

    if (colicion){perderUnaVida();}; 
    if(matafuegoAlcanzado){nivelSuperado(); }

    //console.log('x = '+playerPosition.x);
    //console.log('y = '+playerPosition.y);  

    game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y) 

}

function perderUnaVida(){

    if(vidas<=0){
        nivel=0;
        vidas=3;
    }
    vidas--;
    playerPosition.x=undefined;
    playerPosition.y=undefined;
    startGame();

}

function nivelSuperado (){

    nivel=nivel+1;
    startGame();
    
    
}

function moveByKey (event){
   // console.log(event)

    if (event.code == 'ArrowDown') moveDown();
    if (event.code == 'ArrowUp') moveUp();
    if (event.code == 'ArrowRight') moveRigth();
    if (event.code == 'ArrowLeft') moveLeft();

    if (event.key == 's' || event.key == 'S' ) moveDown();
    if (event.key == 'w' || event.key == 'W' ) moveUp();
    if (event.key == 'd' || event.key == 'D' ) moveRigth();
    if (event.key == 'a' || event.key == 'A' ) moveLeft();
}

function moveDown (){
    console.log('abajo');

    const limite = (elementSize-1) * 10;

    if (playerPosition.y<limite) {playerPosition.y += (elementSize-1)}

    startGame();
}
function moveUp (){
    console.log('arriba');

    if (playerPosition.y-(elementSize-1)>=(elementSize-1)) {playerPosition.y -= (elementSize-1)}

    startGame();
   
}
function moveLeft (){
    console.log('izquierda');

    if (playerPosition.x-(elementSize-1)>=(elementSize-1)) {playerPosition.x -= (elementSize-1)}

    startGame();

}
function moveRigth (){
    console.log('derecha');
    const limite = (elementSize-1) * 10;

    if (playerPosition.x<limite) {playerPosition.x += (elementSize-1)}

    startGame();
}