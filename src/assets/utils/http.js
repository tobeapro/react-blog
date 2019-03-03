import axios from 'axios';
import { message } from 'antd';
const SERVER_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '';
class httpClass {
    get(url){    
        return new Promise((resolve,reject)=>{
            axios({
                method:'get',
                url:SERVER_URL+url
            }).then(res=>{
                const data = res.data
                if(data&&data.result===1){
                    resolve(data)
                }else{
                    message.warning(data.msg?data.msg:'请求异常')
                    reject(data)
                }
            }).catch(err=>{
                message.error('系统异常');
                reject(err);
            })
        })
    }
    postJSON(url,data={}){    
        return new Promise((resolve,reject)=>{
            axios({
                method:'post',
                url:SERVER_URL+url,
                data,
                headers: { 'Content-Type': 'application/json; charset=utf-8' }
            }).then(res=>{
                const data = res.data
                if(data&&data.result===1){
                    resolve(data)
                }else{
                    message.warning(data.msg?data.msg:'请求异常')
                    reject(data)
                }
            }).catch(err=>{
                message.error('系统异常');
                reject(err);
            })
        })
    }
}
const $http = new httpClass()
export default $http