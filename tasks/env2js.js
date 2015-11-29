/*
 * grunt-env2js
 * https://github.com/cvng/grunt-env2js
 *
 * Copyright (c) 2015 cvng
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');

module.exports = function (grunt) {

    grunt.registerMultiTask('env2js', 'Write environment vars to JS file.', function () {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            src: [],
            dest: '',
            namespace: ''
        });

        var env = {}, banner, body, footer;

        // Read value from env.
        function getenv(key) {
            return process.env[key];
        }

        // Get specified vars.
        var src = options.src.filter(function (envvar) {

            // Warn on and remove invalid var names.
            if (!getenv(envvar)) {
                grunt.log.warn('Environment variable "' + envvar + '" not found.');
                return false;

            } else {
                // Read env var.
                grunt.log.writeln(envvar, '= "' + getenv(envvar) + '"');
                env[envvar] = getenv(envvar);
                return true;
            }

        });

        // Notify.
        grunt.log.writeln('Found', src.length, 'variables.');

        // Handle options.
        if (!options.namespace)
            options.namespace = 'env';
        if (!options.dest)
            options.dest = [options.namespace, '.js'].join('');

        // Templates.
        banner = 'var ' + options.namespace + ' = ';
        footer = ';';

        body = JSON.stringify(env, null, 4);

        // Build final string.
        var str = [banner, body, footer].join('');

        // Write the destination file.
        grunt.file.write(options.dest, str);

        // Print a success message.
        grunt.log.writeln('File "' + options.dest + '" created.');
    });

};
