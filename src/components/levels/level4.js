import React, { Component } from 'react';
import Character from '../character/character';

import grassTile from '../../assets/Images/grass20.png';

import {withRouter} from 'react-router-dom';

import classes from './level4.css';

import {player, stopMusic, playMusic} from '../character/charStats';

import {connect} from 'react-redux';

import * as actions from '../../store/actions/exporter';

import sandTile from '../../assets/Images/sand.jpg';

import $ from 'jquery';

import AttackBox from '../Boxes/AttackBox/attackBox';

import InfoBox from '../Boxes/InfoBox/infoBox';




class Level4 extends Component{
    
        state={
        
        x: 0,
        y: 0,
        mysteryMSg: false,
//        answer: 'findbalanceacrossthesea', //moved to riddleBox component
        pDir: 'down',
        exit1:false,
        exit2: false,
        enemy:false,
        enemyDied: false,
        firstEncounter: true,
        playerLocPreviousX:null,
        playerLocPreviousY:null,
        riddle: false,
        villagerMsg: false,
        wrongAnswerMsg: false,
        answerRiddle: false,
        levelUp:false
    }

    componentDidMount(){
        
        if($(window).width() <650){
            
            $('body').css('zoom', '50%');
        }
        
        if($(window).width() >=650 && $(window).width() <900 ){
            
            $('body').css('zoom', '70%');
        }
        
        if(player.prevStage==='level3' || player.prevStage==='level5'){ //you could handle this with Redux state also. This would allow you to set condition for the Routes to be visible. Can't set player.prevStage as condition for Routes in App.js, because the App.js won't rerender when player properties change, only when state and props change.

        } else{
            
            alert('direct access to levels denied!'); //use this once the game goes live, otherwise this will prevent direct access for testing purposes
            this.props.history.push('/');
        }
        
        const inputFields=$('input:text');
    
  
    inputFields.focus(function(){ //this happens when the element gains focus (gets clicked on basically or is otherwise activated)
        
        $(this).css('box-shadow', '5px 10px 18px black');
    })
        
    
    inputFields.blur(function(){ //this happens when the element gains focus (gets clicked on basically or is otherwise activated)
        
        $(this).css('box-shadow', 'none');
    })
        
        
         player.locked=true;
        
        setTimeout(()=>{
            
            player.locked=false;
        }, 500);
        
        if(player.prevStage==='level5'){
            
            let player=document.getElementById('player');
            
            player.style.left=this.props.playerX+'px';
            player.style.top=this.props.playerY+'px';
            
            this.setState({x: this.props.playerX, y: this.props.playerY});
            
//            if(!this.props.loaded){
//                
//                setTimeout(()=>{
//                
//                    this.props.onSetLoc(0,0);
//                },1000)
//            }
        }
        


        
         if(this.props.loaded && (this.props.loadLevel===player.stage) && !this.props.stateloadSetDone){
            
         
             
            let player=document.getElementById('player');
            
            player.style.left=this.props.playerX+'px';
            player.style.top=this.props.playerY+'px';
            
            this.props.onSetLoadDone();
            
            this.setState({x: this.props.playerX, y: this.props.playerY});
             
//              setTimeout(()=>{
//                
//                    this.props.onSetLoc(0,0);
//                },1000)
        }
        
            player.stage='level4';
        
            if(player.prevStage!=='level5'){
            
            this.props.onSetLoc(0,0);
        }
        
        setTimeout(()=>{
            
            stopMusic();
        
            playMusic('level4Tune'); 
            
        },500);
      
        
     
    }

    componentWillUnmount(){
        
        player.prevStage='level4';
        player.movingInit=false;
    }



