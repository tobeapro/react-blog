import React, { Component, Fragment } from 'react';
import { Icon, Tag, Spin } from 'antd';
import styled from 'styled-components';
import $http from '../../assets/utils/http';
import { formatDate } from '../../assets/utils';
import bgImg from '../../assets/img/kobe.jpg';
const SERVER_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '';
const Item =  styled.li`
    transition:all .4s ease;
    margin:10px;
    padding:10px;
    border:1px solid #e8e8e8;
    cursor:pointer;
    .bgWrap{
        overflow:hidden;
        img{
            transition:all .4s ease-out;
            max-height:400px;
            &:hover{
                transform:scale(1.2);
            }
        }
    }
    .title{
        padding:10px;
        font-size:20px;
        font-weight:normal;
        line-height:30px;
    }
    .time{
        display:flex;
        align-items:center;
        padding:10px;
        font-size:14px;
        line-height:20px;
        color:#666;
        .anticon{
            margin-right:6px;
            font-size:15px;
            +.anticon{
                margin-left:20px;
            }
        }
    }
    .ant-tag{
        min-width:60px;
        text-align:center;
    }
    .classify{
        padding:0 10px;
        .anticon{
            margin-right:10px;
            color:#000;
        }
    }
    &:hover{
        transform:translateX(10px);
        background-color:#bae7ff6b;
        box-shadow:0 0 30px 10px #aaa;
        .title{
            font-weight:bold;
        }
    }
`
const colorList = [
    '#f50',
    '#2db7f5',
    '#87d068',
    '#108ee9',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',  
    'geekblue',
    'purple'
]
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            loading: true,
            list: []
        }
    }
    viewClassify = (e,name) => {
        e.stopPropagation();
        this.props.history.push(`/classify/${name}`)
    }
    componentDidMount() {
        $http.postJSON('/front_manage/api/getArticles',{
            name: '',
            classify: '[^\u5176\u4ed6]'
        }).then(res=>{
            if(res&&res.result===1){
                this.setState({
                    list:res.data||[]
                })
            }
        }).finally(()=>{
            this.setState({
                loading:false
            })
        })
    }
    render() { 
        if(this.state.loading){
            return <Spin tip='Loading...' />
         }
        return ( 
            <Fragment>
                <ul>
                    {
                        this.state.list.map(item=>(
                            <Item key={item._id} onClick={()=>{this.props.history.push(`/detail/${item._id}`)}}>
                                <div className='bgWrap'>
                                    <img src={item.face_img?SERVER_URL+item.face_img:bgImg} alt='bg' />
                                </div>
                                <h1 className='title'>{item.title}</h1>
                                <div className='time'>
                                    {/* <Icon type="reload" />{formatDate(item.update_time)} */}
                                    <Icon type="clock-circle" />{formatDate(item.create_time)}
                                </div>
                                {
                                    item.classify?(
                                        <div className='classify'>
                                            <Icon type="tag" />
                                            {
                                                item.classify.split(',').map((name,i)=>(
                                                    <Tag key={i} color={colorList[i]||'geekblue'} onClick={(e)=>{this.viewClassify(e,name)}}>{name}</Tag>
                                                ))
                                            }
                                        </div>
                                    ):null
                                }
                                
                            </Item>
                        ))
                    }
                </ul>
            </Fragment>
        );
    }
}
 
export default Home;