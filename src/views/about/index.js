import React, { Component } from 'react';
import { Spin } from 'antd';
// import PieCount from '../../components/pieCount';
import styled from 'styled-components';
import { connect } from 'react-redux';
import $http from '../../assets/utils/http';
import { setUserInfo } from '../../store/actionCreator';
const Section = styled.section`
    padding:20px;
    .info{
        display:flex;
        align-items:center;
        flex-wrap:wrap;
        .user{
            flex:0 0 200px;
            text-align:center;
        }
        .intro{
            font-size:20px;
            font-weight:bold;
            white-space:pre-wrap;
            p{
                padding:10px;
                white-space:pre-wrap;
                line-height:26px;
            }
            .link{
                padding:10px;
                font-size:30px;
                a{
                    margin-right:10px;
                }
            }
        }
    }
    .avatar{
        margin:10px 0;
        width:160px;
        height:160px;
        border-radius:50%;
    }
`
class About extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true
        }
    }
    componentDidMount(){
        if(!this.props.userInfo){
            $http.postJSON('/front_manage/api/getInfo').then(res=>{
                if(res&&res.result===1){
                    this.props.setUserInfo(res.data||{})
                }
                this.setState({
                    loading:false
                })
            }).finally(()=>{
                this.setState({
                    loading:false
                })
                
            })
        }else{
            this.setState({
                loading:false
            }) 
        }          
    }
    render() {
        if(this.state.loading){
            return <Spin tip='Loading...' />
        }
        return (
            <Section>
                <div className="info">
                    <div className="intro">
                        <p>前端页面使用React+Antd的组合，<a href="https://github.com/tobeapro/react-blog" target="__blank">项目地址及说明</a></p>
                        <p>前端默认请求admin账号的数据，这是<a href="http://amz715.com/backManage.html" target="__blank">后台管理预览</a>，可以注册账号试用</p>
                        <p>不忘初心  <span role="img" aria-label="emoji">🤩🤩🤩</span></p>
                        <p>坚持奋斗  <span role="img" aria-label="emoji">✨✨✨</span></p>
                        <div className="link">
                            <a href="https://juejin.im/user/57b97872128fe10054cde1bc" target="__blank">
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref='#icon-juejin'></use>
                                </svg>
                            </a>
                            <a href="https://segmentfault.com/u/rakl" target="__blank">
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref='#icon-iconsf-copy'></use>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                {/* <PieCount groups={this.props.classifyCount} total={this.props.total} />           */}
            </Section>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo,
        classifyCount:state.classifyCount,
        total:state.total
    }
}
const mapDispatchToProps = (dispatch) => {
    return {       
        setUserInfo(val){
            const action = setUserInfo(val)
            dispatch(action)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(About)