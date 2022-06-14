const blur = $('.invest__content-background');
const video = $('.invest__video');

let leftBlur;
let leftVideo;

const investorButton = $('.invest__button');
const investorPage = $('.popup#investor');
const investorOverlay = $('.popup#investor .popup__overlay');
const investorForm = $('.popup#investor .popup__window');

function setPercentsLeft() {
    const delayLeft = $('.stat__chart-item_return').outerWidth() + 12;
    $('.stat__chart-item_delay').css('padding-left', `${delayLeft}px`);

    const nonReturnLeft = $('.stat__chart-item_delay').outerWidth() + 12;
    $('.stat__chart-item_non-return').css('padding-left', `${nonReturnLeft}px`);
}

function openInvestorForm() {
    investorPage.addClass('popup_show');
    investorOverlay.addClass('popup__overlay_show');
    investorForm.addClass('popup__window_show');

    investorOverlay.animate({ opacity: "0.6" }, 250, '', () => {
        investorForm.animate({ opacity: "1" }, 250);
    });
}

function closeInvestorForm() {
    investorForm.animate({ opacity: "0" }, 250, '', () => {
        investorOverlay.animate({ opacity: "0" }, 250, '', () => {
            investorPage.removeClass('popup_show');
            investorOverlay.removeClass('popup__overlay_show');
            investorForm.removeClass('popup__window_show');
        });
    });
}

$(document).ready(function() {
    $('.invest__video')[0].play();
    leftBlur = blur.position().left + blur.width() / 2;
    leftVideo = video.position().left;

    const sumToNumber = (text) => +text.replace(' ', '').replace(',', '.');

    const returnSum = sumToNumber($('#return').text());
    const delaySum = sumToNumber($('#delay').text());
    const nonReturnSum = sumToNumber($('#non-return').text());
    const total = +(returnSum + delaySum + nonReturnSum).toFixed(1);

    const delayPercent = Math.round(delaySum / total * 100);
    const nonReturnPercent = Math.round(nonReturnSum / total * 100);
    const returnPercent = 100 - delayPercent - nonReturnPercent;

    $('.stat__chart-item_return').text(`${returnPercent}%`);
    $('.stat__chart-item_delay').text(`${delayPercent}%`);
    $('.stat__chart-item_non-return').text(`${nonReturnPercent}%`);

    $('.stat__chart-item_return').css('right', `${100 - returnPercent}%`);
    $('.stat__chart-item_delay').css('right', `${100 - returnPercent - delayPercent}%`);

    setPercentsLeft();
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

    setPercentsLeft();
});

investorButton.click(function(e) {
    e.preventDefault();
    openInvestorForm();
});

$('#investor .ctrl__input').change(function(e) {
    e.target.value = e.target.value.trim();
});

$('#investor form').validate({
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

investorOverlay.click(function(e) {
    e.preventDefault();
    closeInvestorForm();
});



