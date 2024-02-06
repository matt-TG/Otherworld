import React, {Component} from 'react';

import classes from './riddleBox.css';

import $ from 'jquery';

import {connect} from 'react-redux';

import * as actions from '../../../store/actions/exporter';

import {player} from '../../character/charStats';


class RiddleBox extends Component{
    
    state={
        
        answerLevel4: 'findbalanceacrossthesea',
        typedText: ''
    }

    enterAnswer=(event)=>{
        
        this.setState({typedText: event.target.value})
    }


    checkAnswer=(event)=>{
        
        if(event.which===13){
            
            if(this.state.typedText.replace(/\s/g, '').toLowerCase()===this.state.answerLevel4){
                
                const shoes=player.equipped.includes('desertShoes')? true:false;
                
                if(shoes){
                    
                    const findShoes=player.equipped.indexOf('desertShoes');
                    player.equipped.splice(findShoes, 1);
                    
                    player.stamina=player.maxStamina;
                    
                    this.props.onSetStamina(player.stamina);
                }
                
     
                
                player.riddles.push('level4');
                player.wrongAnswer=false;
                this.props.onSetAnswered(true);
                
            
            } else{
                
                const infoText='I am sorry, that is not the answer I was looking for. Please come back once you are ready to solve the riddle.';
                
                $('#infoBox').text(infoText);
                
                player.wrongAnswer=true;
                
                this.props.onSetAnswered(false);
            }
            
        }
    }
    

    render(){
    
        return(
        
        <div id='riddleBox' className={classes.RiddleBox} onKeyDown={this.checkAnswer}>
    
            <div id='riddleText'></div>
        
            <input id='riddleAnswer' type='text' onChange={this.enterAnswer}/>
        
        </div>
            
        ); 
    }
    
    //create the onChange functions in shops... then use $('#id='enteredName').val(this.state.enteredName); maybe I could use event.target.value also... similar logic in startBox
    

}


const mapDispatchToProps=dispatch=> {
    
    return {
        
        onSetAnswered: (value)=> dispatch(actions.setAnswered(value)),
        onSetStamina: (value)=> dispatch(actions.setStamina(value))
    }

}



export default connect(null, mapDispatchToProps)(RiddleBox);