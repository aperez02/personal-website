module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			connect: {
				options: {
					port: 3000,
					hostname: 'localhost',
					base: '',
					livereload: true
				}
			}
		},
		watch: {
			options: {
	      		livereload: true	    		
	      	},
			sass: {
				files: 'sass/main.scss',
				tasks: 'sass:main'
			},
			jsDev: {
				files: 'javascript/*.js',
				tasks: 'jshint:dev'
			},
			other: {
	      		files: ['*.html', 'partials/*.html'] 
	      	}
		},
		jshint: {
			config: {
				files: {
					src: ['Gruntfile.js', 'package.json']
				}
			},
			dev: {
				files: {
					src: 'javascript/*.js'
				}
			}
		},
		sass: {
			main: {
				files: {
					"css/main.css": "sass/main.scss"
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('dev', ['sass', 'jshint' ,'connect', 'watch']);

	grunt.registerTask('default', ['dev']);
};