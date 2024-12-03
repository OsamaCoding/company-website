const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/js/index.js",
  performance: {
    hints: false,
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.(sass|css|scss)$/,

        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },

      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
      },

      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts",
            },
          },
        ],
      },

      {
        test: /\.html$/i,
        loader: "html-loader",
      },

      {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          exposes: ["$", "jQuery"],
        },
      },
    ],
  },

  devServer: {
    static: { directory: path.join(__dirname, "build") },
    compress: true,
    port: 9000,
    open: true,
    hot: true,
    devMiddleware: {
      writeToDisk: true,
      stats: "errors-only",
    },
    watchFiles: ["src/**/*"],
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },

  performance: {
    hints: false, // تعطيل جميع تحذيرات الأداء
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),

    new HtmlWebpackPlugin({
      template: "./src/projects.html",
      filename: "projects.html",
    }),

    new HtmlWebpackPlugin({
      template: "./src/project-details.html",
      filename: "project-details.html",
    }),

    new HtmlWebpackPlugin({
      template: "./src/blog.html",
      filename: "blog.html",
    }),

    new HtmlWebpackPlugin({
      template: "./src/blog-details.html",
      filename: "blog-details.html",
    }),

    new HtmlWebpackPlugin({
      template: "./src/add-blog.html",
      filename: "add-blog.html",
    }),

    new HtmlWebpackPlugin({
      template: "./src/about.html",
      filename: "about.html",
    }),

    new HtmlWebpackPlugin({
      template: "./src/contact.html",
      filename: "contact.html",
    }),

    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
  ],
};
