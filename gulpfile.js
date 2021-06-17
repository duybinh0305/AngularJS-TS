
var gulp= require('gulp');
var tsProject;

gulp.task('default', function(){
    var ts=require("gulp-typescript");
    var sourcemaps=require("gulp-sourcemaps");

    if(!tsProject){
        tsProject=ts.createProject("tsconfig.json");
    }
    var reporter=ts.reporter.fullReporter();
    var tsResult=tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject(reporter));

    return tsResult.js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist"));
});

