import React, {useEffect}  from 'react';

import classes from './inventory.css';

import {player} from '../character/charStats';

import {connect} from 'react-redux';

import Aux from '../../hoc/auxilliary';

import * as actions from '../../store/actions/exporter';

import $ from 'jquery';


const Inventory=(props)=>{
    
    useEffect(()=>{
        
       $('#inventory').css('user-select', 'none');
    }, [])
    
    
//    useEffect(()=>{
//        
//
//        
//    }, [props.playerInventory, props.hide])
  
    
    const setHide=()=>{
        
        document.getElementById('player').focus();
        
        props.onSetHide();
    }
    

    const useItem=(event)=>{
        
        //useItem triggered
        
        if(event.target.value==='potion' || event.target.value==='superPotion'){
            
            if(event.target.value==='potion'){
                
               player.health+=10; 
            } else{
                
                player.health+=40;
            }
           
            
          
            
            if(player.health>player.maxHealth){
                
                //too much health
                        
                player.health=player.maxHealth;
             }
             
       

            const newInventory=player.inventory.filter(item=>{
                
                
                return item.id!==Number(event.target.name);
            })
            
            
            const newInventory2=player.inventory.filter(item=>{
                
                
                return item.id!==Number(event.target.name);
            })
            
            
            player.inventory=newInventory2;
            
            props.onSetInventory(newInventory);
            props.onSetHealth(player.health);

        }
        
         if(event.target.value==='desertShoes'){
            
            player.stamina+=20;
            player.equipped.push('desertShoes');
            
  
            

            const newInventory=player.inventory.filter(item=>{
                
                
                return item.id!==Number(event.target.name);
            })
            
            
            const newInventory2=player.inventory.filter(item=>{
                
                
                return item.id!==Number(event.target.name);
            })
            

            
            
            player.inventory=newInventory2;
            
            props.onSetInventory(newInventory);

        }
        
         const getPlayer=document.getElementById('player');
            getPlayer.focus();
    }
    
      const dropItem=(event)=>{
        
        const newInventory=player.inventory.filter(item=>{
            
    
                
                return item.id!==Number(event.target.value);
            })
        
             const newInventory2=player.inventory.filter(item=>{

                
                return item.id!==Number(event.target.value);
            })
             
             player.inventory=newInventory2;
            
            props.onSetInventory(newInventory);
          
              const getPlayer=document.getElementById('player');
            getPlayer.focus();
    }
      
    let inventoryContents;
    if(props.playerInventory.length===0){
        
            inventoryContents=null;
           
    } else{
        
        inventoryContents=props.playerInventory.map(item=>{
        

        
        return <li key={item.id}>{item.name} <button className={classes.UseButton} name={item.id} value={item.name} onClick={(event)=>useItem(event)}>Use</button><button value={item.id} onClick={(event)=>dropItem(event)}>Drop</button></li>
    })
    }

    
    const inventoryWrapper=(
    
    <Aux>
        
        <ol>{inventoryContents}</ol>
    
    </Aux>
    );
    
    return(
        
        <Aux>
        
        <div id='inventory' className={classes.Inventory} onClick={setHide}>
            INVENTORY
        </div>
        
        {props.hide?<div className={classes.Content}>{inventoryWrapper}</div>: null}
        
        </Aux>
    );
};

const mapStateToProps=state=>{//mapStateToProps is commonly used name, but you could name it differently. The state is Redux state. Note: create this constant after the class above
    
    return {
        
        playerInventory: state.player.inventory,
        hide: state.hide.hideInv
    };
}



const mapDispatchToProps=dispatch=> {
    
    return {
        
        onSetHide: ()=> dispatch(actions.hideInv()),
        onSetInventory: (inv)=> dispatch(actions.setPlayerInventory(inv)),
        onSetHealth: (value)=> dispatch(actions.setPlayerHealth(value)),
        
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(Inventory);