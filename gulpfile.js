const {src, dest, watch, series} = require('gulp');
// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// Imagenes
const imagemin = require('gulp-imagemin');



function css(done){
    // compilar sass
    // 1.- identificar archivo, 2.- Compilarla, 3.- Guardar el .css
    src('src/scss/app.scss')
        .pipe(sass())
        .pipe( postcss([autoprefixer()]) )
        .pipe(dest('build/css'))
    done();
}

function imagenes( done ){
    src('src/img/**/*')
        .pipe( imagemin({ optimizationLevel:3 }))
        .pipe( dest('build/img'));

    done();
}

function dev(){
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
    // watch('src/scss/app.scss',css);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = series(imagenes, css,dev);