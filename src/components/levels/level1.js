import React, { Component } from 'react';
import Character from '../character/character';

import grassTile from '../../assets/Images/grass20.png';

import sandTile from '../../assets/Images/sand.jpg';

import waterTile from '../../assets/Images/water.jpg';

import {withRouter} from 'react-router-dom';

import classes from './level1.css';

import {player, stopMusic, playMusic} from '../character/charStats';

import {connect} from 'react-redux';

import * as actions from '../../store/actions/exporter';

import $ from 'jquery';

import AttackBox from '../Boxes/AttackBox/attackBox';

import InfoBox from '../Boxes/InfoBox/infoBox';



class Level1 extends Component{
    
        state={
        
        x: 0,
        y: 0,
        burnMsg: false,
        desertMsg: false,
        advice: false,
        pDir: 'down',
        exit:false,
        enemy:false,
        enemyDied: false,
        firstEncounter: true,
        levelUp: false
    }

    componentDidMount(){
        
        
        player.locked=true;
        
        if($(window).width() <650){
            
            $('body').css('zoom', '50%');
        }
        
        if($(window).width() >=650 && $(window).width() <900 ){
            
            $('body').css('zoom', '70%');
        }
        
        setTimeout(()=>{ //the point of this is to lock player once he enters the level, because it seemed it caused unwanted behaviour in case player keeps arrowkey pressed when entering a level.
            
            player.locked=false;
        }, 500);

        
        if(player.movingInit){
            
            player.movingInit=false;
        }
        

        
        if(player.prevStage==='main' || player.prevStage==='level2'){ //you could handle this with Redux state also. This would allow you to set condition for the Routes to be visible. Can't set player.prevStage as condition for Routes in App.js, because the App.js won't rerender when player properties change, only when state and props change.
            
        } else{
            
            alert('direct access to levels denied!'); //use this once the game goes live, otherwise this will prevent direct access for testing purposes
            this.props.history.push('/');
        }
        
        if(player.prevStage==='level2'){
            
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
        
        player.stage='level1';
        
        stopMusic();
        
        playMusic('level1Tune');
        
        
    }

    componentWillUnmount(){
        
        player.prevStage='level1';
        player.movingInit=false;
//        $('#level1').fadeTo(800, 0);
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
        
        if(this.state.advice && !player.messages.includes('level1Start') ){
            
            player.messages.push('level1Start');
            
             $('#infoBox').slideDown(1000).delay(2000).slideUp(1000);
            
        }
        
        if(this.state.desertMsg && !player.messages.includes('level1desert')){
            
             player.messages.push('level1desert');
            
             $('#infoBox').slideDown(1000).delay(2000).slideUp(1000);
            
        }
        
        if(this.state.burnMsg && !player.messages.includes('level1burn')){
            
            player.messages.push('level1burn');
            
            $('#infoBox').slideDown(1000).delay(2000).slideUp(1000);
        }
        
        if(this.state.enemy && !this.state.enemyDied){
            
  
            
            let duration=1000;
            
            if(!player.locked){
                
                duration=2500;
            }
            
            $('#attackBox').slideDown(1000).delay(duration).slideUp(1000);
        

        }
        

        
        
         if(this.state.exit){
             
             $('#level1').fadeTo(800, 0);
             
             setTimeout(()=>{
                 
                 this.props.history.push('/level2');
             },800)
             
         }

 
        
        
          if(player.stamina===0 && !player.messages.includes('level1burned')){
              
             player.stage='level1';
              
            player.messages.push('burned');
            
            const infoText='You burned';
                
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


    createWorld=(tiles)=>{
        
    
        
        return tiles.map(item=>{
            
            const imgStyle={
                
               display:'inline-block'
            }
            
            const setKey=item.type+String(item.id);
            
            return <img key={setKey} src={item.img} alt='grass' style={imgStyle} />;
  
        })
    }

    checkLocation=()=>{
        
     
        
            if( ( (this.state.x>0 || this.state.y>0) || (this.props.playerX>0 || this.props.playerY>0) ) && (!this.state.advice && player.prevStage!=='level2')){
                
                const unknownWeapon=player.power===1? 'Be careful, you chose unknown weapon, it looks quite weak' : '';
                
                const infoText=`I wonder what is in the horizon? Villagers also asked me to see who is lurking in the fields. ${unknownWeapon}`;
                
                $('#infoBox').text(infoText);
                
                this.setState({advice: true})
            }
        
            if( ( (this.state.x===0 && this.state.y===0) || (this.props.playerX===0 && this.props.playerY===0 && player.movingInit && this.props.mobileStatus) ) && this.state.burnMsg){
                
                player.stamina=24;
                
                this.props.onSetStamina(player.stamina);
                
                this.setState({burnMsg: false})
            }
        
            if( ( this.state.y>180 || this.props.playerY>180 ) && !this.state.desertMsg && player.prevStage!=='level2'){
            
                
                const infoText='Approaching desert, do not stay too long, it gets hot!';
                
                $('#infoBox').text(infoText);
                
            this.setState({desertMsg: true})
        }
        
            if(this.state.y>180 || (this.props.playerY>180 && this.props.mobileStatus) ){
            
            player.burn();
            
                
            if(player.stamina<8 && !this.state.burnMsg){

                
                const infoText='You are badly burn, please return to the starting point to heal yourself';
                
                $('#infoBox').text(infoText);

                this.setState({burnMsg: true});
            }
                
            this.props.onSetStamina(player.stamina);
                
        }
        
        
         if( ( (this.state.x===100 && this.state.y===140) || (this.props.playerX===100 && this.props.playerY===140) ) && !player.enemies.includes('orc')){
             
            player.locked=true;
             
            stopMusic();

            playMusic('battleTune');
             
             let levelUpInfo;
             
             
             if(this.state.firstEncounter){
                 
                 levelUpInfo=player.attack({name: 'Orc', power: 4, health: 10, reward: 10, xp: 20, stamina: 3, speed: 2});
             } else{
                 
                 levelUpInfo=player.attack({name: 'Orc', power: 4, health: player.enemyRemaining, reward: 10, xp: 20, stamina: player.enemyStaminaRemaining, speed: 2});
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

                    
                    
                    player.enemies.push('orc');
                    this.props.onSetHealth(player.health);
                    this.props.onSetCoins(player.money);
            
                    
                    if(levelUpInfo==='levelUp'){
                       
                        this.setState({enemy:false, enemyDied:true, levelUp:true});
                        
                    } else if(levelUpInfo==='same'){
                        
                      this.setState({enemy:false, enemyDied:true}); 
                    }
                    
                    
                }

             }, 500)
        
        }
        
        
//            if( ( (this.state.x===100 && this.state.y===140) || (this.props.playerX===100 && this.props.playerY===140) ) && !player.enemies.includes('orc') && this.state.enemy){
//            
////                player.attack({name: 'Orc', power: 4, health: 10, reward: 10, xp: 20});
//                
//                player.enemies.push('orc');
//
////                this.props.onSetOrc(false);
//                
//                this.props.onSetHealth(player.health);
//                
//        }
        
        
           if( ( ( (this.state.x<=260 && this.state.y>360) || (this.state.x>=260 && this.state.y>=340) ) || ( (this.props.playerX<=260 && this.props.playerY>360) || (this.props.playerX>=260 && this.props.playerY>=340) ) ) && (!this.state.exit) ){
               
            player.stamina=24;
               
            this.props.onSetStamina(player.stamina);
               
//            this.props.history.push('/level2'); //moved to componentDidUpdate because I wanted to play an animation before pushing to level 2. Do the same with other levels (you need to create exit state and add it to the exit location condition and to the componentDidUpdate)
               
            this.setState({exit:true}) //this is necessary in order to play the fadeTo animation, because React won't rerender without state or props changes.
        }
    
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

                this.setState({x: setLocX, pDir: direction}) 
            } else{
                
                this.setState({pDir: direction})
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
 
            
            if(this.state.y<460){
                
                newLocation=(location.y +18)+'px';
                
            }
        }
            if(newLocation!==undefined){
                
                event.target.style.top=newLocation;
            
                const setLocY= Number(newLocation.slice(0, newLocation.length-2))
                this.setState({y: setLocY, pDir:direction})

            } else{
                
                this.setState({pDir: direction})
            }

        }
    
       }
    }
    
    
    render(){
        
        //create 192 tiles
        
        let mapGrass=new Array(80);
        
        let mapSand=new Array(55);
        
        let mapWater=new Array(57);

        
         for(let i=0;i<mapGrass.length; i++){
            
         mapGrass[i]={img:grassTile, id: i, type:'grass'};  

        }
        
         for(let i=0;i<mapSand.length; i++){
            
         mapSand[i]={img:sandTile, id: i, type:'sand'};  

        }
        
          for(let i=0;i<mapWater.length; i++){
            
         mapWater[i]={img:waterTile, id: i, type:'water'};  

        }
        
        const grass=this.createWorld(mapGrass);
        
        const sand=this.createWorld(mapSand);
        
        const water=this.createWorld(mapWater);
        
        
        return(
        
            <div id='level1' className={classes.Body}>
                <Character movePlayer={this.move} direction={this.state.pDir} directionMobile={this.props.mobileDirectionStatus}/>
                {grass}
                {sand}
                {water}
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
//        orcStatus: state.enemies.orc,
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
        
//        onSetOrc: (value)=> dispatch(actions.setOrcStatus(value)),
//        onSetLevel: (value)=> dispatch(actions.setLevel(value)),
        onSetHealth: (value)=> dispatch(actions.setPlayerHealth(value)),
        onSetLoadDone: ()=> dispatch(actions.setLoadDone()),
        onSetStart: ()=> dispatch(actions.setGameStart()),
        onSetLoc: (setX, setY)=> dispatch (actions.setLocation(setX, setY)),
        onSetStamina: (value)=> dispatch(actions.setStamina(value)),
        onSetCoins: (value)=> dispatch(actions.setCoins(value)),
        onSetGameOver: ()=> dispatch(actions.setGameOver()),
        
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Level1));