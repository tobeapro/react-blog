import React, { Component } from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
import { translateMarkdown, formatDate } from '../../assets/utils';
import $http from '../../assets/utils/http';
import otherBg from '../../assets/img/other-bg.jpg';
const ArticleWrap = styled.div`
    margin-right:160px;
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
    .catelog{
        position:fixed;
        right:0;
        top:50px;
        bottom:0;
        padding:16px 10px;
        width:180px;
        overflow:auto;
        border-left:1px solid #e8e8e8;
        &::-webkit-scrollbar {
            display:none
        }
        a{
            display:block;
            font-size:14px;
            font-weight:bold;
            line-height:24px;
            color:#666;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
            &.H4{
                padding-left:10px;
                font-size:13px;
                font-weight:normal;
            }
            &.H5{
                padding-left:16px;
                font-size:13px;
                font-weight:normal;
                line-height:20px;
            }
            &.H6{
                padding-left:20px;
                font-size:13px;
                font-weight:normal;
                line-height:20px;
            }
            &:hover{
                color:#1890ff;
                text-decoration:underline;
            }
        }
    }
    @media (max-width:800px){
        margin-right:0;
        .catelog{
            display:none;
        }
    }
`
const generateCateLog = (doc) => {
    if(!doc){
        return
    }
    const allTag = doc.querySelectorAll('*');
    let tagStr = '';
    let titleTags = ['H1','H2','H3','H4','H5','H6']
    for(let i=0;i<=allTag.length;i++){
        if(!allTag[i]){
            continue
        }
        const tagName = allTag[i].nodeName;
        if(titleTags.indexOf(tagName)>-1){
            const nodeText = allTag[i].textContent
            const idAnchor = allTag[i].id
            tagStr+=`<a href="#${idAnchor}" class="${tagName}">${nodeText}</a>`
        }
    }
    return tagStr
}
export default class Detail extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading:true,
            article:{
                _id:null
            },
            catalog:''
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
            },()=>{
                const tagStr = generateCateLog(document.querySelector('.markdown-article'))
                this.setState({
                    catalog:tagStr
                })
            })
        })
    }
    componentDidMount(){
        this.getDetail(this.props.match.params.id)
    }
    componentDidUpdate(prevProps){
        if(prevProps.match.params.id===this.props.match.params.id){
            return 
        }
        this.getDetail(this.props.match.params.id)
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
                        <ArticleWrap className={this.state.article.classify&&this.state.article.classify.indexOf('生活')>-1?'isOther':''}>
                            <h1 className='title'>{this.state.article.title}</h1>
                            <p className='time'>
                                发布于：{formatDate(this.state.article.create_time)}
                            </p>
                            <article 
                                className='markdown-article'
                                dangerouslySetInnerHTML={{__html:translateMarkdown(this.state.article.content)}}>
                            </article>
                            <div class="catelog" dangerouslySetInnerHTML={{__html:this.state.catalog}}>
                            </div>
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