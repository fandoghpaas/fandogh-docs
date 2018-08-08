# webpack-serve-overlay

A rudimentary overlay for [`webpack-serve`](https://github.com/webpack-contrib/webpack-serve), based off the one used in `webpack-dev-server`.

This package is targeted at serves as a quick fully functional way of 
being able to have the same overlay as `webpack-dev-server` in `webpack-serve` with minimal fuss & expense.

## Usage

Install the package:

```
npm i webpack-serve-overlay
```

Then require the overlay at the top of your `index.jsx` (or equivalent):

```javascript
// becomes dead code in builds other than dev,
// which webpack should pick up and remove.
if(process.env.NODE_ENV === 'development') {
    require('webpack-serve-overlay');
}
```

and you'll be away laughing.

## Configuration

The overlay works by using a WebSocket that connects to `webpack-serve` à la `webpack-hot-client`.  
This means that it *shouldn't* require any extra settings or configuration.

However, just in case, you can manually specify the WebSocket url by setting the `WEBPACK_SERVE_OVERLAY_WS_URL` env property.
