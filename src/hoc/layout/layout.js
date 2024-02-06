import React, {Component} from 'react';

import Aux from '../auxilliary';

import classes from './layout.css'

import HealthBar from '../../components/healthBar/healthBar';

import Inventory from '../../components/Inventory/inventory';

import {player} from '../../components/character/charStats';

import {connect} from 'react-redux';

import * as actions from '../../store/actions/exporter';

import {withRouter} from 'react-router-dom';

//import NavigationItem from '../../components/Navigation/navigationItem';

import MobileButtons from '../../components/mobileButtons/mB';

import $ from 'jquery';




class Layout extends Component{
    
//    constructor(props){
//        
//        super(props);
//        
//        this.singInHandler=this.singInHandler.bind(this);
//    }
    

    
//    componentDidMount(){
//        
//        console.log(this.props.history)
//    }
//    
    saveGame=()=>{
        
        if(!player.locked){ //prevents player from saving in the middle of a battle
        
        let equippedCheck;
        let enemiesCheck;
        let riddlesCheck;
        let foundCheck;
            
        let messagesCheck;
        
        if(player.equipped.length===0){ //instead of this, we could check if certain property of data payload exists, like we do in the setValues function with inventory. Inventory is a bit different compared to the rest of the arrays, because inventory array contains objects, it can not have strings in it unlike the rest. (for the other we do "includes" checks in the game)
            
            equippedCheck=['empty'];
        } else{
            
            equippedCheck=player.equipped;
        }
        
        if(player.enemies.length===0){
            
            enemiesCheck=['empty'];
        } else{
            
            enemiesCheck=player.enemies;
        }
            
        if(player.messages.length===0){
            
            messagesCheck=['empty'];
        } else{
            
            messagesCheck=player.messages;
        }
        
        if(player.riddles.length===0){
            
            riddlesCheck=['empty'];
        } else{
            
            riddlesCheck=player.riddles;
        }
        
        if(player.foundItems.length===0){
            
            foundCheck=['empty'];
        } else{
            
            foundCheck=player.foundItems;
        }
        
        const getPlayer=document.getElementById('player');
        
        const currentPos=getPlayer.getBoundingClientRect();
        
        const curX=currentPos.x-2;
        const curY=currentPos.y-2;
        
        const saveInfo={
        
        name: player.name,
        power: player.power,
        weapon: player.weapon,
        health:player.health,
        maxHealth:player.maxHealth,
        shield:player.shield,
        stamina:player.stamina,
        maxStamina:player.maxStamina,
        xp:player.xp,
        money:player.money,
        level:player.level,
        inventory:player.inventory,
        inventorySize:player.inventorySize,
        riddles: riddlesCheck,
        equipped: equippedCheck,
        stage: player.stage,
        pX: curX,
        pY: curY,
        enemies: enemiesCheck,
        prevStage: player.prevStage,
        foundItm: foundCheck,
        moveInit: player.movingInit,
        messages: messagesCheck
        }
        
        const allData={
            
            data: saveInfo,
            userId: this.props.userId
        }
        
//        console.log(allData)
        
        this.props.onSaveGame(allData, this.props.token, this.props.userId, this.props.currentSaveKey);
        
        }
    }
    
//    
    loadGame=async ()=>{ //problems: loads the previous level, because atm level change happens when a component unmounts. This is due to a conflict if you would change the level on mount. If you would change level on mount it would trigger componentDidUpdate() which would trigger location check which would then send the player back to the previous location in case the level starting point and level exit to previous are the same. Only way to prevent this is to send the player one step furter when moving to next level. Other problem at the moment is that the exact location where player lands after load is not perfect. I used getBoundingClientRect() but that doesn't give good numbers by being too exact. I need to get level state coordinates x and y somehow. 
        
        await this.props.onLoadGame(this.props.token, this.props.userId);
        
        setTimeout(()=>{
            
            this.setValues(this.props.loadGameData);
        }, 4000)
        
//        this.setValues(this.props.loadGameData);
    }
    
    logoutHandler=()=>{
        
        this.props.history.push('/logout');
    }
    
