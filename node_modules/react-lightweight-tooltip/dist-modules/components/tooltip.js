'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tooltip = function (_React$Component) {
  _inherits(Tooltip, _React$Component);

  function Tooltip(props) {
    _classCallCheck(this, Tooltip);

    var _this = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this, props));

    _this.styles = {
      wrapper: {
        position: 'relative',
        display: 'inline-block',
        zIndex: '98',
        color: '#555',
        cursor: 'help'
      },
      tooltip: {
        position: 'absolute',
        zIndex: '99',
        minWidth: '200px',
        maxWidth: '420px',
        background: '#000',
        bottom: '100%',
        left: '50%',
        marginBottom: '10px',
        padding: '5px',
        WebkitTransform: 'translateX(-50%)',
        msTransform: 'translateX(-50%)',
        OTransform: 'translateX(-50%)',
        transform: 'translateX(-50%)'
      },
      content: {
        background: '#000',
        color: '#fff',
        display: 'inline',
        fontSize: '.8em',
        padding: '.3em 1em'
      },
      arrow: {
        position: 'absolute',
        width: '0',
        height: '0',
        bottom: '-5px',
        left: '50%',
        marginLeft: '-5px',
        borderLeft: 'solid transparent 5px',
        borderRight: 'solid transparent 5px',
        borderTop: 'solid #000 5px'
      },
      gap: {
        position: 'absolute',
        width: '100%',
        height: '20px',
        bottom: '-20px'
      }
    };

    _this.mergeStyles = function (userStyles) {
      Object.keys(_this.styles).forEach(function (name) {
        Object.assign(_this.styles[name], userStyles[name]);
      });
    };

    _this.show = function () {
      return _this.setVisibility(true);
    };

    _this.hide = function () {
      return _this.setVisibility(false);
    };

    _this.setVisibility = function (visible) {
      _this.setState(Object.assign({}, _this.state, {
        visible: visible
      }));
    };

    _this.handleTouch = function () {
      _this.show();
      _this.assignOutsideTouchHandler();
    };

    _this.assignOutsideTouchHandler = function () {
      var handler = function handler(e) {
        var currentNode = e.target;
        var componentNode = _reactDom2.default.findDOMNode(_this.refs.instance);
        while (currentNode.parentNode) {
          if (currentNode === componentNode) return;
          currentNode = currentNode.parentNode;
        }
        if (currentNode !== document) return;
        _this.hide();
        document.removeEventListener('touchstart', handler);
      };
      document.addEventListener('touchstart', handler);
    };

    _this.state = {
      visible: false
    };
    if (props.styles) _this.mergeStyles(props.styles);
    return _this;
  }

  _createClass(Tooltip, [{
    key: 'render',
    value: function render() {
      var props = this.props;
      var state = this.state;
      var styles = this.styles;
      var show = this.show;
      var hide = this.hide;
      var handleTouch = this.handleTouch;

      return _react2.default.createElement(
        'div',
        {
          onMouseEnter: show,
          onMouseLeave: hide,
          onTouchStart: handleTouch,
          ref: 'wrapper',
          style: styles.wrapper },
        props.children,
        state.visible && _react2.default.createElement(
          'div',
          { ref: 'tooltip', style: styles.tooltip },
          _react2.default.createElement(
            'div',
            { ref: 'content', style: styles.content },
            props.content
          ),
          _react2.default.createElement('div', { ref: 'arrow', style: styles.arrow }),
          _react2.default.createElement('div', { ref: 'gap', style: styles.gap })
        )
      );
    }
  }]);

  return Tooltip;
}(_react2.default.Component);

Tooltip.propTypes = {
  children: _propTypes2.default.any.isRequired,
  content: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),
  styles: _propTypes2.default.object
};
exports.default = Tooltip;