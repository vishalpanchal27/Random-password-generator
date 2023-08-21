const passwordDisplay = document.querySelector("#output")
const range = document.querySelector("#rangeLength")
const rangeValue = document.querySelector("#rangeValue")
const upperCase = document.querySelector("#uppercaseCheck")
const lowerCase = document.querySelector("#lowercaseCheck")
const numberCase = document.querySelector("#numberCheck")
const symbol = document.querySelector("#symbolCheck")
const passwordStrength = document.querySelector(".StrengthColor")
const passwordGenerateBtn = document.querySelector("#GenerateBtn")
const allCheckBox = document.querySelectorAll(".checkBox")

const symbols = `~!@#$%^&*()_-+=:;"''{}[]"<>?/.,`

let password = ""
let passwordLength = 12;
let checkCount = 0;
handleSlider();

// set password length
function handleSlider() {
    range.value = passwordLength;
    rangeValue.textContent = range.value;
}

range.addEventListener("input", (e) => {
    passwordLength = e.target.value
    rangeValue.textContent = range.value
    handleSlider();
})
function shufflePassword(array) {
    // fresher yates method 
    console.log("entered in the shuffled")
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        const temp = array[i];
        array[i] = array[j]
        array[j] = temp;
    }
    let str = ""
    array.forEach((element) => (str += element))
    return str;

}

function setIndicator(color) {
    passwordStrength.style.backgroundColor = color;
    passwordStrength.style.boxShadow = `0px 0px 12px 7px ${color}`;
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function generateRandomNumber() {
    return getRandomInteger(0, 9)
}

function generateRandomUpperCase() {
    return String.fromCharCode(getRandomInteger(65, 91))
}

function generateRandomLowerCase() {
    return String.fromCharCode(getRandomInteger(97, 123))
}

function generateRandomSymbol() {
    const ranSym = getRandomInteger(0, symbols.length)
    return symbols.charAt(ranSym)
}

const copyBtn = () => copyContent()

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        if (password == "") alert("password empty")
        else alert("Password Copied")
        console.log("copied")
    } catch (error) {
        throw Error(console.log("Not Copyed"))
    }
}

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkBox) => {
        if (checkBox.checked) {
            checkCount++;
            if (checkCount == 1) setIndicator('red')
            if (checkCount == 3 || checkCount == 2) setIndicator("orange")
            if (checkCount == 4) setIndicator('blue')
        }
    })
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkBox) => {
    checkBox.addEventListener('change', handleCheckBoxChange)
})

passwordGenerateBtn.addEventListener('click', () => {
    if (checkCount == 0) {
        alert("Select Atleaset one checkbox")
    }
})

passwordGenerateBtn.addEventListener('click', () => {
    if (checkCount == 0) return;
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
    // remove Password
    password = "";


    let funArr = [];
    if (upperCase.checked) funArr.push(generateRandomUpperCase)
    if (lowerCase.checked) funArr.push(generateRandomLowerCase)
    if (numberCase.checked) funArr.push(generateRandomNumber)
    if (symbol.checked) funArr.push(generateRandomSymbol)

    // compalsary Addition 

    for (let i = 0; i < funArr.length; i++) {
        password += funArr[i]();
    }

    // remainging Addition

    for (let i = 0; i < (passwordLength - funArr.length); i++) {
        let randIndex = getRandomInteger(0, funArr.length)
        password += funArr[randIndex]();
    }

    // show in web
    passwordDisplay.value = password;

    // shuffle password
    password = shufflePassword(Array.from(password))
    // shuffle password
})