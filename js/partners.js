const blur = $('.invest__content-background');
const video = $('.invest__video');

let leftBlur;
let leftVideo;

const partnerButton = $('.invest__button');
const partnerPage = $('.popup#partner');
const partnerOverlay = $('.popup#partner .popup__overlay');
const partnerForm = $('.popup#partner .popup__window');

function openPartnerForm() {
    partnerPage.addClass('popup_show');
    partnerOverlay.addClass('popup__overlay_show');
    partnerForm.addClass('popup__window_show');

    partnerOverlay.animate({ opacity: "0.6" }, 250, '', () => {
        partnerForm.animate({ opacity: "1" }, 250);
    });
}

function closePartnerForm() {
    partnerForm.animate({ opacity: "0" }, 250, '', () => {
        partnerOverlay.animate({ opacity: "0" }, 250, '', () => {
            partnerPage.removeClass('popup_show');
            partnerOverlay.removeClass('popup__overlay_show');
            partnerForm.removeClass('popup__window_show');
        });
    });
}

$(document).ready(function() {
    $('.invest__video')[0].play();
    leftBlur = blur.position().left + blur.width() / 2;
    leftVideo = video.position().left;
});

$(document).mousemove(function(e) {
    if ($(window).width() > 1199) {
        blur.animate({ left: `${leftBlur - Math.round(e.pageX / $(window).width() * 160 - 80)}px` }, 10);
        video.animate({ left: `${leftVideo + Math.round(e.pageX / $(window).width() * 120 - 80)}px` }, 10);
    }
});

$(window).resize(function() {
    if ($(window).width() <= 1199) {
        blur.css('left', '');
        video.css('left', '');
    }
});

partnerButton.click(function(e) {
    e.preventDefault();
    openPartnerForm();
});

$('#partner .ctrl__input').change(function(e) {
    e.target.value = e.target.value.trim();
});

$('#partner form').validate({
    rules: {
        login: 'required',
        password: 'required',
    },

    messages: {
        login: 'Введите логин',
        password: 'Введите пароль',
    },

    errorClass: 'ctrl__input_error'
});

partnerOverlay.click(function(e) {
    e.preventDefault();
    closePartnerForm();
});



