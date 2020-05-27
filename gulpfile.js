"use strict";

var gulp = require("gulp");
var nunjucksRender = require("gulp-nunjucks-render");
var plumber = require("gulp-plumber");
var gulpif = require("gulp-if");
var changed = require("gulp-changed");
var prettify = require("gulp-prettify");
var frontMatter = require("gulp-front-matter");
let del = require("del");

var sass = require("gulp-sass");
var sourcemap = require("gulp-sourcemaps");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var svgstore = require("gulp-svgstore");
var webp = require("gulp-webp");
var imagemin = require("gulp-imagemin");

var server = require("browser-sync").create();

var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

const ghPages = require("gh-pages");
const path = require("path");

function deploy(cb) {
  ghPages.publish(path.join(process.cwd(), "./build"), cb);
}
exports.deploy = deploy;

gulp.task("css", function () {
  return gulp
    .src("src/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

// Static server
gulp.task("browser-sync", function () {
  server.init({
    server: {
      baseDir: "build",
    },
  });

  gulp.watch("src/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("src/img/**/*.{png,jpg,svg}", gulp.series("images", "reload"));
  gulp.watch("src/img/icon-*.svg", gulp.series("sprite", "nunjucks", "reload"));
  gulp.watch("src/**/*.+(html|nunjucks)", gulp.series("nunjucks", "reload"));
  gulp.watch("src/js/*.js", gulp.series("js", "reload"));
});

gulp.task("reload", function (done) {
  server.reload();
  done();
});

function renderHtml(onlyChanged) {
  nunjucksRender.nunjucks.configure({
    watch: false,
    trimBlocks: true,
    lstripBlocks: false,
  });

  return gulp
    .src(["src/pages/**/*.+(html|nunjucks)"])
    .pipe(plumber())
    .pipe(gulpif(onlyChanged, changed("build")))
    .pipe(
      frontMatter({
        property: "data",
      })
    )
    .pipe(
      nunjucksRender({
        //PRODUCTION: config.production,
        path: ["src/templates/"],
      })
    )
    .pipe(
      prettify({
        indent_size: 2,
        wrap_attributes: "auto", // "force"
        preserve_newlines: false,
        // unformatted: [],
        end_with_newline: true,
      })
    )
    .pipe(gulp.dest("build"));
}

gulp.task("nunjucks", function () {
  return renderHtml();
});

gulp.task("nunjucks:changed", function () {
  return renderHtml(true);
});

gulp.task("sprite", function () {
  return gulp
    .src("src/img/{icon-*,htmlacademy*}.svg")
    .pipe(
      svgstore({
        inlineSvg: true,
      })
    )
    .pipe(rename("sprite_auto.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("images", function () {
  return gulp
    .src("src/img/**/*.{png,jpg,svg}")
    .pipe(
      imagemin([
        imagemin.optipng({
          optimizationLevel: 2,
        }),
        imagemin.mozjpeg({
          quality: 80,
          progressive: true,
        }),
        imagemin.svgo(),
      ])
    )

    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp
    .src("src/img/**/*.{png,jpg}")
    .pipe(
      webp({
        quality: 90,
      })
    )
    .pipe(gulp.dest("src/img"));
});

gulp.task("libs", function () {
  return gulp
    .src([
      "node_modules/jquery/dist/jquery.js",
      "node_modules/slick-carousel/slick/slick.js",
      "node_modules/jquery.marquee/jquery.marquee.js",
      "node_modules/lozad/dist/lozad.js",
      "node_modules/imagesloaded/imagesloaded.pkgd.js",
      "node_modules/select2/dist/js/select2.full.min.js",
    ])
    .pipe(concat("libs.js"))
    .pipe(uglify()) // Минимизировать весь js (на выбор)
    .pipe(gulp.dest("build/js"));
});

gulp.task("js", function () {
  return (
    gulp
      .src([
        "src/js/common.js", // Всегда в конце
      ])
      .pipe(concat("scripts.min.js"))
      //.pipe(uglify()) // Минимизировать весь js (на выбор)
      .pipe(gulp.dest("build/js"))
  );
});

gulp.task("copy", function () {
  return gulp
    .src(["src/fonts/**/*.{woff,woff2,eof,ttf,svg}", "src/img/favicon/**"], {
      base: "src",
    })
    .pipe(gulp.dest("build"));
});
gulp.task("clean", function () {
  return del("build");
});

gulp.task(
  "build",
  gulp.series(
    "clean",
    "copy",
    "css",
    "libs",
    "js",
    "images",
    "sprite",
    "nunjucks"
  )
);

gulp.task("default", gulp.series("build", "browser-sync"));
