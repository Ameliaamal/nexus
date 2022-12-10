
const postAjob = async (event) => {
    event.preventDefault()
    const formData = {
        pajname: document.getElementById('pajname').value,
        pajemail: document.getElementById('pajemail').value,
        pajfield: document.getElementById('pajfield').value,
        pajwage: document.getElementById('pajwage').value,
        pajdescribe: document.getElementById('pajdescribe').value,
    }
    const response = await fetch('/postAjob', {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData) 
    });
    console.log(response)
    if(response.status === 200) {
        window.location = '/index2.html'
    }
}

const signInButton = document.getElementById("pajBtn");

signInButton.addEventListener('click', postAjob)