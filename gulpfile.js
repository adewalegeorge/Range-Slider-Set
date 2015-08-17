/*--------------------------------------------
    Developed by Adewale George
    Twitter: @adewalegeorge8
    Web: http://adewalegeorge.com
---------------------------------------------*/


/*---------------------------------------------
	GULP VARIABLES
----------------------------------------------*/
var gulp = require('gulp'), 
    sass = require('gulp-ruby-sass') ,
    notify = require("gulp-notify") ,
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jade = require('gulp-jade'),
    changed = require('gulp-changed'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    clean = require('gulp-clean'),
    browserSync = require('browser-sync'),
    reloadBS = browserSync.reload(),
    streamBS = browserSync.stream();

/*--------------------------------------------
	CONFIG
----------------------------------------------*/
var config = {
    staticDeploy: './wwwroot',
    staticDevelop: './development'
}

var swallowError =  notify.withReporter(function (options, callback) {
    // console.log("Title:", options.title);
    console.log("Message:", options.message);
    callback();
});


/*---------------------------------------------
	BROWSER SYNC
----------------------------------------------*/
gulp.task('browser-sync', function () {
    browserSync.init(null, {
        server: {
            baseDir: config.staticDeploy
        },
        // Change the default weinre port
        ui: {
            weinre: {
                port: 9090
            }
        }
    });
});


/*---------------------------------------------
	CSS
----------------------------------------------*/
gulp.task('css', function() {
    return sass(
    	config.staticDevelop + '/sass/style.scss', {
    		lineNumbers: false, 
    		style: 'compressed', 
    		sourcemap: false, 
    		loadPath: [
    			config.staticDevelop + '/sass'
    		]
    	}
    )
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.staticDeploy + '/css'))
    .pipe(browserSync.reload({stream:true}));
});



/*---------------------------------------------
	JAVASCRIPT CONCAT
----------------------------------------------*/
gulp.task('concat', function () {
    gulp.src([
        config.staticDevelop + '/scripts/rangeslider.js',
        config.staticDevelop + '/scripts/app.js'
    ])
    .pipe(concat('app.js'))
    .pipe(swallowError())
    .pipe(gulp.dest(config.staticDeploy + '/js'))
    .pipe(rename('app.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest(config.staticDeploy + '/js'))
    .pipe(browserSync.reload({stream:true}));;
});



/*---------------------------------------------
	JADE
----------------------------------------------*/
gulp.task('jade', function() {
    // gulp.src(config.staticDevelop + '/**/*.jade')
    return gulp.src([
  		config.staticDevelop + '/jade/**/*.jade', 
  		'!' + config.staticDevelop + '/jade/templates/**', 
  	])
	.pipe(plumber())
    .pipe(jade({ pretty: true }))
    // only pass changed html files
    .pipe(changed( config.staticDeploy ), {extension: '.html'})
    .pipe(gulp.dest( config.staticDeploy ))
    .pipe(browserSync.reload({stream:true}));
});


/*---------------------------------------------
	WATCH
----------------------------------------------*/
// Rerun the task when a file changes
 gulp.task('watch', function() {
    gulp.watch(config.staticDevelop + '/jade/templates/*.jade', ['clean-html', 'jade']); 
     gulp.watch(config.staticDevelop + '/sass/**/*.scss', ['css']); 
	gulp.watch(config.staticDevelop + '/jade/*.jade', ['jade']); 
	gulp.watch(config.staticDevelop + '/scripts/**/*.js', ['concat']); 
    gulp.start('browser-sync');
});


/*---------------------------------------------
    CLEAN HTML
----------------------------------------------*/
// Rerun the task when a file changes
 gulp.task('clean-html', function() {
    return gulp.src(config.staticDeploy + '/*.html', {read: false})
    .pipe(clean());
});



/*---------------------------------------------
    GULP DEFAULT
----------------------------------------------*/
// Rerun the task when a file changes
 gulp.task('default', ['clean-html', 'jade', 'css', 'watch']);
