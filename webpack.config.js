//entry-> output
const path = require('path');

module.exports= {
    entry:'./src/app.js',
    output : {
        path:path.join(__dirname,'public'),
        filename: 'bundle.js'
    },
    module : {
        rules: [{
            loader:'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/,
            query: {
                presets: ['react', 'es2015'],
                plugins: ['transform-class-properties']
              }

        }, 
        {
            test:/\.scss$/,
            use: [
            'style-loader','css-loader','sass-loader']
        }
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname,'public'),
        proxy: [{
            context: ['/genre', '/artist', '/album'],
            target: 'https://api.deezer.com', 
            changeOrigin:true
    
          }] 
    }
};