    componentDidUpdate(){
        
        if(this.props.gameOverStatus){
            
            $('#attackBox').slideDown(1000).delay(2000).slideUp(1000);
            
            setTimeout(()=>{
                
                this.props.onSetStart();
                
                this.props.history.push('/');
            }, 4000)
        }
        
        
        if(this.state.exit1){
            
            //pushing back to level 3
             
             $('#level4').fadeTo(800, 0);
             
             setTimeout(()=>{
                 
                 this.props.history.push('/level3');
             },800)
             
        }
        
      
        if(this.state.exit2){
             
             $('#level4').fadeTo(800, 0);
             
             setTimeout(()=>{
                 
                 this.props.history.push('/level5');
             },800)
             
        }
        
        
        
        if(this.state.levelUp && !player.messages.includes(player.level) ){
            
            player.messages.push(player.level);
            
            if($('#attackBox').css('display')!=='none'){
                
                 $('#levelBox').delay(4000).slideDown(1000).delay(2000).slideUp(1000);
            } else{
                
                $('#levelBox').slideDown(1000).delay(2000).slideUp(1000);
            }
        
            
        }
        
        
        
        if(this.props.answeredStatus){
            
            $('#riddleBox').fadeOut(1000);
            
            setTimeout(()=>{
                
                this.props.onSetAnswered(false);
            
                this.props.history.push('/level5');    
            },1000)

            
        } else if(!this.props.answeredStatus && player.wrongAnswer && ( ( (this.state.x===600 && this.state.y===0) && !this.props.mobileStatus) ||  ( (this.props.playerX===600 && this.props.playerY===0) && this.props.mobileStatus) ) ){
            
            $('#riddleBox').fadeOut(1000, function(){
                
                $('#infoBox').slideDown(1000).delay(3000).slideUp(1000);
            });
            
            player.wrongAnswer=false;
        }
        
//        else{
//            
//            if(this.state.wrongAnswerMsg && ( (this.state.x===600 && this.state.y===0) || (this.props.playerX===600 && this.props.playerY===0) ) ){
//                
//                 $('#infoBox').css({width: '', height:''});
//            
//                $('#infoBox').slideDown(1000).delay(2000).slideUp(1000);
//            }
//        }
        
        
        if(this.state.answerRiddle && ( ( (this.state.x===600 && this.state.y===0) && !this.props.mobileStatus) ||  ( (this.props.playerX===600 && this.props.playerY===0) && this.props.mobileStatus) ) && !player.riddles.includes('level4')){
            
            $('#riddleBox').css({width: '400px', height:'200px'});
            
            $('#riddleBox').fadeIn(1000, function(){
                
                document.getElementById('riddleAnswer').focus();
            });
        }
        
        
        if(this.state.mysteryMsg && !player.messages.includes('level4Start') ){
            
            player.locked=true;
            
            $('#infoBox').css({width: '400px', height:'200px'});
            
            player.messages.push('level4Start');
            
             $('#infoBox').slideDown(1000).delay(6000).slideUp(1000, function(){
                 
                 player.locked=false;
             });
            
        }
        
        
        
            
         if(this.state.riddle && ( ( (this.state.x===100 && this.state.y===460) && !this.props.mobileStatus) ||  ( (this.props.playerX===100 && this.props.playerY===460) && this.props.mobileStatus) ) ){
             
             //riddle appears
             
             
             $('#infoBox').css({width: '500px', height:'400px', opacity:0.7});
            
             $('#infoBox').slideDown(1000).delay(40000).slideUp(1000, function(){
                 
                 //player.locked=false;
             });
            
        }
        
//        if(this.state.wrongAnswerMsg && ( (this.state.x===600 && this.state.y===0) || (this.props.playerX===600 && this.props.playerY===0) ) ){
//             
//             $('#infoBox').css({width: '', height:''});
//            
//             $('#infoBox').slideDown(1000).delay(2000).slideUp(1000);
//            
//        }
        
         if(this.state.villagerMsg && ( ( (this.state.x===600 && this.state.y===480) && !this.props.mobileStatus) ||  ( (this.props.playerX===600 && this.props.playerY===480) && this.props.mobileStatus) ) ){
             
             $('#infoBox').css({width: '400px', height:'250px'});
            
             $('#infoBox').slideDown(1000).delay(10000).slideUp(1000);
            
        }
        
        
        
        if(this.state.hurryMsg && !player.messages.includes('level4hurry') ){
            
            $('#infoBox').css({width: '400px', height:'100px'});
            
            player.messages.push('level4hurry');
            
             $('#infoBox').slideDown(1000).delay(4000).slideUp(1000);
            
        }
        
        
        if(this.state.enemy && !this.state.enemyDied){
            
            let duration=1000;
            
            if(!player.locked){
                
                duration=2500;
            }
            
            
            $('#attackBox').slideDown(1000).delay(duration).slideUp(1000); //.delay(2000).slideUp(1000);

        }
        
//        if(this.props.playerHealth<=0){ //different way to handele player dying now...I'm using gameOverStatus and player.died (player.attack() method sets player.died status)
//          
//          this.props.onSetStart();
//          
//          this.props.history.push('/');
//      }
        
        if(player.stamina===0 && !player.messages.includes('level4fainted')){
            
            player.messages.push('level4fainted');
             const infoText='You fainted and were rescued';
                
            $('#infoBox').text(infoText);
            
            $('#infoBox').slideDown(1000).delay(2000).slideUp(1000);
            
            player.stamina=player.maxStamina;
            
            setTimeout(()=>{
                
                this.props.onSetLoc(20, 140);
                
                const removeFainted=player.messages.indexOf('level4fainted');
                
                player.messages.splice(removeFainted, 1);

                this.props.history.push('/shop1');
            }, 4000)
    
            
        
        }
        
         if(this.state.enemy){
             
             //test if when cobra dies, is this.state.enemy true or false so does the checkLocation launch in 3 seconds or right away (case when enemy is false).
            
            setTimeout(()=>{
                
                this.checkLocation();
            }, 3000)
            
        } else{
            
             this.checkLocation();
        }
    }


