/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? language + '/' : '') + doc;
  }

  render() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
         
            <div>
                
                <a href="https://blog.fandogh.cloud">Blog</a>

                </div>

                <div>

                <a href="https://github.com/fandoghpaas">GitHub</a>
                </div>

                <div>
                <a
                  className="github-button"
                  href={this.props.config.repoUrl}
                  data-icon="octicon-star"
                  data-count-href="/facebook/docusaurus/stargazers"
                  data-show-count={true}
                  data-count-aria-label="# stargazers on GitHub"
                  aria-label="Star this project on GitHub">
                  Star
                </a>
              </div>
          
        </section>

        <a
          href="https://fandogh.cloud"
          target="_blank"
          rel="noreferrer noopener"
          className="fbOpenSource">
          <img
            src={this.props.config.baseUrl + 'img/fandogh.svg'}
            alt="Fandogh"
            width="170"
            height="45"
          />
        </a>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
