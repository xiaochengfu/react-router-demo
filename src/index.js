import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Switch,Redirect,Route} from 'react-router-dom'
import './index.css';
import * as serviceWorker from './serviceWorker';
import LayoutMenu from './common/layout';

class Main extends React.Component{
    render(){
        return(
            <Switch>
                <Route exact path = '/:name' component = {LayoutMenu}/>                
                <Redirect to = "/index" />
            </Switch>
        );
    }
}

ReactDOM.render( 
        <HashRouter>
            < Main />
        </HashRouter>, 
        document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
