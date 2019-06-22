import { Component } from 'react';
import { withRouter } from 'react-router-dom';
class routerScroll extends Component {
    componentDidUpdate(props){
        if(props.location.pathname!==this.props.location.pathname){
            window.scroll(0,0)
        }
    }
    render() {
        return this.props.children;
    }
}
export default withRouter(routerScroll)
