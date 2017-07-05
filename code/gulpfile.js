//gulp-htmlmin插件的参数对象
var obj = {
	removeComments: true, //清除HTML注释
	collapseWhitespace: true, //压缩HTML
	collapseBooleanAttributes: true,//省略布尔属性的值<input checked="true"/> ==> <input checked/>
	removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
	removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
	removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
	minifyJS: true, //压缩页面JS
	minifyCSS: true //压缩页面CSS
}
//压缩css
var gulp = require("gulp");//gulp对象
var htmlmin = require("gulp-htmlmin");//使用插件
gulp.task("htmlTask", function () {
	gulp.src("css/*")
	.pipe(htmlmin(obj))//使用插件
	.pipe(gulp.dest("dest/css"));
});
gulp.task("default",["htmlTask"]);

//压缩js


/*var gulp = require('gulp');
var babel = require('gulp-babel'); //es6转es5
var uglify = require('gulp-uglify'); //js压缩插件

//压缩js
gulp.task('jsTask', function(){
	gulp.src('js/*')
	.pipe(babel({presets:['es2015']})) //es6转es5
	.pipe(uglify()) //js压缩
	.pipe(gulp.dest('dest/js'));
});
gulp.task('default', ['jsTask']); */