//import * as actions from '../../store/actions/exporter';
//
//import {connect} from 'react-redux';

import $ from 'jquery';

//window.orcStatus=true; //if you create this variable you are able to access it in components, but the downside is that anyone could access this global variable in the console. This isn't React state either so you would have to change state to trigger rerendering.


//export const nameMe=()=>{ //removed this code to be handeled in the startBox component
//    
//    let myName=prompt('What is your name?');
//    let weapon=prompt(`What weapon do you use? Choose: Hammer||Sword||Axe||Spear`);
//    
//    if(weapon!==null){
//        
//        weapon=weapon.toLowerCase();
//    }
//    
//    if(myName===null){
//       myName='Anonym'; 
//    }
//    
//    if(weapon===null){
//        
//        weapon='stick';
//    }
//    
//    return {name: myName, weapon: weapon};
//}


export const stopMusic=()=>{
    
    const audios=document.querySelectorAll("audio");
    
        for (var i = 0; i < audios.length; i++) {
              if(audios[i].play){ //notice that the condition doesn't need to be audios[i].play(), like I used in the other game project. Actually this was giving me an error in React (still worked, but it complained that I tried to play music before user action...browsers have a policy nowadays that autoplaying music isn't acceptable before some kind of a user input)
                audios[i].pause();
              }
            }
}


export const playMusic=(id)=>{
    
    const tune=document.getElementById(id);
    tune.play();
    tune.loop = true;
    
}



class Player{
    
    constructor(data){
        
        this.name='';
        this.weapon='';
        this.health=100;
        this.maxHealth=100;
        this.power=0;
        this.accuracy=0;
        this.shield=3;
        this.stamina=24;
        this.maxStamina=24;
        this.xp=0;
        this.money=10;
        this.dead=false;
        this.level=1;
        this.inventory=[];
        this.inventorySize=5;
        this.riddles=[];
        this.equipped=[];
        this.storeInitPower='';
        this.storeInitAccuracy='';
        this.stage='main'; //default needs to be set like this so that startBox doesn't appear nowhere else than in the main menu
        this.enemies=[];
        this.prevStage='';
        this.foundItems=[];
        this.movingInit=false;
        this.playerWon=false;
        this.enemyRemaining=null;
        this.locked=false;
        this.messages=[];
        this.wrongAnswer=false;
        this.inShop=false;
        this.enemyStaminaRemaining=null;
        this.prevVisitedPage='';
        this.closeInfoBox= false; //made this to be able to close infoboxes when moving out of the area...like in level 4... this is needed for mobile mode, in pc mode the closing is handeled with level states
    }
    
    newGameInit(){
        
        if(player.weapon==='hammer'){
            
            if(player.power>12){
                
                player.power=12;
            }
        }
         if(player.weapon==='axe'){
            
              if(player.power>9){
                
                player.power=9;
            }
            
        }
         if(player.weapon==='sword'){
            
              if(player.power>10){
                
                player.power=10;
            }
            
        }
         if(player.weapon==='spear'){
            
              if(player.power>8){
                
                player.power=8;
            }
            
        }
    }
    
