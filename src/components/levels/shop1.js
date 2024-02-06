import React, { Component } from 'react';
import Character from '../character/character';

import rockTile from '../../assets/Images/rock.jpg';

import tableTile from '../../assets/Images/table.png';

import woodTile from '../../assets/Images/wood.jpg';

import door from '../../assets/Images/door.png';

import shopKeeper from '../../assets/Images/shopkeeper.png';

import {withRouter} from 'react-router-dom';

import classes from './shop1.css';

import {player, stopMusic, playMusic} from '../character/charStats';

import {connect} from 'react-redux';

import * as actions from '../../store/actions/exporter';

import InfoBox from '../Boxes/InfoBox/infoBox';

import ShopBox from '../Boxes/ShopBox/shopBox';

import $ from 'jquery';




class Shop1 extends Component{
    
        state={
        
        x: 0,
        y: 0,
        pDir: 'right',
        enteredShop: false,
        playerLocPreviousX:null,
        playerLocPreviousY:null,
    }

    componentDidMount(){
        
        if($(window).width() <650){
            
            $('body').css('zoom', '50%');
        }
        
        if($(window).width() >=650 && $(window).width() <900 ){
            
            $('body').css('zoom', '70%');
        }
        
        
        
         if(player.prevStage==='level3' || player.prevStage==='level4'){
             
            let player=document.getElementById('player');
            player.style.left=this.props.playerX+'px';
            player.style.top=this.props.playerY+'px';
            
            this.setState({x: this.props.playerX, y: this.props.playerY})
         }
        
            player.stage='shop1';
        
    
        
//         if(player.prevStage==='level3' || player.prevStage==='level4'){ //you could handle this with Redux state also. This would allow you to set condition for the Routes to be visible. Can't set player.prevStage as condition for Routes in App.js, because the App.js won't rerender when player properties change, only when state and props change.
//            
//        
//        } else{
//            
//            alert('direct access to levels denied!'); //use this once the game goes live, otherwise this will prevent direct access for testing purposes
//            this.props.history.push('/');
//        }
        
        const inputFields=$('input:text');
        
  
    inputFields.focus(function(){ //this happens when the element gains focus (gets clicked on basically or is otherwise activated)
        
        $(this).css('box-shadow', '5px 10px 18px black');
    })
        
    
    inputFields.blur(function(){ //this happens when the element gains focus (gets clicked on basically or is otherwise activated)
        
        $(this).css('box-shadow', 'none');
    })
        
         player.locked=true;
        
        setTimeout(()=>{
            
            player.locked=false;
        }, 500);
        
        setTimeout(()=>{
            
            stopMusic();
        
            playMusic('shopsTune'); 
            
        },500);
        
        
        
    }

    componentWillUnmount(){
        
        player.prevStage='shop1';
        player.movingInit=false;
    }

