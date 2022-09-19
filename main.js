const resultEl = document.getElementById('result')
const clipboardSym = document.getElementById('clipboard')
const lengthEL = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numberEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateBtn = document.getElementById('generate')

const randomFunctions = {
    upper: getRandomUpper,
    lower: getRandomLower,
    number: getRandomNumber,
    symbols: getRandomSymbols
}


clipboardSym.addEventListener('click', () => {
    const textArea = document.createElement('textarea')
    const password = resultEl.innerText

    if(!password) {
        return
    }

    textArea.value = password
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    textArea.remove()
    alert('Password Copied')
})


generateBtn.addEventListener('click', () => {
    const length = +lengthEL.value
    const hasUpper = uppercaseEl.checked
    const hasLower = lowercaseEl.checked
    const hasNumber = numberEl.checked
    const hasSymbol = symbolsEl.checked

    resultEl.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length)
})

function generatePassword(upper, lower, number, symbols, length){
    let generatedPassword = ''
    const typeCounts = upper + lower + number + symbols
    const typesArr = [{upper}, {lower}, {number}, {symbols}].filter(item => Object.values(item)[0])

    if(typeCounts === 0){
        return '';
    }
    
    for(let i = 0; i < length; i += typeCounts) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunctions[funcName]()
        })
    }

    const finalPassword = generatedPassword.slice(0, length)

    return finalPassword
}




function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbols() {
    const symbols = '!@#$%^&*Aa()_+=,./?<>{}[]'
    return symbols[Math.floor(Math.random() * symbols.length)]
}







