const randomBtn = document.querySelector(".random");
const clickBtn = document.querySelector(".clicker");
const countText = document.querySelector(".click-count");
const randomParagraph = document.querySelector(".randomParagraph");
const autoClickerBtn = document.querySelector(".autoClickerBtn");
const autoClickerImg = document.querySelector(".autoClickerImg");
let count = localStorage.getItem('clickCount') ? localStorage.getItem('clickCount') : 0;
let autoclickCount = localStorage.getItem('autoclickCount') ? localStorage.getItem('autoclickCount') : 0;;
let clickInterval = null;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getText() {
    let randomNumber = randomInt(0, 5);
    if (randomNumber == 0) {
        return "ok go away";
    }
    else if (randomNumber < 2) {
        return "hi";
    }

    else if (randomNumber < 5) {
        return "never gonna give you up";
    }
    return "no text";
};

function clickButton() {
    ++count;
    update();
}

let clickingTime = 1;

console.log(clickingTime)

function resetInterval() {
    clearInterval(clickInterval);
    clickingTime = 1 / autoclickCount;
    clickInterval = setInterval(function() {
        clickButton();
    }, clickingTime * 1000);
}

function update() {
    countText.textContent = "Count: " + count;
    localStorage.setItem('clickCount', count);
    if (autoclickCount != 0 && clickInterval == null) {
        resetInterval();
    }
}

randomBtn.addEventListener('click', function() {
    randomParagraph.textContent = getText();
});

clickBtn.addEventListener('click', function() {
    clickButton();
});

autoClickerBtn.addEventListener('click', function() {
    if (count > 9) {
        count -= 10
        autoclickCount++;
        localStorage.setItem('autoclickCount', autoclickCount);
        update();
    }
    
});

update();