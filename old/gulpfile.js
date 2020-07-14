var gulp = require('gulp');
var jimp = require('gulp-jimp');

const fileList = {
    images: [
        './images/**/*.jpg',
        '!./images/thumbnails/**/*.jpg',
        '!./images/banners/*',
        '!./images/favicons/*',
        '!./images/landingpages/*',
        '!./images/me/*',
        '!./images/posts/*'
    ]
};

gulp.task('thumbnails', function() {
    const thumbnailConfig = {
        '-thumb': {
            resize: {
                width: 600
            },
            quality: 85
        }
    };

    return gulp.src(fileList.images)
        .pipe(jimp(thumbnailConfig))
        .pipe(gulp.dest('./images/thumbnails'));
});

gulp.task('default', function(done) {
    done();
});