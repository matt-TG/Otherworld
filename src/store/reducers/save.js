import * as actionTypes from '../actions/actionTypes';

const initialState={
    
    saves: [],
    loading: false,
    registered: false //means that when this is true, the user has already filled in and submitted the driver data
}

const reducer=(state=initialState, action)=>{
    
    switch (action.type){
            
        case actionTypes.SAVE_INIT:
            
            return{
                
                registered: true
            }
            
            
        case actionTypes.SAVE_START:
            return{
                
                ...state,
                loading: true,
                
            }
            
        case actionTypes.SAVE_SUCCESS:
            
            const newSave={
                
                ...action.saveData
            }
            
            return {
                
               ...state,
                loading:false,
                registered: !state.registered,
                saves: state.saves.concat(newSave)
            }
            
        case actionTypes.SAVE_FAIL:
            return {
                
                ...state,
                loading: false
            }
            
            
        default:
            return state;
    }
}

export default reducer;