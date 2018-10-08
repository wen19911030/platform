const winston = require('winston');
const moment = require('moment');
const path = require('path');

const config = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue'
  }
};
winston.addColors(config.colors);

const myFormat = winston.format.combine(
  // winston.format.colorize({all: true}),
  winston.format.timestamp(),
  winston.format.printf(info => {
    const message = info.message || '';
    // module，标记日志来自哪个模块
    const module = info.module || 'default';
    return `${info.timestamp} [${info.level}] ${module}: ${message}`;
  })
);

const transportConsole = new winston.transports.Console({
  json: false,
  prettyPrint: true,
  colorize: true,
  level: 'debug',
  timestamp: function() {
    return moment().format('YYYY-MM-DD HH:MM:ss.SSS');
  }
});

const debugTransportFile = new winston.transports.File({
  name: 'full',
  filename: path.join(__dirname, '../logs/debug.log'),
  json: true,
  level: 'debug',
  maxsize: 1024 * 1024 * 10 // 10MB
});

const serviceTransportFile = new winston.transports.File({
  name: 'service',
  filename: path.join(__dirname, '../logs/service.log'),
  json: true,
  level: 'debug',
  maxsize: 1024 * 1024 * 10 // 10MB
});

// default container输出日志到标准输出及debug.log文件中
winston.loggers.add('default', {
  format: myFormat,
  transports: [transportConsole, debugTransportFile]
});
// service container输出日志到标准输出、debug.log及service.log文件中
winston.loggers.add('service', {
  format: myFormat,
  transports: [transportConsole, serviceTransportFile, debugTransportFile]
});

const defaultLog = winston.loggers.get('default');
const serviceLog = winston.loggers.get('service');
// 封装default
exports.getDefaultLogger = module => {
  return {
    debug: (...args) => {
      const meta = {module};
      const fullParams = args.concat(meta);
      defaultLog.debug.apply(defaultLog, fullParams);
    },
    info: (...args) => {
      const meta = {module};
      const fullParams = args.concat(meta);
      defaultLog.info.apply(defaultLog, fullParams);
    },
    warn: (...args) => {
      const meta = {module};
      const fullParams = args.concat(meta);
      defaultLog.warn.apply(defaultLog, fullParams);
    },
    error: (...args) => {
      const meta = {module};
      const fullParams = args.concat(meta);
      defaultLog.error.apply(defaultLog, fullParams);
    }
  };
};
// 封装service
exports.getServiceLogger = module => {
  return {
    debug: (...args) => {
      const meta = {module};
      const fullParams = args.concat(meta);
      serviceLog.debug.apply(serviceLog, fullParams);
    },
    info: (...args) => {
      const meta = {module};
      const fullParams = args.concat(meta);
      serviceLog.info.apply(serviceLog, fullParams);
    },
    warn: (...args) => {
      const meta = {module};
      const fullParams = args.concat(meta);
      serviceLog.warn.apply(serviceLog, fullParams);
    },
    error: (...args) => {
      const meta = {module};
      const fullParams = args.concat(meta);
      serviceLog.error.apply(serviceLog, fullParams);
    }
  };
};
