import axios from 'axios';

const instance=axios.create({
    
    baseURL: 'https://tofother.firebaseio.com/',
    
});

instance.defaults.headers.common['Authorization']='AUTH TOKEN FROM INSTANCE';

//Interceptors if you need them
//instance.interceptors.

export default instance;