  checkLocation=()=>{
      
      
      
           if( ( (this.state.x===0 && this.state.y===0 && !this.props.mobileStatus) || (this.state.x===600 && this.state.y===0) || (this.state.x===100 && this.state.y===460) || (this.state.x===440 && this.state.y===160) ) || ( (this.props.playerX===0 && this.props.playerY===0 && this.props.mobileStatus) || (this.props.playerX===600 && this.props.playerY===0) || (this.props.playerX===100 && this.props.playerY===460) || (this.props.playerX===440 && this.props.playerY===160) ) ){
          
      
          
         const equipped=player.equipped.includes('desertShoes');
            
            if(equipped){
                
          
                
               player.stamina=player.maxStamina+30;
                
                this.props.onSetStamina(player.stamina);
                
            } else{
                
      
                
                player.stamina=player.maxStamina;
                
                this.props.onSetStamina(player.stamina);
            }

            
      } else{
          
    
          
         player.burn();
          
          this.props.onSetStamina(player.stamina);
          
        if(player.stamina<8 && !this.state.hurryMsg){
            
                const infoText='I cannot continue much longer in this heat, do you have something that would make moving on sand faster?!';
                
                $('#infoBox').text(infoText);

                this.setState({hurryMsg: true});
            }
          
//           this.setState({hurryMsg: false});
      }
        
            const getPlayer=document.getElementById('player');
               
            const currenLoc=getPlayer.getBoundingClientRect();
        
            const currentX=currenLoc.x;
                  
            const currentY=currenLoc.y;
            
        if( ( (this.state.x===0 && this.state.y===0 && !this.props.mobileStatus && player.movingInit && (currentX===2 && currentY===2)) || (this.props.playerX===0 && this.props.playerY===0 && this.props.mobileStatus && player.movingInit && (currentX===2 && currentY===2) ) ) && (!this.state.exit1)){
            
            //player moving
            
            this.props.onSetLoc(580, 260);
//            player.stage='level4'; 
            
            this.setState({exit1:true});
//            this.props.history.push('/level3');
           }
      
        if( ( (this.state.x>0  || this.state.y>0) || ( (this.props.playerX>0  || this.props.playerY>0) && this.props.mobileStatus && player.movingInit) ) && !this.state.mysteryMsg && player.prevStage!=='level5'){

            const infoText='I have heard that there is only one way out of here. Some of the green areas are not good for resting, but there might be something else to be found. There is a gatekeeper asking you a question once you find your way out, see if you find any glues for the answer.';
                
            $('#infoBox').text(infoText);
          
          this.setState({mysteryMsg: true});
      }
      
      
//                const gettingPlayer=document.getElementById('player');
//
//                const whereIsPlayer=gettingPlayer.getBoundingClientRect();
//
//                const whereIsPlayerX=whereIsPlayer.x-2;
//
//                const whereIsPlayerY=whereIsPlayer.y-2;

      
          if(this.state.riddle){
              
              //left riddle area
              
               if( ( (this.state.x!==this.state.playerLocPreviousX || this.state.y!==this.state.playerLocPreviousY) && !this.props.mobileStatus)  ){
                   
                   //setting riddle to false, pc mode
                   
                    this.setState({playerLocPreviousX: this.state.x, playerLocPreviousY: this.state.y, riddle: false});
                   
                 }
              
                 if( ( (this.props.playerX!==this.state.playerLocPreviousX || this.props.playerY!==this.state.playerLocPreviousY) && this.props.mobileStatus)  ){
                     
                     //setting riddle to false and new prev coordinates, mobile mode
                     
                      this.setState({playerLocPreviousX: this.props.playerX, playerLocPreviousY: this.props.playerY, riddle: false});
                 }

            }
      
      
      
        if(this.state.wrongAnswerMsg){
            
            //left wrong answer area
            
            
                if( ( (this.state.x!==this.state.playerLocPreviousX || this.state.y!==this.state.playerLocPreviousY) && !this.props.mobileStatus)  ){

                        this.setState({playerLocPreviousX: this.state.x, playerLocPreviousY: this.state.y, wrongAnswerMsg: false});

                }

                if( ( (this.props.playerX!==this.state.playerLocPreviousX || this.props.playerY!==this.state.playerLocPreviousY) && this.props.mobileStatus)  ){

                          this.setState({playerLocPreviousX: this.props.playerX, playerLocPreviousY: this.props.playerY, wrongAnswerMsg: false});
                }
              


            
            }
      
       if(this.state.answerRiddle){
            
            //left wrong answer area
           
           
               if( ( (this.state.x!==this.state.playerLocPreviousX || this.state.y!==this.state.playerLocPreviousY) && !this.props.mobileStatus)  ){

                    this.setState({playerLocPreviousX: this.state.x, playerLocPreviousY: this.state.y, answerRiddle: false});

                }

                if( ( (this.props.playerX!==this.state.playerLocPreviousX || this.props.playerY!==this.state.playerLocPreviousY) && this.props.mobileStatus)  ){

                    this.setState({playerLocPreviousX: this.props.playerX, playerLocPreviousY: this.props.playerY, answerRiddle: false});
                }
              

            
            }
      
      
        if(this.state.villagerMsg){
            
            //left villager area
            
            
                if( ( (this.state.x!==this.state.playerLocPreviousX || this.state.y!==this.state.playerLocPreviousY) && !this.props.mobileStatus)  ){

                    this.setState({playerLocPreviousX: this.state.x, playerLocPreviousY: this.state.y, villagerMsg: false});

                }

                if( ( (this.props.playerX!==this.state.playerLocPreviousX || this.props.playerY!==this.state.playerLocPreviousY) && this.props.mobileStatus)  ){

                    this.setState({playerLocPreviousX: this.props.playerX, playerLocPreviousY: this.props.playerY, villagerMsg: false});
                }
              
            
            }
      
      
      
        if( (this.state.x===100 && this.state.y===460) || ( (this.props.playerX===100 && this.props.playerY===460) && this.props.mobileStatus) ){
            
           
            
            if( ( (this.state.x!==this.state.playerLocPreviousX || this.state.y!==this.state.playerLocPreviousY) && !this.props.mobileStatus && !this.state.riddle) || ( (this.props.playerX!==this.state.playerLocPreviousX || this.props.playerY!==this.state.playerLocPreviousY) && this.props.mobileStatus && !this.state.riddle) ){
                
                
                player.locked=true;
                
                setTimeout(()=>{
                    
                    player.locked=false;
                    
                }, 1000);
                
                player.closeInfoBox=true; //this is used to close infoBox when moving out of the area in mobile mode
                
                const infoText='Hello traveler! Do you want to hear a story?! I will go ahead and tell you. During the time of the Three Great Kingdoms, sometime really long time ago, no one really knows how long exactly, there were an alliance of wise men called the Protectors of The Order. These wise men were not in the service of any of the Three Great Kingdoms in praticular, but their job was to maintain the balance. In all their wisdom, even they struggled to maintain the peace and prosperity that had prevailed for ages. One day they had a vision appearing to all of them. Each got their vision separately, but it was clear to them they had all seen the same vision. They knew they need to find something, but they were not quite sure what that was. Before their sudden death however, they passed on a drawing of the vision: ♕☯♛♒⥵';
                
                $('#infoBox').text(infoText);
                
                
                if(!this.props.mobileStatus){
                    
                    this.setState({playerLocPreviousX: this.state.x, playerLocPreviousY: this.state.y, riddle: true});
                    
                } else{
                    
                    //setting prev coordinates in mobile block
                    
                    this.setState({playerLocPreviousX: this.props.playerX, playerLocPreviousY: this.props.playerY, riddle: true});
                }
            

                
            }
            
             
        }
      
      
        if( ( (this.state.x===600 && this.state.y===0) || ( (this.props.playerX===600 && this.props.playerY===0) && this.props.mobileStatus) ) && player.prevStage!=='level5' && !this.state.answerRiddle){
            

            $('#riddleText').text('In order to go any further, please tell me, what message did the Protectors of The Order receive in their vision? There are some parts of the answer we know: f___ b_l_nc_ ac___s _h_ _ea');
   
               
              //other riddle code moved to riddleBox component
            
            
            if(!this.props.mobileStatus){
                    
                    this.setState({playerLocPreviousX: this.state.x, playerLocPreviousY: this.state.y, answerRiddle: true});
                    
            } else{
                    
                    this.setState({playerLocPreviousX: this.props.playerX, playerLocPreviousY: this.props.playerY, answerRiddle: true});
            }
                
            
        }
      
      
      
      
      if( ( (this.state.x===600 && this.state.y===0) || ( (this.props.playerX===600 && this.props.playerY===0) && this.props.mobileStatus) ) && (!this.state.exit2) ){
          
          const checkPass=player.riddles.includes('level4');
          
     
          
          if(checkPass){
              
                this.setState({exit2:true});
              
//             this.props.history.push('/level5');  
          }
      }
      
      
     if( (this.state.x===600 && this.state.y===480) || ( (this.props.playerX===600 && this.props.playerY===480) && this.props.mobileStatus) ){
            
            
            if( ( (this.state.x!==this.state.playerLocPreviousX || this.state.y!==this.state.playerLocPreviousY) && !this.props.mobileStatus && !this.state.villagerMsg) || ( (this.props.playerX!==this.state.playerLocPreviousX || this.props.playerY!==this.state.playerLocPreviousY) && this.props.mobileStatus && !this.state.villagerMsg) ){
                
                
                
                player.locked=true;
                
                setTimeout(()=>{
                    
                    player.locked=false;
                    
                }, 1000);
                
                player.closeInfoBox=true; //this is used to close infoBox when moving out of the area in mobile mode
                
                player.stamina+=14;
                
                const infoText='Villager mumbles: Stupid riddle, does not make any sense, I am sure it has something to do with water...maybe...an ocean?! probably my old mind playing tricks with me... Still here? Sorry I do not know anything more. If you see that stranger asking for the answer, say that I am close to solving this riddle.';
                
                $('#infoBox').text(infoText);
                
                this.props.onSetStamina(player.stamina);
                
                
                if(!this.props.mobileStatus){
                    
                    this.setState({playerLocPreviousX: this.state.x, playerLocPreviousY: this.state.y, villagerMsg: true});
                    
                } else{
                    
                    this.setState({playerLocPreviousX: this.props.playerX, playerLocPreviousY: this.props.playerY, villagerMsg: true});
                }
            
                
            }

     }
      
               
    if( ( (this.state.x===400 && this.state.y===400) || ( (this.props.playerX===400 && this.props.playerY===400) && this.props.mobileStatus) ) && !player.enemies.includes('cobra') ){
        
            player.locked=true;
        
            stopMusic();

            playMusic('battleTune');
             
        
            let levelUpInfo;

             
             
             if(this.state.firstEncounter){
                 
                  levelUpInfo=player.attack({name: 'King Cobra', power: 10, health: 8, reward: 30, xp: 25, stamina: 2, speed: 4});
                 
             } else{
                 
                 levelUpInfo=player.attack({name: 'King Cobra', power: 10, health: player.enemyRemaining, reward: 30, xp: 25, stamina: player.enemyStaminaRemaining, speed: 4});
                 
                 
             }
           
             
           
             setTimeout(()=>{
                 
                 
                if(!player.playerWon){
                    

                    if(player.dead){
                            
                            this.props.onSetGameOver();
                            
                        } else{
                            
                            if(this.state.firstEncounter){

                                this.setState({enemyDied:false, firstEncounter:false, enemy:true});
                                
                            } else{

                            this.setState({enemyDied:false});
                                
                            }
                        }


                } else{
                    
                    
                    setTimeout(()=>{
                        
                        stopMusic();

                        playMusic('level4Tune');
                        
                        player.locked=false;
                        
                    }, 3000)
                   
                    player.enemies.push('cobra');
                    this.props.onSetHealth(player.health);
                    this.props.onSetCoins(player.money);

                    if(levelUpInfo==='levelUp'){
                        
                        this.setState({enemy:false, enemyDied:true, levelUp:true})
                    }
                    else if(levelUpInfo==='same'){
                        
                        this.setState({enemy:false, enemyDied:true});
                    }
                }

             }, 500)
             
            
         }
}
  

