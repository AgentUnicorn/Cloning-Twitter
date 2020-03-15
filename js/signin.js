let userInput = document.getElementById('inputUser')

const signIn = () => {
    let user = {
        userName: userInput.value
    }
    localStorage.setItem('data', JSON.stringify(user))
    window.open("main.html")
}