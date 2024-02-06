import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../../shared/utility';


const initialState={
    
    px: 0,
    py: 0,
    loaded: false,
    loadLevel: '',
    loadSetDone: false,
    gameStarted: false,
    gameOver: false,
    setMobileDirection:'down',
    shopStatus: false
    //    latestLevel: 'level1',
}

const reducer=(state=initialState, action)=>{
    
    switch (action.type){
            
        case actionTypes.SET_PLAYER_CORD:
            
        return updateObject(state, {px: action.locx, py: action.locy})
            
            
        case actionTypes.SET_PLAYER_CORDX:
            
        return updateObject(state, {px: action.locx})
            
            
        case actionTypes.SET_PLAYER_CORDY:
            
        return updateObject(state, {py: action.locy})
            

//        case actionTypes.SET_LATEST_LEVEL:
//            
//         return updateObject(state, {
//             
//             latestLevel: action.level 
//         })
            
        case actionTypes.SET_LOADED:
            
         return updateObject(state, {
             
             loaded: true,
             loadLevel: action.level
             
         })
            
        case actionTypes.SET_LOAD_DONE:
            
         return updateObject(state, {
             
             loadSetDone: !state.loadSetDone
             
         })
            
        case actionTypes.SET_GAME_STARTED:
            
         return updateObject(state, {
             
             gameStarted: !state.gameStarted
             
         })
            
        case actionTypes.SET_GAME_OVER:
            
         return updateObject(state, {
             
             gameOver: !state.gameOver
             
         })
            
        case actionTypes.SET_MOBILE_DIRECTION:
            
         return updateObject(state, {
             
             setMobileDirection: action.direction
             
         })
            
            
        case actionTypes.SET_SHOP_STATUS:
            
         return updateObject(state, {
             
             shopStatus: !state.shopStatus
             
         })
        

        default:
        return state;  
            
    }
    
}
export default reducer;