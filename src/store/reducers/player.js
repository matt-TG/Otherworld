import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';



const initialState={
    
        playerHealth: 100,
        inventory:[],
        playerMoving:false,
        answered: false,
        coins:10,
        stamina:24

}

const reducer=(state=initialState, action)=>{
    
    switch (action.type){
            
        case actionTypes.SET_PLAYER_HEALTH:
            
            return updateObject(state, {playerHealth: action.value})
            
            
        case actionTypes.SET_PLAYER_INVENTORY:
            
            return updateObject(state, {inventory: action.inventory})
            
            
          case actionTypes.SET_PLAYER_MOVING:
            
            return updateObject(state, {playerMoving: !state.playerMoving})
            
            
        case actionTypes.SET_ANSWERED:
            
            return updateObject(state, {answered: action.status})
            
            
        case actionTypes.SET_STAMINA:
            
            return updateObject(state, {stamina: action.value})
            
            
        case actionTypes.SET_COINS:
            
            return updateObject(state, {coins: action.value})

            
        default:
            return state;
    }
}

export default reducer;