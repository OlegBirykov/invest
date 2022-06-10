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