    signInHandler=()=>{
        
        //clicked
        
        if($('#startBox').css('display')==='none' || (player.name!=='' && player.weapon!=='') ){
            
            this.props.history.push('/auth');
            
        } else {
            
            alert('please enter your details first');
        }
        
    }
    
    setValues=(data)=>{
        
        
        if(this.props.keyStatus!==undefined){
        
        if(data.inventory){
            
           player.inventory=data.inventory; 
        } else{
            
           player.inventory=[]; 
        }
        
        player.name=data.name;
        player.weapon=data.weapon;
        player.power=data.power;
        player.messages=data.messages;
        player.health=data.health;
        player.maxHealth=data.maxHealth;
        player.shield=data.shield;
        player.stamina=data.stamina;
        player.maxStamina=data.maxStamina;
        player.xp=data.xp;
        player.money=data.money;
        player.level=data.level;
//        player.inventory=data.inventory;
        player.riddles=data.riddles;
        player.equipped=data.equipped;
        player.enemies=data.enemies;
        player.prevStage=data.prevStage;
        
        player.stage=data.stage;
        player.foundItems=data.foundItm
        this.props.onSetLoc(data.pX, data.pY);
        this.props.onSetHealth(player.health);
        this.props.onSetLoaded(data.stage);
        this.props.onSetStart();
        
        if(player.inventory.length>0){
            
            this.props.onSetInventory(data.inventory);
        } else{
            
             this.props.onSetInventory(player.inventory);
        }
       
        
        
        //need to add the status of enemies both here and savegame data!
        setTimeout(()=>{
            
           this.props.history.push(`/${data.stage}`); 
        }, 1000)
        
    } else{
        
        alert('You do not have savegame yet');
    }
        
    }
    
    render(){
        
        let buttons;
        
        if(this.props.isLogged){
            
            buttons=(
                
                <Aux>
                <div className={classes.ButtonsWrapper}>
                    <button onClick={this.saveGame} className={classes.SaveGame}>Save</button>
                    <button onClick={this.loadGame} className={classes.LoadGame}>Load</button>
                    <button onClick={this.logoutHandler} className={classes.SignOut}>Logout</button>
                </div>
                </Aux>
            );
        } else{
        
             buttons=!this.props.gameStartStatus && !this.props.statusHideSingIn?<button id='signIn' onClick={this.signInHandler} className={classes.SignIn}>Sign In</button>:null;
            
//            buttons=(
//            
//            
//                    <NavigationItem link='/auth'><button onClick={this.signInHandler} className={classes.SignIn}>Sign in</button></NavigationItem>
//            
//            );
        }
        
        return(
        
        <Aux>
    
            
            <main className={classes.Content}>
                {this.props.children}
                {this.props.gameStartStatus?<HealthBar healthP={player.health}/>:null}
                {this.props.gameStartStatus?<Inventory/>:null}
                {buttons}
                {this.props.gameStartStatus?<MobileButtons/>:null}
            </main>
    
        </Aux>
        
        );
    }
}


const mapStateToProps=state=>{
    
    return {
        
        isLogged: state.auth.token !== null,
        userId: state.auth.userId,
        token: state.auth.token,
        loadGameData: state.fetch.data,
//        currentLevel: state.location.latestLevel,
        gameStartStatus: state.location.gameStarted,
        currentSaveKey: state.fetch.saveKey,
        statusHideSingIn: state.hide.signInHide,
        keyStatus:state.fetch.saveKey
    };
}



const mapDispatchToProps=dispatch=> {
    
    return {
        
        onSaveGame: (saveInfo, token, userId, key)=> dispatch (actions.sendSaveInfo(saveInfo, token, userId, key)),
        onLoadGame:(token, userId)=>dispatch(actions.fetch(token, userId)),
//        onSetLevel: (value)=> dispatch(actions.setLevel(value)),
        onSetLoc: (setX, setY)=> dispatch (actions.setLocation(setX, setY)),
        onSetHealth: (value)=> dispatch(actions.setPlayerHealth(value)),
        onSetLoaded: (stage)=> dispatch(actions.setLoaded(stage)),
        onSetInventory: (inv)=> dispatch(actions.setPlayerInventory(inv)),
        onSetStart: ()=> dispatch(actions.setGameStart())
    }
 
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));