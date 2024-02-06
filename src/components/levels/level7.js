import React, { Component } from 'react';
import Character from '../character/character';

//import grassTile from '../../assets/Images/grass20.png';

import sandTile from '../../assets/Images/sand.jpg';

import waterTile from '../../assets/Images/water.jpg';

import {withRouter} from 'react-router-dom';

import classes from './level7.css';

import {player, stopMusic, playMusic} from '../character/charStats';

import {connect} from 'react-redux';

import boat from '../../assets/Images/boat.png';

import * as actions from '../../store/actions/exporter';

import $ from 'jquery';

import AttackBox from '../Boxes/AttackBox/attackBox';

import InfoBox from '../Boxes/InfoBox/infoBox';




class Level7 extends Component{
    
        state={
        
        x: 0,
        y: 0,
        startMsg: false,
        onBoat: false,
        hurryMsg: false,
        pDir: 'down',
        boatDrop: false,
        boatLocSet: false,
        returnTrip: false,
        exit1:false,
        exit2: false,
        enemy:false,
        enemyDied: false,
        firstEncounter: true,
        levelUp: false
    }

    componentDidMount(){
        
        if($(window).width() <650){
            
            $('body').css('zoom', '50%');
        }
        
        if($(window).width() >=650 && $(window).width() <900 ){
            
            $('body').css('zoom', '70%');
        }
        
        if(player.prevStage==='level6' || player.prevStage==='level8'){ //you could handle this with Redux state also. This would allow you to set condition for the Routes to be visible. Can't set player.prevStage as condition for Routes in App.js, because the App.js won't rerender when player properties change, only when state and props change.
 
        } else{
            
            alert('direct access to levels denied!'); //use this once the game goes live, otherwise this will prevent direct access for testing purposes
            this.props.history.push('/');
        }
        
         player.locked=true;
        
        setTimeout(()=>{
            
            player.locked=false;
        }, 500);

        
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
        
            player.stage='level7';
        
            if(player.prevStage!=='level8'){
            
            this.props.onSetLoc(20,0);
        }
        
        
        setTimeout(()=>{
            
            stopMusic();
        
            playMusic('level7Tune');

        },500);
        
        
    }

    componentWillUnmount(){
        
        player.prevStage='level7';
        player.movingInit=false;
    }



