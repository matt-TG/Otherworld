import React, {Component} from 'react';

import Modal from '../../components/UI/modal/modal';

import Aux from '../auxilliary';


const withErrorHandler=(WrappedComponent, axios)=>{
    
    return class extends Component{
        
        state={
            error: null
        }
            
         componentWillMount(){//you could use componentWillMount here too, because currently we won't get error message if the error happens while the child components for WrappedComponent (burgerb.js in this case) try to render. This is because componentDidMount will execute here when the WrappedComponent will render, not necessarily its children. Only problem with componentWillMount is that it is outdated and won't be supported in the future. Option is to use constructor lifecycle hook.
             
             this.reqInteceptor=axios.interceptors.request.use(req=>{//here we are creating a class property
                 
                 this.setState({error: null}) 
                 return req;//this is needed with interceptors
             });
             
             this.resInterceptor=axios.interceptors.response.use(res=>res, error=>{//res=>res is basically same as return req above, but above we didn't use the second argument (error message) and here we use both, but we are only really interested in the error argument
                 
                 this.setState({error: error})
             });
         }
    
        componentWillUnmount=()=>{
            
            axios.interceptors.request.eject(this.reqInteceptor);//reference to class property object. This is clearing interceptor so it wouldn't stay in memory (and thus executing and giving false errors when the component doesn't exist anymore)
            axios.interceptors.response.eject(this.resInterceptor);
        }
            
        errorConfirmedHandler=()=>{
            
            this.setState({error: null}) 
        }
            
        
        render(){ 
            
        return (
        
            <Aux>
                <Modal checkout={this.state.error} modalClosed={this.errorConfirmedHandler}>
                    {this.state.error? this.state.error.message: null}
                </Modal>
                <WrappedComponent {...this.props}/>
            </Aux>
        );
            
        }

}

}

export default withErrorHandler;