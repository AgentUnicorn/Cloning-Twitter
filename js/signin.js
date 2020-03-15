let userInput = document.getElementById('inputUser')
const signInButton = document.getElementById("signIn");

const signIn = (e) => {
    e.preventDefault()
    let user = {
        userName: userInput.value
    }
    localStorage.setItem('data', JSON.stringify(user))
    window.location.replace("/main.html")
}

signInButton.addEventListener("click", signIn)