    createWorld=(tiles)=>{
        
         let imgStyle;
        
        return tiles.map(item=>{
            
            if(item.type==='sand'){
                
                imgStyle={

                   display:'inline-block'
                    
                } 
                
                } else if(item.type==='grass1'){
                    
                    imgStyle={
                
                    display:'block',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    zIndex: 100
                }
            } else if(item.type==='grass2'){
                    
                    imgStyle={
                
                    display:'block',
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    zIndex: 100
                }
            } else if(item.type==='grass3'){
                    
                    imgStyle={
                
                    display:'block',
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    zIndex: 100
                }
            } else if(item.type==='grass4'){
                    
                    imgStyle={
                
                    display:'block',
                    position: 'absolute',
                    right: '160px',
                    top: '160px',
                    zIndex: 100
                }
            } else if(item.type==='grass5'){
                    
                    imgStyle={
                
                    display:'block',
                    position: 'absolute',
                    right: '200px',
                    top: '400px',
                    zIndex: 100
                }
            } else if(item.type==='grass6'){
                    
                    imgStyle={
                
                    display:'block',
                    position: 'absolute',
                    left: '100px',
                    top: '460px',
                    zIndex: 100
                }
            }
            
            const setKey=item.type+String(item.id);
            
            return <img key={setKey} src={item.img} alt='tile' style={imgStyle} />;
  
        })
    }


