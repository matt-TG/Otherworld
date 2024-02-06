import * as actionTypes from './actionTypes';



export const setOrcStatus= (value)=>{
    
    return {
      
      type: actionTypes.ORC_STATUS,
        value:value
    
  }; 
}

export const setSpiderStatus= (value)=>{
    
    return {
      
      type: actionTypes.SPIDER_STATUS,
        value:value
    
  }; 
}

export const setSharkStatus= (value)=>{
    
    return {
      
      type: actionTypes.SHARK_STATUS,
        value:value
    
  }; 
}

//export const setFilterKey= (what)=>{
//    
//    return {
//      
//      type: actionTypes.SET_FILTER_KEY,
//        what:what
//  }; 
//}

//export const setData= (data)=>{
//    
//    return {
//      
//      type: actionTypes.SET_DATA,
//        data:data
//  }; 
//}