    attack(enemy){
        
        
        if(this.playerWon){
            
             this.playerWon=false;
        }
        
  
        
        let enemyDamage=((enemy.power*Math.random())-(this.shield*Math.random())).toFixed(2);
        
        if(enemyDamage<0){
            enemyDamage=0;
        }
        
        let playerDamage=(this.power*Math.random()).toFixed(2);
        
        let accuracy=this.accuracy*Math.random();
        
        let enemySpeedStaminaEffect=( (enemy.speed*enemy.stamina)*(Math.random() ) )/10;
        
        accuracy=accuracy-enemySpeedStaminaEffect;
        
        if(accuracy<0.9){
            
            playerDamage=0;
        }
        
        const hitOrMiss=playerDamage>0? `${playerDamage}` : 'no (miss)';
        
        
        const enemyRe=enemy.health-playerDamage;
        
        this.enemyRemaining=enemyRe;
        
        this.health=this.health-enemyDamage;
        
        if(this.enemyStaminaRemaining!==null && this.enemyStaminaRemaining>0){
           
            this.enemyStaminaRemaining=enemy.stamina-1;
           }
   
        
        if(this.health<=0){
            
            const enemyHtml=`${enemy.name} killed you!`;
            $('#attackBox').html(enemyHtml);
            
            this.dead=true;
            return;
        }
        
        
        if(enemyRe>0){
            
//            const enemyText=`${enemy.name} attacked you. ${this.name} attacked with ${this.weapon} and dealt ${hitOrMiss} damage, ${enemy.name} is still alive and has ${enemyRemaining.toFixed(2)}hp left. Enemy dealt ${enemyDamage} damage to you. You have ${this.health.toFixed(2)} health left`;
            
            const enemyHtml=`${enemy.name} attacked you. ${this.name} attacked with ${this.weapon} and dealt <span style='color:red'><strong>${hitOrMiss}</strong></span> damage, ${enemy.name} is still alive and has <span style='color:#ff6633'><strong>${enemyRe.toFixed(2)}hp</strong></span> left. Enemy dealt <span style='color:#802000'><strong>${enemyDamage} damage</strong></span> to you. You have <span style='color:lime'><strong>${this.health.toFixed(2)} health</strong></span> left.`;
            
//           $('#attackBox').text(enemyText);
            
            $('#attackBox').html(enemyHtml);
            
            
            
//            alert(`${enemy.name} attacked you. ${this.name} attacked with ${this.weapon} and dealt ${hitOrMiss} damage, ${enemy.name} is still alive and has ${enemyRemaining.toFixed(2)}hp left. Enemy dealt ${enemyDamage} damage to you. You have ${this.health.toFixed(2)} health left`);
     
            
//            this.attack({...enemy, health: enemyRemaining}) //name: enemy.name, power: enemy.power, health: enemyRemaining
        
            
        } else {
            
            const enemyHtml=`${enemy.name} attacked you. ${this.name} attacked with ${this.weapon} and dealt <span style='color:red'><strong>${playerDamage}</strong></span> damage, ${enemy.name} is <span style='color:#e63900'>DEAD</span>. Enemy dealt <span style='color:#802000'><strong>${enemyDamage} damage</strong></span> to you. You have <span style='color:lime'><strong>${this.health.toFixed(2)} health</strong></span> left. Villager reward you with <span style='color:blue'><strong>${enemy.reward} coins</strong></span> and you got <span style='color:blue'><strong>${enemy.xp} xp</strong></span> points`;
            
           $('#attackBox').html(enemyHtml);
            
            
            this.xp+=enemy.xp;
            this.money+=enemy.reward;
            
//            alert(`${enemy.name} attacked you. ${this.name} attacked with ${this.weapon} and dealt ${playerDamage} damage, ${enemy.name} is dead. Enemy dealt ${enemyDamage} damage to you. You have ${this.health.toFixed(2)} health left. Villager reward you with ${enemy.reward} coins and you got ${enemy.xp} xp points`);
            
            this.playerWon=true;
            
            return this.checkXP(this.xp);


            }
        
        }
    
    checkXP(xp){
        
        const startingLevel=this.level;
        
        if(xp>=50 && this.level===1){
            
                this.power+=1;
                this.shield+=0.5;
                this.level+=1;
           
           }
           
           else if(xp>=120 && this.level===2){
           
                this.power+=1;
                this.shield+=0.5;
                this.level+=1;
           }
        
        else if(xp>=200 && this.level===3){
           
                this.shield+=1;
                this.level+=1;
           }
           
           else if(xp>=300 && this.level===4){
           
                this.power+=2;
                this.level+=1;
           }
        
        if(startingLevel<this.level){
            
//             alert(`${this.name} reached level ${this.level}`);
            
            $('#levelBox').text(`${this.name} reached level ${this.level}`);
            
            return 'levelUp';
        } else{
            
            return 'same';
        }
    }
    
    swim(){
        
        this.stamina=this.stamina-1;
    }
    
    burn(){
        
        this.stamina=this.stamina-1;
    }
    
     bitten(){
        
        this.stamina=this.stamina-0.5;
    }
    
    find(data){
        
        
        const infoText=`You found ${data.name}. You ${data.description}.`;
                
        $('#infoBox').text(infoText);
        
        
        
        if(data.effect==='stamina'){
            
            this.stamina+=data.power;
            
        } else if(data.effect==='health'){
            
            this.health+=data.power;
            
        } else if(data.effect==='money'){
            
            this.money+=data.power;
            
        } else if(data.effect==='shield'){
            
            this.shield+=data.power;
            
        }
        
        
    }
}


//const mapDispatchToProps=dispatch=> {
//    
//    return {
//        
//        onSetEnemy: (action, value)=> dispatch(actions.setEnemyStatus(action, value))
//        
//    }
//
//}



export const player=new Player();


//export default connect(null, mapDispatchToProps)(Player); //didn't work, probably only classes that extends to Component can interact with Redux (though functional components can too so I'm not sure why this didn't work...probably only "components", those that return JSX)