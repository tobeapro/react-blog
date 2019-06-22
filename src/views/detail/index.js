import React, { Component } from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
import { translateMarkdown, formatDate } from '../../assets/utils';
import $http from '../../assets/utils/http';
import otherBg from '../../assets/img/other-bg.jpg';
const ArticleWrap = styled.div`
    &.isOther{
        background:url(${otherBg});
    }
    .title{
        padding:10px 0;
        font-size:24px;
        font-weight:bold;
        text-align:center;
    }
    .time{
        font-size:12px;
        line-height:20px;
        text-align:center;
        color:#666;
    }
`
export default class Detail extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading:true,
            article:{
                _id:null
            }
        }
    }
    getDetail(id){
        !this.state.loading&&this.setState({
            loading:true
        })
        $http.postJSON('/front_manage/api/airticleDetail',{
            id
        }).then(res=>{
            if(res&&res.result===1){
                this.setState({
                    article:res.data
                })
            }
        }).finally(()=>{
            this.setState({
                loading:false
            })
        })
    }
    componentDidMount(){
        this.getDetail(this.props.match.params.id)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.match.params.id===this.props.match.params.id){
            return 
        }
        this.getDetail(nextProps.match.params.id)
    }
    render() {
        if(this.state.loading){
            return <Spin tip='Loading...' />
        }
        return (
            <div>
                {
                    this.state.article._id?
                    (
                        <ArticleWrap className={this.state.article.classify&&this.state.article.classify.indexOf('其他')>-1?'isOther':''}>
                            <h1 className='title'>{this.state.article.title}</h1>
                            <p className='time'>
                                发布于：{formatDate(this.state.article.create_time)}
                            </p>
                            <article 
                                className='markdown-article'
                                dangerouslySetInnerHTML={{__html:translateMarkdown(this.state.article.content)}}>
                            </article>
                        </ArticleWrap>                   
                    ):
                    (
                        <h1>未找到对应的文章:{this.props.match.params.id}</h1>
                    )
                }
                            
            </div>
        )
    }
}