// email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// registration validations
let regValidations = [
    { key: 'firstname', value: (item) => item.length > 3 },
    { key: 'lastname', value: (item) => item.length > 3 },
    { key: 'regEmail', value: (item) => emailRegex.test(item) },
    { key: 'regPass', value: (item) => isStrong(item) }
];

// login validations
let loginValidations = [
    { key: 'loginEmail', value: (item) => emailRegex.test(item) },
    { key: 'loginPass', value: (item) => isStrong(item) }
];


document.getElementById('regBtn')?.addEventListener('click', () => {
    postUser(checkValues(regValidations));
});


function postUser(isValid) {
    if (!isValid)
        alert("data is not valid");
    else {
        const formData = {
            firstname: document.getElementById('firstname').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('regEmail').value,
            password: document.getElementById('regPass').value
        };

        fetch('http://localhost:4000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.text())
            .then(text => {
                alert("result: " + text);
            })
            .catch(error => {
                alert("server error");
            });

    }
}


// log in
document.getElementById('loginBtn')?.addEventListener('click', () => {
    checkUser(checkValues(loginValidations));
});


function checkUser(isValid) {
    if (!isValid)
        alert("data is not valid");
    else {
        const formData = {
            email: document.getElementById('loginEmail').value,
            password: document.getElementById('loginPass').value
        };

        fetch('http://localhost:4000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.text())
            .then(loginResponse => {
                alert("response: " + loginResponse);
            })
            .catch(error => {
                alert("server error");
            });
    }
}


// common items
function checkValues(validations) {
    let isValid = true;
    validations.forEach(alert => {
        let input = document.getElementById(alert.key);
        isValid = alert.value(input.value) ? true : false;
    });
    return isValid;
}








