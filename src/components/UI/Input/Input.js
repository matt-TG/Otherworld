import React from 'react';

import classes from './Input.css';

const input=(props)=>{
    
    let inputElement=null;
    
    const inputClasses=[classes.InputElement];
    
    if (props.invalid && props.elementType!=='select' && props.touched){//I put the second condition like this because it was easier, but you could pass over a property from contactData.js making it more dynamic (in our case select input is only one which doesn't need filling because it has preselected data in the field already when the page loads): {formElement.config.validation} and use it here as props.shouldValidate (shouldValidate being an example name we give to this property)
        
        inputClasses.push(classes.Invalid);
    }
    
    switch (props.elementType) {
            
        case ('input'):
            
            inputElement=<input 
            className={inputClasses.join(' ')} 
            {...props.elementConfig} 
            value={props.value} onChange={props.changed}/>;
            
            break;
            
            case ('textarea'):
            
            inputElement=<textarea 
            className={inputClasses.join(' ')} 
            {...props.elementConfig} 
            value={props.value} onChange={props.changed}/>
                
            break;
            
            case ('select'):
            
            inputElement=(
            <select 
            className={inputClasses.join(' ')}  
            value={props.value}
            onChange={props.changed}>
                
            {props.elementConfig.options.map(option=>{
            
            return (
                <option key={option.value} value={option.value}>{option.displayValue}</option>
                );
            })}
    
            </select>

            );
                
            break;
            
        default:
    
            inputElement=<input 
            className={inputClasses.join(' ')} 
            {...props.elementConfig} 
            value={props.value} onChange={props.changed}/>;
            
    }
    
    return(
        
        <div className={classes.Input}>
        
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    
    );
};

export default input;