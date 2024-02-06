import React, {useEffect} from 'react';

import CharImgD from '../../assets/Images/ninja.png';
import CharImgR from '../../assets/Images/ninjaR.png';
import CharImgU from '../../assets/Images/ninjaU.png';
import CharImgL from '../../assets/Images/ninjaL.png';

import {connect} from 'react-redux';

import boatWithPlayer from '../../assets/Images/boatAndPlayer.png';

import classes from './character.css';

const Character=(props)=>{
    
    useEffect(()=>{
        
        document.getElementById('player').focus();
    }, [])
    
    
    let imgSource;
    
    if(props.mobileStatus){
        
        if(props.directionMobile==='down'){
        
        imgSource=CharImgD;
        
    } else if(props.directionMobile==='left'){
        
        imgSource=CharImgL;
        
    } else if(props.directionMobile==='up'){
        
       imgSource=CharImgU;
        
    } else if(props.directionMobile==='right'){
        
       imgSource=CharImgR;
        
    }
        
    } else{
        
    if(props.direction==='down'){
        
        imgSource=CharImgD;
        
    } else if(props.direction==='left'){
        
        imgSource=CharImgL;
        
    } else if(props.direction==='up'){
        
       imgSource=CharImgU;
        
    } else if(props.direction==='right'){
        
       imgSource=CharImgR;
        
    }
        
    }
    

    
    if(props.onBoatP){
        
        imgSource=boatWithPlayer;
    }
    
    return(
    
        <div id='player' className={classes.CharacterStyles} onKeyDown={props.movePlayer} tabIndex="0">
            <img src={imgSource} alt='player'/>
        </div>
    
    
    );
};

const mapStateToProps=state=>{//mapStateToProps is commonly used name, but you could name it differently. The state is Redux state. Note: create this constant after the class above
    
    return {
        
        mobileStatus: state.hide.mobile
    };
}

export default connect(mapStateToProps)(Character);