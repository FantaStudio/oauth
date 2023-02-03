const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    module: {
        rules: [
            {
                test: /\.m?(js|jsx)$/,
                exclude: /@babel(?:\/|\\{1,2})runtime|core-js/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "./index.html",
        }),
    ],
    devServer: {
        port: 5001,
        host: "localhost",
        hot: true,
        open: true,
        historyApiFallback: {
            disableDotRule: true,
        },
        compress: true,
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    devtool: "none",
};
