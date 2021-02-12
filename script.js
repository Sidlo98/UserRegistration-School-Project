class User {
  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.id = Date.now().toString();
  }
}

let users = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@mail.com',
    id:   '1211511252251123'
},
  {
    firstName: 'Kalle',
    lastName: 'Niss+on',
    email: 'kalle@mail.com',
    id:   '1211511252251312318'
},
  {
    firstName: 'Ola',
    lastName: 'Konny',
    email: 'ola@mail.com',
    id:   '12115112522515'
}
];

const submit = document.querySelector('#regForm');
const output = document.querySelector('#user-list');
const _firstName = document.querySelector('#firstName');
const _lastName = document.querySelector('#lastName');
const _email = document.querySelector('#email');
const changeBtn = document.querySelector('#changeBtn');

// Listing the users
const listUsers = () => {
  output.innerHTML = '';

  users.forEach(user => {
    output.innerHTML += `
    <li id="${user.id}"class="list-group-item d-flex justify-content-between align-items-center mb-2">
        <div>
          <p class="fs-3 m-0">${user.firstName} ${user.lastName}</p>
          <a class="fs-6 " href="mailto:${user.email}">${user.email}</a>
        </div>
        <div class="d-flex flex-column">
          <button id="edit" class="btn btn-warning btn-change m-1">Change</button>
          <button id="delete" class="btn btn-danger btn-delete m-1">X</button>
        </div>
      </li>
    `
  });
}

listUsers();
// --------------------------------------------------------------------------

// Here is the form excecute 
submit.addEventListener('submit', e => {
    e.preventDefault();
    nameValidate(_firstName);
    nameValidate(_lastName);
    emailValidate(_email);

    if(nameValidate(_firstName) && nameValidate(_lastName) && emailValidate(_email) && uniqueEmail(_email) ) {

      let newUser = new User(_firstName.value.trim(), _lastName.value.trim(), _email.value.trim());
          users.push(newUser);
          listUsers();

          _email.value = ''
          _firstName.value = ''
          _lastName.value = ''
          _firstName.classList.remove('is-valid');
          _lastName.classList.remove('is-valid');
          _email.classList.remove('is-valid');
    } 
    else if(nameValidate(_firstName) && nameValidate(_lastName) && emailValidate(_email)){
      _email.classList.add('is-invalid');
      _email.nextSibling.nextSibling.innerHTML = 'This email has already been registerd';
    }
})

//---------------------------------------------------------
// Change button
let _userId;
output.addEventListener('click', e => {
  if(e.target.classList.contains('btn-change')) {
    _userId = e.target.parentNode.parentNode.id;

    let user = users.find(user => {
      return user.id === _userId;
    })

    console.log(user);

      _firstName.value = user.firstName;
      _lastName.value = user.lastName;
      _email.value = user.email;

      submit.childNodes[5].classList.add('d-none');
      submit.childNodes[7].classList.remove('d-none');
      output.classList.add('d-none')

  }
  })
// --------------------------------------------------------------

// save button
  saveBtn.addEventListener('click', e => {
    
     user.firstName = _firstName.value
     user.lastName = _lastName.value
     user.email = _email.value
    
     console.log(users);

     submit.childNodes[5].classList.remove('d-none');
     submit.childNodes[7].classList.add('d-none');
     output.classList.remove('d-none');
     listUsers();
     _email.value = ''
     _firstName.value = ''
     _lastName.value = ''

    })
// -----------------------------------------------

//Remove a user
output.addEventListener('click', e => {

  if(e.target.classList.contains('btn-delete')) {
    users = users.filter(user => user.id !== e.target.parentNode.parentNode.id)
    listUsers();
  }
})
//-----------------------------------------------------

//  Validation update 
_firstName.addEventListener('keyup', () => {
  if(nameValidate(_firstName)) {
    _firstName.classList.add('is-valid');
  }
})

_lastName.addEventListener('keyup', () => {
  if(nameValidate(_lastName)) {
    _lastName.classList.add('is-valid');
  }
})

_email.addEventListener('keyup' , () => {
  if(emailValidate(_email)) {
    _email.classList.add('is-valid');
  }
})
// ----------------------------------------------

// Functions
const nameValidate = function(name) {

  if(name.value.trim() === '') {
    name.classList.add('is-invalid');
    name.nextSibling.nextSibling.innerHTML = 'You need to fill in a name.';
    name.focus();
    return false;
  }
  else if (name.value.length < 2)  {
    name.classList.add('is-invalid');
    name.nextSibling.nextSibling.innerHTML = 'Your name needs to be more then two characters.';
    name.focus();
    return false;
  }
  else {
    name.classList.remove('is-invalid');
    return true;
  }
}

const emailValidate = function(email) {
  if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.value)) {
    email.classList.add('is-valid');
    email.classList.remove('is-invalid');
    return true;
  }
  else if (email.value.trim() === ''){
    email.classList.add('is-invalid');
    email.nextSibling.nextSibling.innerHTML = 'You need to fill in an email address.';
    email.focus();
    return false;
  }
  else {
    email.classList.add('is-invalid');
    email.nextSibling.nextSibling.innerHTML = 'Enter a correct email address.';
    email.focus();
    return false;
  }
}

const uniqueEmail = function(email) {
  let emailUnique = true;
  users.forEach(user => {
    if(user.email === email.value) {
      emailUnique = false;
    }
  })  
  return emailUnique;
}
