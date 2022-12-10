
const container = document.querySelector(".container"),
pwShowHide = document.querySelectorAll(".showHidePw"),
pwFields = document.querySelectorAll(".password"),
login = document.querySelector(".login-link");

//   js code to show/hide password and change icon



pwShowHide.forEach(eyeIcon =>{
    eyeIcon.addEventListener("click", ()=>{
        pwFields.forEach(pwField =>{
            if(pwField.type ==="password"){
                pwField.type = "text";
  
                pwShowHide.forEach(icon =>{
                    icon.classList.replace("uil-eye-slash", "uil-eye");
                })
            }else{
                pwField.type = "password";
  
                pwShowHide.forEach(icon =>{
                    icon.classList.replace("uil-eye", "uil-eye-slash");
                })
            }
        }) 
    })
  })
  
// js code to appear signup and login form
login.addEventListener("click", ( )=>{
    container.classList.remove("active");
  });
const handelSignup = async () => {
    // read all the form information
    const formValue = {
        name: document.getElementById('nameId').value,
        email: document.getElementById('emailId').value,
        pass1: document.getElementById('passId').value,
        pass2: document.getElementById('passIdRepeat').value,

    }

    // validate user input
    const formDataValidated = validateSignup(formValue)

    if(formDataValidated) {
        // make a request call to our server to save user information
        console.log('fait tout est valide')
        const response = await fetch('/signup', {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: formValue.pass1,
                name: formValue.name,
                email: formValue.email,
  
            }) 
        });
        console.log(response)
        if(response.status !== 200) {
            const responseBody = await response.json()
            console.log(responseBody)
            showError(responseBody.error)
        } 
    }
}

const validateSignup = (formValue) => {
    // confirm nothings empty
    if( (!formValue.email || formValue.email === "") ) {
        showError('Please provide an email')
        return false;
    }

    if( (!formValue.pass1 || formValue.pass1 === "")) {
        showError('Please provide a password')
        return false;
    }

    if(!formValue.pass2 || formValue.pass2 === "") {
        showError('Please confirm your password')
        return false;
    }

    if( (!formValue.name || formValue.name === "") ) {
        showError('Please tell us your name')
        return false;
    }

    // confirm email
    if(!formValue.email.includes('@')){
        showError('Please provide a valid email')
        return false;
    }

    // confirm passwords match
    if(formValue.pass1 !== formValue.pass2) {
        showError('Please make sure your passwords match')
        return false;
    }

        return true;

}


const showError = (errorMessage) => {
    const body = document.getElementsByTagName('body')[0]
    console.log( body)
    const randomNumber = Math.random()
    const id = `toast-${randomNumber}`
    body.insertAdjacentHTML('beforeend', `    
    <div id="${id}" class="toast errorToast align-items-center text-bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="toast-body">
                ${errorMessage}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"
                aria-label="Close" onClick="closeError('${id}')"></button>
        </div>
    </div>`)
}

const closeError = (id) => {
    const toast = document.getElementById(id)
    console.log(toast)
    toast.style.display = 'none'
}

const signupButton = document.getElementById("signUpBtn")
signupButton.addEventListener('click', handelSignup)