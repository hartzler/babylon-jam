const path = require("path");

module.exports = {
    entry: {
        app: './src/index.ts',
    },
    output: {
        filename: 'game.js',
        publicPath: "/babylon-jams/jams-0.2/",
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    mode: "production"
};