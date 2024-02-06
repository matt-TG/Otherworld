import React, { Component } from 'react';

import {Route, Switch, Redirect} from 'react-router-dom';
import asyncComponent from './hoc/asyncComponent';

import Logout from './containers/auth/logout/logout';

import Layout from './hoc/layout/layout';

import * as actions from './store/actions/exporter';

import {connect} from 'react-redux';

import {player} from './components/character/charStats';

import $ from 'jquery';

import StartBox from './components/Boxes/StartBox/startBox';

import LevelBox from './components/Boxes/LevelUpBox/levelUpBox';

import {withRouter} from 'react-router-dom';

import RiddleBox from './components/Boxes/RiddleBox/riddleBox';

import classes from './App.css';

import MainTune from './assets/music/FalloftheSolarKing.mp3';
import Level1Tune from './assets/music/SavoyTheatre.mp3';
import Level4Tune from './assets/music/ADreamWithinaDream.mp3';
import BattleTune from './assets/music/EpicBattle.mp3';
import DeadTune from './assets/music/KingofPeace.mp3';
import ShopsTune from './assets/music/ArabianBizaar.mp3'
import Level7Tune from './assets/music/HerosTheme.mp3';





const AsyncLevel1=asyncComponent(()=> {
    
    return import('./components/levels/level1');
});

const AsyncLevel2=asyncComponent(()=> {
    
    return import('./components/levels/level2');
});

const AsyncLevel3=asyncComponent(()=> {
    
    return import('./components/levels/level3');
});

const AsyncLevel4=asyncComponent(()=> {
    
    return import('./components/levels/level4');
});

const AsyncLevel5=asyncComponent(()=> {
    
    return import('./components/levels/level5');
});

const AsyncLevel6=asyncComponent(()=> {
    
    return import('./components/levels/level6');
});

const AsyncLevel7=asyncComponent(()=> {
    
    return import('./components/levels/level7');
});



const AsyncMain=asyncComponent(()=> {
    
    return import('./components/mainMenu/mainMenu');
});

const AsyncShop1=asyncComponent(()=> {
    
    return import('./components/levels/shop1');
});

const AsyncShop2=asyncComponent(()=> {
    
    return import('./components/levels/shop2');
});

const AsyncAuth=asyncComponent(()=> {
    
    return import('./containers/auth/auth');
});

const AsyncInfo=asyncComponent(()=> {
    
    return import('./components/Info/info');
});




class App extends Component { //for some reason when testing where blocks start and end Brackets gives red color instead of green here even though everything works and I see nothing wrong here...
    
//    state={
//        
//        x: 0,
//        y: 0
//    }
    
    componentDidMount(){
    
        
        
//        console.log(this.props.history.location.pathname==='/')

        
//            const hscData=['empty']; //I used this block of code just to initialize hsc.json in Firebase
//        
//          axios.post('/hsc.json', hscData).then(response=>{
//        
//                console.log(response.data)
//
//            }).catch(error=>{
//
//                alert(error);
//            })
        
    const inputFields=$('input:text');
        

  
    inputFields.focus(function(){ //this happens when the element gains focus (gets clicked on basically or is otherwise activated)
        
        $(this).css('box-shadow', '5px 10px 18px black');
    })
        
    
    inputFields.blur(function(){ //this happens when the element gains focus (gets clicked on basically or is otherwise activated)
        
        $(this).css('box-shadow', 'none');
    })
        
        
        $('#startTextName').text('What is your player name?');
        
        $('#startTextWeapon').text('What weapon do you use? Choose: Hammer||Sword||Axe||Spear');
        
        $('#startBox').show(function(){
            
            $(this).css('display', 'inline-block');
        });
        
        $('#lightbox').css({display:'table'}).fadeIn(1000, function(){
            
            
            document.getElementById('enteredName').focus();
        });
        
//        document.getElementById('startBox').focus();
//        
//        $('#startTextName').text('What is your name?');
//        
//        $('#startTextWeapon').text('What weapon do you use? Choose: Hammer||Sword||Axe||Spear');
//        
//        $('#startBox').fadeIn(1000);
        
        
        
    }
    

    
    
  render() {
      
      let routes=(
          
         <Switch>
        
                <Route path='/' exact component={AsyncMain} />
                <Route path='/level1' component={AsyncLevel1} />
                <Route path='/level2' component={AsyncLevel2} />
                <Route path='/level3' component={AsyncLevel3} />
                <Route path='/level4' component={AsyncLevel4} />
                <Route path='/level5' component={AsyncLevel5} />
                <Route path='/level6' component={AsyncLevel6} />
                <Route path='/level7' component={AsyncLevel7} />
                <Route path='/shop1' component={AsyncShop1} />
                <Route path='/shop2' component={AsyncShop2} />
                <Route path='/info' component={AsyncInfo} />
                {!this.props.isLogged?<Route path='/auth' component={AsyncAuth} />:null}
                {this.props.isLogged?<Route path='/logout' component={Logout} />:null}
                <Redirect to='/'/>
        
            </Switch>
      );
      
      
      
    return (
        
        <Layout className={classes.Layout}>
        
        {routes}
        
        {player.stage==='main'?<div id='lightbox' className={classes.Lightbox}><div className={classes.Welcome}><h1>Welcome to the Otherworld stranger!</h1><StartBox/></div></div>:null}
        <LevelBox/>
        <RiddleBox/>
        <audio src={MainTune} id="mainTune"></audio>
        <audio src={Level1Tune} id="level1Tune"></audio>
        <audio src={Level4Tune} id="level4Tune"></audio>
        <audio src={ShopsTune} id="shopsTune"></audio>
        <audio src={DeadTune} id="deadTune"></audio>
        <audio src={Level7Tune} id="level7Tune"></audio>
        <audio src={BattleTune} id="battleTune"></audio>
        
        </Layout>

    );
  }
}

//Note that you can also trigger move method by adding tabIndex='0' to the div. Then  you do not need arrow function either but can have move(event){...} and movePlayer can be movePlayer={(event)=>this.move(event)}. Read about tabIndex: https://bitsofco.de/how-and-when-to-use-the-tabindex-attribute/

const mapStateToProps=state=>{//mapStateToProps is commonly used name, but you could name it differently. The state is Redux state. Note: create this constant after the class above
    
    return {
        isLogged: state.auth.token !== null,
        isExisting: state.fetch.existing, //using locaStorage check instead because that data isn't lost on refresh
        userId: state.auth.userId
    };
}

const mapDispatchToProps=dispatch=> {
    
    return {
        
       onTryAutoSignup: ()=> dispatch(actions.authCheckState()),
        onExistingSet: (userId)=> dispatch(actions.existingStatusUpdate(userId))

        
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