    componentDidUpdate(){
        
        
          if(this.state.enteredShop && ( (this.state.x===220 && this.state.y===140) || ( (this.props.playerX===220 && this.props.playerY===140) && this.props.mobileStatus) ) && !player.inShop){
     
              const shopItems={
                
                potion: {name: 'potion', price: 5, effect: 10},
                rest: {name: 'rest', price: 10, effect: 10},
                eat: {name: 'eat', price: 20, effect: 50},
                desertshoes: {name: 'desertShoes', price: 30, effect: 20}
            }
              
              const shopText1=`Nice to meet you ${player.name}. Welcome to my shop! You seem to have ${player.money} coins with you.`;
              
              const shopText2=`Would you like to buy something? ${shopItems.potion.name} (+${shopItems.potion.effect}hp), cost: ${shopItems.potion.price} coins || ${shopItems.rest.name} (+${shopItems.rest.effect} stamina)- cost: ${shopItems.rest.price} coins || ${shopItems.eat.name} (+${shopItems.eat.effect}hp)- cost: ${shopItems.eat.price} coins || ${shopItems.desertshoes.name} (+${shopItems.desertshoes.effect} stamina), cost: ${shopItems.desertshoes.price} coins (insert item name or say no)`;
             
             $('#shopBox').css({width: '200px', height:'100px'});
              
              $('#shopText').text(shopText1);
              
              $('#enteredShopItem').hide();
            
             $('#shopBox').fadeIn(1000).delay(3000).fadeOut(1000, function(){
                 
                 $('#shopBox').css({width: '300px', height:'200px'});
                 
                 $('#enteredShopItem').show();
                 
                 $('#shopText').text(shopText2);
                 
                 $('#shopBox').delay(1000).fadeIn(1000, function(){
                     
                     document.getElementById('enteredShopItem').focus();
                 });
                 
                  
             });
            
        }
        
        if( ( (this.state.x===220 && this.state.y===140) || ( (this.props.playerX===220 && this.props.playerY===140) && this.props.mobileStatus) ) && player.inShop){ //!this.props.currentShopStatus && ...seems like this isn't needed, plus had to change how this Redux state works, because updating this state to false all the time doesn't trigger this block of code
            
            //fading out shopBox after purschase
            
            player.inShop=false;
            
            
            $('#shopBox').fadeOut(1000, function(){
                
                $('#enteredShopItem').val('');
                
                document.getElementById('player').focus();
                
                $('#infoBox').slideDown(1000).delay(3000).slideUp(1000, function(){
                    
                    player.locked=false;
                });
            });
            
            this.props.onSetCoins(player.money);
        }
    
        
        this.checkLocation();
        
    }


    checkLocation=()=>{
        
         if(this.state.enteredShop){
            
              
                if( ( (this.state.x!==this.state.playerLocPreviousX || this.state.y!==this.state.playerLocPreviousY) && !this.props.mobileStatus)  ){
                    
                
                    this.setState({playerLocPreviousX: this.state.x, playerLocPreviousY: this.state.y, enteredShop: false});
                }
             
             if( ( (this.props.playerX!==this.state.playerLocPreviousX || this.props.playerY!==this.state.playerLocPreviousY) && this.props.mobileStatus)  ){
                 
                 
                 this.setState({playerLocPreviousX: this.props.playerX, playerLocPreviousY: this.props.playerY, enteredShop: false});
            }

            
            }
        
        
        
        if( (this.state.x===0 && this.state.y===140 && !this.props.mobileStatus) || (this.props.playerX===0 && this.props.playerY===140) ){
            
            this.props.onSetLoc(80, 400);
            player.stage='shop1';
            this.props.history.push('/level3');
        }
   
        
        if( (this.state.x===220 && this.state.y===140 && !this.state.enteredShop)  || (this.props.playerX===220 && this.props.playerY===140 && this.props.mobileStatus && !this.state.enteredShop) ){
            
            
            player.locked=true;
            
            if(this.props.mobileStatus){
                
                this.setState({enteredShop:true, playerLocPreviousX: this.props.playerX, playerLocPreviousY: this.props.playerY})
                
            } else{
                
                this.setState({enteredShop:true, playerLocPreviousX: this.state.x, playerLocPreviousY: this.state.y})
                
            }
            
//            this.onShopHandler();
        }
        
    
    }




    createWorld=(tiles)=>{

        let imgStyle;

        return tiles.map(item=>{
            
            if(item.type==='rock2'){
                
                imgStyle={

                    display:'block',
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    zIndex: 100
                }
                       
            }else if(item.type==='rock3'){
                
                imgStyle={

                   display:'inline-block',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    zIndex: 100
                }
                              
            }else if(item.type==='rock4'){
                
                imgStyle={

                   display:'inline-block',
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    zIndex: 100
                }
                                     
            }else if(item.type==='rock5'){
                
                imgStyle={

                   display:'block',
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    zIndex: 100
                }
                
            } else if(item.type==='door'){
                
                imgStyle={

                   display:'block',
                    position: 'absolute',
                    left: 0,
                    top: '140px',
                    zIndex: 100
                }
                
            } else if(item.type==='table'){
                
                 imgStyle={

                   display:'block',
                    position: 'absolute',
                    left: '260px',
                    top: '140px',
                    zIndex: 100
                }
                
            } else if(item.type==='shopKeeper'){
                
                 imgStyle={

                   display:'inline-block',
                    position: 'absolute',
                    left: '300px',
                    top: '140px',
                    zIndex: 100
                }
                
            } else{
                
                imgStyle={
                
               display:'inline-block'
            }
                 
            }
            
            const setKey=item.type+String(item.id);
            
            return <img key={setKey} src={item.img} alt='grass' style={imgStyle} />;
  
        })
    }
    
    
    
