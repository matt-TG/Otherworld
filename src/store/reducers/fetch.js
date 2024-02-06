import * as actionTypes from '../actions/actionTypes';

const initialState={
    
    data: [],
    loading: false,
    existing: null,
    saveKey: 'empty'
}

const reducer=(state=initialState, action)=>{
    
    switch (action.type){
            
        case actionTypes.FETCH_START:
            return{
                
                ...state,
                loading:true
            }
                
            
        case actionTypes.FETCH_SUCCESS:
            return{
                
                ...state,
                data: action.loadGameData,
                loading: false
            }
                
            
        case actionTypes.FETCH_FAIL:
            return{
                
                ...state,
                loading: false, //could handle action.error here also, but then we would need another state property and would need to use it in the right component. Not smart to turn loading to true either because then it would just load without the user knowing what is happening
            }
            
        case actionTypes.SET_STATUS:
            return{
                
                ...state,
                existing: action.value
            }
            
        case actionTypes.SET_KEY:
            return{
                
                ...state,
                saveKey: action.key
            }
            
        default:
            return state;
    }
}

export default reducer;