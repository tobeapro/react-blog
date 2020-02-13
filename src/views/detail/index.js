import React, { Component } from 'react';
import { Spin, Drawer, Button, Modal, Input, message } from 'antd';
import styled from 'styled-components';
import { translateMarkdown, formatDate } from '../../assets/utils';
import $http from '../../assets/utils/http';
import otherBg from '../../assets/img/other-bg.jpg';
import { connect } from 'react-redux';
import { setCommentAccout } from '../../store/actionCreator';
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
const CommentList = styled.ul`
    font-size:12px;
    .comment-item{
        padding:10px 0;
        border-bottom:1px solid #ddd;   
        .name{
            color:#333;
        }
        .content{
            color:#1890ff;
        }
        .time{
            color:#999;
        }
        .reply{
            color:#ffadd2;
        }
    }
`
const ContentWrap = styled.div`
    .info{
        display:flex;
        margin-bottom:10px;
        .ant-input-group-wrapper:nth-child(1){
            margin-right:10px;
        }
    }
    textarea.ant-input{
        height:80px;
        resize:none;
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
class Detail extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading:true,
            article:{
                _id:null
            },
            catalog:'',
            commentList:[],
            commentVisible:false,
            modalVisible:false,
            confirmLoading:false,
            contactName:'',
            contaceEmail:'',
            submitComment:'',
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
    handleOk = () => {
        if(!this.state.contactName){
            return message.warning('怎么称呼你？');
        }
        if(!this.state.contactEmail){
            return message.warning('你的联系邮箱？');
        }
        if(!this.state.submitComment){
            return message.warning('请输入你的看法和建议');
        }
        this.props.setCommentAccout({
            name:this.state.contactName,
            email:this.state.contactEmail
        })
        this.setState({
            confirmLoading:true
        })
        $http.postJSON('/front_manage/api/article/addComment',
            {
                article_id:this.state.article._id,
                article_name:this.state.article.title,
                comment_name:this.state.contactName,
                comment_email:this.state.contactEmail,
                content:this.state.submitComment,
            }).then(res=>{
                const { result, msg } = res
                if(result===1){
                    message.success('评论成功')
                    this.setState({
                        commentList: this.state.commentList.concat(res.data),
                        modalVisible: false
                    })
                }else{
                    message.warning(msg||'评论失败')
                }     
        }).finally(()=>{
            this.setState({
                confirmLoading:false
            })
        })
    }
    filterInput = (e) => {
        return e.target.value.trim()
    }
    getCommentList(){
        $http.postJSON('/front_manage/api/article/commentList',{
            article_id:this.state.article._id
        }).then(res=>{
            if(res.result===1){
                this.setState({
                    commentList: res.data||[]
                })
            }
        }).finally(()=>{

        })
    }
    toComment = () => {
        if(this.state.commentList.length>=20){
            message.warning('每篇文章评论数上线为20')
        }else{
            this.setState({
                modalVisible:true
            })
        }
    }
    componentDidMount(){
        this.setState({
            contactName:this.props.commentAccount.name||'',
            contactEmail:this.props.commentAccount.email||'',
        })
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
                            <div className="catelog" dangerouslySetInnerHTML={{__html:this.state.catalog}}>
                            </div>
                            <Button style={{'marginLeft':'10px'}} type="primary" onClick={()=>{ this.setState({commentVisible:true});this.getCommentList()}}>查看评论</Button>
                            <Drawer
                                title={`评论列表(${this.state.commentList.length})`}
                                placement="right"
                                closable={false}
                                onClose={()=>{this.setState({commentVisible:false})}}
                                visible={this.state.commentVisible}
                                >                       
                                <Button type="primary" onClick={this.toComment}>我也说一句</Button>
                                <CommentList>
                                    {
                                        this.state.commentList.map((item,index)=>{
                                            return (
                                                <li className="comment-item">
                                                    <div className="name">昵称：{item.comment_name}</div>
                                                    <div className="content">评论内容：{item.content}</div>
                                                    <div className="time">评论时间：{formatDate(item.comment_time)}</div>
                                                    {
                                                        item.author_reply?(
                                                            <div className="reply">作者回复：{item.author_reply}</div>
                                                        ):null
                                                    }
                                                </li>
                                            )
                                        })    
                                    }
                                </CommentList>
                                
                            </Drawer>
                            <Modal
                                title="评论"
                                visible={this.state.modalVisible}
                                onOk={this.handleOk}
                                confirmLoading={this.state.confirmLoading}
                                afterClose={()=>this.setState({submitComment:''})}
                                onCancel={()=>{this.setState({modalVisible:false})}}
                                >
                                <ContentWrap>
                                    <div className="info">
                                        <Input
                                            value={this.state.contactName} 
                                            onChange={e=>{
                                                this.setState({
                                                    contactName:this.filterInput(e)
                                                })
                                            }}
                                            addonBefore="昵称" 
                                            placeholder="怎么称呼你" 
                                            maxLength={20} 
                                            allowClear />
                                        <Input
                                            value={this.state.contactEmail} 
                                            onChange={e=>{
                                                this.setState({
                                                    contactEmail:this.filterInput(e)
                                                })
                                            }}
                                            addonBefore="邮箱" 
                                            placeholder="你的联系邮箱" 
                                            maxLength={20}
                                            allowClear />
                                    </div>
                                    <Input.TextArea 
                                        value={this.state.submitComment} 
                                        onChange={e=>{
                                            this.setState({
                                                submitComment:this.filterInput(e)
                                            })
                                        }}
                                        placeholder="请输入你的看法和建议" 
                                        maxLength={200} 
                                        allowClear />
                                </ContentWrap>
                            </Modal>
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
const mapStateToProps = state => {
    return {
        commentAccount: state.commentAccount||{}
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setCommentAccout(val){
            const action = setCommentAccout(val)
            dispatch(action)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail)