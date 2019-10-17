const util = require('util');

/** 
 * 
*/
function Logger(stdout, stderr) {
  if (!(this instanceof Logger)) {
    return new Logger(stdout, stderr);
  }

  if (!stdout || !(stdout.write instanceof Function)) {
    throw new Error('Logger expects a writable stream instance');
  }

  if (!stderr) {
    stderr = stdout;
  }

  let props = {
    writable: true,
    enumerable: false,
    configurable: false
  };

  Object.defineProperty(this, '_stdout', {
    ...props,
    value: stdout
  });

  Object.defineProperty(this, '_stderr', {
    ...props,
    value: stderr
  });

  Object.defineProperty(this, '_times', {
    value: new Map()
  });

  const keys = Object.keys(Logger.prototype);

  for(let k in keys) {
    this[keys[k]] = this[keys[k]].bind(this);
  }
}

Logger.prototype.log = function() {
  this._stdout.write(util.format.apply(this, arguments) + '\n')
};

Logger.prototype.info = Logger.prototype.log;

Logger.prototype.warn = function() {
  this._stderr.write(util.format.apply(this, arguments) + '\n')
};

Logger.prototype.error = Logger.prototype.warn;

Logger.prototype.trace = function trace(...args) {
  const err = {
    name: 'Trace',
    message: util.format.apply(null, args)
  }

  Error.captureStackTrace(err, trace);

  this.error(err.stack);
};

Logger.prototype.clear = function() {
  if (this._stdout.isTTY) {
    const { cursorTo, clearScreenDown } = require('readline');
    cursorTo(this._stdout, 0, 0);
    clearScreenDown(this._stdout);
  }
};

Logger.prototype.dir = function(object, options) {
  options = { customInspect: false, ...options };

  this._stdout.write(util.inspect(object, options) + '\n' );
};

Logger.prototype.time = function(label) {
  this._times.set(label, process.hrtime());
}

Logger.prototype.timeEnd = function(label) {
  const time = this._times.get(label);

  if (!time) {
    process.emitWarning(`No such label '${label}' for console.timeEnd()`);
    return;
  }

  const duration = process.hrtime(time);
  const ms = duration[0] * 1000 + duration[1] / 1e6; // 1e6表示1*10^6
  this.log('%s: %sms', label, ms.toFixed(3));
  this._times.delete(label);
}

module.exports = new Logger(process.stdout, process.stderr);
module.exports.Logger = Logger;