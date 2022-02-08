const COLOR_CHANGE_DELAY = 1000;
let intervalId = null;

const refs = {
    startColor: document.querySelector('button[data-start]'),
    stopColor: document.querySelector('button[data-stop]'),
}

refs.stopColor.setAttribute('disabled', true);

refs.startColor.addEventListener('click', startChangeColor);
refs.stopColor.addEventListener('click', stopChangeColor);

function startChangeColor(){
    refs.startColor.setAttribute('disabled', true);
    refs.stopColor.removeAttribute('disabled');
    intervalId = setInterval(()=>{
    const colorOfBody = getRandomHexColor();
    document.body.style.backgroundColor = `${colorOfBody}`;
    }, COLOR_CHANGE_DELAY);
   
 };
function stopChangeColor(){ 
    clearInterval(intervalId);
    refs.startColor.removeAttribute('disabled');
    refs.stopColor.setAttribute('disabled', true);
    }

    function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
