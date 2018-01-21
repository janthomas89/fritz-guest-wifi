var webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './js/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'bundle')
    },
    resolve: {
        alias: {
            'css': path.resolve(__dirname, 'css/'),
            'bootstrap': path.resolve(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.min.css'),

            'js': path.resolve(__dirname, 'js/'),
            'vue': path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js'),
            'vuex:': path.resolve(__dirname, 'node_modules/vuex/dist/vuex.sm.js'),
            'jquery': path.resolve(__dirname, 'node_modules/jquery/src/jquery.js'),
            'jquery.qrcode': path.resolve(__dirname, 'node_modules/jquery.qrcode/jquery.qrcode.min.js'),
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },{
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },{
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
             }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};