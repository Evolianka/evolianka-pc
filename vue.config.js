const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const path = require('path')
const TARGET_NODE = process.env.TARGET_NODE === 'node'
const serverConfig = {
    entry: './server/entry-server',
    target: 'node',
    devtool: 'source-map',
    output: {
        libraryTarget: 'commonjs2'
    },
    externals: nodeExternals({
        allowlist: /\.css$/
    }),
    optimization: {splitChunks: false},
    plugins: [
        new VueSSRServerPlugin()
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json', '.scss', '.css'],
        alias: {
            '@': path.join(__dirname, 'client')
        }
    },
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    }
}

const clientConfig = {
    entry: './client/entry-client.js',
    target: 'web',
    plugins: [new webpack.HotModuleReplacementPlugin(), new VueSSRClientPlugin()],
    devtool: 'source-map',
    devServer: {
        writeToDisk: true,
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: 'http://localhost:9999/dist',
        hot: true,
        inline: true,
        historyApiFallback: true,
        port: 9999,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.scss', '.css'],
        alias: {
            '@': path.join(__dirname, 'client')
        }
    }
}

module.exports = {
    assetsDir: './static',
    filenameHashing: false,
    chainWebpack: config => {
        config.module
            .rule('url-loader')
            .test(/\.(cur)(\?.*)?$/)
            .use('url-loader')
            .loader('url-loader')
        config.plugins
            .delete('split-vendor')
            .delete('split-vendor-async')
            .delete('split-manifest')
            .delete('inline-manifest')
            .end()

    },
    configureWebpack: TARGET_NODE ? serverConfig : clientConfig
}