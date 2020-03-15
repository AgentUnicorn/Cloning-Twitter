document.getElementById('inputPassword').disabled = true;
let userName = document.getElementById('inputUser');

let signIn = () => {
    console.log(userName)
    window.open("main.html","_self");
}