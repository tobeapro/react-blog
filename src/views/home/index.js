import React, { useState,useEffect,Fragment } from 'react';
import { Icon, Tag, Spin, Button  } from 'antd';
import styled from 'styled-components';
import $http from '../../assets/utils/http';
// import { formatDate } from '../../assets/utils';
// const SERVER_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '';
const Item =  styled.li`
    transition:all .4s ease;
    margin:10px;
    padding:10px;
    border-bottom:1px solid #e8e8e8;
    cursor:pointer;
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
        color:var(--second-text);
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
            color:var(--second-text);
        }
    }
    &:hover{
        transform:translateX(10px);
        background-color:var(--item-bg);
        box-shadow:0 0 30px 10px #aaa;
        .title{
            font-weight:bold;
        }
    }
`
const colorList = [
    '#2db7f5',
    '#87d068',
    '#f50',
    '#108ee9',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',  
    'geekblue',
    'purple'
]
function Home(props){
    const [loading,setLoading] = useState(true)
    const [listLoading,setListLoading] = useState(false)
    const [isAll,setIsAll] = useState(false)
    const [pageOpt,setPageOpt] = useState({
        pageSize:10,
        pageNo:0,
        total:0
    })
    const [list,setList] = useState([])
    const viewClassify =  (e,name) => {
        e.stopPropagation();
        props.history.push(`/classify/${name}`)
    }
    const getList = () => {
        pageOpt.pageNo++
        setPageOpt(pageOpt)
        setListLoading(true)
        $http.postJSON('/front_manage/api/getArticles',{
            name: '',
            noteqClassify: '生活',
            pageOpt:{
                ...pageOpt,
                pageNo:pageOpt.pageNo
            }
        }).then(res=>{
            if(res&&res.result===1){
                const newList = list.concat(res.data.list||[])
                Object.assign(pageOpt,res.data.pageOpt)
                setList(newList)
                if(newList.length>=pageOpt.total){
                    setIsAll(true)
                }
            }
        }).finally(()=>{
            setLoading(false)
            setListLoading(false)
        })
    }
    useEffect(()=>{
        getList()
    },[])
    return ( 
        loading?
        <Spin tip='Loading...' />
        :
        <Fragment>
            <ul>
                {
                    list.map(item=>(
                        <Item key={item._id} onClick={()=>{props.history.push(`/detail/${item._id}`)}}>
                            <h1 className='title'>{item.title}</h1>
                            {/* <div className='time'>
                                <Icon type="reload" />{formatDate(item.update_time)}
                                <Icon type="clock-circle" />{formatDate(item.create_time)}
                            </div> */}
                            {
                                item.classify?(
                                    <div className='classify'>
                                        <Icon type="tag" />
                                        {
                                            item.classify.split(',').map((name,i)=>(
                                                <Tag key={i} color={colorList[i]||'geekblue'} onClick={(e)=>{viewClassify(e,name)}}>{name}</Tag>
                                            ))
                                        }
                                    </div>
                                ):null
                            }
                            
                        </Item>
                    ))
                }
            </ul>
            <div style={{padding:'10px', textAlign: 'center'}}>
                {
                    isAll ? <Tag color="#f50">到底了...</Tag> : <Button type="primary" size="small" loading={listLoading} onClick={getList} icon="plus">加载更多</Button>
                }       
            </div>
        </Fragment>
    );
}
export default Home;