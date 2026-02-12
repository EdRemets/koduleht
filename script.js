const randomBtn = document.querySelector(".random");
const clickBtn = document.querySelector(".clicker");
const countText = document.querySelector(".click-count");
const randomParagraph = document.querySelector(".randomParagraph");
const autoClickerBtn = document.querySelector(".autoClickerBtn");
const autoClickerImg = document.querySelector(".autoClickerImg");
const clickMultBtn = document.querySelector(".clickMultBtn");
let count = 0;
count = localStorage.getItem('clickCount') ? localStorage.getItem('clickCount') : 0;
let clickInterval = null;
let ownedItems = localStorage.getItem('ownedItems') ? JSON.parse(localStorage.getItem('ownedItems')) : {};
let clickingTime = 1 / ownedItems['Autoclicker'] <= 0 ? 1 : ownedItems['Autoclicker'];

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

function getAutoclickerCount() {
    return ownedItems['Autoclicker'] ? ownedItems['Autoclicker'] : 0;
}

function getAutoclickerCost() {
    return getAutoclickerCount() <= 0 ? 10 : Math.round(10 * getAutoclickerCount() * 1.15);
}

function getMultiplierCount() {
    return ownedItems['Multiplier'] ? ownedItems['Multiplier'] : 0;
}

function getMultiplierCost() {
    return getMultiplierCount() <= 0 ? 30 : Math.round(30 * getMultiplierCount() * 1.15);
}

function clickButton() {
    const multCount = getMultiplierCount();
    if (multCount > 0) {
        count = Number(count) + 1 * getMultiplierCount();
    }
    else {
        count++;
    }
    update();
}



function resetInterval() {
    clearInterval(clickInterval);
    clickingTime = 1 / ownedItems['Autoclicker'];
    clickInterval = setInterval(function() {
        clickButton();
    }, clickingTime * 1000);
}

function update() {
    countText.textContent = "Count: " + count;
    localStorage.setItem('clickCount', count);
    if (ownedItems['Autoclicker'] > 0) {
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
    let price = getAutoclickerCost();
    if (count >= price) {
        count -= price;
        ownedItems['Autoclicker'] == null ? ownedItems['Autoclicker'] = 1 : ownedItems['Autoclicker']++;
        localStorage.setItem('ownedItems', JSON.stringify(ownedItems));
        update();
        autoClickerBtn.textContent = 'Autoclicker\r\nCosts: ' + getAutoclickerCost();
    }
    
});

clickMultBtn.addEventListener('click', function() {
    let price = getMultiplierCost();
    if (count >= price) {
        count -= price;
        ownedItems['Multiplier'] == null ? ownedItems['Multiplier'] = 2 : ownedItems['Multiplier']++;
        localStorage.setItem('ownedItems', JSON.stringify(ownedItems));
        update();
        clickMultBtn.textContent = '+1x mult\r\nCosts: ' + getMultiplierCost();
    }
    
});

update();
console.log(autoClickerBtn.textContent);
autoClickerBtn.textContent = 'Autoclicker\r\nCosts: ' + getAutoclickerCost();
clickMultBtn.textContent = '+1x mult\r\nCosts: ' + getMultiplierCost();