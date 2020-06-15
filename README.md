# 简单题

## 1.谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值。

解答：最开始接触工程化单一的理解为脚手架工具，可以快速的初始化项目，不需要手动搭建项目配置，统一了项目结构以及使用的各种工具，例如 UI 组件、构建工具等等。随着项目的深入，发现工程化不仅表现在这些方面，还有使用 eslint 统一编码风格，git commitizen 对提交日志检查，以及 gitlab 上的 ci/cd 自动打包部署等等一系列操作。使前端从开发到上线前，不仅可以使用本地服务进行调试，还可以自行 mock 数据等，提高了编程的效率，以及代码的自我审查，降低上线后出现问题的几率。

🌰：可以将平时一些好的技术解决方案集成到 cli 中，例如性能优化、功能组件等，以后的项目初始化时即可复用。

🌰：gitlab 的 ci/cd，之前前端代码发布部署是在运维搭建的 tars 平台上，且需要自行手动发布，在开发阶段此操作浪费了一部分时间，后集成了 gitlab 的 ci/cd 功能，配置.gitlab-ci.yml，搭配 gitlab runner，提高了发布效率。

🌰：eslint 校验及 vscode 统一配置，保证了项目中代码风格统一，避免了许多问题，例如单双引号、缩进、格式化等等。

## 2. 你认为脚手架除了为我们创建项目结构，还有什么更深的意义？

解答：将前端工作流程串联起来，不单单是初始化一个项目结构。项目立项后有一个好的开始，目录结构清晰、集成一些成熟的解决方案、搭配高效的工具、统一的编码风格及提交日志，使项目代码清晰明了，可维护性提高。同时利用一些工具包，可以使用 es6、scss 等新特性及新的编码方式，也无需在意一些浏览器兼容问题，在编译过程中工具就可以把问题处理掉。效率提升，代码质量提升，可承接更多的需求。

# pages-boilerplate

[![Build Status][travis-image]][travis-url]
[![Package Version][version-image]][version-url]
[![License][license-image]][license-url]
[![Dependency Status][dependency-image]][dependency-url]
[![devDependency Status][devdependency-image]][devdependency-url]
[![Code Style][style-image]][style-url]

> Always a pleasure scaffolding your awesome static sites.

## Getting Started

```shell
# clone repo
$ git clone https://github.com/zce/pages-boilerplate.git my-awesome-pages
$ cd my-awesome-pages
# install dependencies
$ yarn # or npm install
```

## Usage

```shell
$ yarn <task> [options]
```

### e.g.

```shell
# Runs the app in development mode
$ yarn serve --port 5210 --open
# Builds the app for production to the `dist` folder
$ yarn build --production
```

### Available Scripts

#### `yarn lint` or `npm run lint`

Lint the styles & scripts files.

#### `yarn compile` or `npm run compile`

Compile the styles & scripts & pages file.

#### `yarn serve` or `npm run serve`

Runs the app in development mode with a automated server.

##### options

- `open`: Open browser on start, Default: `false`
- `port`: Specify server port, Default: `2080`

#### `yarn build` or `npm run build`

Builds the app for production to the `dist` folder. It minify source in production mode for the best performance.

##### options

- `production`: Production mode flag, Default: `false`
- `prod`: Alias to `production`

#### `yarn start` or `npm run start`

Running projects in production mode.

##### options

- `open`: Open browser on start, Default: `false`
- `port`: Specify server port, Default: `2080`

#### `yarn deploy` or `npm run deploy`

Deploy the `dist` folder to [GitHub Pages](https://pages.github.com).

##### options

- `branch`: The name of the branch you'll be pushing to, Default: `'gh-pages'`

#### `yarn clean` or `npm run clean`

Clean the `dist` & `temp` files.

## Folder Structure

```
└── my-awesome-pages ································· project root
   ├─ public ········································· static folder
   │  └─ favicon.ico ································· static file (unprocessed)
   ├─ src ············································ source folder
   │  ├─ assets ······································ assets folder
   │  │  ├─ fonts ···································· fonts folder
   │  │  │  └─ pages.ttf ····························· font file (imagemin)
   │  │  ├─ images ··································· images folder
   │  │  │  └─ logo.png ······························ image file (imagemin)
   │  │  ├─ scripts ·································· scripts folder
   │  │  │  └─ main.js ······························· script file (babel / uglify)
   │  │  └─ styles ··································· styles folder
   │  │     ├─ _variables.scss ······················· partial sass file (dont output)
   │  │     └─ main.scss ····························· entry scss file (scss / postcss)
   │  ├─ layouts ····································· layouts folder
   │  │  └─ basic.html ······························· layout file (dont output)
   │  ├─ partials ···································· partials folder
   │  │  └─ header.html ······························ partial file (dont output)
   │  ├─ about.html ·································· page file (use layout & partials)
   │  └─ index.html ·································· page file (use layout & partials)
   ├─ .csscomb.json ·································· csscomb config file
   ├─ .editorconfig ·································· editor config file
   ├─ .gitignore ····································· git ignore file
   ├─ .travis.yml ···································· travis ci config file
   ├─ CHANGELOG.md ··································· repo changelog
   ├─ LICENSE ········································ repo license
   ├─ README.md ······································ repo readme
   ├─ gulpfile.js ···································· gulp tasks file
   ├─ package.json ··································· package file
   └─ yarn.lock ······································ yarn lock file
```

## Related

- [zce/x-pages](https://github.com/zce/x-pages) - A fully managed gulp workflow for static page sites.

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; [汪磊](https://zce.me)

[travis-image]: https://img.shields.io/travis/zce/pages-boilerplate/master.svg
[travis-url]: https://travis-ci.org/zce/pages-boilerplate
[version-image]: https://img.shields.io/github/package-json/v/zce/pages-boilerplate/master.svg
[version-url]: https://github.com/zce/pages-boilerplate
[license-image]: https://img.shields.io/github/license/zce/pages-boilerplate.svg
[license-url]: https://github.com/zce/pages-boilerplate/blob/master/LICENSE
[dependency-image]: https://img.shields.io/david/zce/pages-boilerplate.svg
[dependency-url]: https://david-dm.org/zce/pages-boilerplate
[devdependency-image]: https://img.shields.io/david/dev/zce/pages-boilerplate.svg
[devdependency-url]: https://david-dm.org/zce/pages-boilerplate?type=dev
[style-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[style-url]: http://standardjs.com
