import React, { Component } from 'react';
import Character from '../character/character';

import grassTile from '../../assets/Images/grass20.png';

import {withRouter} from 'react-router-dom';

import classes from './level5.css';

import {player, stopMusic, playMusic} from '../character/charStats';

import {connect} from 'react-redux';

import * as actions from '../../store/actions/exporter';

import woodTile from '../../assets/Images/wood.jpg';

import doorTile from '../../assets/Images/door.png';

import waterTile from '../../assets/Images/water.jpg';

import $ from 'jquery';

import AttackBox from '../Boxes/AttackBox/attackBox';

import InfoBox from '../Boxes/InfoBox/infoBox';





class Level6 extends Component{
    
        state={
        
        x: 0,
        y: 0,
        msg: false,
        hurryMsg: false,
        pDir: 'down',
        enemyWarning: false,
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
        
       
        
        if(player.prevStage==='level5' || player.prevStage==='level7' ||  player.prevStage==='shop2'){ //you could handle this with Redux state also. This would allow you to set condition for the Routes to be visible. Can't set player.prevStage as condition for Routes in App.js, because the App.js won't rerender when player properties change, only when state and props change.
            

        } else{
            
            alert('direct access to levels denied!'); //use this once the game goes live, otherwise this will prevent direct access for testing purposes
            this.props.history.push('/');
        }
        
         player.locked=true;
        
        setTimeout(()=>{
            
            player.locked=false;
        }, 500);
        

        
        if(player.stage==='shop2'){
            
            setTimeout(()=>{
            
                stopMusic();

                playMusic('level4Tune'); 
            
            },500);
            
            let player=document.getElementById('player');
            
            player.style.left=this.props.playerX+'px';
            player.style.top=this.props.playerY+'px';
            
            this.setState({x: this.props.playerX, y: this.props.playerY});
            
//              setTimeout(()=>{
//                
//                    this.props.onSetLoc(0,0);
//                },1000)
        }
        
        if(player.prevStage==='level7'){
            
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
        
        player.stage='level6';
        
        if(player.prevStage!=='level7' && player.prevStage!=='shop2'){
            
            this.props.onSetLoc(0,0);
        }
    }


    componentWillUnmount(){
        
        player.prevStage='level6';
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
             
             $('#level6').fadeTo(800, 0);
             
             setTimeout(()=>{
                 
                 this.props.history.push('/level5');
             },800)
             
        }
        
      
        if(this.state.exit2){
             
             $('#level6').fadeTo(800, 0);
             
             setTimeout(()=>{
                 
                 this.props.history.push('/level7');
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
        
        
        
        if(this.state.enemyWarning && !player.messages.includes('level6enemywar') && player.prevStage!=='shop2'){
            
            player.messages.push('level6enemywar');
            
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
      
      
            const getPlayer=document.getElementById('player');
               
            const currenLoc=getPlayer.getBoundingClientRect();
        
            const currentX=currenLoc.x;
                  
            const currentY=currenLoc.y;
           
            
        if( ( (this.state.x===0 && this.state.y===0 && !this.props.mobileStatus && player.movingInit && (currentX===2 && currentY===2)) || (this.props.playerX===0 && this.props.playerY===0 && this.props.mobileStatus && player.movingInit && (currentX===2 && currentY===2)) ) && (!this.state.exit1)){
            
            this.props.onSetLoc(580, 460);
//            player.stage='level5'; 
            
            this.setState({exit1:true});
//            this.props.history.push('/level5');
           }
      
        if( (this.state.x===100 && this.state.y===400) || ( (this.props.playerX===100 && this.props.playerY===400) && this.props.mobileStatus) ){
            
            this.props.onSetLoc(20, 140);
            
            this.props.history.push('/shop2');
        }
      
      
        if( ( (this.state.x===300 && this.state.y===480) || ( (this.props.playerX===300 && this.props.playerY===480) && this.props.mobileStatus) ) && (!this.state.exit2)){
        
            this.setState({exit2:true});
//            this.props.history.push('/level7');
        }
      
      
        if( ( (this.state.x===320 && (this.state.y>=220 && this.state.y<=280) ) || (this.props.playerX===320 && (this.props.playerY>=220 && this.props.playerY<=280) ) ) && !player.enemies.includes('goblin')){
            
            player.locked=true;
      
            stopMusic();

            playMusic('battleTune');
 
            
            let levelUpInfo;
             
             
             if(this.state.firstEncounter){
                 
                  levelUpInfo=player.attack({name: 'Goblin', power: 9, health: 10, reward: 20, xp: 20, stamina: 4, speed: 5});
                 
             } else{
                 
                 levelUpInfo=player.attack({name: 'Goblin', power: 9, health: player.enemyRemaining, reward: 20, xp: 20, stamina: player.enemyStaminaRemaining, speed: 5});
                 
                 
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

                        playMusic('level4Tune');
                    }, 3000);
                    
                    player.enemies.push('goblin');
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
      
        if( (this.state.y===180 || ( (this.props.playerY===180) && this.props.mobileStatus) ) && !this.state.enemyWarning){
            
            
            const infoText='Did you hear that?!';
                
            $('#infoBox').text(infoText);
            
            this.setState({enemyWarning:true});
        }
      
     
    }


    createWorld=(tiles)=>{
        
         let imgStyle;
        
        return tiles.map((item, i)=>{ //i isn't needed here, but just good to know that you can get also the index number like this
            
            if(item.type==='door'){
                
                imgStyle={

                   display:'inline-block',
                    position: 'absolute',
                    left: '100px',
                    top: '400px',
                    zIndex: 100
                }
                    
                } else if(item.type==='water'){
                    
                    imgStyle={

                    display:'inline-block',
                    position: 'absolute',
                    left: '300px',
                    top: '480px',
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
        
        //make new arrays with: new Array, then loop through them to insert object data as before, but after that make one big array with all the little arrays (concat or spread operator). Now you can insert big chuncks of certain tile without ordering the position of each tile separately with style rules, now you just put the tile/tiles to their right places.
   
              
        const mapGrass=new Array(50);
        
        const woodFloor1=new Array(71);
        
        const woodFloor2=new Array(71);
            
        
        for(let i=0;i<mapGrass.length; i++){
            
         mapGrass[i]={img:grassTile, type:'grass'};  

        }
        
        for(let i=0;i<woodFloor1.length; i++){
            
         woodFloor1[i]={img:woodTile, type:'wood'};  

        }
        
        for(let i=0;i<woodFloor2.length; i++){
            
         woodFloor2[i]={img:woodTile, type:'wood2'};  

        }
        
        
        
        
        
        let door=[{img:doorTile, type: 'door'}];
        
        let water=[{img:waterTile, type: 'water'}];
        
        const doorCreate=this.createWorld(door);
        
        const waterCreate=this.createWorld(water);

        const grassLayer=this.createWorld(mapGrass);
        
        const wood1=this.createWorld(woodFloor1);
        
        const wood2=this.createWorld(woodFloor2);
        

        
        
        return(
        
            <div id='level6' className={classes.Body}>
                <Character movePlayer={this.move} direction={this.state.pDir} directionMobile={this.props.mobileDirectionStatus}/>
                {wood1}
                {grassLayer}
                {wood2}
                {doorCreate}
                {waterCreate}
                <AttackBox/>
                <InfoBox/>
            </div>
        
        );
    }
}

const mapStateToProps=state=>{//mapStateToProps is commonly used name, but you could name it differently. The state is Redux state. Note: create this constant after the class above
    
    return {
        
        spiderStatus: state.enemies.giantSpider,
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
        onSetSpider: (value)=> dispatch(actions.setSpiderStatus(value)),
        onSetHealth: (value)=> dispatch(actions.setPlayerHealth(value)),
        onSetLoadDone: ()=> dispatch(actions.setLoadDone()),
        onSetStamina: (value)=> dispatch(actions.setStamina(value)),
        onSetCoins: (value)=> dispatch(actions.setCoins(value)),
        onSetGameOver: ()=> dispatch(actions.setGameOver())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Level6));