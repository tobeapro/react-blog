const webpack = require('webpack');
const path = require('path');
module.exports =  {
    entry: {
        vendor:[
            'react',
            'react-dom',
            'react-router-dom'
        ]
    },
    output: {
        path: path.resolve(__dirname,'../dll'),
        filename: '[name].js',
        library: '[name]_[hash]',
    },
    plugins: [
        new webpack.DllPlugin({
            context: __dirname,
            name: '[name]_[hash]',
            path: path.resolve(__dirname, '../dll/[name]-manifest.json'),
        })
    ]
}