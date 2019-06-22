import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Icon, Tag, Divider } from 'antd';
import styled  from 'styled-components';
import TopNavBar from '../components/topNavBar';
import $http from '../assets/utils/http';
import { tagLinkList } from '../assets/cusData';
import routers from '../router';
import BackTop from '../components/backTop';
import RouterScroll from '../components/routerScroll';
const navList = [
    {
      path:'/',
      name:'首页',
      icon:'home'
    },
    {
      path:'/user',
      name:'用户',
      icon:'user'
    }
]
const Layout = styled.section`
    padding-top:50px;
    .ant-tag a{
        color:inherit;
    }
    @media (max-width:800px){
        flex-direction:column;
        overflow:auto;
    }
`
const Aside = styled.aside`
    position:fixed;
    top:50px;
    left:0;
    bottom:0;
    padding:10px;
    width:200px;
    box-sizing:border-box;
    border-right:1px solid #e8e8e8;
    overflow-y:auto;
    .user-info{
        padding:0 10px;
        font-size:12px;
        line-height:30px;
        text-align:center;
        .avatar{
            margin-bottom:10px;
            text-align:center;
            img{
                font-size:0;
                width:80px;
                height:80px;
                border-radius:50%;
            }
        }
        .introduce{
            font-weight:bold;
            .icon{
                font-size:16px;
                width: 32px;
                height: 32px;
            }
        }
        .link a{
            color:#666;
            .anticon{
                position:relative;
                top:2px;
            }
        }
    }
    .link-item {
        font-size:12px;
        line-height:26px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        a{ 
            color:#666;
            &:hover{
                text-decoration:underline;
            }
       }
    }
    .ant-tag{
        margin-bottom:6px;
    }
    @media (max-width:800px){
        position:static;
        width:100%;
        border-bottom:1px solid #e8e8e8;
        .link-item {
            text-align:center;
        }
        .child-item{
            padding:0 10px;
            &:nth-child(1),&:nth-child(2){
                display:none;
            }
        }
    }
`
const Main = styled.main`
    padding:10px 20px;
    margin-left:200px;
    @media (max-width:800px){
        margin:0;
    }
    .ant-spin{
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
    }
`
class MainWrap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isExpand:false,
            recentList:[]
        }
    }
    componentDidMount() {
        $http.postJSON('/front_manage/api/latestArticles',{
            classify: '[^\u5176\u4ed6]'
        }).then(res=>{
            if(res&&res.result===1){
                this.setState({
                    recentList:res.data
                })
            }
        })
    }
    toggleSide = () => {
        this.setState({
            isExpand:!this.state.isExpand
        })
    }
    render() { 
       const userInfo = {
            avatar:'https://tobeapro.github.io/img/user.png',
            introduce:'一枚前端',
            github:'https://github.com/tobeapro'
        }
        const mainStyle = {
            margin:0
        }
        return ( 
            <Router>
                <Fragment>
                    <TopNavBar navList={navList} {...this.props} toggleSide={this.toggleSide} isExpand={this.state.isExpand}></TopNavBar>
                    <BackTop />
                    <Layout>
                        {
                            !this.state.isExpand?
                            <Aside>
                                <div className="child-item">
                                    <Divider>个人简介</Divider>
                                    <div className='user-info'>
                                    <div className='avatar'>
                                        <img src={userInfo.avatar} alt='avatar' />
                                    </div>
                                    <p className='introduce'>
                                        {userInfo.introduce}
                                        <svg className="icon" aria-hidden="true">
                                            <use xlinkHref='#icon-cute-heart'></use>
                                        </svg>
                                    </p>
                                    <div className='link'>
                                        <a href={userInfo.github} rel="noopener noreferrer" target='_blank'>
                                            <Icon type="github" /> github
                                        </a>
                                    </div>                              
                                </div>
                                </div>
                                <div className="child-item">
                                    <Divider>最近文章</Divider>
                                    {
                                        this.state.recentList&&this.state.recentList.length?(
                                            <ul>
                                                {
                                                    this.state.recentList.map(item=>(
                                                        <li className='link-item' key={item._id}><Link to={`/detail/${item._id}`}>{item.title}</Link></li>
                                                    ))
                                                }
                                            </ul>
                                        ):(
                                            <h1>暂无</h1>
                                        )
                                    }
                                </div>
                                <div className="child-item">
                                    <Divider>标签</Divider>
                                    {
                                        tagLinkList.map((item,index)=>(
                                            <Tag key={index} color={item.color}>
                                                <Link to={`/classify/${item.name}`}>{item.name}</Link>
                                            </Tag>
                                        ))
                                    }
                                </div>
                            </Aside>:null
                        }
                        <Main style={this.state.isExpand?mainStyle:{}}>
                            <RouterScroll>
                                <Switch>
                                    {
                                        routers.map((item,index)=>{
                                            return (
                                                <Route key={index} exact={item.isExact||false} path={item.path||null} component={item.component} />
                                            )
                                        })
                                    }
                                </Switch>
                            </RouterScroll>
                        </Main>
                    </Layout>
                </Fragment>
            </Router>
         );
    }
}
 
export default MainWrap;