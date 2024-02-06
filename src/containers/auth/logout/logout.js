import React, {Component} from 'react';

import {connect} from 'react-redux';
import * as actions from '../../../store/actions/exporter';

import {Redirect} from 'react-router-dom';

//import {player} from '../../../components/character/charStats';



class Logout extends Component{
    
    componentDidMount(){
        
        if(this.props.gameStartedStatus){
            
            this.props.onSetStart();
        }
        
        
        if(this.props.stateloadSetDone){
            
            this.props.onSetLoadDone();
        }

            this.props.onSetSignInHide();
        
          this.props.onLogout();  

    }
    
  
    
    render(){

        
        return <Redirect to='/' />;
    }
}

const mapStateToProps=state=>{//mapStateToProps is commonly used name, but you could name it differently. The state is Redux state. Note: create this constant after the class above
    
    return {
        
        stateloadSetDone: state.location.loadSetDone,
        gameOverStatus: state.location.gameOver,
        gameStartedStatus: state.location.gameStarted
    };
}

const mapDispatchToProps=dispatch=> {
    
    return {
        
        onLogout: ()=> dispatch(actions.logout()),
        onSetStart: ()=> dispatch(actions.setGameStart()),
        onSetLoadDone: ()=> dispatch(actions.setLoadDone()),
        onSetSignInHide: ()=> dispatch(actions.setSignInHide())
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(Logout);