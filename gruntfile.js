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
                    '<%= distPath %>/css/admin.css': '<%= srcPath %>/scss/joomlatools-ui.scss',
                    '<%= distPath %>/css/component.css': '<%= srcPath %>/scss/component.scss',
                    '<%= distPath %>/css/modal-override.css': '<%= srcPath %>/scss/modal-override.scss',
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
                tasks: ['sass', 'cssmin', 'autoprefixer', 'copy'],
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
