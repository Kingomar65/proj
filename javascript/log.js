//loggin
document.getElementById('submit').addEventListener('click', () => {
    const FiName = document.getElementById('fName').value.trim();
    const laName = document.getElementById('lName').value.trim();
    const email = document.getElementById('emailF').value.trim();
    const paField = document.getElementById('passF').value.trim();

    if(FiName === '' || laName === '' || email === '' || paField === '') {
        alert('Please enter below all fields');
    } else {
        localStorage.setItem('firstName', FiName);
        localStorage.setItem('lastName', laName);

        //transfer sa main page
        window.location = 'project2.html';
    }
});