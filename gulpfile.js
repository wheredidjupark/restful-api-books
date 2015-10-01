var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', function() {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
        	PORT: 8000
            //'NODE_ENV': 'development'
        },
        ignore: ['./node_modules/**']
    }).on('restart', function(){
    	console.log("restarting");
    });
});
