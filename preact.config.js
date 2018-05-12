const webpack = require("webpack");
const path = require("path");
const Dotenv = require("dotenv-webpack");

export default (config, env, helpers) => {
  // Disabled CSS modules
  let styles = helpers.getLoadersByName(config, "css-loader");
  styles[0].loader.options.modules = false;

  // const sassResourceLoader = {
  //   loader: "sass-resources-loader",
  //   options: {
  //     resources: [
  //       path.resolve(__dirname, "./ui/style/_mixins.scss"),
  //       path.resolve(__dirname, "./ui/style/_variables.scss")
  //     ]
  //   }
  // };
  // config.module.loaders[2].use.push(sassResourceLoader);

  config.plugins.push(new Dotenv());
};
