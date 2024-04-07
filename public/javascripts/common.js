
function register(){
    let username        = document.getElementById('username');
    let password        = document.getElementById('password');
    let confirmPassword = document.getElementById('confirmPassword');
    let usernameErr        = document.getElementById('errUsername');
    let passwordErr        = document.getElementById('errPassword');
    let confirmPasswordErr = document.getElementById('errConfirm');
    if(username == ''){
        usernameErr.style.display = "block";
    }

    if(password == ''){
        passwordErr.style.display = "block";
    }

    if(confirmPassword == ''){
        confirmPasswordErr.style.display = "block";
    }

    if(password !== confirmPassword){
        alert("Password Not matched");
        return false
    }

    if(username != '' && password != '' && confirmPassword != ''){
        fetch()
    }
}
