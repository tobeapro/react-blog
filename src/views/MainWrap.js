import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Icon, Tag, Divider } from 'antd';
import styled  from 'styled-components';
import User from './user';
import Detail from './detail';
import Home from './home';
import Classify from './classify';
import NotFound from './notFound';
import TopNavBar from '../components/topNavBar';
import $http from '../assets/utils/http';
import { tagLinkList } from '../assets/cusData';
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
`
const Aside = styled.aside`
    width:200px;
    padding:10px;
    border-right:1px solid #e8e8e8;
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
`
const Main = styled.main`
    flex:1;
    padding:10px 20px;
    height:100%;
    overflow:auto;
`
class MainWrap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recentList:[]
        }
    }
    componentDidMount() {
        $http.postJSON('/front_manage/api/getArticles').then(res=>{
            if(res&&res.result===1){
                const recentList = (res.data||[]).slice(0,5)
                this.setState({
                    recentList
                })
            }
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
                    <TopNavBar navList={navList} {...this.props}></TopNavBar>
                    <Layout>
                        <Aside>
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
                            <Divider>标签</Divider>
                            {
                                tagLinkList.map((item,index)=>(
                                    <Tag key={index} color={item.color}>
                                        <Link to={`/classify/${item.name}`}>{item.name}</Link>
                                    </Tag>
                                ))
                            }
                        </Aside>
                        <Main>
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route path='/user' component={User} />
                                <Route path='/detail/:id' component={Detail} />
                                <Route path='/classify/:tag' component={Classify} />
                                <Route component={NotFound} />
                            </Switch>
                        </Main>
                    </Layout>
                </Fragment>
            </Router>
         );
    }
}
 
export default MainWrap;