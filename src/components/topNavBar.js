import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import styled from 'styled-components';
const CusMenu = styled(Menu)`
    display:flex;
    justify-content:flex-end;
    box-shadow:2px 0 1px 2px #eee;
    .icon{
        margin-right:6px;
        transform:scale(1.2);
    }
`
class TopNavBar extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            currentPath: '/'
        }
    }
    componentDidMount(){
        this.setState({
            currentPath:window.location.pathname
        })
    }
    handleClick = (e) => {
        this.setState({
            currentPath:e.key
        })
    }
    render() { 
        return ( 
            <Fragment>
                <CusMenu mode="horizontal" selectedKeys={[this.state.currentPath]} onClick={this.handleClick}>
                    {
                        this.props.navList.map((child,index)=>(
                            <Menu.Item key={child.path}>
                                <Link to={child.path}>
                                    {
                                        child.icon?
                                        <svg className="icon" aria-hidden="true">
                                            <use xlinkHref={`#icon-${child.icon}`}></use>
                                        </svg>
                                        :null
                                    }
                                    <span>{child.name} </span>
                                </Link>
                            </Menu.Item>
                        ))
                    }
                </CusMenu>
            </Fragment>
         );
    }
}
 
export default TopNavBar;
