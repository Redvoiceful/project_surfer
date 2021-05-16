const menu = document.getElementById('overlay');
const hamburger = document.getElementById('humb');
const stCompst = document.getElementById('end');
const compst = window.getComputedStyle(stCompst,null);
const about = document.getElementById('about');
const parameter = document.getElementById('parameters');


menu.isOpened = false;
menu.open = function (){
    menu.style.left = 0;
    menu.isOpened = true;
}
menu.close = function (){
    menu.style.left = '-1000%';
    menu.isOpened = false;
}



hamburger.addEventListener("click", (elem) => {
    elem.preventDefault();
    if (menu.isOpened == false){
        menu.open();
    } else {
        menu.close();
    }
})

menu.addEventListener('click', elem => {
    elem.preventDefault();
    if (menu.isOpened == true){
        menu.close();
    }
})

parameter.isOpened = false;
parameter.open = () => {
    parameter.style.left = 0;
    parameter.isOpened = true;
};

parameter.isOpened = true;
parameter.close = () =>{
    parameter.style.left = '-100%';
    parameter.isOpened = false;
}



about.addEventListener ('click', elem => {
    elem.preventDefault();
    if (parameter.isOpened == false){
        parameter.open();
    } else {
        parameter.close();
    }
});
