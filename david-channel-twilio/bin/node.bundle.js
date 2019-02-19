module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function extractNumber(event) {
  var number = _lodash2.default.get(event, 'user.number') || _lodash2.default.get(event, 'number') || _lodash2.default.get(event, 'raw.to') || _lodash2.default.get(event, 'raw.number') || _lodash2.default.get(event, 'user.userId');

  if (!number) {
    throw new Error('Could not extract user phone number number from event');
  }

  return number;
}

module.exports = { extractNumber: extractNumber };

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _twilio = __webpack_require__(4);

var _twilio2 = _interopRequireDefault(_twilio);

var _querystring = __webpack_require__(5);

var _querystring2 = _interopRequireDefault(_querystring);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _bodyParser = __webpack_require__(6);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _util = __webpack_require__(1);

var _umm = __webpack_require__(7);

var _umm2 = _interopRequireDefault(_umm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var client = null;

module.exports = {

  config: {
    accountSID: { type: 'string', required: true, env: 'TWILIO_SID' },
    authToken: { type: 'string', required: true, env: 'TWILIO_TOKEN' },
    fromNumber: { type: 'string', required: false, env: 'TWILIO_FROM' },
    messagingServiceSid: { type: 'string', required: false, env: 'TWILIO_MESSAGING_SERVICE_SID' }
  },

  init: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(bp, configurator) {
      var _ref2, accountSID, authToken, fromNumber, messagingServiceSid, handleOutgoing;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              handleOutgoing = function handleOutgoing(event, next) {
                console.log('handle outgoing');
                console.log('twilio index');
                if (event.platform !== 'twilio') {
                  // Only process twilio messages
                  return next();
                }
                console.log(next);

                var payload = {
                  to: (0, _util.extractNumber)(event),
                  body: event.text,
                  mediaUrl: event.image
                };

                if (!_lodash2.default.isNil(messagingServiceSid)) {
                  payload.messagingServiceSid = messagingServiceSid;
                } else {
                  payload.from = fromNumber;
                }

                console.log(payload);

                client.messages.create(payload).then(function () {
                  if (event._promise && event._resolve) {
                    event._resolve();
                  }
                });
              };

              bp.middlewares.register({
                name: 'twilio.sendSms',
                type: 'outgoing',
                order: 100,
                handler: handleOutgoing,
                module: 'botpress-twilio',
                description: 'Sends out text messages by SMS using Twilio'
              });

              _context.next = 4;
              return configurator.loadAll();

            case 4:
              _ref2 = _context.sent;
              accountSID = _ref2.accountSID;
              authToken = _ref2.authToken;
              fromNumber = _ref2.fromNumber;
              messagingServiceSid = _ref2.messagingServiceSid;


              client = new _twilio2.default(accountSID, authToken);

              (0, _umm2.default)(bp);

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function init(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return init;
  }(),

  ready: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(bp, configurator) {
      var _this = this;

      var getOrCreateUser = function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(fromNumber) {
          var id, existingUser, newUser;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  id = 'twilio:' + fromNumber;
                  _context2.next = 3;
                  return bp.db.get().then(function (knex) {
                    return knex('users').where('id', id);
                  }).then(function (users) {
                    return users[0];
                  });

                case 3:
                  existingUser = _context2.sent;

                  if (!existingUser) {
                    _context2.next = 9;
                    break;
                  }

                  existingUser.id = fromNumber;
                  return _context2.abrupt('return', existingUser);

                case 9:
                  newUser = {
                    first_name: 'Unknown',
                    last_name: 'Unknown',
                    profile_pic: null,
                    id: fromNumber,
                    platform: 'twilio',
                    number: fromNumber
                  };
                  _context2.next = 12;
                  return bp.db.saveUser(newUser);

                case 12:
                  return _context2.abrupt('return', newUser);

                case 13:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        return function getOrCreateUser(_x5) {
          return _ref4.apply(this, arguments);
        };
      }();

      var logDebug, router, _ref5, authToken;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              logDebug = function logDebug(message) {
                if (process.env.TWILIO_DEBUG) {
                  bp.logger.debug('[XXXX Twilio] ' + message);
                }
              };

              bp.twilio = { getOrCreateUser: getOrCreateUser };

              router = bp.getRouter('botpress-twilio', {
                'bodyParser.json': false,
                'auth': false,
                'bodyParser.urlencoded': false
              });


              router.use(_bodyParser2.default.urlencoded({
                extended: false
              }));

              _context4.next = 6;
              return configurator.loadAll();

            case 6:
              _ref5 = _context4.sent;
              authToken = _ref5.authToken;


              router.post('/webhook', function () {
                var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
                  var valid, _ref7, message, fromNumber, fromCountry, fromCity, fromState, smsSid, messageSid, _toNumber, _accountSid, user;

                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          logDebug('Kill Yr Idols Incoming Twilio Message [HOST=\'' + req.headers.host + '\'] [URL=\'' + req.originalUrl + '\']');

                          valid = _twilio2.default.validateExpressRequest(req, authToken, { protocol: 'https' });

                          if (valid) {
                            _context3.next = 5;
                            break;
                          }

                          logDebug('Signature verification failed');
                          return _context3.abrupt('return', res.sendStatus(403));

                        case 5:

                          logDebug('Message verified');
                          res.sendStatus(200);

                          _ref7 = req.body || {}, message = _ref7.Body, fromNumber = _ref7.From, fromCountry = _ref7.FromCountry, fromCity = _ref7.FromCity, fromState = _ref7.FromState, smsSid = _ref7.SmsSid, messageSid = _ref7.SmsMessageSid, _toNumber = _ref7.To, _accountSid = _ref7.AccountSid;
                          _context3.next = 10;
                          return getOrCreateUser(fromNumber);

                        case 10:
                          user = _context3.sent;


                          bp.middlewares.sendIncoming({
                            platform: 'twilio',
                            type: 'message',
                            user: user,
                            text: message,
                            raw: { message: message, fromNumber: fromNumber, fromCountry: fromCountry, fromCity: fromCity, fromState: fromState, smsSid: smsSid, messageSid: messageSid }
                          });

                          logDebug('Message delivered to bot');

                        case 13:
                        case 'end':
                          return _context3.stop();
                      }
                    }
                  }, _callee3, _this);
                }));

                return function (_x6, _x7) {
                  return _ref6.apply(this, arguments);
                };
              }());

            case 9:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function ready(_x3, _x4) {
      return _ref3.apply(this, arguments);
    }

    return ready;
  }()
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("twilio");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _util = __webpack_require__(8);

