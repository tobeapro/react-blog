import React, { Component, Fragment } from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import $http from '../../assets/utils/http';
import { setUserInfo } from '../../store/actionCreator';
const SERVER_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '';
const Section = styled.section`
    padding:20px;
    .avatar{
        margin:10px 0;
        width:160px;
        height:160px;
        border-radius:50%;
    }
`
class User extends Component{
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
                {
                    this.props.userInfo ? (
                        <Fragment>
                            <h1>当前账号：{this.props.userInfo.name}</h1>
                            <img className='avatar' src={`${SERVER_URL}${this.props.userInfo.avatar}`} alt='avatar' />
                        </Fragment>
                    ) : null
                }           
            </Section>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
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
export default connect(mapStateToProps, mapDispatchToProps)(User)