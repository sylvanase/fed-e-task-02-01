const loadGruntTasks = require('load-grunt-tasks')
const sass = require('sass');

// 处理html
const data = {
  menus: [
    {
      name: "Home",
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
          name: "Github",
          link: "https://github.com/sylvanase"
        }
      ]
    }
  ],
  pkg: require("./package.json"), // 读取package.json中的信息
  date: new Date()
};

module.exports = grunt => {
  // 自动加载grunt中的所有插件任务
  loadGruntTasks(grunt)

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: 'dist/**',
      dist: 'dist/**'
    },
    eslint: {
      target: ['src/assets/scripts/*.js']
    },
    scsslint: {
      allFiles: [
        'src/assets/styles/*.scss'
      ]
    },
    // 编译scss和js
    sass: {
      options: {
        implementation: sass
      },
      dist: {
        files : [{
          expand: true,
          cwd: 'src/assets/styles/',
          src: ['**/*.scss'],
          dest: './temp/css',
          ext: '.css'
        }]
      }
    },
    babel: {
      options: {
        presets: ['@babel/preset-env']
      },
      dist: {
        files : [{
          expand: true,
          cwd: 'src/assets/scripts/',
          src: ['**/*.js'],
          dest: './temp/js',
          ext: '.js'
        }]
      }
    },
    // 压缩html文件
    htmlmin: {
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        dist: {
          files : [{
            expand: true,
            cwd: 'src/',
            src: ['**/*.html'],
            dest: './dist/',
            ext: '.html'
          }]
        }
      }
    },
    uglify: {
      dist: {
        files : [{
          expand: true,
          cwd: 'temp/js',
          src: ['**/*.js'],
          dest: './dist/assets/scripts'
        }]
      }
    },
    cssmin: {
      dist: {
        files : [{
          expand: true,
          cwd: 'temp/css',
          src: ['**/*.css'],
          dest: './dist/assets/styles'
        }]
      }
    },
    imagemin: {
      dist: {
        files : [{
          expand: true,
          cwd: 'src/assets/images/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: './dist/assets/images'
        },
        {
          expand: true,
          cwd: 'src/assets/fonts/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: './dist/assets/fonts'
        }]
      }
    },
    useminPrepare :{
      html :"index.html "
    },
    useref: {
      html: 'temp/*.html',
      temp: 'dist'
    }
  })

  grunt.registerTask('lint', ['scsslint', 'eslint'])
  grunt.registerTask('compile', ['sass', 'babel'])
  grunt.registerTask('build', ['clean','compile', 'useref', 'cssmin', 'uglify', 'htmlmin', 'imagemin'])
}
