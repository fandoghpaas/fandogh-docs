/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");
const MarkdownBlock = CompLibrary.MarkdownBlock;
/* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + "/siteConfig.js");

function imgUrl(img) {
  return siteConfig.baseUrl + "img/" + img;
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + "docs/" + (language ? language + "/" : "") + doc;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + "/" : "") + page;
}
function elipsText(text, count) {
  if (!text) return "";
  return text.slice(0, count) + (text.length > count ? "..." : "");
}
class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: "_self"
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src} />
  </div>
);

const ProjectTitle = props => (
  <h2 className="projectTitle">
    <img title={"لوگو فندق"} src={imgUrl("fandogh-logo@2x.png")} />
  </h2>
);

const ProjectDescription = _ => <p />;

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || "";
    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle />
          <ProjectDescription />
          <PromoSection>
            <Button href="/docs/getting-started.html">شروع کار با فندق</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

const Block = props => (
  <Container
    padding={["bottom", "top"]}
    id={props.id}
    background={props.background}
  >
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

const Features = props => (
  <Block layout="fourColumn">
    {[
      {
        content: "This is the content of my feature",
        image: imgUrl("docusaurus.svg"),
        imageAlign: "top",
        title: "Feature One"
      },
      {
        content: "The content of my second feature",
        image: imgUrl("docusaurus.svg"),
        imageAlign: "top",
        title: "Feature Two"
      }
    ]}
  </Block>
);

const FeatureCallout = props => (
  <div
    className="productShowcaseSection paddingBottom"
    style={{ textAlign: "center" }}
  >
    <h2>Feature Callout</h2>
    <MarkdownBlock>These are features of this project</MarkdownBlock>
  </div>
);

const LearnHow = props => (
  <Block background="light">
    {[
      {
        content: "Talk about learning how to use this",
        image: imgUrl("docusaurus.svg"),
        imageAlign: "right",
        title: "Learn How"
      }
    ]}
  </Block>
);

const TryOut = props => (
  <Block id="try">
    {[
      {
        content: "Talk about trying this out",
        image: imgUrl("docusaurus.svg"),
        imageAlign: "left",
        title: "Try it Out"
      }
    ]}
  </Block>
);

const Description = props => (
  <Block background="dark">
    {[
      {
        content: "This is another description of how this project is useful",
        image: imgUrl("docusaurus.svg"),
        imageAlign: "right",
        title: "Description"
      }
    ]}
  </Block>
);

const Document = props => (
  <a href={props.url} className="documentation-item">
    <div>
      <img src={imgUrl(props.image)} alt={props.title} />
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </div>
  </a>
);
const Documentation = props => {
  let documentations = [
    {
      image: "writing.svg",
      title: "مستندات",
      url: "/docs/getting-started.html"
    },

    // {
    //   image: "settings.svg",
    //   title: "آموزش‌ها",
    //   url: "/docs/getting-started.html"
    // },
    // {
    //   image: "project-management.svg",
    //   title: "مفاهیم",
    //   url: "/docs/getting-started.html"
    // },
    {
      image: "blogger.svg",
      title: "بلاگ",
      url: "https://blog.fandogh.cloud/"
    }
    // {
    //   image: "loupe.svg",
    //   title: "منابع",
    //   url: "/docs/getting-started.html"
    // }
  ];

  let docs = documentations.map(item => <Document {...item} />);

  return (
    <div className="documentation">
      <div className="documentation-wrapper">{docs}</div>
    </div>
  );
};

const Showcase = props => {
  if ((siteConfig.users || []).length === 0) {
    return null;
  }
  const showcase = siteConfig.users.map((user, i) => {
    return (
      <a
        className="blockElement showcase fourByGridBlock imageAlignTop"
        href={user.infoLink}
        key={i}
      >
        <img src={user.image} alt={user.caption} title={user.caption} />
        <h3>{user.caption}</h3>
      </a>
    );
  });

  return (
    <div className="productShowcaseSection paddingBottom">
      <h2>{"سرویس‌هایی که از فندق استفاده می‌کنند:"}</h2>
      {/* <p>This project is used by all these people</p> */}
      <div className="gridBlock showcases">{showcase}</div>
    </div>
  );
};

const Articles = props => {
  const articles = siteConfig.articles.map((article, i) => {
    return (
      <a
        className="blockElement article fourByGridBlock imageAlignTop"
        href={article.url}
        key={i}
      >
        <img
          src={article.image}
          alt={article.title}
          style={{ width: "180px", height: "180px" }}
        />
        <h3>{article.title}</h3>
        <p>{elipsText(article.description,91)}</p>
        <span>{article.date}</span>
      </a>
    );
  });
  return (
    <div className="articlesSection paddingBottom">
      <div className="articleHeader">
        <h2>{"آخرین بلاگ‌پست‌ها"}</h2>
        <div className="divider" />
        <a href="https://blog.fandogh.cloud/">{"مشاهده همه"}</a>
      </div>

      {/* <p>This project is used by all these people</p> */}
      <div className="gridBlock showcases">{articles}</div>
    </div>
  );
};

class Index extends React.Component {
  render() {
    let language = this.props.language || "";

    return (
      <div>
        {/* <HomeSplash language={language}/> */}
        <div className="mainContainer">
          <div className="wrapper">
            <Documentation />
            {/*<Showcase language={language}/>*/}
            <Articles />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Index;
