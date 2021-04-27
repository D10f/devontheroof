const path = require('path');
const fs = require('fs');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

class BuildWordPressFiles{
  apply(compiler){
    compiler.hooks.done.tap('Link compiled JS and CSS files to custom theme', function(){

      let functionsphp = fs.readFileSync('./src/wp_theme/functions.php', 'utf-8');
      // const jsfiles = new RegExp(/^main\..+\.js/ig);
      const cssfiles = new RegExp(/main\..+\.css/ig);

      fs.readdirSync('./dist').forEach(file => {
        // if (file.match(jsfiles)) {
        //   fs.copyFile(`./dist/${file}`, `./src/wp_theme/js/${file}`, (err) => {
        //     if (err) throw err
        //   });
        //   functionsphp = functionsphp.replace(/main\..+\.js/ig, file);
        // }

        if (file.match(cssfiles)) {
          fs.copyFile(`./dist/${file}`, `./src/wp_theme/css/${file}`, (err) => {
            if (err) throw err
          });
          functionsphp = functionsphp.replace(cssfiles, file);
        }
      });

      fs.writeFileSync('./src/wp_theme/functions.php', functionsphp);
    });
  }
};

let mode = 'development';
let target = 'web';
let devtool = 'source-map';
let plugins = [
  new HtmlWebpackPlugin({ filename: 'index.html', template: './src/index.html' }),
];

if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  target = 'browserslist';
  devtool = false;
  plugins.push(new CleanWebpackPlugin(), new BuildWordPressFiles());
}

/* Do not use hashes while in development in order to benefit from HMR */
plugins.push(new MiniCssExtractPlugin({
  filename: mode === 'production' ? '[name].[contenthash].css' : '[name].css' }
));

module.exports = {
  mode: mode,
  target: target,
  entry: './src/app.js',
  output: {
    filename: mode === 'production' ? '[name].[contenthash].js' : '[name].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[name][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(webp|png|jpe?g|gif|svg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(webm|mp4)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'videos/[name][ext][query]'
        }
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]'
        }
      },
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(s[c|a]|c)ss/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '' }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },
    ]
  },
  plugins: plugins,
  devtool: devtool,
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    watchOptions: {
      aggregateTimeout: 1000,
      ignored: /node_modules/
    },
    hot: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};
