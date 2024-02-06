import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';



export const fetchSuccess= (data)=>{
    
    return {
      
      type: actionTypes.FETCH_SUCCESS,
      loadGameData: data
  };  
}

export const setKey= (data)=>{
    
    return {
      
      type: actionTypes.SET_KEY,
      key: data
  };  
}

export const fetchFail= (error)=>{
    
    return {
      
      type: actionTypes.FETCH_FAIL,
      error: error
  };  
}

export const fetchStart= ()=>{
    
    return {
      
      type: actionTypes.FETCH_START
  }; 
}
    


export const fetch=(token, userId)=>{
 

 return dispatch=>{
     
     dispatch(fetchStart());
    
     
     const queryParams ='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"'; // this didn't work for some reason but gave an error. I copied the code above from the instructor
     

     
//     const queryParams ='?auth='+userId;
     
     axios.get('/save.json'+queryParams).then(response=>{//token comes from orders.js. Other way to get access to this state property is by getState() but that wasn't not recommended by the instructor
            

         
            const fetched={...response.data};
         
         const deeper=Object.values(fetched);

         
         const deeper2=deeper['0'].data;


             dispatch(fetchSuccess(deeper2));
         
        }).catch(error=>{
            
            dispatch(fetchFail(error));
        })
     
 }  
 
};


export const initSaveKey=(token, userId)=>{
 

 return dispatch=>{
     
     dispatch(fetchStart());
     
     const queryParams ='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"'; // this didn't work for some reason but gave an error. I copied the code above from the instructor
     

     
//     const queryParams ='?auth='+userId;
     
     axios.get('/save.json'+queryParams).then(response=>{//token comes from orders.js. Other way to get access to this state property is by getState() but that wasn't not recommended by the instructor
            
        const fetched={...response.data};
         
        const randomKey=Object.keys(fetched);
         
        const randomHit=randomKey[0];
         
         

             dispatch(setKey(randomHit));
         
        }).catch(error=>{
            
            dispatch(fetchFail(error));
        })
     
 }  
 
};


//export const checkStatus=(value)=>{
//    
//    return dispatch=>{
//    
//    
//    
//         axios.get('/drivers.json').then(response=>{//token comes from orders.js. Other way to get access to this state property is by getState() but that wasn't not recommended by the instructor
//            
//          
//                    
//                localStorage.setItem('existing', value);
//                
//              
//                
//                dispatch(setExistingUser(value)); //this isn't actually needed in case you just check if there is an item in localStorage called "existing". Using Redux states to determine wether or not some Routes are accesible and Navlinks shown isn't the best way in case the user refreses the site for some reason, in which case the states' reset to their defaults.
//            
//             
//        }).catch(error=>{
//            
//            dispatch(fetchDriversFail(error));
//        })
//        
//    }
//}

export const existingStatusUpdate=(userId)=>{
    
    return dispatch=>{
        
         axios.get('/drivers.json').then(response=>{
                
                
                let existingUser=response.data;
                
                let userIds=[];
                
              
                
                for(let key in existingUser){
                    
                    userIds.push(existingUser[key].userId);
                }
                
              
                
                const checkRegistration=userIds.filter(user=> {
                    
                
                    
                    return user === userId;
                })
                
            
                
                let registeredUser=false;
                
                if(checkRegistration.length >= 1){
                    
                    
                    registeredUser=true;
                    
                 
                    dispatch(setExistingUser(registeredUser));
                }
                
                dispatch(setExistingUser(registeredUser));
                
                
            }).catch(error=>{
            
            dispatch(fetchFail(error));
        })
    }
}


export const setExistingUser= value=>{
    
    return {
      
      type: actionTypes.SET_STATUS,
      value: value
  };  
}