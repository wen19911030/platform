'use strict';
require('./check-versions')();

// npm_lifecycle_event 变量，返回当前正在运行的脚本名称
if (process.env.npm_lifecycle_event === 'deploy:test') {
  process.env.NODE_ENV = 'test';
} else if (process.env.npm_lifecycle_event === 'deploy:prod') {
  process.env.NODE_ENV = 'production';
} else {
  console.error('请选择是编译生产代码，还是编译测试代码');
  console.error('生产代码请执行npm run deploy:prod');
  console.error('测试代码请执行npm run deploy:test');
  return;
}

const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = require('./webpack.prod.conf');

const spinner = ora('building for production...');
spinner.start();

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err;
  webpack(webpackConfig, (err, stats) => {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    );

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1);
    }

    console.log(chalk.cyan('  Build complete.\n'));
    console.log(
      chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
          "  Opening index.html over file:// won't work.\n"
      )
    );
  });
});
