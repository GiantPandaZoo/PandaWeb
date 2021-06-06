import {observer} from "mobx-react";
import {Component} from "react";

@observer
class ConditionDisplay extends Component {
    render() {
        if (this.props.display) {
            return this.props.children;
        } else {
            return '';
        }
    }
}

export default ConditionDisplay;
