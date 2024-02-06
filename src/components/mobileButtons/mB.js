import React  from 'react';

import classes from './mB.css';

import {player} from '../character/charStats';

import {connect} from 'react-redux';

import * as actions from '../../store/actions/exporter';

import $ from 'jquery';

//import arrow from '../../assets/Images/arrowmpUp.png'; //was just testing


const mobileButtons=(props)=>{
    
//    useEffect(()=>{
//        
//        const health=document.getElementById('health');
//        health.style.backgroundColor='red';
////        health.style.background='linear-gradient(to right, red, white '+props.healthP+'%)';
//    }, [])
//    
//    useEffect(()=>{
//        
//        const health=document.getElementById('health');
//       health.style.background='linear-gradient(to right, red, white '+player.health+'%)';
//        
//        if(props.playerHealth<=0){
//            
//            alert('The secrets of the Otherworld are left undiscovered for now... Game Over!');
//            props.history.push('/');
//        }
//        
//    }, [props.playerHealth])
    
    const movePlayer=event=>{
        
        if(player.closeInfoBox){
            
            $('#infoBox').stop().fadeOut(2000, function(){
                
                player.closeInfoBox=false;
            });
        }
        
        if(!player.locked){ //prevents player from moving when in battle
            
        
        if(!player.movingInit){
            
            player.movingInit=true;
        }
        
        let restrictionX=600;
        let restrictionY=480;
        
        if(!props.mobileStatus){
            
             props.onSetMobile();
        }
        
        if(player.stage==='shop1' || player.stage==='shop2'){
            
            restrictionX=280;
            restrictionY=260;
        }

        
        const getPlayer=document.getElementById('player');
    
        
        let location= getPlayer.getBoundingClientRect();
        
     
        
        let newLocation;
        getPlayer.style.position='absolute'
        
        
        if(event.target.value==='left' || event.target.value==='right'){
            
            if(event.target.value==='left'){
                
                
                if(props.playerX>0){
                    
                    newLocation=(location.x -22)+'px';
      
                }
                
                
                if( (player.stage==='shop1' || player.stage==='shop2') && ( ( (props.playerX===40 && props.playerY===260) || (props.playerX===40 && props.playerY===240 ) ) || ( (props.playerX===40 && props.playerY===0) || (props.playerX===40 && props.playerY===20) ) ) ){
                
                    newLocation=undefined;
                }
    
            
        } else if(event.target.value==='right'){
            
            
            if(props.playerX<restrictionX){
   
                newLocation=(location.x +18)+'px'; 
    

            }
            
            
            if( (player.stage==='shop1' || player.stage==='shop2') && ( ( (props.playerX===240 && props.playerY===0) || (props.playerX===240 && props.playerY===20 ) ) || ( (props.playerX===240 && props.playerY===260) || (props.playerX===240 && props.playerY===240) ) ) ){
                  
                   newLocation=undefined;
                  
              }  else if( (player.stage==='shop1' || player.stage==='shop2') && (props.playerX===220) && (props.playerY>=120 && props.playerY<= 160)){
                  
                  newLocation=undefined;
                  
              }
            
        }
            
            
        
            if(newLocation!==undefined){
                
                getPlayer.style.left=newLocation;
            
//                props.onSetMoving();
                
                const setLocX= Number(newLocation.slice(0, newLocation.length-2));
                
                props.onSetLocX(setLocX);
                
                if(event.target.value==='left'){
                    
                    props.onSetMobDir('left');
                    
                } else if(event.target.value==='right'){
                    
                    props.onSetMobDir('right');
                }
                
            } else{
                
                 if(event.target.value==='left'){
                    
                    props.onSetMobDir('left');
                     
                } else if(event.target.value==='right'){
                    
                    props.onSetMobDir('right');
                }
            }
           
            
        }
        
        
        if(event.target.value==='up' || event.target.value==='down'){
            
            
            
            if(event.target.value==='up'){
                
                
                if(props.playerY>0){
                
                    newLocation=(location.y -22)+'px';
               
     
            }
                
                if( (player.stage==='shop1' || player.stage==='shop2') && ( ( (props.playerX===0 && props.playerY===40) || (props.playerX===20 && props.playerY===40) ) || ( (props.playerX===280 && props.playerY===40) || (props.playerX===260 && props.playerY===40) ) ) ){
                        
                        newLocation=undefined;
                        
                    } else if( (props.playerX>=240 && props.playerY===180) && (player.stage==='shop1' || player.stage==='shop2') ){
                        
                        newLocation=undefined;
                        
                    }
           
            
        } else if(event.target.value==='down'){
            
 
            
            if(props.playerY<restrictionY){
                
                newLocation=(location.y +18)+'px';
                
            }
            
                if( (player.stage==='shop1' || player.stage==='shop2') && ( ( (props.playerX===0 && props.playerY===220) || (props.playerX===20 && props.playerY===220 ) ) || ( (props.playerX===280 && props.playerY===220) || (props.playerX===260 && props.playerY===220) ) ) ){
                    
                    newLocation=undefined;
                    
                } else if( (props.playerX>=240 && props.playerY===100) && (player.stage==='shop1' || player.stage==='shop2') ){
                    
                    newLocation=undefined;
                    
                }
            
        }
            
            if(newLocation!==undefined){
                
                getPlayer.style.top=newLocation;
            
//               props.onSetMoving();
                
                const setLocY= Number(newLocation.slice(0, newLocation.length-2));
                
                props.onSetLocY(setLocY);
                
                if(event.target.value==='up'){
                    
                    props.onSetMobDir('up');
                    
                } else if(event.target.value==='down'){
                    
                    props.onSetMobDir('down');
                }

            } else{
                
                   if(event.target.value==='up'){
                    
                    props.onSetMobDir('up');
                } else if(event.target.value==='down'){
                    
                    props.onSetMobDir('down');
                }
            }

        }
            
    }
        
    }
    
    
    return(
        
        <div className={classes.Buttons}>
    
            <button id='aL' className={classes.EachH} value='left' onClick={movePlayer}>←</button>
            <button id='aR' className={classes.EachH} value='right' onClick={movePlayer}>→</button>
            <button id='aU' className={classes.EachV} value='up' onClick={movePlayer}>↑</button>
            <button id='aD' className={classes.EachV} value='down' onClick={movePlayer}>↓</button>
        
        </div>
    );
};

const mapStateToProps=state=>{//mapStateToProps is commonly used name, but you could name it differently. The state is Redux state. Note: create this constant after the class above
    
    return {
        
        gameStartStatus: state.location.gameStarted,
        playerX: state.location.px,
        playerY: state.location.py,
        mobileStatus: state.hide.mobile
    };
}

const mapDispatchToProps=dispatch=> {
    
    return {
        
        onSetMoving: ()=> dispatch(actions.setPlayerMoving()),
        onSetMobDir:(dir)=> dispatch(actions.setMobDirection(dir)),
        onSetLocX: (setX)=> dispatch (actions.setLocationX(setX)),
        onSetLocY: (setY)=> dispatch (actions.setLocationY(setY)),
        onSetMobile: ()=> dispatch (actions.setMobile())
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(mobileButtons);