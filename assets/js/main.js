$(function () {
    smoothScrool(300);
    workBelt();
    workLoad();
});

function smoothScrool(duration) {
    $('a[href^="#"]').on('click', function (event) {
        var target = $($(this).attr('href'));

        if (target.length) {
            event.preventDefault();
            $('html', 'body').animate({
                scrollTop: target.offset().top
            }, duration);
        }
    });
}


function workBelt() {
    $('.thumb-unit').click(function () {
        $('.work-belt').css('left', '-100%');
        $('.work-container').show();
    });

    $('.work-return').click(function () {
        $('.work-belt').css('left', '0%')
        $('.work-container').hide(700);
    })
}


function workLoad() {
    $.ajaxSetup({ cache: true });
    $('.thumb-unit').click(function () {
        var $this = $(this),
            newTitle = $this.find('p').text(),
            newFolder = $this.data('folder'),
            spinner = '<div class="loader">Loading...</div>',
            newHTML = '/works/' + newFolder + '.html';
        $('.project-load').html(spinner).load(newHTML);

        $('.project-title').text(newTitle)
    });
}


$(function () {
    // Smooth Scrolling
    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});


