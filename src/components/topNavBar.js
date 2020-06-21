import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Switch } from 'antd';
import styled from 'styled-components';
const CusHeader = styled.header`
    position: fixed;
    z-index:10;
    top:0;
    width:100%;
    background:var(--main-bg);
    .expand-button{
        position:absolute;
        left:20px;
        top:50%;
        transform:rotate(90deg) translateX(-10px);
        transition:all .2s ease;
        cursor: pointer;
        &.isExpand{
            transform:translateY(-50%);
        }
    }
    .expand-line{
        display:block;
        width:20px;
        height:4px;
        border-radius:2px;
        background:#1890ff;
        &:nth-child(2){
            margin:4px 0;
        }
    }
    .theme-switch{
        position:absolute;
        left:60px;
        top:14px;
        background:#1890ff;
        &.ant-switch-checked{
            background:#555;
        }
    }
`
const CusMenu = styled(Menu)`
    display:flex;
    justify-content:flex-end;
    /* box-shadow:2px 0 1px 2px #eee; */
    .icon{
        margin-right:6px;
        transform:scale(1.2);
    }
`
class TopNavBar extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            currentPath: '/',
            themeChecked:false
        }
    }
    componentDidMount(){
        this.setState({
            currentPath:window.location.pathname
        })
        if(window.localStorage.getItem('dark-theme')==='open'){
            this.changeTheme(true)
        }
    }
    handleClick = (e) => {
        this.setState({
            currentPath:e.key
        })
    }
    changeTheme = (status) => {
        this.setState({
            themeChecked:status
        })
        const rootStyle = document.documentElement.style;
        if(status){
            rootStyle.setProperty('--main-bg','var(--main-dark-bg)')
            rootStyle.setProperty('--main-text','var(--main-dark-text')
            rootStyle.setProperty('--second-bg','var(--second-dark-bg')
            rootStyle.setProperty('--second-text','var(--second-dark-text')
            rootStyle.setProperty('--item-bg','var(--item-dark-bg')
            window.localStorage.setItem('dark-theme','open')
        }else{
            rootStyle.setProperty('--main-bg','var(--main-normal-bg)')
            rootStyle.setProperty('--main-text','var(--main-normal-text)')
            rootStyle.setProperty('--second-bg','var(--second-normal-bg')
            rootStyle.setProperty('--second-text','var(--second-normal-text')
            rootStyle.setProperty('--item-bg','var(--item-normal-bg')
            window.localStorage.setItem('dark-theme','close')
        }
    }
    render() { 
        return ( 
            <CusHeader>
                <div className={this.props.isExpand?'expand-button isExpand':'expand-button'} onClick={this.props.toggleSide}>
                    <i className="expand-line"></i>
                    <i className="expand-line"></i>
                    <i className="expand-line"></i>
                </div>
                <Switch className="theme-switch" unCheckedChildren="清新" checkedChildren="暗黑" checked={this.state.themeChecked} onChange={this.changeTheme} />
                <CusMenu mode="horizontal" selectedKeys={[this.state.currentPath]} onClick={this.handleClick}>
                    {
                        this.props.navList.map((child,index)=>(
                            <Menu.Item key={child.path}>
                                <NavLink to={child.path}>
                                    {
                                        child.icon?
                                        <svg className="icon" aria-hidden="true">
                                            <use xlinkHref={`#icon-${child.icon}`}></use>
                                        </svg>
                                        :null
                                    }
                                    <span>{child.name} </span>
                                </NavLink>
                            </Menu.Item>
                        ))
                    }
                </CusMenu>
            </CusHeader>
         );
    }
}
 
export default TopNavBar;
