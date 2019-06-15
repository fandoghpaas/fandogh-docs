/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const siteConfig = require(process.cwd() + "/siteConfig.js");
const React = require('react');
function imgUrl(img) {
  return siteConfig.baseUrl + "img/" + img;
}

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
      <footer className="footer-site">
      <div className="footer-site-top">
      <div className="footer-site-links">
          <a href="/" className="footer-site-top-link">صفحه اصلی</a>
          <a href="https://blog.fandogh.cloud" className="footer-site-top-link">بلاگ</a>
          <a href="https://github.com/fandoghpaas" className="footer-site-top-link">Contribute</a>
      </div>  
        <div className="footer-site-top-social">
          <a className="footer-site-top-social-item">
            <img src={imgUrl('footer/1.svg')} alt="Fandogh" />
          </a>
          <a href="https://github.com/fandoghpaas" className="footer-site-top-social-item">
            <img src={imgUrl('footer/2.svg')} alt="Fandogh" />
          </a>
          <a href="https://twitter.com/fandoghpaas?s=09" className="footer-site-top-social-item">
            <img src={imgUrl('footer/3.svg')} alt="Fandogh" />
          </a>
          <a href="support@fandogh.cloud" className="footer-site-top-social-item">
            <img src={imgUrl('footer/4.svg')} alt="Fandogh" />
          </a>
        </div>
        </div>
      <div className="footer-site-down">
      <p>کلیه حقوق این سایت متعلق به <a href="https://fandogh.cloud/">فندق</a> می‌باشد</p>
      </div>
        {/* <section className="sitemap">
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
        <section className="copyright">{this.props.config.copyright}</section> */}
      </footer>
    );
  }
}

module.exports = Footer;
