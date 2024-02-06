import React, { Component } from 'react';
import Character from '../character/character';

import grassTile from '../../assets/Images/grass20.png';

import sandTile from '../../assets/Images/sand.jpg';

import waterTile from '../../assets/Images/water.jpg';

import {withRouter} from 'react-router-dom';

import classes from './level2.css';

import {player, stopMusic, playMusic} from '../character/charStats';

import {connect} from 'react-redux';

import * as actions from '../../store/actions/exporter';

import $ from 'jquery';

import AttackBox from '../Boxes/AttackBox/attackBox';

import InfoBox from '../Boxes/InfoBox/infoBox';






class Level2 extends Component{
    
        state={
        
        x: 0,
        y: 0,
        swimMsg: false,
        hurryMsg: false,
        pDir: 'down',
        exit1:false,
        exit2: false,
        enemy:false,
        enemyDied: false,
        firstEncounter: true,
        levelUp:false
    }

    componentDidMount(){
        
        
         player.locked=true;
        
        
        if($(window).width() <650){
            
            $('body').css('zoom', '50%');
        }
        
        if($(window).width() >=650 && $(window).width() <900 ){
            
            $('body').css('zoom', '70%');
        }
        
        setTimeout(()=>{
            
            player.locked=false;
        }, 500);
        
        player.stamina=player.maxStamina;
        
            
        player.movingInit=false;
        
        
        if(player.prevStage==='level1' || player.prevStage==='level3'){ //you could handle this with Redux state also. This would allow you to set condition for the Routes to be visible. Can't set player.prevStage as condition for Routes in App.js, because the App.js won't rerender when player properties change, only when state and props change.
      
        } else{
            
            alert('direct access to levels denied!'); //use this once the game goes live, otherwise this will prevent direct access for testing purposes
            this.props.history.push('/');
        }
        
           if(player.prevStage==='level3'){
            
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
              
//                setTimeout(()=>{
//                
//                    this.props.onSetLoc(0,0);
//                },1000)
        }
        
            player.stage='level2';
        
        if(player.prevStage!=='level3'){
            
            this.props.onSetLoc(0,0);
        }
       
    }

    componentWillUnmount(){
        
        player.prevStage='level2';
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
      
      
          if(this.state.levelUp && !player.messages.includes(player.level) ){
            
            player.messages.push(player.level);
            
            if($('#attackBox').css('display')!=='none'){
                
                 $('#levelBox').delay(4000).slideDown(1000).delay(2000).slideUp(1000);
            } else{
                
                $('#levelBox').slideDown(1000).delay(2000).slideUp(1000);
            }
        
            
        }
      
      
    if(this.state.swimMsg && !player.messages.includes('level2Start') ){
            
            player.messages.push('level2Start');
            
             $('#infoBox').slideDown(1000).delay(2000).slideUp(1000);
            
        }
        
    if(this.state.hurryMsg && !player.messages.includes('level2swim')){
            
             player.messages.push('level2swim');
            
             $('#infoBox').slideDown(1000).delay(2000).slideUp(1000);
            
        }
      
      
      
    if(this.state.enemy && !this.state.enemyDied){
          
          
            let duration=1000;
            
            if(!player.locked){
                
                duration=2500;
            }
            
            
            $('#attackBox').slideDown(1000).delay(duration).slideUp(1000); //.delay(2000).slideUp(1000);

        }
      
      
    if(this.state.exit1){
             
             $('#level2').fadeTo(800, 0);
             
             setTimeout(()=>{
                 
                 this.props.history.push('/level1');
             },800)
             
    }
      
    if(this.state.exit2){
             
             $('#level2').fadeTo(800, 0);
             
             setTimeout(()=>{
                 
                 this.props.history.push('/level3');
             },800)
             
    }
      
//    if(this.props.playerHealth<=0){
//          
//          this.props.onSetStart();
//          
//          this.props.history.push('/');
//      }
      
      
        if(player.stamina===0 && !player.messages.includes('level2drowned')){
            
            player.stage='main';
            
            player.messages.push('level2drowned');
            
           const infoText='You drowned';
                
            $('#infoBox').text(infoText);
            
            $('#infoBox').slideDown(1000).delay(2000).slideUp(1000);
            
            setTimeout(()=>{
                
                this.props.onSetStart();
            
                this.props.history.push('/');
                
            }, 4000)
        }
      
      
          if(this.state.enemy){
            
            setTimeout(()=>{
                
                this.checkLocation();
            }, 3000)
            
        } else{
            
             this.checkLocation();
        }
    }


