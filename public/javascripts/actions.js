
const LOGIN = 0;
const MOTOR = 0;
const ICOM = 1;
const RELE = 2;

function showForm(which) {
    document.getElementById(which === LOGIN ? "login" : "register").style.display='block'
}

function handleCheckbox(box, which) {

    if (box != null) {
        let isChecked = box.checked;
        switch (which) {
            case MOTOR:
                console.log("MOTOR");
                if (isChecked) {}
                break;
            case ICOM:
                console.log("ICOM");
                if (isChecked) {}
                break;
            case RELE:
                console.log("RELE");
                if (isChecked) {}
                break;
        }
    }
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    let modal = document.getElementById('login');
    if (event.target == modal) {
        modal.style.display = "none";
    }
    modal = document.getElementById('register');
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

