import React, { PureComponent } from 'react';
import { Divider, Timeline } from 'antd';
import styled from 'styled-components';
import $http from '../../assets/utils/http';
const Section = styled.section`
    li{
        .ant-timeline-item-head{
            top:5px;
        }
        .time{
            margin:0 20px 0 10px;
            font-size:12px;
            color:#666;
        }
        .title{
            transition:all .2s;
            font-size:18px;
            cursor:pointer;
            &:hover{
                font-weight:bold;
            }
        }
    }
`
class Classify extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { 
            list:[]
         }
    }
    getList(tag){
        $http.postJSON('/front_manage/api/getArticles',{
            classify:tag||''
        }).then(res=>{
            if(res&&res.result===1){
                this.setState({
                    list:res.data||[]
                })
            }
        })
    }
    componentDidMount(){
        this.getList(this.props.match.params.tag)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.match.params.tag===this.props.match.params.tag){
            return 
        }
        this.getList(nextProps.match.params.tag)
    }
    render() { 
        return ( 
            <Section>
                <Divider orientation="left" style={{'fontSize':'20px'}}>{this.props.match.params.tag}</Divider>      
                {
                    this.state.list&&this.state.list.length?(
                        <Timeline>
                            {
                                this.state.list.map(item=>(
                                    <Timeline.Item key={item._id}>
                                        <span className='time'>{new Date(item.update_time).toLocaleDateString()}</span>
                                        <span className='title' onClick={()=>{this.props.history.push(`/detail/${item._id}`)}}>{item.title}</span>
                                    </Timeline.Item>
                                ))
                            }
                        </Timeline>
                    ):(
                        <h1>未找到该标签下对应的文章</h1>
                    )
                }
                
            </Section>
         );
    }
}
 
export default Classify;