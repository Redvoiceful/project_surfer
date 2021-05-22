// noinspection DuplicatedCode

const menu = document.getElementById('overlay');
const hamburger = document.getElementById('humb');
const stCompst = document.getElementById('end');
const compst = window.getComputedStyle(stCompst, null);
const about = document.getElementById('about_1');
const parameter = document.getElementById('parameter_1');
const parameterS = document.getElementById('parameter_2');
const aboutF = document.getElementById('about_2');
const left = document.getElementById('left');
const right = document.getElementById('right');
const first = document.getElementById('first');
const second = document.getElementById('second');
const unit = document.getElementsByClassName('about__unit');


menu.isOpened = false;
menu.open = function () {
    menu.style.display = 'block';
    menu.isOpened = true;
}
menu.close = function () {
    menu.style.display = 'none';
    menu.isOpened = false;
}


hamburger.addEventListener("click", (elem) => {
    elem.preventDefault();
    if (menu.isOpened === false) {
        menu.open();
    } else {
        menu.close();
    }
})

menu.addEventListener('click', elem => {
    elem.preventDefault();
    if (menu.isOpened === true) {
        menu.close();
    }
})

parameter.isOpened = false;
parameter.open = () => {
    parameter.style.display = 'none';
    parameter.isOpened = true;
};

parameter.isOpened = true;
parameter.close = () => {
    parameter.style.display = 'block';
    parameter.isOpened = false;
}


about.addEventListener('click', elem => {
    elem.preventDefault();
    if (parameter.isOpened === false) {
        parameter.open();
    } else {
        parameter.close();
    }
});

parameterS.isOpened = false;
parameterS.open = () => {
    parameterS.style.display = 'none';
    parameterS.isOpened = true;
};

parameterS.isOpened = true;
parameterS.close = () => {
    parameterS.style.display = 'block';
    parameterS.isOpened = false;
}


aboutF.addEventListener('click', elem => {
    elem.preventDefault();
    if (parameterS.isOpened === false) {
        parameterS.open();
    } else {
        parameterS.close();
    }
});

$(document).ready(() => {
    $('.about__unit').hide().prev().click(function () {
        $('.about__unit').not(this).slideUp();
        $('#polygon').not(this).css("transform", "rotate(+" + 180 + "deg)");
        $(this).next().not(':visible').slideDown();
    })
})

function show(element) {
    element.style.display = "flex";
    // element.style.transition = '1s, ease';
}

function hide(element) {
    element.style.display = "none";
    element.style.animation = 'slidein';

}

const sliderElements = document.getElementsByClassName('goods__about-items');

let activeCounter = 0;
let activeElement = sliderElements[activeCounter];

right.addEventListener('click', slideRight);

function slideRight() {
    hide(activeElement);
    activeCounter++;
    if (activeCounter >= sliderElements.length) {
        activeCounter = 0;
    }
    activeElement = sliderElements[activeCounter];
    show(activeElement);
}

left.addEventListener('click', slideLeft);

function slideLeft() {
    hide(activeElement);
    activeCounter--;
    if (activeCounter < 0) {
        activeCounter = sliderElements.length - 1;
    }
    activeElement = sliderElements[activeCounter];
    show(activeElement);
}


$(document).ready(function () {
    $('.review__list').slick({
        arrows: false,
        dots: true,
    });
})

// const review = document.getElementsByClassName('review__list');
// let reviewCounter = 0;
//
//
// console.log(review)
//


// const goodsSlider = document.getElementById("goods")
// for (let i=0; i<goodsSlider.children.length; i++){
//     child.isVisible = i===0;
//     let child = goodsSlider.children[i]

const order = document.querySelector('#form');
const send = document.querySelector('#button');
const button = document.querySelector('#close');
const requestSendedWindow = document.getElementById('answer')

requestSendedWindow.opened = false;
requestSendedWindow.open = function (text) {
    requestSendedWindow.style.display = 'flex';
    requestSendedWindow.opened = true;
    document.getElementById("order-request-answer-text").textContent = text;
}
requestSendedWindow.close = function () {
    requestSendedWindow.style.display = 'none';
    requestSendedWindow.opened = false;
};

button.addEventListener('click', element => {
    element.preventDefault();
    requestSendedWindow.close();
})

send.addEventListener('click', event => {
    event.preventDefault();

    if (validateForm(order)) {
        const request = {
            name: order.elements.name.value,
            phone: order.elements.phone.value,
            comment: order.elements.textarea.value,
            radio__controls: order.elements.radio.checked,
            to: "test@dummy.ru"
        }
        const xhr = new XMLHttpRequest();
        xhr.open('post', 'https://webdev-api.loftschool.com/sendmail');
        xhr.responseType = 'json';
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(request));
        xhr.addEventListener('load', () => {
            if (xhr.response.status) {
                requestSendedWindow.open("Ваша заявка принята");
                order.reset();
            } else {
                requestSendedWindow.open("Ошибка отправки");
            }
        });
    }
});

function validateForm(form) {
    let valid = true;

    if (!validate(form.elements.name)) {
        valid = false;
    }

    if (!validate(form.elements.phone)) {
        valid = false;
    }

    if (!validate(form.elements.textarea)) {
        valid = false;
    }

    return valid;
}

function validate(form__row) {
    console.log(form__row);
    if (!form__row.checkValidity()) {
        form__row.textContent = form__row.validationMessage;

        return false;
    } else {
        form__row.textContent = '';

        return true;
    }
}

