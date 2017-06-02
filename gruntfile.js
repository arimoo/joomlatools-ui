module.exports = function(grunt) {

    // measures the time each task takes
    require('time-grunt')(grunt);

    // load time-grunt and all grunt plugins found in the package.json
    require('jit-grunt')(grunt);

    // grunt config
    grunt.initConfig({

        // Grunt variables
        KUIPath: '../kodekit-ui',
        srcPath: 'src',
        distPath: 'dist',


        // Compile sass files
        sass: {
            dist: {
                files: {
                    '<%= distPath %>/css/build/admin.css': '<%= srcPath %>/scss/admin.scss',
                    '<%= distPath %>/css/build/component.css': '<%= srcPath %>/scss/component.scss',
                    '<%= distPath %>/css/build/modal-override.css': '<%= srcPath %>/scss/modal-override.scss',
                    '<%= distPath %>/css/build/hathor.css': '<%= srcPath %>/scss/hathor.scss',
                    '<%= distPath %>/css/build/isis.css': '<%= srcPath %>/scss/isis.scss'
                }
            },
            options: {
                includePaths: [
                    'node_modules',
                    '<%= KUIPath %>/node_modules'
                ],
                outputStyle: 'expanded',
                sourceMap: false
            }
        },


        // Minify and clean CSS
        cssmin: {
            options: {
                roundingPrecision: -1,
                sourceMap: false
            },
            site: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['<%= distPath %>/css/build/*.css', '!*.css'],
                    dest: '<%= distPath %>/css/min/'
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
                src: '<%= distPath %>/css/min/*.css',
                dest: '<%= distPath %>/css/min/'
            }
        },


        // Copy
        copy: {
            KUItoJUI: {
                files: [
                    {
                        expand: true,
                        src: ['<%= KUIPath %>/dist/fonts/k-icons/*.*'],
                        dest: '<%= distPath %>/fonts/k-icons',
                        flatten: true
                    },
                    {
                        expand: true,
                        src: ['<%= KUIPath %>/dist/js/build/*.*'],
                        dest: '<%= distPath %>/js/build',
                        flatten: true
                    },
                    {
                        expand: true,
                        src: ['<%= KUIPath %>/dist/js/min/*.*'],
                        dest: '<%= distPath %>/js/min',
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
            sass: {
                files: [
                    // Kodekit UI
                    '<%= KUIPath %>/src/scss/*.scss',
                    '<%= KUIPath %>/src/scss/**/*.scss',

                    // Joomlatools UI
                    '<%= srcPath %>/scss/*.scss',
                    '<%= srcPath %>/scss/**/*.scss'
                ],
                tasks: ['sass', 'cssmin', 'autoprefixer'],
                options: {
                    interrupt: true,
                    atBegin: true // Keep set to true since this runs the copy task, if set to false add copy task to default registerTask
                }
            },
            js: {
                files: [
                    // Kodekit UI
                    '<%= KUIPath %>/dist/js/build/*.js'
                ],
                tasks: ['copy'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            }
        }


    });

    // The dev task will be used during development
    grunt.registerTask('default', ['shell', 'watch']);

};
