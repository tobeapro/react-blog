import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Icon, Tag, Divider } from 'antd';
import { connect } from 'react-redux';
import { setClassifyCount } from '../store/actionCreator';
import styled  from 'styled-components';
import TopNavBar from '../components/topNavBar';
import $http from '../assets/utils/http';
import { colorList } from '../assets/cusData';
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
      path:'/about',
      name:'关于',
      icon:'guanyu'
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
    left:-200px;
    bottom:0;
    padding:10px;
    width:200px;
    overflow-y:auto;
    box-sizing:border-box;
    border-right:1px solid #e8e8e8;
    transition:all .2s ease;
    &.active{
        left:0;
    }
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
        transform:translateY(-100%);
        display:flex;
        width:100%;
        height:0;
        border-bottom:1px solid #e8e8e8;
        &.active{
            transform:translateY(0);
            height:auto;
        }
        .link-item {
            text-align:center;
        }
        .child-item{
            padding:0 10px;
            &:nth-child(2){
                display:none;
            }
        }
    }
`
const Main = styled.main`
    padding:10px 20px;
    margin-left:200px;
    transition:all .2s ease;
    min-height:calc(100vh - 90px);
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
const itemInGroups = (item,groups) => {
    for(let child of groups){
        if(item.name === child.item){
            item.count = child.count
            return 
        }
    }
}
class MainWrap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isExpand:true,
            recentList:[],
            classifyList:[],
            colorList
        }
    }
    componentDidMount() {
        this.getLatestList()
        // this.getContentCount()
        this.getClassifyList()
    }
    getClassifyList(){
        $http.postJSON('/front_manage/api/classify/list').then(res=>{
            if(res&&res.result===1){
                this.setState({
                    classifyList:(res.data||[]).map(item=>Object.assign(item,{count:0})).filter(item=>item.isFix===1)
                },this.getContentCount)
            }
        })
    }
    getLatestList(){
        $http.postJSON('/front_manage/api/latestArticles',{
            noteqClassify: '生活'
        }).then(res=>{
            if(res&&res.result===1){
                this.setState({
                    recentList:res.data
                })
            }
        })
    }
    getContentCount(){
        $http.postJSON('/front_manage/api/articleCount').then(res=>{
            if(res.result===1){
                const data = res.data;
                const groups = data.groups;
                this.props.setClassifyCount(data);
                this.state.classifyList.forEach(item=>{
                    itemInGroups(item,groups)
                })
                this.setState({
                    colorList:this.state.classifyList
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
            avatar:'https://avatars3.githubusercontent.com/u/17215880?s=400&u=f1f8de484423fbc05dbbfe8968f6dfbb8f9c8e11&v=4',
            introduce:'一枚前端',
            github:'https://github.com/tobeapro'
        }
        const mainStyle = {
            margin:0,
        }
        return ( 
            <Router>
                <Fragment>
                    <TopNavBar navList={navList} {...this.props} toggleSide={this.toggleSide} isExpand={this.state.isExpand}></TopNavBar>
                    <BackTop />
                    <Layout>
                        {
                            <Aside className={this.state.isExpand?'active':''}>
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
                                        this.state.classifyList.map((item,index)=>(
                                            
                                            <Tag key={index} color={colorList[index>=colorList.length?index%colorList.length:index].color}>
                                                <Link to={`/classify/${item.name}`}>{item.name}({item.count})</Link>
                                            </Tag>
                                        ))
                                    }
                                </div>
                            </Aside>
                        }
                        <Main style={this.state.isExpand?{}:mainStyle}>
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
const mapStateToProps = (state) => {
    return {
        classifyCount: state.classifyCount
    }
}
const mapDispatchToProps = (dispatch) => {
    return {       
        setClassifyCount(val){
            const action = setClassifyCount(val)
            dispatch(action)
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MainWrap);