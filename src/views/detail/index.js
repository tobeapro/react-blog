import React, { Component } from 'react';
import styled from 'styled-components';
import { translateMarkdown } from '../../assets/utils';
import $http from '../../assets/utils/http';
import { formatDate } from '../../assets/utils';
const ArticleWrap = styled.div`
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
            article:{
                _id:null
            }
        }
    }
    getDetail(id){
        $http.postJSON('/front_manage/api/airticleDetail',{
            id
        }).then(res=>{
            if(res&&res.result===1){
                this.setState({
                    article:res.data
                })
            }
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
        return (
            <div>
                {
                    this.state.article._id?
                    (
                        <ArticleWrap>
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