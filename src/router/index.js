import React  from 'react';
import Loadable from 'react-loadable';
import { Spin } from 'antd';
const Loading = () => (
    <Spin tip='loading' />
)
export default [
    {
        path:'/',
        name:'home',
        isExact:true,
        component:Loadable({
            loader: () => import('../views/home'),
            loading: Loading,
            delay: 300
        })
    },
    {
        path:'/user',
        name:'user',
        component:Loadable({
            loader: () => import('../views/user'),
            loading: Loading,
            delay: 300
        })
    },
    {
        path:'/detail/:id',
        name:'detail',
        component:Loadable({
            loader: () => import('../views/detail'),
            loading: Loading,
            delay: 300
        })
    },
    {
        path:'/classify/:tag',
        name:'classify',
        component:Loadable({
            loader: () => import('../views/classify'),
            loading: Loading,
            delay: 300
        })
    },
    {
        name:'NotFound',
        component:Loadable({
            loader: () => import('../views/notFound'),
            loading: Loading,
            delay: 300
        })
    }
]