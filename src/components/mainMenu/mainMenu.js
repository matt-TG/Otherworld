import React, {useEffect} from 'react';

import classes from './mainMenu.css';

import {withRouter} from 'react-router-dom';

import {player, stopMusic, playMusic} from '../character/charStats';

import {connect} from 'react-redux';

import * as actions from '../../store/actions/exporter';

import axios from '../../axios-orders';

//import {nameMe} from '../character/charStats';

import Aux from '../../hoc/auxilliary';

import MainLogo from '../../assets/Images/TalesLogo.png';

import $ from 'jquery';

import InfoIcon from '../../assets/Images/info-icon.png';




const Main=(props)=>{

    
        useEffect(()=>{
            
            //did Mount
            
//            if(player.stamina<=0){
//                
//                $('#mainLogo').show();
//            }
            
            $('#mainLogo').css('user-select', 'none');
            
            
             if( (player.prevVisitedPage==='info' && $('#startBox').css('display')==='none') || player.stamina<=0 || player.health<=0 || props.gameOverStatus){
                 
               
               $('#signIn').css('z-index', 0);
            }
            
            if( ( (player.prevVisitedPage==='info' || player.prevVisitedPage==='auth') && $('#startBox').css('display')==='none') || (player.stamina<=0 || player.health<=0 || props.gameOverStatus) ){
                
                
                $('#startBtn').css('z-index', 1);
            }
            
            if(player.prevVisitedPage==='info'){
                
                
                if($('html').css('overflow-y')==='scroll'){
                    
                    $('html').css('overflow-y', 'hidden');
                }
            }

            
            document.querySelector('html').style.backgroundColor='floralwhite';
            
            
            if($('#startBox').css('display')!=='none' && !props.gameOverStatus && $('#startBox').css('display')!==undefined && $('#startBox').css('display')!=='block'){
                
 
                
                $('#mainLogo').hide();
                
            }
 
         
        if(props.isLogged){
            
            //isLogged=true
            

            
            if(props.currentSaveKey==='empty'){
                
                props.onSetKey(props.token, props.userId);
            }
        
            
            if( (player.stamina<=0 || player.health<=0 || props.gameOverStatus) && player.prevVisitedPage!=='auth'){
                
                //game over, check hsc
                
                gameOverHSC();
                
            } else{
                
                //game is not over but starting...
                
                retriveOnStartUp();
            }
            
            if(props.stateloadSetDone){
                
                props.onSetLoadDone(); //this is needed in case player loads a game and then dies and then loads the game again...otherwise the coordinates setting condition wouldn't pass (requires stateloadSetDone State to be false)
            }

        }
            
            //NOTE: 
            
            if(player.prevVisitedPage!=='auth' && player.prevVisitedPage!=='info'){
                
                stopMusic();
        
            if(player.stamina<=0 || player.health<=0){
                
                playMusic('deadTune');
            
            
            }
            
            if(props.gameOverStatus){
                
                
                 playMusic('mainTune');
   
            }
                
            }
  
       
            
    }, [])
    
    
    
    
    const retriveOnStartUp=()=>{
    
        props.onInitHSC();
    }
    
    const GoToInfo=()=>{
        
        props.history.push('/info');
    }
    
    
    const gameOverHSC=()=>{
        
                        
                if(props.hscDataStatus.length<5 && ( (player.stamina<=0 || player.health<=0) || props.gameOverStatus) && props.isLogged){
                    
                    //there are less than 5 entries in the hsc
                    
                    let hocArr=props.hscDataStatus;
                    alert('Congratulations, you made it to top 5!');
                    const yourName=prompt('What name do you want to use in the high score list?');
                    hocArr.push({name:yourName, score: player.xp});
                    
                    const resultArray=hocArr.sort((a, b) => Number(b.score) - Number(a.score));
                    
                    axios.delete('/hsc.json/?auth=' +props.token).then(response=>{
        
                        //old high scores deleted

                    }).catch(error=>{

                        alert(error);
                    })
                    
                    setTimeout(()=>{
                        
                        axios.post('/hsc.json/?auth=' +props.token, resultArray).then(response=>{
        
                        //high scores posted

                        }).catch(error=>{

                        alert(error);
                            
                        }) 
                        
                    }, 2000);
                    
                  
                    
                } else if(props.hscDataStatus.length===5 && ((player.stamina<=0 || player.health<=0) || props.gameOverStatus) && props.isLogged){
                    
                    //there are 5 entries in hsc, comparing...
                    
                    let isBetterScore=false;
                    
                    //points:', player.xp)
                    
                    for(let i=0; i<props.hscDataStatus.length; i++){
                        
                        if(player.xp>props.hscDataStatus[i].score){
                            
                            isBetterScore=true;
                        } 
                    }
                    
                    if(isBetterScore){
                        
                        //your score is better than one of the old scores
                        
                        axios.delete('/hsc.json/?auth=' +props.token).then(response=>{

                           //old high scores deleted

                        }).catch(error=>{

                            alert(error);
                        })
                        
                        
                        setTimeout(()=>{
                            
                            const newName=prompt('Congratulations, your score is high enough for the high score list!, What is your name?');

                            let newHigh={name:newName, score:player.xp};

                            let arrayToBeSorted=props.hscDataStatus;
                            arrayToBeSorted.push(newHigh);

                            const resultArray=arrayToBeSorted.sort((a, b) => Number(b.score) - Number(a.score));

                            resultArray.pop();
                            
//                            props.onSaveHSC(resultArray);
                            
                            axios.post('/hsc.json/?auth=' +props.token, resultArray).then(response=>{
                                
                                //updated Redux state for hsc

                            }).catch(error=>{

                                alert(error);
                            }) 
                            

                        }, 2000)
                        
       
                    }
               
                }
        setTimeout(()=>{
            
            retriveOnStartUp();
        }, 2500)             
        
    }
    
    
    
    const startGame=()=>{
        
        if($('#startBox').css('display')==='none' || (player.name!=='' && player.weapon!=='') ){
        
        player.health=100;
        player.maxHealth=100;
        player.inventory=[];
        player.stamina=24;
        player.maxStamina=24;
        player.level=1;
        player.xp=0;
        player.money=10;
        player.riddles=[];
        player.equipped=[];
        player.enemies=[];
        player.prevStage='main';
        player.newGameInit();
        player.messages=[];
        player.prevVisitedPage='main';
//        props.onSetSpider(true);
//        props.onSetOrc(true);
//        props.onSetShark(true);
        props.onSetStamina(player.stamina);
        props.onSetCoins(player.money);
        props.onSetHealth(100);
        props.onSetInventory([]);
        props.onSetLoaded('menu');
            
//        props.onSetLoadDone(); //not sure what was the idea of this, but it caused not loading proper coordinates in savegame in case you signed in and loaded a game after you had started a game without logging in and then died. (now also logout component will set this Redux state into false in case it is true when logging out)...I could keep this if I use this action in every place where player gets pushed back to main menu(dying).
            
        props.onSetStart();
        
        if(props.gameOverStatus){
            
            props.onSetGameOver();
        }

        props.history.push('/level1');
            
        } else{
            
            alert('cannot start a game without entering your name and weapon');
        }
    }
    
    
  
    let listContentsHsc=null;
    
    let reduxStatus=props.hscDataStatus;
    

    
    let hscStyles=[classes.HOC, classes.HOCShow];
    
    
        
        if(reduxStatus.length<1){
            
            hscStyles=[classes.HOC, classes.HOCHide];
        }

        if(reduxStatus.length>0){
            
            //mapping Redux hsc state into list items

            listContentsHsc= props.hscDataStatus.map( (item, i)=>{
                
                return <li key={i}>name: {item.name} - score: {item.score}</li>
            });
        }

    
    return(
        
        <Aux>
        
    
        <div>
            <button id="startBtn" className={classes.Start} onClick={startGame}>New Game</button>
        </div>
        
        
            <div className={classes.LogoWrap}>
                <div>
                    <div>
                        <img id='mainLogo' src={MainLogo} className={classes.MainImg} alt='TofOW'/>
                    </div>
                </div>
            </div>
        
        
        {props.isLogged?<ol className={hscStyles.join(' ')}>
            
            {listContentsHsc}
        
        </ol>:null}

        <div className={classes.GoInfo} onClick={GoToInfo}><img src={InfoIcon} alt='info'/></div>
   
        </Aux>
    );
};

