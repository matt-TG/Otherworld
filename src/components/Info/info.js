import React, {useEffect} from 'react';

import classes from './info.css';

import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';

import * as actions from '../../store/actions/exporter';

import Aux from '../../hoc/auxilliary';

import {player} from '../character/charStats';

import $ from 'jquery';


const Info=(props)=>{
    
    
    useEffect(()=>{
    
        
        player.prevVisitedPage='info';
        
        props.onSetSignInHide();
        
        
        return ()=>{
            
            props.onSetSignInHide();
            
        }
        
    }, [])
    
    const toMain=()=>{
        
        props.history.push('/');
    }
    
    const openCredits=()=>{
        
        if($('#creditsContent').css('display')==='none'){
            
           
        
        $('#creditsContent').stop().slideDown(2000, function(){
            
            $('html').css('overflow-y', 'scroll');
        });
        
    } else{
        
    
        
        $('#creditsContent').stop().slideUp(2000, function(){
            
             $('html').css('overflow-y', 'hidden');
        });
    }
        
        
    if($('#creditsContent2').css('display')==='none'){
            
           
        
        $('#creditsContent2').stop().slideDown(2000, function(){
            
            $('html').css('overflow-y', 'scroll');
        });
        
    } else{
        
    
        
        $('#creditsContent2').stop().slideUp(2000, function(){
            
             $('html').css('overflow-y', 'hidden');
        });
    }
        
    }
    
    const array=['Main tune:{Fall of the Solar King} by Twin Musicom  (twinmusicom.org)', 'Level1-level3: {Savoy Theatre} by Twin Musicom (twinmusicom.org)', 'shops: {Arabian Bizaar} by Twin Musicom (twinmusicom.org)', 'battles: {Epic Battle} by Twin Musicom (twinmusicom.org)', 'dead: {King of Peace} by Twin Musicom (twinmusicom.org)', 'level4-6: {A Dream Within a Dream} by Twin Musicom (twinmusicom.org)', 'level7: {Heros Theme} by Twin Musicom (twinmusicom.org)'];
    
    const array2=['Ninja: http://clipart-library.com/clip-art/ninja-transparent-10.htm', 'Shopkeeper: https://www.stickpng.com/img/games/scribblenauts/scribblenauts-shopkeeper', 'Platform tiles: https://www.artstation.com/artwork/LWYvk by Matei Sergiu'];
    
    
    
    return(
        <Aux>
        <div id='gameInfo' className={classes.Info}>
    
            <ul>
                
                <li>Simple adventure game created for fun</li>
                <li> Move with arrow keys</li>
                <li> Boxes with input fields need Enter key for validation</li>
                <li>Separate clickable buttons appear for smaller screen widths. Clicking those buttons will activate so called mobile version. NOTE: "MOBILE VERSION" is still quite unfinished compared to the desktop version (expect to encounter bugs if you try to play with mobile buttons). I have a working version for mobile already created, but at the moment I have not made that available, because it is lacking features</li>
                <li> If your character does not move, try clicking on it and then try moving</li>
                <li> You can only save/load game while you are logged in. Also you can see and record highscores only when logged in. Only top 5 are able to enter the list.</li>
                <li> You can only have one save at a time (previous savegame will be overwritten in case you save your progress when you already have a savegame).</li>
                <li>Please report any TofOW related bugs or suggestions to MP.feweb.designs@gmail.com</li>
                <li>Current version number: 0.8.9.6</li>
        
            </ul>
        
            <button className={classes.Credits} onClick={openCredits}>Credits</button>
            <div id='creditsContent' className={classes.CreditsContent}><h3 className={classes.Head}>MUSIC IN THE TALES OF THE OTHERWORLD</h3><ul>{array.map((item, index)=>{
                return <li key={index}>{item}</li>;
                
            })}</ul>

            <h3 className={classes.Head}>IMAGES IN THE TALES OF THE OTHERWORLD</h3>
            <ul>{array2.map((item, index)=>{
                return <li key={index+10}>{item}</li>;
                
            })}</ul>

            </div>
        </div>
    
        <button className={classes.Back} onClick={toMain}>BACK TO MAIN MENU</button>
    
        <div className={classes.CopyR}>&copy; MP- all rights reserved 2019</div>
        </Aux>
    );
};


const mapDispatchToProps=dispatch=> {
    
    return {
        
        onSetSignInHide: ()=> dispatch(actions.setSignInHide())
    }
    
}


export default connect(null, mapDispatchToProps)(withRouter(Info));