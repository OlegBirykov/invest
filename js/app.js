const staticHeader = $('.header__content_static');
const popupHeader = $('.header__content_popup');
const overlay = $('.header__overlay');
const sidePanel = $('.header__side-panel');
const closeButton = $('.header__side-close-button');
const sideMenuLink = $('.header__side-menu .header__menu-link');

const loginPage = $('.popup#login');
const loginOverlay = $('.popup#login .popup__overlay');
const loginForm = $('.popup#login .popup__window');

function closeMenu(href) {
    const overlayOff = () => {
        overlay.removeClass('header__overlay_show');
    };

    const menuOff = () => {
        $('body').removeClass('header__app-noscrolling');
        sidePanel.removeClass('header__side-panel_show');
        if (href) {
            document.location.href = href;
        }
    };

    overlay.animate({ opacity: "0" }, 300, 'swing', overlayOff);
    sidePanel.animate({ right: `-${sidePanel.width()}px` }, 500, 'swing', menuOff);
}

function openLoginForm() {
    loginPage.addClass('popup_show');
    loginOverlay.addClass('popup__overlay_show');
    loginForm.addClass('popup__window_show');

    loginOverlay.animate({ opacity: "0.6" }, 250, '', () => {
        loginForm.animate({ opacity: "1" }, 250);
    });
}

function closeLoginForm() {
    loginForm.animate({ opacity: "0" }, 250, '', () => {
        loginOverlay.animate({ opacity: "0" }, 250, '', () => {
            loginPage.removeClass('popup_show');
            loginOverlay.removeClass('popup__overlay_show');
            loginForm.removeClass('popup__window_show');
        });
    });
}

$(document).ready(function() {
    popupHeader.html(staticHeader.html());
    popupHeader.toggleClass('header__content_popup_show', $(window).scrollTop() >= staticHeader.height());

    $('.header__hamburger-link').click(function(e) {
        e.preventDefault();
        $('body').addClass('header__app-noscrolling');

        overlay.addClass('header__overlay_show');
        overlay.animate({ opacity: "0.6" }, 500);

        sidePanel.css({ right: `-${sidePanel.width()}px` });
        sidePanel.addClass('header__side-panel_show');
        sidePanel.animate({ right: "0" }, 500);
    });

    $('.header__button').click(function(e) {
        e.preventDefault();
        openLoginForm();
    });

    $('.header__side-button').click(function(e) {
        e.preventDefault();
        closeMenu();
        openLoginForm();
    });

    $('.header__user').click(function(e) {
        e.preventDefault();
        openLoginForm();
    });

    setTimeout(() => $('.header__logo').css({ opacity: "1" }), 1000);
});

$(window).scroll(function() {
    popupHeader.toggleClass('header__content_popup_show', $(window).scrollTop() >= staticHeader.height());
});

overlay.click(() => closeMenu());

closeButton.click(() => closeMenu());

sideMenuLink.click(function(e) {
    e.preventDefault();
    closeMenu(e.target.href);
});

loginOverlay.click(() => closeLoginForm());

//const data = {};
//const message = $('.message-screen');

$('#login .ctrl__input').change(function(e) {
    e.target.value = e.target.value.trim();
});

$('#login form').validate({
    rules: {
        login: 'required',
        password: 'required',
    },

    messages: {
        login: 'Введите логин',
        password: 'Введите пароль',
    },

//    submitHandler: function(form) {
//        data.lastName = form['last-name'].value;
//        data.firstName = form['first-name'].value;
//        data.patronymic = form.patronymic.value;
//        data.phone = form.phone.value;
//        data.email = form.email.value;
//        data.project = $(form).find('[name=project]').text().trim();

//        $.ajax({
//            url: "/mortgage/app",

//            type: "POST",

//            data: data,

//            success: function () {
//                message.addClass('message-screen_active');
//                setTimeout(() => $(location).attr('href', '/mortgage'), 3000);
//            },

//            error: function (msg) {
//                message.find('.message-screen__title').text(`Ошибка ${msg.status} - ${msg.statusText}`);
//                message.find('.message-screen__text').text('Проверьте интернет-соединение и попробуйте ещё раз');
//                message.addClass('message-screen_active');
//                setTimeout(() => message.removeClass('message-screen_active'), 5000);
//            }
//        });
//    },

    errorClass: 'ctrl__input_error'
});