const mapStateToProps=state=>{//mapStateToProps is commonly used name, but you could name it differently. The state is Redux state. Note: create this constant after the class above
    
    return {
        isLogged: state.auth.token !== null,
        token: state.auth.token,
        hscDataStatus: state.hsc.hscData,
        userId: state.auth.userId,
        currentSaveKey: state.fetch.saveKey,
        gameOverStatus: state.location.gameOver,
        stateloadSetDone: state.location.loadSetDone
    };
}

const mapDispatchToProps=dispatch=> {
    
    return {
        
        onSetSpider: (value)=> dispatch(actions.setSpiderStatus(value)),
        onSetOrc: (value)=> dispatch(actions.setOrcStatus(value)),
        onSetShark: (value)=> dispatch(actions.setSharkStatus(value)),
        onSetHealth: (value)=> dispatch(actions.setPlayerHealth(value)),
        onSetInventory: (inv)=> dispatch(actions.setPlayerInventory(inv)),
        onSetLoaded: (stage)=> dispatch(actions.setLoaded(stage)),
        onSetLoadDone: ()=> dispatch(actions.setLoadDone()),
        onSetStart: ()=> dispatch(actions.setGameStart()),
        onInitHSC: ()=>dispatch(actions.fetchHighScores()),
        onSetKey: (token, userId)=>dispatch(actions.initSaveKey(token, userId)),
        onSetGameOver: ()=>dispatch(actions.setGameOver()),
        onSetStamina: (value)=> dispatch(actions.setStamina(value)),
        onSetCoins: (value)=> dispatch(actions.setCoins(value)),

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main));