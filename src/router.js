import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {DefaultLayout} from '@/layouts';
import { NotFound } from './components';

const Routers = () => {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route path="/dashboard.op" component={DefaultLayout}/>
                <Route path="/FAQ" component={DefaultLayout}/>
                <Route path="/OPA" component={DefaultLayout}/>
                <Route path="/analytics" component={DefaultLayout}/>
                <Route path="/sell" component={DefaultLayout}/>
                <Route path="/home" component={DefaultLayout}/>
                <Route path="/" component={DefaultLayout} exact/>
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
};

export default Routers;
