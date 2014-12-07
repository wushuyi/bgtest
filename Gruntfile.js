/*global module:false*/
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            options: {
                optimize: 'uglify2',
                uglify2: {
                    output: {
                        beautify: true
                    },
                    compress: {
                        'drop_console': true,
                        sequences: false,
                        'global_defs': {
                            DEBUG: false
                        }
                    },
                    //warnings: true,
                    mangle: false
                }
            },
            compile: {
                options: {
                    appDir: 'www',
                    dir: 'www-built',
                    mainConfigFile: 'www/assets/js/common.js',
                    modules: [
                        {
                            'name': './common',
                            'include': [
                                'domReady',
                                'jquery',
                                'Backbone',
                                //'Modernizr',
                                'lodash',
                                'localforage'
                            ]
                        },
                        {
                            'name': './index',
                            'include': [
                                'apps/index/index'
                            ],
                            'exclude': [
                                './common'
                            ]
                        }
                    ]
                }
            }
        },
        jshint: {
            options: '<%= pkg.jshintConfig %>',
            all: [
                'www/assets/js/apps/*/*.js',
                'www/assets/js/*.js'
            ]
        },
        qunit: {
            all: ['www/*.html']
        }
    });

    // replace this line with
    // grunt.loadNpmTasks('require-js');
    // if you use this example standalone
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('default', ['jshint', 'build']);
    grunt.registerTask('build', 'requirejs');
};