// inputs
let signinEmail = document.getElementById('signinEmail');
let signinPassword = document.getElementById('signinPassword');
let signinErrorMessage = document.getElementById('signinErrorMessage');


let signupName = document.getElementById('signupName');
let signupEmail = document.getElementById('signupEmail');
let signupPassword = document.getElementById('signupPassword');
let signupErrorMessage = document.getElementById('signupErrorMessage');


// buttons
let signUpBtn = document.getElementById('signUpBtn');
let signInBtn = document.getElementById('signInBtn');
let logoutBtn = document.getElementById('logoutBtn');



let username = document.getElementById('username');


// Functions

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

if(signUpBtn){
    signUpBtn.addEventListener('click', function (){
        if(signupName.value != '' && signupEmail.value != '' && signupPassword.value != ''){
            signupErrorMessage.classList.add('d-none');

            if(validateEmail(signupEmail.value)){
                // if email is valid
                if(signupPassword.value.length < 8){
                    // if password is not valid
                    signupErrorMessage.innerHTML = 'Password must be at least 8 characters!';
                    signupErrorMessage.classList.remove('d-none');
                }else{
                    // if every thing is fine
                    // create account

                    let usersString = localStorage.getItem('users');
                    let usersArray = [];

                    if(usersString != null){        // if the key exist in local storage
                        usersArray = JSON.parse(usersString);
                    }

                    let user = {
                        name: signupName.value,
                        email: signupEmail.value,
                        password: signupPassword.value
                    };

                    // check if email already exist
                    let emailFound = false;
                    for (let i = 0; i < usersArray.length; i++) {
                        if(usersArray[i].email == signupEmail.value){
                            emailFound = true;
                            break;
                        }
                    }

                    if(emailFound){
                        signupErrorMessage.innerHTML = 'Email is used already!';
                        signupErrorMessage.classList.remove('d-none');
                    }else{
                        usersArray.push(user);
                        localStorage.setItem('users', JSON.stringify(usersArray));
                        // redirect to login page
                        window.location.href = 'index.html';
                    }
                }
            }else{
                signupErrorMessage.innerHTML = 'Email is not valid!';
                signupErrorMessage.classList.remove('d-none');
            }

        }else{
            signupErrorMessage.innerHTML = 'All inputs are required!';
            signupErrorMessage.classList.remove('d-none');
        }
    });
}

if(signInBtn){
    signInBtn.addEventListener('click', function (){
        if(signinEmail.value != '' && signinPassword.value != ''){
            signinErrorMessage.classList.add('d-none');

            if(validateEmail(signinEmail.value)){
                // login
                let usersString = localStorage.getItem('users');
                if(usersString != null){
                    let usersArray = JSON.parse(usersString);
                    let canLogin = false;
                    for (let i = 0; i < usersArray.length; i++) {
                        if(usersArray[i].email == signinEmail.value && usersArray[i].password == signinPassword.value){
                            canLogin = true;
                            localStorage.setItem('username', usersArray[i].name);
                            break;
                        }   
                    }

                    if(canLogin){
                        window.location.href = "welcome.html";
                    }else{
                        signinErrorMessage.innerHTML = 'Wrong Email or Password!';
                        signinErrorMessage.classList.remove('d-none');
                    }
                }
            }else{
                signinErrorMessage.innerHTML = 'Invalid Email!';
                signinErrorMessage.classList.remove('d-none');
            }
        }else{
            signinErrorMessage.innerHTML = 'Email and password are required!';
            signinErrorMessage.classList.remove('d-none');
        }
    });
}

if(logoutBtn){
    username.innerHTML = 'Welcome ' + localStorage.getItem('username');
    logoutBtn.addEventListener('click', function (){
        localStorage.removeItem('username');
        window.location.href = "index.html";
    });
}