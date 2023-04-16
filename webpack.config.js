const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = ({ mode, outputPath }) => {
  return {
    mode: mode === 'dev' ? 'development' : 'production',
    devtool: mode === 'dev' ? 'cheap-module-source-map' : false,
    entry: {
      popup: path.resolve('src/popup/index.tsx'),
      spotlight: path.resolve('src/content-scripts/spotlight/index.tsx'),
      background: path.resolve('src/service-workers/background.ts'),
      extractor: path.resolve('src/content-scripts/extractor.ts'),
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      modules: ['src', 'node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|ico)$/,
          use: 'file-loader',
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve('src/static'),
            to: path.resolve(outputPath),
          },
          {
            from: path.resolve('manifest.json'),
            to: path.resolve(outputPath),
          },
        ],
      }),
      ...htmlWebpackPlugins(['popup', 'spotlight']),
    ],
    output: {
      path: path.resolve(outputPath),
      filename: '[name].js',
    },
    optimization: {
      splitChunks: {
        chunks(chunk) {
          return (
            chunk.name !== 'spotlight' && chunk.name !== 'extractor' && chunk.name !== 'background'
          );
        },
      },
    },
  };
};

function htmlWebpackPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HtmlWebpackPlugin({
        filename: '[name].html',
        name: chunk,
        template: path.resolve('src/static/template.html'),
      }),
  );
}
