import React, { Component } from 'react';
import Character from '../character/character';

import grassTile from '../../assets/Images/grass20.png';

import {withRouter} from 'react-router-dom';

import classes from './level5.css';

import {player} from '../character/charStats';

import {connect} from 'react-redux';

import * as actions from '../../store/actions/exporter';

import sandTile from '../../assets/Images/sand.jpg';

import $ from 'jquery';

import InfoBox from '../Boxes/InfoBox/infoBox';


//import door from '../../assets/Images/door.png';



class Level5 extends Component{
    
        state={
        
        x: 0,
        y: 0,
        msg: false,
        treasureMsg: false,
        pDir: 'down',
        snakeBite: false,
        antidote: false,
        snakeClear:false,
        snakeClearMsg: false,
        snakeBiteMsg: false,
        antidoteMsg: false,
        antidoteSavedMsg: false,
        antidotesavedMsg2: false,
        cleared: false,
        exit1:false,
        exit2: false,
        potionMsg:false
    }

    componentDidMount(){
        
        if($(window).width() <650){
            
            $('body').css('zoom', '50%');
        }
        
        if($(window).width() >=650 && $(window).width() <900 ){
            
            $('body').css('zoom', '70%');
        }
        
        $('#infoBox').css({width: '', height:''});
        
        if(player.prevStage==='level4' || player.prevStage==='level6'){ //you could handle this with Redux state also. This would allow you to set condition for the Routes to be visible. Can't set player.prevStage as condition for Routes in App.js, because the App.js won't rerender when player properties change, only when state and props change.
            
        } else{
            
            alert('direct access to levels denied!'); //use this once the game goes live, otherwise this will prevent direct access for testing purposes
            this.props.history.push('/');
        }
        
         player.locked=true;
        
        setTimeout(()=>{
            
            player.locked=false;
        }, 500);
    
        
     if(player.prevStage==='level6'){
            
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
        
        player.stage='level5';
        
        if(player.prevStage!=='level6'){
            
            this.props.onSetLoc(0,0);
        }
    }


    componentWillUnmount(){
        
        player.prevStage='level5';
        player.movingInit=false;
    }


    componentDidUpdate(){
        
       
        if(this.state.exit1){
             
             $('#level5').fadeTo(800, 0);
             
             setTimeout(()=>{
                 
                 this.props.history.push('/level4');
             },800)
             
        }
        
      
        if(this.state.exit2){
             
             $('#level5').fadeTo(800, 0);
             
             setTimeout(()=>{
                 
                 this.props.history.push('/level6');
             },800)
             
        }
        
        
        if(this.state.snakeClearMsg && ( ( (this.state.x===600 && this.state.y===480) || (this.props.playerX===600 && this.props.playerY===480) ) || ( (this.state.x===0 && this.state.y===0) || ( (this.props.playerX===0 && this.props.playerY===0) && this.props.mobileStatus) ) ) ){
             
            //this code probably needs to check if we are in mobile mode, because now it enters the block due to this.props.playerX===0 && this.props.playerY===0 (because it can be this easily when not playing mobile mode). For now, I put a block to the move function, turning snakeClearMsg into false if it is true...now snakeClearMsg turns false before checkLocation so we don't access this block anymore because of the mobile coordinates
            
             $('#infoBox').slideDown(1000).delay(3000).slideUp(1000);
            
        }
        
        
        if(this.state.snakeBiteMsg && !player.messages.includes('level5bite') ){
            
            
            player.messages.push('level5bite');
            
             $('#infoBox').slideDown(1000).delay(3500).slideUp(1000, function(){
                 
                 $('#infoBox').css({width:'', height:''});
             });
            
        }
        
        if(this.state.potionMsg && !player.messages.includes('level5potion') ){
            
            
            player.messages.push('level5potion');
            
             $('#infoBox').slideDown(1000).delay(1500).slideUp(1000);
            
        }
        
        if(this.state.treasureMsg && !player.messages.includes('level5treasure') ){
            
            
            player.messages.push('level5treasure');
            
             $('#infoBox').slideDown(1000).delay(1500).slideUp(1000);
            
        }
        
        if(this.state.msg && !player.messages.includes('level5enter') ){
            
            
            player.messages.push('level5enter');
            
             $('#infoBox').slideDown(1000).delay(2500).slideUp(1000);
            
        }
        
        
        if(this.state.antidoteMsg && !player.messages.includes('level5antidote') ){
            
            
            player.messages.push('level5antidote');
            
             $('#infoBox').slideDown(1000).delay(2000).slideUp(1000);
            
        }
        
        
        if( (this.state.antidoteSavedMsg && !player.messages.includes('level5antidoteSaved') ) || (this.state.antidotesavedMsg2 && !player.messages.includes('level5antidoteSaved2') ) ){
            
            
            player.messages.push('level5antidoteSaved');
            player.messages.push('level5antidoteSaved2');
            
             $('#infoBox').slideDown(1000).delay(2000).slideUp(1000);
            
        }
        
        
        
        
        
        
        if(player.stamina<=0 && !player.messages.includes('level5poisoned') ){
            
            player.stage='main';
            
            player.messages.push('level5poisoned');
            
            const infoText='You died of poison';
                
            $('#infoBox').text(infoText);
            
            $('#infoBox').slideDown(1000).delay(2000).slideUp(1000);
            
            
            setTimeout(()=>{
                
                this.props.onSetStart();
            
                this.props.history.push('/');
            }, 4000)
        }
        

        
        if(this.state.snakeBite && !this.state.antidote){
            
            if(this.poisoned===undefined){
                
                this.poisoned= setInterval(()=>{
                
                player.bitten();
                    
                this.props.onSetStamina(player.stamina);
                
                }, 1000)
            }
            

        }
        
        if(this.poisoned!==undefined && !this.state.snakeBite && !this.state.cleared){
            
            //clearing interval
            
            
            clearInterval(this.poisoned);
            
            this.setState({cleared:true});
           
        }
        
        
        this.checkLocation();
    }

  checkLocation=()=>{
      
            const getPlayer=document.getElementById('player');
               
            const currenLoc=getPlayer.getBoundingClientRect();
        
            const currentX=currenLoc.x;
                  
            const currentY=currenLoc.y;
      
      
      
//         if(this.state.snakeClearMsg){ //this didn't work as intended because move function triggered the snakeClearMsg before this block of code got chance to run and turn snakeClearMsg to false. I moved the functionality to the move function itself because it runs before checkLocation.
//            
//            console.log('left snake area');
//              
//              
//                if(this.state.x!==this.state.playerLocPreviousX || this.state.y!==this.state.playerLocPreviousY){
//                    
//                  
//                
//                    this.setState({playerLocPreviousX: this.state.x, playerLocPreviousY: this.state.y, snakeClearMsg: false});
//                }
//
//            
//            }
      
           
            
        if( ( (this.state.x===0 && this.state.y===0 && !this.props.mobileStatus && player.movingInit && (currentX===2 && currentY===2) ) || (this.props.playerX===0 && this.props.playerY===0 && this.props.mobileStatus && player.movingInit && (currentX===2 && currentY===2) ) ) && (!this.state.exit1)){
            
            if(!this.state.snakeBite){
              
                   this.props.onSetLoc(580, 0);
//                  player.stage='level5'; 
            
                        this.setState({exit1:true});
//                    this.props.history.push('/level4');
              
            } else{

              
                if( ( (this.state.x!==this.state.playerLocPreviousX || this.state.y!==this.state.playerLocPreviousY) && !this.props.mobileStatus && !this.state.snakeClearMsg) || ( (this.props.playerX!==this.state.playerLocPreviousX || this.props.playerY!==this.state.playerLocPreviousY) && this.props.mobileStatus && !this.state.snakeClearMsg) ){
                    
                const infoText='I need that antidote before continuing';
                
                $('#infoBox').text(infoText);
                    
                   
                if(!this.props.mobileStatus){
                    
                    this.setState({playerLocPreviousX: this.state.x, playerLocPreviousY: this.state.y, snakeClearMsg: true});
                    
                } else{
                    
                    this.setState({playerLocPreviousX: this.props.playerX, playerLocPreviousY: this.props.playerY, snakeClearMsg: true});
                }
                    

                
                }
                
            }
            
        }
      
      
         if( ( (this.state.x>0  || this.state.y>0) || ( (this.props.playerX>0  || this.props.playerY>0) && this.props.mobileStatus) ) && !this.state.msg && player.prevStage!=='level6'){
          
             
            const infoText=`You must be wise ${player.name}, we hope you can bring balance back to our world.`;
                
            $('#infoBox').text(infoText);
          
            this.setState({msg: true});
      }
      
      
      
      if( ( (this.state.x===600 && this.state.y===480) || ( (this.props.playerX===600 && this.props.playerY===480) && this.props.mobileStatus) ) && (!this.state.exit2)){
          
          if(!this.state.snakeBite){
                
                    this.setState({exit2:true});
//               this.props.history.push('/level6');
              
          } else{
  
              
              if( ( (this.state.x!==this.state.playerLocPreviousX || this.state.y!==this.state.playerLocPreviousY) && !this.props.mobileStatus && !this.state.snakeClearMsg) || ( (this.props.playerX!==this.state.playerLocPreviousX || this.props.playerY!==this.state.playerLocPreviousY) && this.props.mobileStatus && !this.state.snakeClearMsg) ){
  
              
               const infoText='I need that antidote before continuing';
                
                $('#infoBox').text(infoText);
                    
                    
                if(!this.props.mobileStatus){
                    
                    this.setState({playerLocPreviousX: this.state.x, playerLocPreviousY: this.state.y, snakeClearMsg: true});
                    
                } else{
                    
                    this.setState({playerLocPreviousX: this.props.playerX, playerLocPreviousY: this.props.playerY, snakeClearMsg: true});
                }
                  
              }
          }
          
         
     }
      
      
      
      
    if( ( (this.state.x===200 && this.state.y===400) || ( (this.props.playerX===200 && this.props.playerY===400) && this.props.mobileStatus) ) && !player.foundItems.includes('potion')){
          
        player.find({name: 'potion', description: ' got some health back', effect: 'health', power: 15});
        player.foundItems.push('potion');
        this.props.onSetHealth(player.health);
        
        this.setState({potionMsg:true})
     }
      
      
      
       if( ( (this.state.x===20 && this.state.y===420) || ( (this.props.playerX===20 && this.props.playerY===420) && this.props.mobileStatus) ) && !this.state.snakeBite && !this.state.snakeClear){
           
           if(!this.state.antidote){
               
                const infoText='You saw something shiny and picked up 20 coins. But then a snake attacked and bit you! I do not feel so good... There must be some antidote lying around here?!';
                
                $('#infoBox').text(infoText);
               
               $('#infoBox').css({width: '300px', height: '200px'});
               
                player.money+=20;
               
               this.props.onSetCoins(player.money);
               
                this.setState({snakeBite:true, snakeBiteMsg:true});
               
           }else{
               
                const infoText='Snake bit you! Luckily you had an antidote! You also saw something shiny and picked up 20 coins';
               
                player.money+=20;
               
                this.props.onSetCoins(player.money);
                
                $('#infoBox').text(infoText);
               
                this.setState({antidote:false, snakeClear: true, antidoteSavedMsg:true});
           }
           
     }
      
       if( ( (this.state.x===480 && this.state.y===60) || ( (this.props.playerX===480 && this.props.playerY===60) && this.props.mobileStatus) ) && !this.state.antidote){
           
           if(this.state.snakeBite){
               
               
               const infoText='You found antidote which removed snake poison!';
                
                $('#infoBox').text(infoText);
               
                this.setState({snakeBite:false, antidote: true, snakeClear:true, antidotesavedMsg2:true});
               
           } else{
               
                const infoText='You found antidote!';
                
                $('#infoBox').text(infoText);
               
                this.setState({antidote:true, antidoteMsg:true});

           }

          
           
     }
      
      if( ( (this.state.x>100 || this.state.y>100) || ( (this.props.playerX>100 || this.props.playerY>100) && this.props.mobileStatus) ) && !this.state.treasureMsg){
          
         
          
            const infoText='Legend says that there are treasures hidden in these fields.';
                
            $('#infoBox').text(infoText);
          
            this.setState({treasureMsg:true});
      }

      

     
    }


    createWorld=(tiles)=>{
        
         let imgStyle;
        
        return tiles.map(item=>{
            
            if(item.type==='sand'){
                
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
            
            return <img key={setKey} src={item.img} alt='grass' style={imgStyle} />;
  
        })
    }


    move=event=>{
        
        if(!player.locked){
            
        
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
                
                   
                if(this.state.snakeClearMsg){
                    
                    this.setState({x: setLocX, pDir:direction, playerLocPreviousX: setLocX, snakeClearMsg: false});
                } else{
                    
                    this.setState({x: setLocX, pDir:direction});
                }

                
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
                
                
                if(this.state.snakeClearMsg){
                    
                    this.setState({y: setLocY, pDir:direction, playerLocPreviousY: setLocY, snakeClearMsg: false});
                    
                } else {
                    
                     this.setState({y: setLocY, pDir:direction});
                }
                
               
               

            } else{
                
                this.setState({pDir:direction})
            }

        }
    
        }
    }
    
    
    render(){
        
        let poisoned;
        
        let mapGrass=new Array(192);
        


        
         for(let i=0;i<mapGrass.length; i++){
            
         mapGrass[i]={img:grassTile, id: i, type:'grass'};  

        }
        
        let mapSand=[{img:sandTile, id: 0, type: 'sand'}];
        
        const sand=this.createWorld(mapSand);
  
        
        const grass=this.createWorld(mapGrass);
        

        
        
        return(
        
            <div id='level5' className={classes.Body}>
                <Character movePlayer={this.move} direction={this.state.pDir} directionMobile={this.props.mobileDirectionStatus}/>
                {grass}
                {sand}
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
        mobileStatus: state.hide.mobile
    };
}


const mapDispatchToProps=dispatch=> {
    
    return {
        
        onSetLoc: (setX, setY)=> dispatch (actions.setLocation(setX, setY)),
//        onSetLevel: (level)=> dispatch (actions.setLevel(level)),
        onSetSpider: (value)=> dispatch(actions.setSpiderStatus(value)),
        onSetHealth: (value)=> dispatch(actions.setPlayerHealth(value)),
        onSetLoadDone: ()=> dispatch(actions.setLoadDone()),
        onSetStart: ()=> dispatch(actions.setGameStart()),
        onSetStamina: (value)=> dispatch(actions.setStamina(value)),
        onSetCoins: (value)=> dispatch(actions.setCoins(value))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Level5));