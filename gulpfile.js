
const { src, dest, parallel } = require('gulp');
const minifyCSS = require('gulp-csso');

function css(){
    return src('resources/css/*.css')
    .pipe(minifyCSS())
    .pipe(dest('dist'))
}