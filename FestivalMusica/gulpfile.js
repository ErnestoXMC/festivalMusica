import { src, dest, watch, series } from 'gulp';//importamos las funciones del paquete gulp
import * as dartSass from 'sass';//importando todos los archivos del paquete sass instalado
import gulpSass from 'gulp-sass';//importando la funcion gulpSass del paquete gulp-sass

const sass = gulpSass(dartSass);

export function js(done){
    src('src/js/app.js')
        .pipe(dest('build/js'))
    done();
}

export function css(done){
    src('src/scss/app.scss', {sourcemaps: true}) //donde se encuentra nuestro archivo scss
        .pipe( sass().on('error', sass.logError) ) //Compilar sass a css, muestra errores en caso de que haya un error al compilar sass
        .pipe( dest('build/css', {sourcemaps: true}) ) // el destino en donde se compilara nuestro archivo app.css, no instala el app.map
    done();
}
export function dev(){
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js)
}
/*
* En la funcion dev no ponemos ningun done porque no queremos que deje de compilarse
* watch va a recibir la ubicacion del archivo y cuando haya algun cambio se va a ir a la funcion "css"
* para que se haga la transformacion de sass a css 
*/
export default series(js, css, dev)