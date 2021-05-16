const btn = document.getElementById('btn');
const wrapper = document.getElementById('wrapper');
const modal = document.getElementById('mbtn');
const mWindow = document.getElementById('window');
const style = window.getComputedStyle(mWindow)

mWindow.isOpened = false;

mWindow.opend = function(){
    mWindow.style.left = 0;
    mWindow.isOpened = true;
}

mWindow.close = function(){
    mWindow.style.left = '-1000%';
    mWindow.isOpened = false;
}

btn.addEventListener('click', elem => {
    elem.preventDefault();
    if (mWindow.isOpened == false){
        mWindow.opend();
    } else{
        mWindow.close();
    }
})

mWindow.addEventListener ('click', elem => {
    if (mWindow.isOpened == false){
        mWindow.close();
    }
})