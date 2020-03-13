let userInput = document.getElementById('userInput');

let charLeft = () => {
    let remain = 140 - userInput.value.length;
    console.log('remain', remain)
    document.getElementById('charCountArea').innerHTML = `${remain} characters left`
}

userInput.addEventListener('userInput', charLeft);
