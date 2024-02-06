import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';


export const fetchHSC= (data)=>{
    
    return {
      
      type: actionTypes.FETCH_HSC,
      highScores: data
  };  
}

export const fetchFail= (error)=>{
    
    return {
      
      type: actionTypes.FETCH_FAIL,
      error: error
  };  
}


//export const saveHSC= (data)=>{
//    
//    console.log('saveHSC action data:', data)
//    
//    return {
//      
//      type: actionTypes.SET_HSC,
//      setHSC: data
//  };  
//}


export const fetchHighScores=()=>{
 

 return dispatch=>{
     
     
        axios.get('/hsc.json').then(response=>{
                
            const deeper=Object.values(response.data);
                
            const nextLevel=deeper[0];
            
        
            if(nextLevel.includes('empty')){
        
                    
                   //empty hsc')
                    
               
                    
                    dispatch(fetchHSC([]));
                    
            } else{

                    dispatch(fetchHSC(nextLevel));
                }

         
        }).catch(error=>{
            
            dispatch(fetchFail(error));
        })
     
 }  
 
};


//export const sendSaveInfo=(saveData, token)=>{
// 
//
// return dispatch=>{
//        
//         dispatch(saveStart());
//     
//        axios.post('/save.json/?auth=' +token, saveData).then(response=>{
//        
//        dispatch(saveSuccess(saveData));
//            
//    }).catch(error=>{
//        
//        dispatch(saveFail(error));
//    })
//     
// }  
//};