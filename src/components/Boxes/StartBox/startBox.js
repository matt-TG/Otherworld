import React, {Component} from 'react';

import classes from './startBox.css';

import {player} from '../../character/charStats';

import $ from 'jquery';


class StartBox extends Component{
    
    
    state={
        
        name: '',
        weapon: '',
        valuesSet:false
    }

    

    componentDidUpdate(){
        
        if(this.state.valuesSet){
            
            $('#lightbox').fadeOut(1000, function(){
                
                const mainTune=document.getElementById('mainTune');
                
                mainTune.play();
                mainTune.loop = true; 
                
                $('#startBox').hide();
                
                $('#mainLogo').show();
                
                $('#signIn').css('z-index', 0);
                
                $('#startBtn').css('z-index', 1);
            });
        }
        
        
    }
    
    
    enterName=(event)=>{
        
        this.setState({name:event.target.value});
    }
    
    enterWeapon=(event)=>{
        
        this.setState({weapon:event.target.value});
    }
    
    
     initAccuracy=(weapon)=>{
        
        if(weapon==='hammer'){
            
            player.accuracy=2.5;
            
        } else if(weapon==='sword'){
                
            player.accuracy=3.5;
                  
        } else if(weapon==='axe'){
            
            player.accuracy=4;
            
        } else if(weapon==='spear'){
            
            player.accuracy=5;
            
        } else{
            
            player.accuracy=2;
        }
         
    }
     
    
    initPower=(weapon)=>{
        
        if(weapon==='hammer'){
            
            player.power=12;
            
        } else if(weapon==='sword'){
                
            player.power=10;
                  
        } else if(weapon==='axe'){
            
            player.power=9;
            
        } else if(weapon==='spear'){
            
            player.power=8;
            
        } else{
            
            player.power=1;
        }
        
    }
    
    
    enterValues=(event)=>{
        
     if(event.which===13){

        
    if(this.state.weapon!==''){
        
        player.weapon=this.state.weapon.toLowerCase();
        
    } else{
        
        player.weapon='stick';
    }
        
    
    if(this.state.name===''){
        
      player.name='Anonym'; 
        
    } else{
        
        player.name=this.state.name;
    }
    
        this.initAccuracy(player.weapon);
        
        this.initPower(player.weapon);
        
        this.setState({valuesSet:true})
            
            
    }
        
    }
    
    
    
    render(){
        
        
        
    return(
        
        <div id='startBox' className={classes.StartBox} onKeyDown={this.enterValues}>
    
            <div id='startTextName'></div>
        
            <input id='enteredName' type='text' onChange={this.enterName} className={classes.FirstInput}/>
            
             <div id='startTextWeapon'></div>
        
            <input id='enteredWeapon' type='text' onChange={this.enterWeapon}/>
        
        </div>
    );
        
    }
    

}




export default StartBox;