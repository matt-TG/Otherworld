import * as actionTypes from './actionTypes';

import {player} from '../../components/character/charStats';



export const setPlayerHealth= (value)=>{
    
    if(value>100){
        
        value=100;
        player.health=100;
    }
    
    return {
      
      type: actionTypes.SET_PLAYER_HEALTH,
        value:value.toFixed(2)
    
  }; 
}


export const setStamina= (value)=>{
    
    return {
      
      type: actionTypes.SET_STAMINA,
        value:value
    
  }; 
}


export const setCoins= (value)=>{
    
    return {
      
      type: actionTypes.SET_COINS,
        value:value
    
  }; 
}


export const setPlayerInventory= (inv)=>{
    
    return {
      
      type: actionTypes.SET_PLAYER_INVENTORY,
        inventory:inv
    
  }; 
}

export const setPlayerMoving= ()=>{
    
    return {
      
      type: actionTypes.SET_PLAYER_MOVING
    
  }; 
}

export const setAnswered= (value)=>{
    
    return {
      
      type: actionTypes.SET_ANSWERED,
        status: value
    
  }; 
}