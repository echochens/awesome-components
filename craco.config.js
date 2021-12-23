/* craco.config.js */
/**
 * TODO: 区分环境 —— NODE_ENV
 * - whenDev ☞ process.env.NODE_ENV === 'development'
 * - whenTest ☞ process.env.NODE_ENV === 'test'
 * - whenProd ☞ process.env.NODE_ENV === 'production'
 */
const path = require("path");
const {
  pluginByName,
  getPlugin,
} = require("@craco/craco");

// Postcss 插件
const PostcssPxToViewport = require("postcss-px-to-viewport");
const PostcssNormalize = require("postcss-normalize");
const sassResourcesLoader = require("craco-sass-resources-loader");
const imageOptimizer = require("craco-image-optimizer-plugin");
const cracoPluginSvgSprite = require("craco-plugin-svg-sprite");

const packInfo = require("./package.json");
module.exports = {
  eslint: path.resolve(__dirname, "./.eslintrc.json"),
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
        @import "@tiyafe/awesome-mixins";
        $_cdnImagePath: "http://fepublicty.tiyalive.com/tiya/activities/golden-sharing-nova/${packInfo.name}";
        `,
      },
    },
    postcss: {
      plugins: [
        PostcssPxToViewport({
          viewportWidth: 375, // 视图大小
          viewportUnit: "vw", // 视图单位
          unitToConvert: "px", // 需转换的单位
          unitPrecision: 3, // 转换后小数点位数
        }),
        PostcssNormalize({
          forceImport: "sanitize.css",
        }),
      ],
    },
  },
  plugins: [
    // {
    //   plugin: sassResourcesLoader,
    //   options: {
    //     resources: "./node_modules/@tiyafe/awesome-mixins/scss/index.scss",
    //   },
    // },
    {
      plugin: imageOptimizer,
      // image-webpack-plugin options
      options: {
        mozjpeg: {
          progressive: true,
          quality: 65,
        },
        // optipng.enabled: false will disable optipng
        optipng: {
          enabled: false,
        },
        pngquant: {
          quality: [0.65, 0.9],
          speed: 4,
        },
        gifsicle: {
          interlaced: false,
        },
        // the webp option will enable WEBP
        webp: {
          quality: 75,
        },
      },
    },
    {
      plugin: cracoPluginSvgSprite,
      options: {
        include: path.resolve(__dirname, "./src/assets/icons"), // required
        compress: true, // option
        svgoConfig: {
          // option
        },
        spriteLoaderConfig: { symbolId: "icon-[name]" },
        svgPrefixName: "icon", // option
      },
    },
  ],
  webpack: {
    devtool: "cheap-module-source-map",

    // 别名配置
    alias: {
      "@": path.join(__dirname, "./src"),
      "~": path.join(__dirname, "./src"),
    },

    output: {
      chunkFilename: "[name].[contenthash:8].js",
    },

    /**
     * 重写 webpack 任意配置
     *  - configure 能够重写 webpack 相关的所有配置，但是，仍然推荐你优先阅读 craco 提供的快捷配置，把解决不了的配置放到 configure 里解决；
     *  - 这里选择配置为函数，与直接定义 configure 对象方式互斥；
     */
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.entry = "./src/index.js";

      if (env === "production") {
        paths.publicUrlOrPath = "./";
      }

      const { isFound, match } = getPlugin(
        webpackConfig,
        pluginByName("HtmlWebpackPlugin")
      );
      if (isFound) {
        if (process.env.REACT_APP_CODE === "tiya") {
          match.options.template = path.resolve(
            __dirname,
            "public/tiya_index.html"
          );
        } else {
          match.options.template = path.resolve(
            __dirname,
            "public/zy_index.html"
          );
        }
      }

      // const svgLoader = {
      //   test: /\.svg$/,
      //   include: [path.resolve(__dirname, "./src/assets/icons")],
      //   use: [
      //     {
      //       loader: "svg-sprite-loader",
      //       options: { symbolId: "icon-[name]" },
      //     },
      //     // 对svg定制化
      //     "svgo-loader",
      //   ],
      // };
      // addBeforeLoader(webpackConfig, loaderByName("file-loader"), svgLoader);

      // const imageLoader = {
      //   test: /\.(png|jpe?g|webp|git|svg|)$/i,
      //   use: ["img-optimize-loader"],
      // };
      // addAfterLoader(webpackConfig, loaderByName("file-loader"), imageLoader);

      /**
       * webpack split chunks
       */
      webpackConfig.optimization.splitChunks = {
        ...webpackConfig.optimization.splitChunks,
        ...{
          chunks: "all",
          maxInitialRequests: Infinity,
          minChunks: 2,
          minSize: 12288,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              priority: 20,
              minSize: 40960,
              enforce: true,
              name(module) {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
                let fileName = packageName.replace("@", "").split("@")[0];
                return `package~${fileName}`;
              },
            },
          },
        },
      };

      // 返回重写后的新配置
      return webpackConfig;
    },
  },
};
