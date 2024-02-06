import React, {useEffect}  from 'react';

import classes from './healthBar.css';

import {player} from '../character/charStats';

import {connect} from 'react-redux';

import {withRouter} from 'react-router-dom';

import * as actions from '../../store/actions/exporter';

import Aux from '../../hoc/auxilliary';

import $ from 'jquery';


const HealthBar=(props)=>{
    
    useEffect(()=>{
        
        const health=document.getElementById('health');
        health.style.backgroundColor='red';
//        health.style.background='linear-gradient(to right, red, white '+props.healthP+'%)';
    }, [])
    
    useEffect(()=>{
        
        const health=document.getElementById('health');
       health.style.background='linear-gradient(to right, red, white '+player.health+'%)';
        
        if(props.playerHealth<=0){
            
            
            
            const addText=' The secrets of the Otherworld are left undiscovered for now... Game Over!';
            
            const currentText=('#infoBox').text();
            
            const newText=currentText+addText;
            
            $('#infoBox').text(newText);
            
//            props.onSetStart();
//            props.history.push('/');
        }
        
    }, [props.playerHealth])
    
    
    return(
        
        <Aux>
        
        <div id='health' className={classes.Wrapper}>
    
            <div className={classes.HealthNumber}>{props.playerHealth}</div>
        
        </div>
        
        <div className={classes.MoreInfo}>
            <div className={classes.Stamina}>Stamina: <span>{props.playerStamina}</span></div>
            <div className={classes.Coins}>Coins: <span>{props.playerCoins}</span></div>
        </div>
        
        </Aux>
    );
};

const mapStateToProps=state=>{//mapStateToProps is commonly used name, but you could name it differently. The state is Redux state. Note: create this constant after the class above
    
    return {
        
        playerHealth: state.player.playerHealth,
        playerStamina: state.player.stamina,
        playerCoins: state.player.coins
    };
}

const mapDispatchToProps=dispatch=> { //this isn't really needed here, because I don't use any of these atm
    
    return {
        
        onSetHide: ()=> dispatch(actions.hideInv()),
        onSetInventory: (inv)=> dispatch(actions.setPlayerInventory(inv)),
        onSetHealth: (value)=> dispatch(actions.setPlayerHealth(value)),
        onSetStart: ()=> dispatch(actions.setGameStart())
        
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HealthBar));