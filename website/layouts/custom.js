/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const customLayout = function({React, Marked}){
	return class customLayout extends React.Component {
		render() {
			console.log(Marked)
			return React.createElement('div', {}, this.props.metadata.layout);
		}
	}
}

module.exports = customLayout;
