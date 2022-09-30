const path = require ("path")
let HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    mode: "production",
    entry: "./js/main.js",
    output: {
        filename: 'main.[contenthash].js',
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    optimization: {
        minimizer: [new OptimizeCssPlugin(), new TerserPlugin()]
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: './html/template.html'
    }),
        new MiniCssExtractPlugin({filename: '[name].[contenthash].css'})
    ],
    module:{
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
}