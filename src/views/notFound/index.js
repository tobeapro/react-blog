import React from 'react';
import styled from 'styled-components';
const Section = styled.section`
    position:relative;
    height:400px;
    color:#1890ff;
    font-size:60px;
    font-weight:bold;
    .notFound-wrap{
        position:absolute;
        width:240px;
        left:50%;
        top:50px;
        transform:translateX(-50%);
    }
    .text1{
        position:absolute;
        top:20px;
        left:20px;
        transform:rotate(30deg);
    }
    .text2{
        position:absolute;
        top:70px;
        left:100px;
    }
    .text3{
        position:absolute;
        top:20px;
        left:160px;
        transform:rotate(-20deg);
    }
    .text4{
        position:absolute;
        top:160px;
        left:60px;
        font-size:20px;
    }
`
const NotFound = () => (
    <Section>
        <div className="notFound-wrap">
            <div className="text1">4</div>
            <div className="text2">0</div>
            <div className="text3">4</div>
            <div className="text4">未找到该页面</div>
        </div>
    </Section>
)
export default NotFound