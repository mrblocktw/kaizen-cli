"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var cmd = require('node-cmd');

var Spinner = require('../../lib/Spinner');

var Log = require('../../lib/Log');

function builder(yargs) {
  return yargs.option('url', {
    alias: 'u',
    type: 'string',
    describe: 'GitHub url of the project'
  }).example('kaizen install --url https://github.com/PortalNetwork/kaizen-boilerplate').demandOption(['url'], 'Please enter your project GitHub path');
}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(argv) {
    var url;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            Spinner.start();
            url = argv.url;
            _context.next = 5;
            return cloneProjectFromGithub(url);

          case 5:
            Spinner.stop();
            Log.SuccessLog("Install from ".concat(url, " Successfully"));
            Log.NormalLog('Now you can go to the project folder.');
            Log.NormalLog('After you get into the folder, you can install the node packages by using ' + '\'npm install\''.yellow);
            Log.NormalLog('Let\'s start BUIDL!'.green);
            _context.next = 17;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            Spinner.stop();
            Log.ErrorLog('something went wrong!');
            console.error(_context.t0);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 12]]);
  }));
  return _handler.apply(this, arguments);
}

function cloneProjectFromGithub(repoURL) {
  return new Promise(function (resolve, reject) {
    cmd.get("git clone ".concat(repoURL), function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}

module.exports = function (yargs) {
  var command = 'install';
  var commandDescription = 'Install a kaizen project from GitHub';
  yargs.command(command, commandDescription, builder, handler);
};