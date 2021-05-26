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
        $('.about__unit').not(this).closest('.team__item').removeClass('team__item--active');
        $('.about__unit').not(this).slideUp();
        $(this).next().not(':visible').closest('.team__item').addClass('team__item--active');
        $(this).next().not(':visible').slideDown();
    })
})


const sliderElements = document.getElementsByClassName('goods__about-items');

let offset = 0;

right.addEventListener('click', slideRight);

function animateTransition(element, transitionFrom, transitionTo, duration) {
    const fps = 25;
    const steps = duration * fps;
    const delta = (transitionTo - transitionFrom) / steps;

    for (let i = 0; i < steps; i++) {
        setTimeout(() => {
            element.style.transform = 'translate(' + (transitionFrom + (i * delta)) + '%)';
        }, i * 1000 / fps);
    }
    setTimeout(() => {
        element.style.transform = 'translate(' + transitionTo + '%)';
    }, duration * 1000);
}

function moveFirstElement() {
    const firstElement = sliderElements[0];
    const clone = firstElement.cloneNode(true);
    firstElement.parentNode.appendChild(clone);
    firstElement.remove();
}

function slideRight() {
    let nextOffset = offset + 1;
    if (nextOffset === sliderElements.length) {
        moveFirstElement();
        offset = sliderElements.length - 2;
        nextOffset = offset + 1;
    }
    for (const element of sliderElements) {
        animateTransition(element, -100 * offset, -100 * nextOffset, 0.5);
    }
    offset = nextOffset;
}


left.addEventListener('click', slideLeft);

function moveLastElement() {
    const lastElement = sliderElements[sliderElements.length - 1];
    const clone = lastElement.cloneNode(true);
    lastElement.parentNode.insertBefore(clone, lastElement.parentNode.firstChild);
    lastElement.remove();
}

function slideLeft() {
    let prev = offset - 1;
    if (prev === -1) {
    moveLastElement();
    offset = 1;
    prev = offset - 1
    }
    for (const element of sliderElements) {
        animateTransition(element, -100 * offset, -100 * prev, 0.5);
    }
    offset = prev;
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

