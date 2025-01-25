const gameboard=document.querySelector("#gameboard")
const scoreE=document.querySelector("#score")
const highscoreE=document.querySelector("#highscore")

let gameover=false
let fx,fy
let sbody=[]
let sx=15,sy=15
let dx=0,dy=0
let interid
let score=0
let Highscore=localStorage.getItem("high-score")||0
highscoreE.innerHTML=`HighScore: ${Highscore}`

const changeFoodPosition=()=>{
    fx=Math.floor(Math.random()*30)+1
    fy=Math.floor(Math.random()*30)+1
}
const handlegameover=()=>{
    clearInterval(interid)
    alert("Game Over, click to Restart...")
    location.reload()
}
const change=(x)=>{
    if(x=="Up" && dy!=1){
        dx=0
        dy=-1
    }else if(x=="Down" && dy!=-1){
        dx=0
        dy=1
    }else if(x=="Left" && dx!=1){
        dx=-1
        dy=0
    }else if(x=="Right" && dx!=-1){
        dx=1
        dy=0
    }
}
const directionchange =(e)=>{
    if(e.key=="ArrowUp" && dy!=1){
        dx=0
        dy=-1
    }else if(e.key=="ArrowDown" && dy!=-1){
        dx=0
        dy=1
    }else if(e.key=="ArrowLeft" && dx!=1){
        dx=-1
        dy=0
    }else if(e.key=="ArrowRight" && dx!=-1){
        dx=1
        dy=0
    }

}
const game=()=>{
    if (gameover) return handlegameover()

    let sf=`<div class="rounded rounded-5" style="grid-area: ${fy}/${fx}; background-color:rgb(254, 5, 5);"></div>` 

    
 if(sx==fx&&sy==fy){
    changeFoodPosition()
    sbody.push([fx,fy])
    score++
    scoreE.innerHTML=`Score: ${score}`
    Highscore= (score>=Highscore)? score : Highscore
    localStorage.setItem("high-score",Highscore)
    highscoreE.innerHTML=`HighScore:${Highscore}`
 }
 sx+=dx
 sy+=dy
 for(let i=sbody.length-1;i>0;i--){
    sbody[i]=sbody[i-1]
 }
 sbody[0]=[sx,sy]

 if(sx<=0||sx>30||sy<=0||sy>30){
    return gameover=true
    
 }
 


 for(i=0;i<sbody.length;i++){
 sf+=`<div style="grid-area: ${sbody[i][1]}/${sbody[i][0]}; background-color:rgb(22, 196, 127);"></div>`
 if (i!==0 && sbody[0][1]==sbody[i][1] && sbody[0][0]==sbody[i][0]) {
    gameover=true
 }
 }
 gameboard.innerHTML=sf
}
changeFoodPosition()
interid=setInterval(game,125)
document.addEventListener("keydown",directionchange)