    checkLocation=()=>{
        
    
        
        if( ( (this.state.x>0  || this.state.y>0) || (this.props.playerX>0  || this.props.playerY>0) ) && !this.state.swimMsg && player.prevStage!=='level3'){
          
            
            const infoText='I can not swim long distances, maybe take a break somewhere. These are dangerous waters.';
                
            $('#infoBox').text(infoText);
          
            this.setState({swimMsg: true});
      }
        
        if( ( (this.state.x===300 && this.state.y===400) || (this.state.x===100 && this.state.y===160) ) || ( (this.props.playerX===300 && this.props.playerY===400) || (this.props.playerX===100 && this.props.playerY===160) ) ){
           
           player.stamina=24;
            
            this.props.onSetStamina(player.stamina);
           
           if( ( (this.state.x===300 && this.state.y===400) || (this.props.playerX===300 && this.props.playerY===400) ) && (!this.state.exit2)){
            
//            this.props.history.push('/level3');
               this.setState({exit2:true})
           }
            
            if(this.state.hurryMsg){
                
                this.setState({hurryMsg: false});
            }
          
     
        } else { 
            
            if(!this.state.enemy){
                
                player.swim();
            
                this.props.onSetStamina(player.stamina);
            }
            
        
            
            if(player.stamina<8 && !this.state.hurryMsg){
                
                const infoText='I need to get to the land right now!';
                
                $('#infoBox').text(infoText);


                this.setState({hurryMsg: true});
            }
    
        
        }
        
        if(( (this.state.x===140 && this.state.y===200) || (this.props.playerX===140 && this.props.playerY===200) ) && !player.enemies.includes('shark')){
            
          
            
            player.locked=true;
    
                        
            stopMusic();

            playMusic('battleTune');
       
            
            let levelUpInfo;
            
             
             
             if(this.state.firstEncounter){
                 
                  levelUpInfo=player.attack({name: 'Shark', power: 5, health: 12, reward: 10, xp: 15, stamina: 3, speed: 2.5});
                 
             } else{
                 
                levelUpInfo=player.attack({name: 'Shark', power: 5, health: player.enemyRemaining, reward: 10, xp: 15, stamina: player.enemyStaminaRemaining, speed: 2.5});
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
                    
                 
                    
                    player.locked=false;
                    
                    setTimeout(()=>{
                        
                        stopMusic();

                        playMusic('level1Tune');
                    }, 3000);
                    
                    player.enemies.push('shark');

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
        
        
           const getPlayer=document.getElementById('player');
               
            const currenLoc=getPlayer.getBoundingClientRect();
        
            const currentX=currenLoc.x;
                  
            const currentY=currenLoc.y;
        
        
           if( ( (this.state.x===0 && this.state.y===0 && !this.props.mobileStatus && player.movingInit && (currentX===2 && currentY===2)) || ( (this.props.playerX===0 && this.props.playerY===0) && this.props.mobileStatus && player.movingInit && (currentX===2 && currentY===2)) ) && (!this.state.exit1)){

               
               this.props.onSetLoc(240, 340);
//               player.stage='level2';
                player.stamina=24;
               
               this.props.onSetStamina(player.stamina);
//                this.props.history.push('/level1');
               
               this.setState({exit1:true})
           }
    }


    createWorld=(tiles)=>{
        
        let imgStyle;
        
        
        return tiles.map(item=>{
            
            if(item.type==='grass'){
                
                imgStyle={

                   display:'inline-block',
                    position: 'absolute',
                    left: '300px',
                    top: '400px',
                    zIndex: 100
                }
                
            } else if(item.type==='sand'){
                
                 imgStyle={

                   display:'inline-block',
                    position: 'absolute',
                    left: '100px',
                    top: '160px',
                    zIndex: 100
                }
                
            } else{
                
                imgStyle={
                
               display:'inline-block'
            }
                 
            }
            
            const setKey=item.type+String(item.id);
            
            return <img key={setKey} src={item.img} alt='tile' style={imgStyle} />;
  
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
            
                const setLocX= Number(newLocation.slice(0, newLocation.length-2));

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
        
        let mapGrass=new Array(1).fill({img:grassTile});
        
        let mapWater=new Array(192).fill({img:waterTile});
        
        let mapSand=new Array(1).fill({img:sandTile});

        
         for(let i=0;i<mapGrass.length; i++){
            
         mapGrass[i]={img:grassTile, id: i, type: 'grass'};  

        }
        
          for(let i=0;i<mapGrass.length; i++){
            
         mapSand[i]={img:sandTile, id: i, type: 'sand'};  

        }
        
          for(let i=0;i<mapWater.length; i++){
            
         mapWater[i]={img:waterTile, id: i, type:'water'};  

        }
        
        const grass=this.createWorld(mapGrass);
        
        const water=this.createWorld(mapWater);
        
        const sand=this.createWorld(mapSand);
        
        
        return(
        
            <div id='level2' className={classes.Body}>
                <Character movePlayer={this.move} direction={this.state.pDir} directionMobile={this.props.mobileDirectionStatus}/>
                {grass}
                {water}
                {sand}
                <AttackBox/>
                <InfoBox/>
            </div>
        
        );
    }
}


const mapStateToProps=state=>{//mapStateToProps is commonly used name, but you could name it differently. The state is Redux state. Note: create this constant after the class above
    
    return {
//        sharkStatus: state.enemies.shark,
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
//        setSharkStatus: (value)=> dispatch (actions.setSharkStatus(value)),
        onSetHealth: (value)=> dispatch(actions.setPlayerHealth(value)),
        onSetLoadDone: ()=> dispatch(actions.setLoadDone()),
        onSetStart: ()=> dispatch(actions.setGameStart()),
        onSetStamina: (value)=> dispatch(actions.setStamina(value)),
        onSetCoins: (value)=> dispatch(actions.setCoins(value)),
        onSetGameOver: ()=> dispatch(actions.setGameOver())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Level2));