const path = require('path');

module.exports = {
    entry: './src/index.js', // Entry point of your application
    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory
        filename: 'bundle.js' // Output file name
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Apply this rule to .js files
                exclude: /node_modules/, // Don't apply to files in node_modules
                use: {
                    loader: 'babel-loader' // Use babel-loader for .js files
                }
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'), // Serve files from the public directory
        compress: true,
        port: 3000 // Port to run dev server
    }
};
