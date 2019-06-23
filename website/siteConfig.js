/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config.html for all the possible
// site configuration options.

/* List of projects/orgs using your project for the users page */
const articles = require('./articles')
const docLayou = require('./layouts/custom')
const fs = require('fs')

const users = [
  {
    caption: 'پلتفرم فندق',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/docusaurus.svg'.
    image: '/img/fandogh.svg',
    infoLink: 'https://www.fandogh.cloud',
  },
	{
		caption: 'فندق',
		// You will need to prepend the image path with your baseUrl
		// if it is not '/', like: '/test-site/img/docusaurus.svg'.
		image: '/img/fandogh.svg',
		infoLink: 'https://www.fandogh.cloud',
	},{
		caption: 'فندق',
		// You will need to prepend the image path with your baseUrl
		// if it is not '/', like: '/test-site/img/docusaurus.svg'.
		image: '/img/fandogh.svg',
		infoLink: 'https://www.fandogh.cloud',
	},{
		caption: 'فندق',
		// You will need to prepend the image path with your baseUrl
		// if it is not '/', like: '/test-site/img/docusaurus.svg'.
		image: '/img/fandogh.svg',
		infoLink: 'https://www.fandogh.cloud',

	}
];

const siteConfig = {
  title: 'فندق' /* title for your website */,
  tagline: 'مستندات فندق',
  url: 'https://docs.fandogh.cloud' /* your website url */,
  baseUrl: '/' /* base url for your project */,
  gaTrackingId: 'UA-120059029-1',
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

	layouts: {
		'fandogh': function({React, MarkdownBlock}) {
			return class extends React.Component {
				render() {
					let md = fs.readFileSync("../docs/"+this.props.source, "utf8");
					md = md.replace(/---((?:\\.|[^"\\])*)---/, '')
					let e = React.createElement
					// create breadcrumb dom
					let category = this.props.metadata.category
					let breadCrumb = e('div' ,{className:'breadcrumb'},
							[e('a',{href: '/'}, 'خانه'), e('a',{href: '/'}, ' > ') , e('a',{href: '#'}, category ), e('a',{href: '/'},' > ') , e('span',{}, this.props.metadata.sidebar_label)]
						)
					return e('div', {}, [breadCrumb,e('div', {className: 'documentInner'}, e(MarkdownBlock ,{}, md))]);
				}
			}
		}
	},

	markdownPlugins: [
		function foo(md) {
			md.renderer.rules.fence_custom.foo = function(
				tokens,
				idx,
				options,
				env,
				instance
			) {
				return '<div class="foo">bar</div>';
			};
		},
	],

  // Used for publishing and more
  projectName: 'fandogh',
  organizationName: 'Fandogh PaaS',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    // {doc: 'getting-started', label: 'مستندات'},
  ],

  // If you have users set above, you add it here:
  users,
	articles,

  /* path to images for header/footer */
  headerIcon: 'img/logo-header.svg',
  footerIcon: 'img/fandogh.svg',
  favicon: 'img/fandogh.png',

  /* colors for website */
  colors: {
    primaryColor: '#4f4f4f',
    secondaryColor: '#4f4f4f',
  },

  /* custom fonts for website */
  /*fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },*/

  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' Fandogh',

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags
  scripts: ['https://buttons.github.io/buttons.js'],

  /* On page navigation for the current documentation page */
  onPageNav: 'separate',

  /* Open Graph and Twitter card images */
  ogImage: 'img/fandogh.png',
  twitterImage: 'img/fandogh.png',

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
   repoUrl: 'https://github.com/fandoghpaas/fandogh-cli',
};

module.exports = siteConfig;