  componentDidUpdate(){
      
      
    if(this.props.gameOverStatus){
        
        if(player.health<=0){
            
            $('#attackBox').slideDown(1000).delay(2000).slideUp(1000);
        }
            
            
            setTimeout(()=>{
                
                this.props.onSetStart();
                
                this.props.history.push('/');
            }, 4000)
        }
      
      
    if(this.state.exit1){
             
             $('#level7').fadeTo(800, 0);
             
             setTimeout(()=>{
                 
                 this.props.history.push('/level6');
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
      
      
      if(this.props.gameOverStatus){
          
          $('#infoBox').slideDown(1000).delay(3000).slideUp(1000);
          
        setTimeout(()=>{
                 
                this.props.history.push('/');
             }, 5000)
      }
      
      
       if(this.state.startMsg && !player.messages.includes('level7start') && player.prevStage!=='level8'){
            
            player.messages.push('level7start');
            
             $('#infoBox').slideDown(1000).delay(3000).slideUp(1000);
            
        }
      
      
        if(this.state.enemy && !this.state.enemyDied){
            
            let duration=1000;
            
            if(!player.locked){
                
                duration=2500;
            }
            
            
            $('#attackBox').slideDown(1000).delay(duration).slideUp(1000); //.delay(2000).slideUp(1000);

        }
      
      
//      if(this.props.playerHealth<=0){
//          
//          this.props.onSetStart();
//          
//          this.props.history.push('/');
//      }
//      
     
      
      if(!this.state.onBoat && this.state.boatDrop && !this.state.boatLocSet){
          
          if(this.state.y>200 || (this.props.playerY>200 && this.props.mobileStatus)){
              
            const getBoat=document.getElementById('boat');
            
            getBoat.style.left='460px';
            
            getBoat.style.top='340px';
              
          } else{
              
            const getBoat=document.getElementById('boat');
            
            getBoat.style.left='80px';
            
            getBoat.style.top='40px';
          }
          
        
      }
      
      
        if(player.stamina===0 && !player.messages.includes('level7drowned')){
            
            player.stage='level1';
            
            player.messages.push('level7drowned');
            
            const infoText='you drowned';
                
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
        
      
        
        
        if( ( (this.state.x>0  || this.state.y>0) || ( (this.props.playerX>0  || this.props.playerY>0) && this.props.mobileStatus) ) && !this.state.startMsg && player.prevStage!=='level8' && player.movingInit){
            
            const infoText='Looks like a large ocean, I wonder if this is THE OCEAN... I can not swim across it.';
                
            $('#infoBox').text(infoText);
          
            this.setState({startMsg: true});
      }
        
      
        if(!this.state.onBoat){
            
            player.swim();
            
            this.props.onSetStamina(player.stamina);
            
            if(player.stamina<8 && !this.state.hurryMsg){
                
                const infoText='Help! I am drowning soon!';
                
                $('#infoBox').text(infoText);

                this.setState({hurryMsg: true});
            }
        }
            
     
        
        if( ( ( (this.state.x>=60 && this.state.x<=100) && (this.state.y>=40 && this.state.y<=80) ) || ( (this.props.playerX>=60 && this.props.playerX<=100) && (this.props.playerY>=40 && this.props.playerY<=80) && this.props.mobileStatus) ) && !this.state.onBoat && !this.state.returnTrip){
            
            player.stamina=player.maxStamina;
            
            this.props.onSetStamina(player.stamina);
            
            this.setState({onBoat:true, boatDrop: false, boatLocSet: false});
        }
        
            const getPlayer=document.getElementById('player');
               
            const currenLoc=getPlayer.getBoundingClientRect();
        
            const currentX=currenLoc.x;
                  
            const currentY=currenLoc.y;
        
        if( ( (this.state.x===0 && this.state.y===0 && !this.props.mobileStatus && player.movingInit && (currentX===2 && currentY===2)) || (this.props.playerX===0 && this.props.playerY===0 && this.props.mobileStatus && player.movingInit && (currentX===2 && currentY===2)) ) && (!this.state.exit1)){
               
                this.props.onSetLoc(280, 480);
//               player.stage='level2';
                player.stamina=24;
            
            this.props.onSetStamina(player.stamina);
            
                this.setState({exit1:true});
//                this.props.history.push('/level6');
           }
        
        if( ( (this.state.x>=400 && this.state.y>=300) || ( (this.props.playerX>=400 && this.props.playerY>=300) && this.props.mobileStatus) ) && !this.state.boatDrop && this.state.onBoat && !this.state.returnTrip){

            this.setState({boatDrop: true, onBoat: false, returnTrip:true});
        }
        
         if( ( (this.state.x===600 && this.state.y===480) || ( (this.props.playerX===600 && this.props.playerY===480) && this.props.mobileStatus) ) && !this.props.gameOverStatus){
             
             
             const infoText='Well done sailor. Your jorney is over for now...TO BE CONTINUED...';
                
            $('#infoBox').text(infoText);
             
//             player.stamina=player.maxStamina; //if game continues
//             this.props.history.push('/level8'); //once you create this
             
             this.props.onSetGameOver();
           
         }
        
        if(this.state.boatDrop && !this.state.boatLocSet){
            
            this.setState({boatLocSet:true})
        }
        
        if(this.state.boatDrop && ( ( (this.state.x>=460 && this.state.x<=500) && (this.state.y>=360 && this.state.y<=380) ) || ( ( (this.props.playerX>=460 && this.props.playerX<=500) && this.props.mobileStatus) && ( (this.props.playerY>=360 && this.props.playerY<=380) && this.props.mobileStatus) ) ) && !this.state.onBoat){

            
            this.setState({boatDrop: false, onBoat:true, boatLocSet: false});
        }
        
        
        if( ( ( (this.state.x<=140 && this.state.y<=140) && !this.props.mobileStatus) || ( (this.props.playerX<=140 && this.props.playerY<=140) && this.props.mobileStatus) ) && !this.state.boatDrop && this.state.onBoat && this.state.returnTrip){

            
            this.setState({boatDrop: true, onBoat: false, returnTrip:false});
        }
        
        if( ( ( (this.state.x>=260 && this.state.x<=280) && (this.state.y>=240 && this.state.y<=260 && !this.props.mobileStatus) ) || ( (this.props.playerX>=260 && this.props.playerX<=280 && this.props.mobileStatus) && (this.props.playerY>=240 && this.props.playerY<=260 && this.props.mobileStatus) ) ) && !player.enemies.includes('seamonster') ){
            
            player.locked=true;
      
            stopMusic();

            playMusic('battleTune');
            
            let levelUpInfo;
             
             if(this.state.firstEncounter){
                 
                  levelUpInfo=player.attack({name: 'Sea Monster', power: 12, health: 15, reward: 30, xp: 40, stamina: 5, speed: 2});
                 
             } else{
                 
                 levelUpInfo=player.attack({name: 'Sea Monster', power: 12, health: player.enemyRemaining, reward: 30, xp: 40, stamina: player.enemyStaminaRemaining, speed: 2});
     
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

                        playMusic('level7Tune');
                    }, 3000);
                    
                    player.enemies.push('seamonster');
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
                    right: 0,
                    bottom: 0,
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
        
//        let mapGrass=new Array(1).fill({img:grassTile});
        
        let mapWater=new Array(192);
        
        let mapSand=new Array(1);//.fill({img:sandTile}); this is how you could predefine the array items, I'm using the for loop below to get the same result. But to be hones I do not need id property for the array items. Id is created because I need something unique for "key" property when using map() method in the createWorld function, but I could achieve the same by accessing index numbers with map() method, because map() method takes item and i(index) as arguments...see the function to see how I create the key. So instead of: const setKey=item.type+String(item.id); I could have: const setKey=item.type+String(i); where i is the second argument of the map() method referring to the index number of the items

        
//         for(let i=0;i<mapGrass.length; i++){
//            
//         mapGrass[i]={img:grassTile, id: i, type: 'grass'};  
//
//        }
        
          for(let i=0;i<mapSand.length; i++){
            
         mapSand[i]={img:sandTile, id: i, type: 'sand'};  

        }
        
          for(let i=0;i<mapWater.length; i++){
            
         mapWater[i]={img:waterTile, id: i, type:'water'};  

        }
        
//        const grass=this.createWorld(mapGrass);
        
        const water=this.createWorld(mapWater);
        
        const sand=this.createWorld(mapSand);
        
        
        
        
        return(
        
            <div id='level7' className={classes.Body}>
                <Character movePlayer={this.move} direction={this.state.pDir} onBoatP={this.state.onBoat} directionMobile={this.props.mobileDirectionStatus}/>
                {!this.state.onBoat?<img src={boat} id='boat' alt='boat' className={classes.Boat}/>:null}
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
        onSetGameOver: ()=> dispatch(actions.setGameOver()),
        onSetStamina: (value)=> dispatch(actions.setStamina(value)),
        onSetCoins: (value)=> dispatch(actions.setCoins(value))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Level7));