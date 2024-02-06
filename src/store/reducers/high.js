import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';



const initialState={
    
       hscData: []

}

const reducer=(state=initialState, action)=>{
    
    switch (action.type){
            
            
        case actionTypes.FETCH_HSC:
            
            return updateObject(state, {hscData: action.highScores})
            
            
//        case actionTypes.SET_HSC:
//            
//            return updateObject(state, {hscData: action.setHSC})
            

            
        default:
            return state;
    }
}

export default reducer;