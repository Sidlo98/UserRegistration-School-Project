class User {
  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.id = Date.now().toString();
  }
}

const users = [
  {
    firstName: "john",
    lastName: "doe",
    email: "mail@mail.com",
    id: "1612972457178"
  }
]

const submit = document.querySelector('#regForm')
const output = document.querySelector('#user-list')
const _firstName = document.querySelector('#firstName')
const _lastName = document.querySelector('#lastName')
const _email = document.querySelector('#email')

// Listing the users
const listUsers = () => {
  output.innerHTML = '';

  users.forEach(user => {
    output.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center mb-2">
        <div>
          <p class="fs-3 m-0">${user.firstName} ${user.lastName}</p>
          <a class="fs-6 " href="mailto:${user.email}">${user.email}</a>
        </div>
        <div class="d-flex flex-column">
          <button id="edit" class="btn btn-warning m-1">Change</button>
          <button id="delete" class="btn btn-danger m-1">X</button>
        </div>
      </li>
    `
  })
}

// --------------------------------------------------------------------------

// Here is the form excecute 
submit.addEventListener('submit', e => {
  e.preventDefault();
  
  nameValidate(_firstName)
  nameValidate(_lastName)
  emailValidate(_email)
   
    
  if(nameValidate(_firstName) && nameValidate(_lastName) && emailValidate(_email) && uniqeEmail) {

    let newUser = new User(_firstName.value, _lastName.value, _email.value)
        users.push(newUser);
        listUsers();

  } 

})

//---------------

//  Validation update 
_firstName.addEventListener('keyup', () => {
  if(nameValidate(_firstName) === true) {
    _firstName.classList.add('is-valid');
  }
 
})

_lastName.addEventListener('keyup', () => {
  if(nameValidate(_lastName) === true) {
    _lastName.classList.add('is-valid');
  }
})

_email.addEventListener('keyup' , () => {
  if(emailValidate(_email) === true) {
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

let uniqeEmail = users.some((user) => {
  return user.email != _email.value;
})

console.log(uniqeEmail);

