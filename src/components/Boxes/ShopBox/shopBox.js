import React, {Component} from 'react';

import classes from './shopBox.css';

import $ from 'jquery';

import {connect} from 'react-redux';

import * as actions from '../../../store/actions/exporter';

import {player} from '../../character/charStats';


class ShopBox extends Component{
    
    state={
        
        item:'',
        levelUp:false
    }



    componentDidUpdate(){
        
        if(this.state.levelUp && !player.messages.includes(player.level)){
            
            player.messages.push(player.level);
 
            $('#levelBox').slideDown(1000).delay(2000).slideUp(1000);

        }
    }


enterItem=(event)=>{
    
    this.setState({item:event.target.value})
}


shop=(event)=>{
    
    if(event.which===13 && player.stage==='shop1'){
        
             //entered decision
    
        
        const shopItems={
                
                potion: {name: 'potion', price: 5, effect: 10},
                rest: {name: 'rest', price: 10, effect: 10},
                eat: {name: 'eat', price: 20, effect: 50},
                desertshoes: {name: 'desertShoes', price: 30, effect: 20}
            }
            
            const enterMoney=player.money;
            
            let shoppingDecision=this.state.item;
        
            if(shoppingDecision!==''){
                
                shoppingDecision=shoppingDecision.toLowerCase();
            }

            
            
            if(shoppingDecision==='potion'){
                
                if(player.money>=5){
                    
                    if(player.inventory.length<player.inventorySize){
                        
                        player.inventory.push({name: shopItems.potion.name, effect: shopItems.potion.effect, id: player.inventory.length});
                        
                        player.money=player.money-shopItems.potion.price;
                        
                        this.props.onSetInventory(player.inventory);
                        
                        this.props.onSetHide();
                        
                    } else{
                        
                         player.inShop=true;
                        const infoText='Looks like you need to drop something, your bag is full.';
                
                        $('#infoBox').text(infoText);
                        
                        this.props.onSetShopExit(); //this means that shopBox closes in shop1
                        
                        return;
                    }

                    
                } 
//                else{
//                    
//                    alert(`You do not have enough money for ${shoppingDecision}`);
//                }

                
            } else if(shoppingDecision==='desertshoes'){
                
                if(player.money>=30){
                    
                    if(player.inventory.length<player.inventorySize){
                        
                        player.inventory.push({name: shopItems.desertshoes.name, effect: shopItems.desertshoes.effect, id:player.inventory.length});
                        
                        player.money=player.money-shopItems.desertshoes.price;
                        
                        this.props.onSetInventory(player.inventory);
                        
                        this.props.onSetHide();
                        
                    } else{
                    
                         player.inShop=true;
                        const infoText='Looks like you need to drop something, your bag is full.';
                
                        $('#infoBox').text(infoText);
                        
                        this.props.onSetShopExit(); //this means that shopBox closes in shop1
                        
                        return;
                    }

                    
                } 
//                else{
//                    
//                    alert(`You do not have enough money for ${shoppingDecision}`);
//                }

                
            }else if(shoppingDecision==='rest'){
                
                 if(player.money>=10){
                    
                    player.stamina+=10;
                    
                     if(player.stamina>player.maxStamina){
                         
                         player.stamina=player.maxStamina;
                     }
                    
                    player.money=player.money-shopItems.rest.price;
                     
                     this.props.onSetStamina(player.stamina);
              
                    
                } 
//                else{
//                    
//                    alert(`You do not have enough money to ${shoppingDecision}`);
//                }
                
            } else if(shoppingDecision==='eat'){
                
                 if(player.money>=20){
                   
                    player.health+=50;
                    
                    if(player.health>player.maxHealth){
                        
                        player.health=player.maxHealth;
                    }
                    
                    player.money=player.money-shopItems.eat.price;
            
                    
                    this.props.onSetHealth(player.health);
                     
                } 
//                else{
//                    
//                    alert(`You do not have enough money to ${shoppingDecision}`);
//                }

            } else if(shoppingDecision==='no' || shoppingDecision===''){
                
                 player.inShop=true;
                const infoText='Maybe some other time then.';
                
                $('#infoBox').text(infoText);
                        
                this.props.onSetShopExit(); //this means that shopBox closes in shop1
                        
                return;

            } else {
                
                 player.inShop=true;
                const infoText='Sorry, we do not have such an item.';
                
                $('#infoBox').text(infoText);
                        
                this.props.onSetShopExit(); //this means that shopBox closes in shop1
                        
                return;
            }
            
            const leaveMoney=player.money;
            
            
            if(enterMoney>leaveMoney){
                
               
                 player.inShop=true;
                
                const infoText=`Thank you for choosing ${shoppingDecision}, you have ${player.money} coins left. Bye!`;
                
                $('#infoBox').text(infoText);
                        
                this.props.onSetShopExit();
                
            }
            
            if(enterMoney===leaveMoney && shopItems[shoppingDecision]) {
                
                const selectedItem=shopItems[shoppingDecision];
                const difference=selectedItem.price-(player.money);
                
                 player.inShop=true;
                const infoText=`You do not have enough money for ${shoppingDecision}, you need ${difference} more coins for your purchase.`;
                
                $('#infoBox').text(infoText);
                        
                this.props.onSetShopExit();
            }
        
    }
    
    
    
    
    
    if(event.which===13 && player.stage==='shop2'){
        
        let levelUpStatus;
        
        const shopItems={
                
                potion: {name: 'potion', price: 5, effect: 10},
                superpotion: {name: 'superPotion', price: 15, effect: 40},
                training: {name: 'training', price: 20, effect: 'makes you more experienced'},
                rest: {name: 'rest', price: 10, effect: 10},
                smallmeal: {name: 'smallMeal', price: 10, effect: 15},
                advice: {name: 'advice', price: 40, effect: 'something you might need'},
            }
        
        
            const enterMoney=player.money;
            
            let shoppingDecision=this.state.item;
        
            if(shoppingDecision!==''){
                
                shoppingDecision=shoppingDecision.toLowerCase();
            }

            
            
            if(shoppingDecision==='potion'){
                
                if(player.money>=5){
                    
                    if(player.inventory.length<player.inventorySize){
                        
                        player.inventory.push({name: shopItems.potion.name, effect: shopItems.potion.effect, id: player.inventory.length});
                        
                        player.money=player.money-shopItems.potion.price;
                        
                        this.props.onSetInventory(player.inventory);
                        
                        this.props.onSetHide();
                        
                    } else{
                        
                         player.inShop=true;
                        const infoText='Looks like you need to drop something, your bag is full.';
                
                        $('#infoBox').text(infoText);
                        
                        this.props.onSetShopExit(); //this means that shopBox closes in shop1
                        
                        return;
                    }

                    
                } 
//                else{
//                    
//                    alert(`You do not have enough money for ${shoppingDecision}`);
//                }

                
            } else if(shoppingDecision==='rest'){
                
                 if(player.money>=10){
                    
                    player.stamina+=10;
                    
                     if(player.stamina>player.maxStamina){
                         
                         player.stamina=player.maxStamina;
                     }
                    
                    player.money=player.money-shopItems.rest.price;
                     
                     this.props.onSetStamina(player.stamina);
              
                    
                } 
//                else{
//                    
//                    alert(`You do not have enough money to ${shoppingDecision}`);
//                }
                
            } else if(shoppingDecision==='superpotion'){
                
                if(player.money>=15){
                    
                    if(player.inventory.length<player.inventorySize){
                        
                        player.inventory.push({name: shopItems.superpotion.name, effect: shopItems.superpotion.effect, id:player.inventory.length});
                        
                        player.money=player.money-shopItems.superpotion.price;
                        
                        this.props.onSetInventory(player.inventory);
                        
                        this.props.onSetHide();
                        
                    } else{
                        
                        player.inShop=true;
                        const infoText='Looks like you need to drop something, your bag is full.';
                
                        $('#infoBox').text(infoText);
                        
                        this.props.onSetShopExit(); //this means that shopBox closes in shop1
                        
                        return;
                    }


                    
                }
                
                } else if(shoppingDecision==='training'){
                
                 if(player.money>=20){
                    
                    player.xp+=30;
                    
                    player.money=player.money-shopItems.training.price;
                  
                     
                    levelUpStatus=player.checkXP(player.xp);
                     
                     if(levelUpStatus==='levelUp'){
                         
                         this.setState({levelUp:true});
                         
                     } else if(levelUpStatus==='same'){
                         
                         //nothing
                     }
                    
                }
                    
                } else if(shoppingDecision==='smallmeal'){
                
                 if(player.money>=10){
                   
                    player.health+=15;
                    
                    if(player.health>player.maxHealth){
                        
                        player.health=player.maxHealth;
                    }
                    
                    player.money=player.money-shopItems.smallMeal.price;
               
                    
                    this.props.onSetHealth(player.health);
                     
                }
                    
                } else if(shoppingDecision==='advice'){
                
                  if(player.money>=40){
                   
                    player.money=player.money-shopItems.advice.price;
                      
                    player.messages.push('advice');
      
                }
                    
                } else if(shoppingDecision==='no' || shoppingDecision===''){
                
                 player.inShop=true;
                const infoText='Maybe some other time then.';
                
                $('#infoBox').text(infoText);
                        
                this.props.onSetShopExit(); //this means that shopBox closes in shop1
                        
                return;

            } else {
                
                 player.inShop=true;
                const infoText='Sorry, we do not have such an item.';
                
                $('#infoBox').text(infoText);
                        
                this.props.onSetShopExit(); //this means that shopBox closes in shop1
                        
                return;
            }
            
            const leaveMoney=player.money;
            
            
            if(enterMoney>leaveMoney){
                
               
                 player.inShop=true;
                
                const adviceStatus=shoppingDecision==='advice'? 'Here is your advice: Search for an old wise man living in the jungle across the sea...the legend has he might know something about this mystery everyone is talking about...' : '';
                
                const infoText=`Thank you for choosing ${shoppingDecision}, you have ${player.money} coins left. ${adviceStatus}Bye!`;
                
                $('#infoBox').text(infoText);
                
                if(shoppingDecision==='advice'){
                    
                     $('#infoBox').css({width: '300px', height: '200px'});
                }
                        
                this.props.onSetShopExit();
                
            }
            
            if(enterMoney===leaveMoney && shopItems[shoppingDecision]) {
                
                const selectedItem=shopItems[shoppingDecision];
                const difference=selectedItem.price-(player.money);
                
                 player.inShop=true;
                const infoText=`You do not have enough money for ${shoppingDecision}, you need ${difference} more coins for your purchase.`;
                
                $('#infoBox').text(infoText);
                        
                this.props.onSetShopExit();
            }
        
            
        
    }
}



    
    
    //create the onChange functions in shops... then use $('#id='enteredName').val(this.state.enteredName); maybe I could use event.target.value also... similar logic in startBox
    
    render(){
        
        
        
        
        return(
        
        <div id='shopBox' className={classes.ShopBox} onKeyDown={this.shop}>
    
            <div id='shopText'></div>
        
            <input id='enteredShopItem' type='text' onChange={this.enterItem}/>
        
        </div>
    );
        
    }

}

const mapDispatchToProps=dispatch=> {
    
    return {
        
        onSetHealth: (value)=> dispatch(actions.setPlayerHealth(value)),
        onSetInventory: (inv)=> dispatch(actions.setPlayerInventory(inv)),
        onSetHide: ()=> dispatch(actions.hideInv()),
        onSetShopExit: ()=> dispatch(actions.setShopStatus()),
        onSetStamina: (value)=> dispatch(actions.setStamina(value))
        
    }

}




export default connect(null, mapDispatchToProps)(ShopBox);