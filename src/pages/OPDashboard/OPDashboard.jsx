/* eslint react/no-string-refs:0 */
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import ListOptions from './components/ListOptions';

@withRouter
class OPDashboard extends Component {
    componentDidMount(){
    }

    render() {
        return (
            <div className="sections">
                <ListOptions/>
            </div>
        );
    }
}

export default OPDashboard;