    move=event=>{
        
        if(this.state.riddle || this.state.villagerMsg){
            
            //closing riddle'
            
            $('#infoBox').stop().fadeOut(2000);
        }
        
    if(!player.locked){ //prevents player from moving when in battle
        
        
    if(!player.movingInit){
        
        player.movingInit=true;
    }
        
    
        
        let direction;
        
        let location= event.target.getBoundingClientRect();
        
        let newLocation;
        event.target.style.position='absolute'
        
        
        if(event.key==='ArrowLeft' || event.key==='ArrowRight'){
            
            if(event.key==='ArrowLeft'){
                
                direction='left';
                
                if(this.state.x>0){
                    
                    newLocation=(location.x -22)+'px';
     
                }
    
            
        } else if(event.key==='ArrowRight'){
            
            direction='right';
            
            if(this.state.x<600){
   
                newLocation=(location.x +18)+'px'; 

            }
            
        }
            
        
            if(newLocation!==undefined){
                
                event.target.style.left=newLocation;
            
                const setLocX= Number(newLocation.slice(0, newLocation.length-2))

                this.setState({x: setLocX, pDir:direction}) 
                
            } else{
                
                this.setState({pDir:direction})
            }
           
            
        }
        
        
        if(event.key==='ArrowUp' || event.key==='ArrowDown'){
            
            
            
            if(event.key==='ArrowUp'){
                
                direction='up';
                
                if(this.state.y>0){
                
                    newLocation=(location.y -22)+'px';
        
     
            }
           
            
        } else if(event.key==='ArrowDown'){
            
            direction='down';
            
            if(this.state.y<480){
                
                newLocation=(location.y +18)+'px';
       
                
            }
        }
            if(newLocation!==undefined){
                
                event.target.style.top=newLocation;
            
                const setLocY= Number(newLocation.slice(0, newLocation.length-2))
                this.setState({y: setLocY, pDir:direction})

            } else{
                
                this.setState({pDir:direction})
            }

        }
    
    }
        
    }
    
    
    render(){
        
        let mapSand=new Array(192);
        
        let mapGrass1=[{img:grassTile, id: 0, type: 'grass1'}];
        let mapGrass2=[{img:grassTile, id: 1, type: 'grass2'}];
        let mapGrass3=[{img:grassTile, id: 2, type: 'grass3'}];
        let mapGrass4=[{img:grassTile, id: 3, type: 'grass4'}];
        let mapGrass5=[{img:grassTile, id: 4, type: 'grass5'}];
        let mapGrass6=[{img:grassTile, id: 5, type: 'grass6'}];

        
         for(let i=0;i<mapSand.length; i++){
            
         mapSand[i]={img:sandTile, id: i, type: 'sand'};  

        }
        
   
        
        
        const grass1=this.createWorld(mapGrass1);
        const grass2=this.createWorld(mapGrass2);
        const grass3=this.createWorld(mapGrass3);
        const grass4=this.createWorld(mapGrass4);
        const grass5=this.createWorld(mapGrass5);
        const grass6=this.createWorld(mapGrass6);
        
        const sand=this.createWorld(mapSand);
        
        
        return(
        
            <div id='level4' className={classes.Body}>
                <Character movePlayer={this.move} direction={this.state.pDir} directionMobile={this.props.mobileDirectionStatus}/>
                {grass1}
                {grass2}
                {grass3}
                {grass4}
                {grass5}
                {grass6}
                {sand}
                <AttackBox/>
                <InfoBox/>
            </div>
        
        );
    }
}

