import marked from 'marked';
import hljs from 'highlight.js';
const translateMarkdown = (content) =>(
    marked(content, {
        renderer: new marked.Renderer(),
        highlight: function(code) {
            return hljs.highlightAuto(code).value;
        },
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: true,
        sanitize: false,
        smartLists: true,
        smartypants: true
    })
)
const formatDate = (date, format='yyyy-mm-dd HH:MM') => {
    if(!date||isNaN(date)){
        return ''
    }
    date = new Date(date);
    const regArray = [
        {
            reg:/y+/,
            value: date.getFullYear()
        },
        {
            reg:/m+/,
            value: date.getMonth()+1 >= 10 ? date.getMonth()+1 : '0' + (date.getMonth()+1)
        },
        {
            reg:/d+/,
            value: date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
        },
        {
            reg:/H+/,
            value: date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
        },
        {
            reg:/MM+/,
            value: date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
        },
        {
            reg:/S+/,
            value: date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
        }
    ]
    let newDate = format
    for(let item of regArray){
        newDate = newDate.replace(item.reg,item.value)
    }
    return newDate
}
export {
    translateMarkdown,
    formatDate
}