import React, { Component  } from 'react'
export default class backTop extends Component {
    constructor(props){
        super(props)
        this.state = {
            isShow:false
        }
    }
    watchBackTop = () => {
        window.scrollY>400?(
            this.setState({
                isShow:true
            })
        ):(
            this.setState({
                isShow:false
            })
        )
    }
    backToTop = () => {
        let topTimer = setInterval(()=>{
            let scrollY = window.scrollY;
            if(scrollY<50){
                window.scroll(0,0)
                clearInterval(topTimer)
            }else{
                window.scroll(0,scrollY*.8)
            }
        },20)
    }
    componentDidMount(){
        window.addEventListener('scroll',this.watchBackTop)
    }
    render() {
        return (
            <div onClick={this.backToTop} className={this.state.isShow?'backTop isShow':'backTop'}>
                <div className="back-arrow"></div>
            </div>
        )
    }
}