var _util2 = _interopRequireDefault(_util);

var _lodash = __webpack_require__(0);

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = __webpack_require__(9);

var _bluebird2 = _interopRequireDefault(_bluebird);

var _util3 = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PromisifyEvent(event) {
  if (!event._promise) {
    event._promise = new _bluebird2.default(function (resolve, reject) {
      event._resolve = resolve;
      event._reject = reject;
    });
  }

  return event;
}

function _processOutgoing(_ref) {
  var event = _ref.event,
      blocName = _ref.blocName,
      instruction = _ref.instruction;

  var ins = Object.assign({}, instruction); // Create a shallow copy of the instruction
  console.log('twilio umm');
  console.log(instruction);

  ////////
  // PRE-PROCESSING
  ////////

  var optionsList = ['typing'];

  var options = _lodash2.default.pick(instruction, optionsList);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = optionsList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var prop = _step.value;

      delete ins[prop];
    }

    /////////
    /// Processing
    /////////
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (!_lodash2.default.isNil(instruction.text)) {
    var number = (0, _util3.extractNumber)(event);

    return PromisifyEvent({
      platform: 'twilio',
      type: 'text',
      user: { id: number, number: number },
      raw: Object.assign({ to: number, message: instruction.text }, options),
      text: instruction.text
    });
  }

  if (!_lodash2.default.isNil(instruction.image)) {
    var _number = (0, _util3.extractNumber)(event);

    return PromisifyEvent({
      platform: 'twilio',
      type: 'image',
      user: { id: _number, number: _number },
      raw: Object.assign({ to: _number, message: instruction.text }, options),
      image: instruction.image
    });
  }

  ////////////
  /// POST-PROCESSING
  ////////////

  // Nothing to post-process yet

  ////////////
  /// INVALID INSTRUCTION
  ////////////

  var strRep = _util2.default.inspect(instruction, false, 1);
  throw new Error('Unrecognized instruction in Twilio in bloc \'' + blocName + '\': ' + strRep);
}

module.exports = function (bp) {
  var _$at = _lodash2.default.at(bp, ['umm', 'umm.registerConnector']),
      _$at2 = _slicedToArray(_$at, 2),
      umm = _$at2[0],
      registerConnector = _$at2[1];

  umm && registerConnector && registerConnector({
    platform: 'twilio',
    processOutgoing: function processOutgoing(args) {
      return _processOutgoing(Object.assign({}, args, { bp: bp }));
    },
    templates: []
  });
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ })
/******/ ]);
//# sourceMappingURL=node.bundle.js.map