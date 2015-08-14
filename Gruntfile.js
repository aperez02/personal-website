module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			server: {
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
			other: {
	      		files: '*.html', 
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

	grunt.registerTask('default', ['sass', 'connect', 'watch']);
};