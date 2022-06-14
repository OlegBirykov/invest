const blur = $('.invest__content-background');
const video = $('.invest__video');

let leftBlur;
let leftVideo;

const borrowerButton = $('.invest__button');
const borrowerPage = $('.popup#borrower');
const borrowerOverlay = $('.popup#borrower .popup__overlay');
const borrowerForm = $('.popup#borrower .popup__window');

function openBorrowerForm() {
    borrowerPage.addClass('popup_show');
    borrowerOverlay.addClass('popup__overlay_show');
    borrowerForm.addClass('popup__window_show');

    borrowerOverlay.animate({ opacity: "0.6" }, 250, '', () => {
        borrowerForm.animate({ opacity: "1" }, 250);
    });
}

function closeBorrowerForm() {
    borrowerForm.animate({ opacity: "0" }, 250, '', () => {
        borrowerOverlay.animate({ opacity: "0" }, 250, '', () => {
            borrowerPage.removeClass('popup_show');
            borrowerOverlay.removeClass('popup__overlay_show');
            borrowerForm.removeClass('popup__window_show');
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

borrowerButton.click(function(e) {
    e.preventDefault();
    openBorrowerForm();
});

$('#borrower .ctrl__input').change(function(e) {
    e.target.value = e.target.value.trim();
});

$('#borrower form').validate({
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

borrowerOverlay.click(function(e) {
    e.preventDefault();
    closeBorrowerForm();
});



