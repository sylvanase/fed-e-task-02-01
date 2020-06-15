// 实现这个项目的构建任务
const { src, dest, parallel, series, watch } = require("gulp");

const del = require("del");
// 热更新
const browserSync = require("browser-sync");
const bs = browserSync.create();

// 加载gulp插件用
const loadPlugins = require("gulp-load-plugins");
const plugins = loadPlugins();

// 判定当前执行环境
const env = process.env.NODE_ENV;
// 解析node.js 命令行工具
const argv = require("minimist")(process.argv.slice(2));

const isProd = env
  ? env === "production"
  : argv.production || argv.prod || false;

// 删除dist和temp目录，clean 后必须有自定义匿名函数，否则会报错
const clean = () => {
  return del(["dist", "temp"]);
};

// 使用temp目录作为临时目录，避免与dist读写发生冲突
// 处理scss文件
const styles = () => {
  return src("src/assets/styles/*.scss", { base: "src", sourcemaps: !isProd })
    .pipe(plugins.sass({ outputStyle: "expanded" }))
    .pipe(dest("temp"))
    .pipe(bs.reload({ stream: true }));
};
// scss的lint校验
const scsslint = () => {
  return src("src/assets/styles/*.scss", {
    base: "src",
    sourcemaps: !isProd
  }).pipe(plugins.sassLint());
};

// 使用babel处理js文件
const scripts = () => {
  return src("src/assets/scripts/*.js", { base: "src" })
    .pipe(plugins.babel({ presets: ["@babel/preset-env"] }))
    .pipe(dest("temp"))
    .pipe(bs.reload({ stream: true }));
};

// js的eslint校验
const eslint = () => {
  return src("src/assets/scripts/*.js", { base: "src" })
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError());
};

// 处理html
const data = {
  menus: [
    {
      name: "Home",
      icon: "aperture",
      link: "index.html"
    },
    {
      name: "About",
      link: "about.html"
    },
    {
      name: "Contact",
      link: "#",
      children: [
        {
          name: "Weibo",
          link: "https://weibo.com"
        },
        {
          name: "Tiktok",
          link: "https://www.douyin.com/"
        },
        {
          name: "divider"
        },
        {
          name: "About",
          link: "https://github.com/sylvanase"
        }
      ]
    }
  ],
  pkg: require("./package.json"), // 读取package.json中的信息
  date: new Date()
};
const pages = () => {
  return src("src/*.html", { base: "src" })
    .pipe(plugins.swig({ data, defaults: { cache: false } })) // 防止模板缓存导致页面不能及时更新
    .pipe(dest("temp"))
    .pipe(bs.reload({ stream: true }));
};

// 处理图片文件
const images = () => {
  return src("src/assets/images/**", { base: "src" })
    .pipe(plugins.imagemin())
    .pipe(dest("dist"));
};

const fonts = () => {
  return src("src/assets/fonts/**", { base: "src" })
    .pipe(plugins.imagemin()) // 使用imagemin处理svg
    .pipe(dest("dist"));
};

const publics = () => {
  return src("public/**", { base: "public" }).pipe(dest("dist"));
};

// 合并多个引入，减少依赖文件数
const useref = () => {
  return src("temp/*.html", { base: "temp" })
    .pipe(plugins.useref({ searchPath: ["temp", "."] }))
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(
      plugins.if(
        /\.html$/,
        plugins.htmlmin({
          collapseWhitespace: true, // 去掉空格
          minifyCSS: true,
          minifyJS: true
        })
      )
    )
    .pipe(dest("dist"));
};

const lint = parallel(scsslint, eslint);

const compile = parallel(styles, scripts, pages);

const serve = () => {
  // html/css/js文件发生变化，需要编译
  watch("src/assets/styles/*.scss", styles);
  watch("src/assets/scripts/*.js", scripts);
  watch("src/*.html", pages);
  // 静态文件集中监听，不会经常变更
  watch(
    ["src/assets/images/**", "src/assets/fonts/**", "public/**"],
    bs.reload
  );

  bs.init({
    open: false,
    notify: false,
    port: 2080,
    server: {
      baseDir: ["temp", "src", "public"],
      routes: {
        "/node_modules": "node_modules"
      }
    }
  });
};

// 先清空dist和temp目录
const build = series(
  clean,
  parallel(
    series(compile, useref), // 合并前先压缩，然后处理css、js、html
    images, // 处理静态文件
    fonts,
    publics
  )
);

const prodMode = () => {
  bs.init({
    notify: false,
    open: argv.open === undefined ? false : argv.open,
    port: argv.port === undefined ? 2080 : argv.port,
    server: "dist"
  });
};

const start = series(build, prodMode);
// TODO: 待完成
const uploadDist = () => {
  return src("**", { base: "dist" })
    .pipe(plugins.plumber())
    .pipe(
      plugins.ghPages({
        cacheDir: `temp/publish`,
        branch: argv.branch === undefined ? "gh-pages" : argv.branch
      })
    );
};
const deploy = series(build, uploadDist);
// 暴露出去的命令
module.exports = {
  lint,
  compile,
  serve,
  build,
  start,
  deploy,
  clean
};
