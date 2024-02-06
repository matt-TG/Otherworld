import React, { Component } from 'react';
import Character from '../character/character';

import grassTile from '../../assets/Images/grass20.png';

import {withRouter} from 'react-router-dom';

import classes from './level3.css';

import {player, stopMusic, playMusic} from '../character/charStats';

import {connect} from 'react-redux';

import * as actions from '../../store/actions/exporter';

import door from '../../assets/Images/door.png';

import sandTile from '../../assets/Images/sand.jpg';

import $ from 'jquery';

import AttackBox from '../Boxes/AttackBox/attackBox';

import InfoBox from '../Boxes/InfoBox/infoBox';



class Level3 extends Component{
    
        state={
        
        x: 0,
        y: 0,
        enemyMsg: false,
        pDir: 'down',
        exit1:false,
        exit2: false,
        enemy:false,
        enemyDied: false,
        firstEncounter: true,
        levelUp:false
    }

    componentDidMount(){
        
        if($(window).width() <650){
            
            $('body').css('zoom', '50%');
        }
        
        if($(window).width() >=650 && $(window).width() <900 ){
            
            $('body').css('zoom', '70%');
        }
        
        if(player.prevStage==='level2' || player.prevStage==='level4' || player.prevStage==='shop1'){ //you could handle this with Redux state also. This would allow you to set condition for the Routes to be visible. Can't set player.prevStage as condition for Routes in App.js, because the App.js won't rerender when player properties change, only when state and props change.
   
        } else{
            
            alert('direct access to levels denied!'); //use this once the game goes live, otherwise this will prevent direct access for testing purposes
            this.props.history.push('/');
        }
        
         player.locked=true;
        
        setTimeout(()=>{
            
            player.locked=false;
        }, 500);

 
        if(player.stage==='shop1'){
            
            
            setTimeout(()=>{
            
            stopMusic();
        
            playMusic('level1Tune'); 
            
            },500);
        
            
            let player=document.getElementById('player');
            
            player.style.left=this.props.playerX+'px';
            player.style.top=this.props.playerY+'px';
            
            this.setState({x: this.props.playerX, y: this.props.playerY});
                
//            setTimeout(()=>{
//                
//                this.props.onSetLoc(0,0);
//            },1000)
      
           
        }
        
        if(player.prevStage==='level4'){
            
            
            let player=document.getElementById('player');
            
            player.style.left=this.props.playerX+'px';
            player.style.top=this.props.playerY+'px';
            
            this.setState({x: this.props.playerX, y: this.props.playerY});
            
//                if(!this.props.loaded){
//                
//                    setTimeout(()=>{
//                
//                        this.props.onSetLoc(0,0);
//                    },1000)
//            }
        }
        
         if(this.props.loaded && this.props.loadLevel===player.stage && !this.props.stateloadSetDone){
             

            
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
        
        player.stage='level3';
        
        if(player.prevStage!=='level4' && player.prevStage!=='shop1'){
            
            this.props.onSetLoc(0,0);
        }
    }

    componentWillUnmount(){
        
        player.prevStage='level3';
        player.movingInit=false;
        
        if(!player.enemies.includes('spider')){ //doing this so that leaving to level 2 without defeating the spider doesn't prevent playing "...lurking in distance" message playing again.
            
            player.messages=player.messages.filter(item=>{
                
                return item!=='level3Start';
            })
        }
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
             
             $('#level3').fadeTo(800, 0);
             
             setTimeout(()=>{
                 
                 this.props.history.push('/level2');
             },800)
             
        }
      
        if(this.state.exit2){
             
             $('#level3').fadeTo(800, 0);
             
             setTimeout(()=>{
                 
                 this.props.history.push('/level4');
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
        
        
    if(this.state.enemyMsg && !player.messages.includes('level3Start') && player.prevStage!=='shop1'){
            
            player.messages.push('level3Start');
            
             $('#infoBox').slideDown(1000).delay(2000).slideUp(1000);
            
        }
        
        
        if(this.state.enemy && !this.state.enemyDied){
            
            let duration=1000;
            
            if(!player.locked){
                
                duration=2500;
            }
            
            
            $('#attackBox').slideDown(1000).delay(duration).slideUp(1000); //.delay(2000).slideUp(1000);

        }
        
//        if(this.props.playerHealth<=0){
//          
//          this.props.onSetStart();
//          
//          this.props.history.push('/');
//      }
        
        
          if(this.state.enemy){
            
            setTimeout(()=>{
                
                this.checkLocation();
            }, 3000)
            
        } else{
            
             this.checkLocation();
        }
        
    }



  checkLocation=()=>{

      
         if( ( ( (this.state.x>0  || this.state.y>0) || ( (this.props.playerX>0  || this.props.playerY>0) && this.props.mobileStatus && player.movingInit) ) && !this.state.enemyMsg) && (!player.enemies.includes('spider')) && (player.stage!=='shop1' || player.prevStage!=='level4') ){
      
             
                const infoText='I have a feeling there is something lurking in the distance';
                
                $('#infoBox').text(infoText);
          
                this.setState({enemyMsg: true});
      }
      
      
        if( (this.state.x>400 || this.props.playerX>400) && !player.enemies.includes('spider')){
            
            player.locked=true;

            stopMusic();

            playMusic('battleTune');
             
            
            let levelUpInfo;
  
             
             
             if(this.state.firstEncounter){
                 
                  levelUpInfo=player.attack({name: 'Giant Spider', power: 6, health: 15, reward: 20, xp: 35, stamina: 2, speed: 3})
                 
             } else{
                 
                 levelUpInfo=player.attack({name: 'Giant Spider', power: 6, health: player.enemyRemaining, reward: 20, xp: 35, stamina: player.enemyStaminaRemaining, speed: 3})
                 
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

                        playMusic('level1Tune');
                    }, 3000);
                    
                    
                    player.locked=false;
                    player.enemies.push('spider');
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
      
      //game crashed once when I moved form level 3 to level 4 by holding right arrow key, error said that const currenLoc=getPlayer.getBoundingClientRect(); didn't existed which seems like player was removed from level3 before entering that line of code... I couldn't replicate the crash, but the below code seemed to work also.
        
//            let currentX;
//            let currentY;
//      
//            if(player.prevStage!=='level3'){ 
//            const getPlayer=document.getElementById('player');
//               
//            const currenLoc=getPlayer.getBoundingClientRect();
//        
//            currentX=currenLoc.x;
//                  
//            currentY=currenLoc.y;
//            }
      
      
      
         
            const getPlayer=document.getElementById('player');
               
            const currenLoc=getPlayer.getBoundingClientRect();
        
            const currentX=currenLoc.x;
                  
            const currentY=currenLoc.y;
            
      
         if(  ( (this.state.x===0 && this.state.y===0 && !this.props.mobileStatus && player.movingInit && (currentX===2 && currentY===2)) || (this.props.playerX===0 && this.props.playerY===0 && this.props.mobileStatus && player.movingInit && (currentX===2 && currentY===2) ) ) && (!this.state.exit1) ){
               
               this.props.onSetLoc(280, 400);
//               player.stage='level3';
             
             this.setState({exit1:true})
            
//                this.props.history.push('/level2');
           }
      
         if( (this.state.x===100 && this.state.y===400) || (this.props.playerX===100 && this.props.playerY===400) ){
               
               this.props.onSetLoc(20, 140);
            
                this.props.history.push('/shop1');
           }
      
        if( ( (this.state.x===600 && this.state.y===260) || (this.props.playerX===600 && this.props.playerY===260) ) && (!this.state.exit2) ){
            
            
                this.setState({exit2:true})
//                this.props.history.push('/level4');
           }
     
    }


    createWorld=(tiles)=>{
        
         let imgStyle;
        
        return tiles.map(item=>{
            
            if(item.type==='door'){
                
                imgStyle={

                   display:'inline-block',
                    position: 'absolute',
                    left: '100px',
                    top: '400px',
                    zIndex: 100
                }
                    
                } else if(item.type==='sand'){
                
                imgStyle={

                   display:'inline-block',
                    position: 'absolute',
                    left: '600px',
                    top: '260px',
                    zIndex: 100
                    
                } 
                
                } else{
                    
                    imgStyle={
                
                        display:'inline-block'
                    }
                }
            
            const setKey=item.type+String(item.id);
            
            return <img key={setKey} src={item.img} alt='grass' style={imgStyle} />;
  
        })
    }


    move=event=>{
        
        
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
        
        let mapGrass=new Array(192);
        
        let mapDoor=new Array(1);

        
         for(let i=0;i<mapGrass.length; i++){
            
         mapGrass[i]={img:grassTile, id: i, type:'grass'};  

        }
        
         for(let i=0;i<mapDoor.length; i++){
            
         mapDoor[i]={img:door, id: i, type: 'door'};  

        }
        
        let sand=[{img:sandTile, type: 'sand'}];
        
        const sandCreate=this.createWorld(sand);
        
        const grass=this.createWorld(mapGrass);
        
        const shopDoor=this.createWorld(mapDoor);
        
        
        return(
        
            <div className={classes.Body} id='level3'>
                <Character movePlayer={this.move} direction={this.state.pDir} directionMobile={this.props.mobileDirectionStatus}/>
                {grass}
                {shopDoor}
                {sandCreate}
                <AttackBox/>
                <InfoBox/>
            </div>
        
        );
    }
}

const mapStateToProps=state=>{//mapStateToProps is commonly used name, but you could name it differently. The state is Redux state. Note: create this constant after the class above
    
    return {
        
//        spiderStatus: state.enemies.giantSpider,
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
        gameOverStatus: state.location.gameOver
    };
}


const mapDispatchToProps=dispatch=> {
    
    return {
        
        onSetLoc: (setX, setY)=> dispatch (actions.setLocation(setX, setY)),
//        onSetLevel: (level)=> dispatch (actions.setLevel(level)),
//        onSetSpider: (value)=> dispatch(actions.setSpiderStatus(value)),
        onSetHealth: (value)=> dispatch(actions.setPlayerHealth(value)),
        onSetLoadDone: ()=> dispatch(actions.setLoadDone()),
        onSetStamina: (value)=> dispatch(actions.setStamina(value)),
        onSetCoins: (value)=> dispatch(actions.setCoins(value)),
        onSetGameOver: ()=> dispatch(actions.setGameOver())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Level3));