const mapStateToProps=state=>{//mapStateToProps is commonly used name, but you could name it differently. The state is Redux state. Note: create this constant after the class above
    
    return {
        
        playerX: state.location.px,
        playerY: state.location.py,
//        playerLevel: state.location.latestLevel,
        loaded: state.location.loaded,
        loadLevel: state.location.loadLevel,
        stateloadSetDone: state.location.loadSetDone,
        movingStatusMobile: state.player.playerMoving,
        mobileDirectionStatus: state.location.setMobileDirection,
        mobileStatus: state.hide.mobile,
        playerHealth: state.player.playerHealth,
        answeredStatus:state.player.answered,
        gameOverStatus: state.location.gameOver
    };
}


const mapDispatchToProps=dispatch=> {
    
    return {
        
        onSetLoc: (setX, setY)=> dispatch (actions.setLocation(setX, setY)),
//        onSetLevel: (level)=> dispatch (actions.setLevel(level)),
        onSetHealth: (value)=> dispatch(actions.setPlayerHealth(value)),
        onSetLoadDone: ()=> dispatch(actions.setLoadDone()),
        onSetLocX: (setX)=> dispatch (actions.setLocationX(setX)),
        onSetAnswered: (value)=> dispatch(actions.setAnswered(value)),
        onSetStamina: (value)=> dispatch(actions.setStamina(value)),
        onSetCoins: (value)=> dispatch(actions.setCoins(value)),
        onSetGameOver: ()=> dispatch(actions.setGameOver())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Level4));