   move=event=>{
       
       if(!player.locked){
           
       
       if(this.state.enteredShop){
           
           this.setState({enteredShop:false})
       }
       
       let direction;
        
        
        let location= event.target.getBoundingClientRect();
        
     
        
        let newLocation;
        event.target.style.position='absolute'
       

       
        if(event.key==='ArrowLeft' || event.key==='ArrowRight'){
            
            if(event.key==='ArrowLeft'){
                
                direction='left';
                
           
                
                if(this.state.x>0){
                    
                    
                    if(((this.state.x===40 && this.state.y===260) || (this.state.x===40 && this.state.y===240 )) || ((this.state.x===40 && this.state.y===0) || (this.state.x===40 && this.state.y===20))){
                        
                        newLocation=undefined;
                        
                    } else{
                        
                        newLocation=(location.x -22)+'px';
                    }

                }
                
            
        } else if(event.key==='ArrowRight'){
            
            direction='right';
            
  
            
            if(this.state.x<280){
                
                
                
              if(((this.state.x===240 && this.state.y===0) || (this.state.x===240 && this.state.y===20 )) || ((this.state.x===240 && this.state.y===260) || (this.state.x===240 && this.state.y===240))){
                  
                   newLocation=undefined;
                  
              }  else if((this.state.x===220) && (this.state.y>=120 && this.state.y<= 160)){
                  
                  newLocation=undefined;
                  
              } else{
                  
                  newLocation=(location.x +18)+'px'; 
              }

            }
            
        }

        
            if(newLocation!==undefined){
                
                event.target.style.left=newLocation;
            
                const setLocX= Number(newLocation.slice(0, newLocation.length-2))

                this.setState({x: setLocX, pDir:direction}) 
                
            } else{
                
                this.setState({pDir:direction})
            }
           
            
        }
        
        
        if(event.key==='ArrowUp' || event.key==='ArrowDown'){
            
            
            
            if(event.key==='ArrowUp'){
                
                direction='up';
                
           
                
                if(this.state.y>0){
                
                    if(((this.state.x===0 && this.state.y===40) || (this.state.x===20 && this.state.y===40 )) || ((this.state.x===280 && this.state.y===40) || (this.state.x===260 && this.state.y===40))){
                        
                        newLocation=undefined;
                        
                    } else if(this.state.x>=240 && this.state.y===180){
                        
                        newLocation=undefined;
                        
                    } else{
                        
                        newLocation=(location.y -22)+'px';
                    }
 
            }
           
            
        } else if(event.key==='ArrowDown'){
            
            direction='down';
            
      
            
            if(this.state.y<260){                     
                
                
                 if(((this.state.x===0 && this.state.y===220) || (this.state.x===20 && this.state.y===220 )) || ((this.state.x===280 && this.state.y===220) || (this.state.x===260 && this.state.y===220))){
                    
                    newLocation=undefined;
                    
                } else if(this.state.x>=240 && this.state.y===100){
                    
                    newLocation=undefined;
                    
                } else{
                    
                   newLocation=(location.y +18)+'px'; 
                }
                
            }
        }
      
            
            
            if(newLocation!==undefined){
                
                event.target.style.top=newLocation;
            
                const setLocY= Number(newLocation.slice(0, newLocation.length-2))
                this.setState({y: setLocY, pDir:direction})

            } else{
                
                this.setState({pDir:direction})
            }

        }
    
       }
        
    }
    
    
    render(){
        
        //56 tiles covers the whole area
        
        let mapRock2=new Array(1);
        let mapRock3=new Array(1);
        let mapRock4=new Array(1);
        let mapRock5=new Array(1);

        
        let mapWood=new Array(56);
        
        let mapTable=new Array(3);
        
        let mapShopKeeper= new Array(1);
        
        let mapExit= new Array(1);

        
          for(let i=0;i<mapRock2.length; i++){
            
         mapRock2[i]={img:rockTile, id: i, type:'rock2'};  

        }
        
          for(let i=0;i<mapRock3.length; i++){
            
         mapRock3[i]={img:rockTile, id: i, type:'rock3'};  

        }
        
          for(let i=0;i<mapRock4.length; i++){
            
         mapRock4[i]={img:rockTile, id: i, type:'rock4'};  

        }
        
          for(let i=0;i<mapRock5.length; i++){
            
         mapRock5[i]={img:rockTile, id: i, type:'rock5'};  

        }
        
         for(let i=0;i<mapWood.length; i++){
            
         mapWood[i]={img:woodTile, id: i, type:'wood'};  

        }
        
        for(let i=0;i<mapTable.length; i++){
            
         mapTable[i]={img:tableTile, id: i, type:'table'};  

        }
        
        for(let i=0;i<mapShopKeeper.length; i++){
            
         mapShopKeeper[i]={img:shopKeeper, id: i, type:'shopKeeper'};  

        }
        
        for(let i=0;i<mapExit.length; i++){
            
         mapExit[i]={img:door, id: i, type:'door'};  

        }
    
        const rock2=this.createWorld(mapRock2);
        const rock3=this.createWorld(mapRock3);
        const rock4=this.createWorld(mapRock4);
        const rock5=this.createWorld(mapRock5);
        
        const wood=this.createWorld(mapWood);
        
        const table=this.createWorld(mapTable);
        
        const seller=this.createWorld(mapShopKeeper);
        
        const exitDoor=this.createWorld(mapExit);
        
        
        return(
            <div className={classes.Wrapper}>
                <div className={classes.Body}>
                    <Character movePlayer={this.move} direction={this.state.pDir} directionMobile={this.props.mobileDirectionStatus}/>
                    {rock2}
                    {rock3}
                    {rock4}
                    {rock5}
                    {wood}
                    {table}
                    {seller}
                    {exitDoor}
                    <InfoBox/>
                    <ShopBox/>
                </div>
            </div>
        
        );
    }
}

const mapStateToProps=state=>{//mapStateToProps is commonly used name, but you could name it differently. The state is Redux state. Note: create this constant after the class above
    
    return {
        
        playerX: state.location.px,
        playerY: state.location.py,
        movingStatusMobile: state.player.playerMoving,
        mobileDirectionStatus: state.location.setMobileDirection,
        mobileStatus: state.hide.mobile,
        currentShopStatus: state.location.shopStatus// even though we don't use this elsewhere, it is still needed so we can trigger an update to the component
    };
}

const mapDispatchToProps=dispatch=> {
    
    return {
        
        onSetLoc: (setX, setY)=> dispatch (actions.setLocation(setX, setY)),
//        onSetLevel: (value)=> dispatch(actions.setLevel(value)),
        onSetHealth: (value)=> dispatch(actions.setPlayerHealth(value)),
        onSetInventory: (inv)=> dispatch(actions.setPlayerInventory(inv)),
        onSetHide: ()=> dispatch(actions.hideInv()),
        onSetShopExit: ()=> dispatch(actions.setShopStatus()),
        onSetStamina: (value)=> dispatch(actions.setStamina(value)),
        onSetCoins: (value)=> dispatch(actions.setCoins(value))
        
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Shop1));