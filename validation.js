let alerts = [
    { key: 'LowerAlpha', value: (pass) => /[a-z]/.test(pass) },
    { key: 'UpperAlpha', value: (pass) => /[A-Z]/.test(pass) },
    { key: 'Character', value: (pass) => /[!@#$%^&*(),.?":{}|<>;%'\\[\]\\/`~\-+=_]/.test(pass) },
    { key: 'Number', value: (pass) => /[0-9]/.test(pass) },
    { key: 'Strong', value: (pass) => WhenStrong(pass) }
];




let input = document.getElementById('regPass');

input?.addEventListener('input', () => {
    alerts.forEach(alert => {
        let error = document.getElementById(alert.key);
        error.style.display = alert.value(input.value) ?
            block(error) : none(error);
    });
});


function block(error) {
    error.classList.add('error');
    setTimeout(() => {
        error.style.opacity = '1';
    }, 350);
    return 'block';
}

function none(error) {
    return 'none';
}

function WhenStrong(pass) {
    let result = isStrong(pass);
    result ? resetErrors() : "";
    return result;
}
function isStrong(pass){
    const hasLower = /[a-z]/.test(pass);
    const hasUpper = /[A-Z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>;%'\\[\]\\/`~\-+=_]/.test(pass);
    return hasLower && hasUpper && hasNumber && hasSpecial;
}

function resetErrors() {
    alerts.forEach(alert => {
        let item = document.getElementById(alert.key);
        if(item)
            item.style.display = 'none';
    })
}


resetErrors();