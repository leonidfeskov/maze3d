module.exports = {
   entry: './f/js/app.js',
   output: {
       path: __dirname + "/f/js",
       filename: "app.bundle.js"
   },
   watch: true,
   module: {
       loaders: [{
           test: /\.js$/,
           exclude: /node_modules/,
           loader: 'babel-loader'
       }]
   }
}