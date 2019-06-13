import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Icon, Tag, Divider } from 'antd';
import styled  from 'styled-components';
import TopNavBar from '../components/topNavBar';
import $http from '../assets/utils/http';
import { tagLinkList } from '../assets/cusData';
import routers from '../router';
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
    display:flex;
    height:calc(100vh - 50px);
    .ant-tag a{
        color:inherit;
    }
    @media (max-width:800px){
        flex-direction:column;
    }
`
const Aside = styled.aside`
    width:200px;
    padding:10px;
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
        display:flex;
        flex-wrap:wrap;
        width:100%;
        border-bottom:1px solid #e8e8e8;
        .link-item {
            text-align:center;
        }
        .child-item{
            padding:0 10px;
            flex:1;
            &:nth-child(1){
                border-right:1px solid #e8e8e8;
            }
            &:nth-child(2){
                display:none;
            }
        }
    }
`
const Main = styled.main`
    flex:1;
    padding:10px 20px;
    height:100%;
    overflow:auto;
    @media (max-width:800px){
        width:100%;
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
        return ( 
            <Router>
                <Fragment>
                    <TopNavBar navList={navList} {...this.props} toggleSide={this.toggleSide} isExpand={this.state.isExpand}></TopNavBar>
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
                        <Main>
                            <Switch>
                                {
                                    routers.map((item,index)=>{
                                        return (
                                            <Route key={index} exact={item.isExact||false} path={item.path||null} component={item.component} />
                                        )
                                    })
                                }
                            </Switch>
                        </Main>
                    </Layout>
                </Fragment>
            </Router>
         );
    }
}
 
export default MainWrap;