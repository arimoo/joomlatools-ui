module.exports = function(grunt) {

    // measures the time each task takes
    require('time-grunt')(grunt);

    // load time-grunt and all grunt plugins found in the package.json
    require('jit-grunt')(grunt);

    // Variables
    var gulp = require('gulp'),
        styleguide = require('sc5-styleguide'),
        buildPath = './src',
        kodekitPath = '../kodekit-ui/src',
        styleguideAppRoot = './docs',
        srcPath = 'src',
        distPath = 'dist',
        docsPath = 'docs';

    // grunt config
    grunt.initConfig({

        // Grunt variables
        srcPath: srcPath,
        distPath: distPath,
        docsPath: docsPath,

        // Iconfont
        webfont: {
            icons: {
                src: [
                    'node_modules/open-iconic/svg/*.svg',
                    '<%= srcPath %>/icons/*.svg'
                ],
                dest: '<%= distPath %>/fonts/koowa-icons',
                destCss: '<%= srcPath %>/scss/utilities',
                options: {
                    font: 'koowa-icons',
                    hashes: false,
                    stylesheet: 'scss',
                    relativeFontPath: '../fonts/icons/',
                    template: '<%= srcPath %>/icons/template.css',
                    htmlDemo: false
                }
            }
        },


        // Compile sass files
        sass: {
            dist: {
                files: {
                    '<%= distPath %>/css/joomlatools-ui.css': '<%= srcPath %>/scss/joomlatools-ui.scss',
                    '<%= distPath %>/css/component.css': '<%= srcPath %>/scss/component.scss',
                    '<%= distPath %>/css/hathor.css': '<%= srcPath %>/scss/hathor.scss',
                    '<%= distPath %>/css/isis.css': '<%= srcPath %>/scss/isis.scss'
                }
            }
        },


        // Minify and clean CSS
        cssmin: {
            options: {
                roundingPrecision: -1,
                sourceMap: true
            },
            site: {
                files: [{
                    expand: true,
                    src: ['<%= distPath %>/css/*.css', '!*.css']
                }]
            }
        },


        // Autoprefixer
        autoprefixer: {
            options: {
                browsers: ['> 5%', 'last 2 versions', 'ie 11']
            },
            files: {
                expand: true,
                flatten: true,
                src: '<%= distPath %>/css/*.css',
                dest: '<%= distPath %>/css/'
            }
        },


        // Modernizr
        modernizr: {
            dist: {
                "cache": true,

                "dest": "<%= distPath %>/js/build/modernizr.js",
                "options": [
                    "html5shiv",
                    "prefixedCSS",
                    "setClasses"
                ],
                "uglify": false,
                "tests": [
                    "appearance",
                    "checked",
                    "flexbox",
                    "flexboxlegacy",
                    "flexboxtweener",
                    "flexwrap"
                ],
                "crawl" : false,
                "customTests" : [],
                "classPrefix": "k-"
            }
        },


        // Gulp commands
        gulp: {
            'styleguide-generate': function() {
                return gulp.src([
                    kodekitPath + '/scss/joomlatools-ui.scss',
                    kodekitPath + '/scss/core/_core.scss',
                    kodekitPath + '/scss/atoms/*.scss',
                    kodekitPath + '/scss/layout/*.scss',
                    kodekitPath + '/scss/molecules/*.scss',
                    kodekitPath + '/scss/organisms/*.scss'
                ])
                    .pipe(styleguide.generate({
                        title: 'joomlatools UI Docs',
                        rootPath: styleguideAppRoot, // This is where resources are loaded from
                        appRoot: './', // This is where the styleguide is rendered
                        overviewPath: './src/README.md',
                        disableEncapsulation: true,
                        disableHtml5Mode: true,
                        previousSection: true,
                        commonClass: 'koowa koowa-container',
                        nextSection: true,
                        extraHead: [
                            '<link href="joomlatools/css/joomlatools-ui.css" rel="stylesheet" type="text/css">',
                            '<script src="joomlatools/js/modernizr.js"></script>'
                        ],
                        afterBody: [
                            '<script data-inline type="text/javascript">var el = document.body; var cl = "k-js-enabled"; if (el.classList) { el.classList.add(cl); }else{ el.className += " " + cl;}</script>'
                        ],
                        server: true
                    }
                )).pipe(gulp.dest(styleguideAppRoot)); // This is where the styleguide source files get rendered
            },
            'styleguide-applystyles': function() {
                return gulp.src([
                    'css/joomlatools-ui.css'
                ])
                .pipe(styleguide.applyStyles())
                .pipe(gulp.dest(styleguideAppRoot));
            }
        },


        // Copy
        copy: {
            joomlatoolsToDocs: {
                files: [
                    {
                        expand: true,
                        src: ['<%= distPath %>/css/joomlatools-ui.css'],
                        dest: '<%= docsPath %>/joomlatools/css',
                        flatten: true
                    },
                    {
                        expand: true,
                        src: ['<%= distPath %>/js/build/modernizr.js'],
                        dest: '<%= docsPath %>/joomlatools/js',
                        flatten: true
                    },
                    {
                        expand: true,
                        src: ['<%= distPath %>/fonts/koowa-icons/*.*'],
                        dest: '<%= docsPath %>/joomlatools/fonts/koowa-icons',
                        flatten: true
                    }
                ]
            }
        },


        // Shell commands
        shell: {
            updateCanIUse: {
                command: 'npm update caniuse-db'
            }
        },


        // Watch files
        watch: {
            fontcustom: {
                files: [
                    '<%= srcPath %>/icons/*.svg'
                ],
                tasks: ['webfont', 'sass', 'cssmin', 'autoprefixer', 'copy'],
                options: {
                    interrupt: true,
                    atBegin: false
                }
            },
            sass: {
                files: [
                    '<%= srcPath %>/scss/*.scss',
                    '<%= srcPath %>/scss/**/*.scss'
                ],
                tasks: ['sass', 'cssmin', 'autoprefixer', 'copy'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            }
        }


    });

    // The dev task will be used during development
    grunt.registerTask('default', ['shell', 'modernizr', 'gulp:styleguide-generate', 'gulp:styleguide-applystyles', 'watch']);

    // create Styleguide
    grunt.registerTask('styleguide', ['sass', 'cssmin', 'autoprefixer', 'gulp:styleguide-generate', 'gulp:styleguide-applystyles']);

};