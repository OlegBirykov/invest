const staticHeader = $('.header__content_static');
const popupHeader = $('.header__content_popup');
const overlay = $('.header__overlay');
const sidePanel = $('.header__side-panel');
const closeButton = $('.header__side-close-button');
const sideMenuLink = $('.header__side-menu .header__menu-link');

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

    setTimeout(() => $('.header__logo').css({ opacity: "1" }), 1000);
});

$(window).scroll(function() {
    popupHeader.toggleClass('header__content_popup_show', $(window).scrollTop() >= staticHeader.height());
});

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

overlay.click(() => closeMenu());

closeButton.click(() => closeMenu());

sideMenuLink.click(function(e) {
    e.preventDefault();
    closeMenu(e.target.href);
});

