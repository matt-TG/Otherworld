import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/button/button';

import classes from './auth.css';

import * as actions from '../../store/actions/exporter';

import {connect} from 'react-redux';

import Spinner from '../../components/UI/Spinner/spinner';

//import {Redirect} from 'react-router-dom';

import {updateObject} from '../../shared/utility';

import {withRouter} from 'react-router-dom';

import {player} from '../../components/character/charStats';

//import $ from 'jquery';


class Auth extends Component {
    
    state={
            
            controls: {
                
                email: {
            
                    elementType: 'input',
                    elementConfig: {
                
                        type: 'email',
                        placeholder: 'Your email'
            },
                    
                value:'',
                validation: {
                
                    required: true,
                    isEmail: true
            },
                    
                valid: false,
                touched: false
                    
            },
                
                password: {
            
                    elementType: 'input',
                    elementConfig: {
                
                        type: 'password',
                        placeholder: 'Password'
            },
                    
                value:'',
                validation: {
                
                    required: true,
                    minLength: 6
            },
                    
                valid: false,
                touched: false
                    
            },
                
            },
            
            isSignup: true
            
        }

    componentDidMount(){
        
        player.prevVisitedPage='auth';
        
        document.querySelector('html').style.backgroundColor='white';
        
            player.health=player.maxHealth;
            player.stamina=24;
            
            if(this.props.gameOverStatus){
                this.props.onSetGameOver();
            }
           
        this.props.onSetSignInHide();
            
    }

componentDidUpdate(){
    
      if(this.props.isLogged){
          
          this.props.history.push('/');
      }
}





    checkValidity ( value, rules ) {
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //Regexp, 
            isValid = pattern.test( value ) && isValid // https://www.w3schools.com/jsref/jsref_regexp_test.asp , returns true or false
        }

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    }

inputChangedHandler(event, controlName){
    
    //TRADITIONAL WAY
    
//    const updatedControls= {
//        
//        ...this.state.controls,
//        [controlName]: {
//            
//            ...this.state.controls[controlName],
//            value: event.target.value,
//            valid:this.checkValidity(event.target.value, this.state.controls[controlName].validation),
//            touched: true
//        }
//    }
//    this.setState({controls: updatedControls});
//}

    //WITH UPDATEOBJECT HELPER FUNCTION (SEE shared/utility.js, we used this helper function in reducers/auth.js also)
    
    const updatedControls= updateObject(this.state.controls, {
        
        [controlName]: updateObject(this.state.controls[controlName], {
            
            value: event.target.value,
            valid:this.checkValidity(event.target.value, this.state.controls[controlName].validation),
            touched: true
        })
    })
    
    this.setState({controls: updatedControls});

}

submitHandler=(event)=>{
    
    event.preventDefault();
    const singedUp=this.state.isSignup;
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, singedUp);
}

  switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }
    
    render(){
        
        const formElementsArray=[];
        
        for (let key in this.state.controls){
            
            formElementsArray.push({
                
                id: key,
                config: this.state.controls[key]
            })
        }
        
        let form= formElementsArray.map(formElement=>{
            
                    return <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value} 
                    changed={(event)=>this.inputChangedHandler(event, formElement.id)}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    />
            
                    })
        
        if(this.props.loading){
            
            form=<Spinner/>;
        }
            
            let errorMessage=null;
            
            if(this.props.error){//error property in the state is an object that contains path error.message provided by the Firebase response object. This dooesn't check if it's value is true but if it exists (initial value is null in which case it would be false, in case the loading fails, we set an value to it (response error object)). This depends on the backend
                
                errorMessage=<p className={classes.Error}>{this.props.error.message}</p>;
            }
            
            let authRedirect=null;
            
            
//            if(this.props.isLogged){
//                
//                if(this.props.building){
//                    
//                    authRedirect=<Redirect to={this.props.path} />;
//                    
//                } else {
//                    
//                    authRedirect=<Redirect to={this.props.path} />;
//                }
//            }
        
        return(
            
        <div className={classes.Auth}>
            {authRedirect}
          <p>{this.state.isSignup? 'SignUp': 'SignIn'}</p>
            {errorMessage}
            <form onSubmit={this.submitHandler}>
            
                {form}
                <Button btnType='Success' onClick={this.submitHandler}>Submit</Button>
                
            </form>    
            <Button btnType='Danger' clicked={this.switchAuthModeHandler}>Switch to {this.state.isSignup? "Sign In" : "Sign Up"}</Button>
            
        </div>
        
        
        );
    }
    
    
    
}
                                          
                                          
const mapStateToProps=state=>{//mapStateToProps is commonly used name, but you could name it differently. The state is Redux state. Note: create this constant after the class above
    
    return {
        
        loading: state.auth.loading,
        error: state.auth.error,
        isLogged: state.auth.token !== null,
        path: state.auth.authRedirectPath
    };
}

const mapDispatchToProps=dispatch=> {
    
    return {
        
        onAuth: (email, password, isSignup)=> dispatch (actions.auth(email, password, isSignup)),
            
        onSetAuthRedirectPath: ()=>dispatch(actions.setAuthRedirectPath('/')),
        
        onSetGameOver: ()=>dispatch(actions.setGameOver()),
            
        onSetStart: ()=> dispatch(actions.setGameStart()),
             
        onSetSignInHide: ()=> dispatch(actions.setSignInHide())
    }
    //we get the ingName parameter from Buildcontrols component where we pass on a parameter to ingridientAdded and ingridientRemoved property functions
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));