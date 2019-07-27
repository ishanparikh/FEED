
import React, {Component} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginScreen from "./containers/LoginScreenContainer";
import './styles/index.css';
import 'typeface-roboto'
import Navigation from "./containers/NavigationContainer";


class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={LoginScreen}/>
                    <Route path="/home" component={Navigation}/>
                </div>
            </Router>
        );
    }
}

export default App;

