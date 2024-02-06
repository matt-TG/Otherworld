import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';



const initialState={
    
       orc: true,
        giantSpider: true,
        shark: true

}

const reducer=(state=initialState, action)=>{
    
    switch (action.type){
            
        case actionTypes.ORC_STATUS:
            
            return updateObject(state, {orc: action.value})
            

            
        case actionTypes.SPIDER_STATUS:
            
            return updateObject(state, {giantSpider: action.value})
            
            
        case actionTypes.SHARK_STATUS:
            
            return updateObject(state, {shark: action.value})
            
        default:
            return state;
    }
}

export default reducer;