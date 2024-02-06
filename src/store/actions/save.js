import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';


export const saveSuccess= (saveData)=>{
    
    return {
      
      type: actionTypes.SAVE_SUCCESS,
      saveData: saveData
  };  
}

export const saveFail= (error)=>{
    
    return {
      
      type: actionTypes.SAVE_FAIL,
      error: error
  };  
}

export const saveStart=()=>{
    
    return{
        
        type: actionTypes.SAVE_START
    }
}

export const sendSaveInfo=(saveData, token, userId, key)=>{
 

 return dispatch=>{
        
         dispatch(saveStart());
     
//        const queryParams ='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"'; //need to figure out how to se queryParams in case of deleting data by userId
     
//        const queryParams ='?auth='+token;
     
     
        axios.delete(`/save/${key}.json/?auth=${token}`).then(response=>{//this or '/save/'+key+'.json' doesn't work...
        
            //old save deleted')

        }).catch(error=>{
            
            //Oops, deleting old save did not work')

            console.log('Oops, deleting old save did not work'); //error
        })
     
     
     
        axios.post('/save.json/?auth=' +token, saveData).then(response=>{
            
//            console.log(response.name, response.data.name)
        
        dispatch(saveSuccess(saveData));
            
    }).catch(error=>{
        
        dispatch(saveFail(error));
    })
     
 }  
};

//?auth=' +token


export const saveInit=()=>{
    
    return{
        
        type: actionTypes.SAVE_INIT
    }
}