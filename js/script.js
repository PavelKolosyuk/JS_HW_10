'use strict'

/*
  Написать приложение для работы с REST сервисом, 
  все функции делают запрос и возвращают Promise 
  с которым потом можно работать. 
  
  Реализовать следующий функционал:
  - + функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.
  
  - +/- функция getUserById(id) - должна вернуть пользователя с переданным id.
  
  - + функция addUser(name, age) - должна записывать в БД юзера с полями name и age.
  
  - +/- функция removeUser(id) - должна удалять из БД юзера по указанному id.
  
  - функция updateUser(id, user) - должна обновлять данные пользователя по id. 
    user это объект с новыми полями name и age.

  Документацию по бэкенду и пример использования прочитайте 
  в документации https://github.com/trostinsky/users-api#users-api.
  Сделать минимальный графический интерфейс в виде панели с полями и кнопками. 
  А так же панелью для вывода результатов операций с бэкендом.
*/

const API_URL =  'https://test-users-api.herokuapp.com/users';
const API_URL_ID =  'https://test-users-api.herokuapp.com/users/';

//=========================showAllUsers=========================
const formAll = document.querySelector('.search-all'),
      showAllUsers = document.querySelector('.showAllUsers'),
      tableShowAllUsers = document.querySelector('.tableShowAllUsers');

//=========================showUserId=========================
const formUserID = document.querySelector('.search-user-id'),
      showUserID = document.querySelector('.showUserID'),
      inputID = document.querySelector( 'input[date-param="showId"]'),
      tableUserID = document.querySelector('.tableUserID');

// =========================addUserIDName=========================
const formIdName = document.querySelector('.search-by-id'),
      add = document.querySelector('.add'),
      addedUsers = document.querySelector('.addedUsers'),
      inputName = document.querySelector( 'input[date-param="addName"]'),
      inputAge = document.querySelector( '[date-param="addAge"]'),
      tableId = document.querySelector('.tableId');

//=========================removeUseryrId=========================
const removeUserID = document.querySelector('.remove-user-id'),
      removeID = document.querySelector('.removeID'),
      inputRemoveID = document.querySelector( 'input[date-param="removeId"]'),
      tableRemoveUserByID = document.querySelector('.tableRemoveUserByID');

// =========================addUserIDName=========================
const formUpdateIdName = document.querySelector('.update-by-id'),
      update = document.querySelector('.update'),
      updatedUsers = document.querySelector('.updatedUsers'),
      inputNewName = document.querySelector( 'input[date-param="addNewName"]'),
      inputNewAge = document.querySelector( '[date-param="addNewAge"]'),
      inputUpdateID = document.querySelector( '[date-param="addId"]'),
      tableUpdateId = document.querySelector('.tableUpdateId');


showAllUsers.addEventListener('click', getAllUsers);

function getAllUsers(e) {
  e.preventDefault();
  return fetch(API_URL)
    .then( res => {
      if(res.ok) return res.json();
      throw new Error('Error :' + res.statusText);
    })
    .then(date => {
      const mas = date.data;
      if ( mas.length === 0) return alert('At first, you need to add a user because the database is empty.');
      let allName = mas.reduce((acc, el) => acc + `${el.name}(${el.id}), `, '');
      tableShowAllUsers.innerHTML = 'All users in DB: ' + allName;
    })
    .catch( err => console.log(err))
}


showUserID.addEventListener('click', getUserById);

function getUserById(e) {
  e.preventDefault();
  let id = inputID.value;
  let url = API_URL_ID + `${id}`;
  return fetch(url)
  .then( res => {
    if(res.ok) return res.json();
    throw new Error('Error :' + res.statusText);
  })
  .then(date => {
    tableUserID.innerHTML = `Show a user by ID: ${date.data.name}`;
  })
  .catch( err => console.log(err))
}


add.addEventListener('click', addUser);

function addUser(rest) {
  rest.preventDefault();
  const newUser = {
    name: inputName.value,
    age: +inputAge.value,
  };
  fetch('https://test-users-api.herokuapp.com/users', {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then( res => {
        if(res.ok) return res.json();
        throw new Error('Error :' + res.statusText);
      })
      .then(date => console.log(date))
      .catch( err => console.log(err))
}

addedUsers.addEventListener('click', getAllAddedUsers);

function getAllAddedUsers(event) {
  event.preventDefault();
  return fetch(API_URL)
    .then( res => {
      if(res.ok) return res.json();
      throw new Error('Error :' + res.statusText);
    })
    .then(date => {
      const mas = date.data;
      let result = mas.reduce( (acc, el) => acc + `${el.name}, `, '');
      tableId.innerHTML = 'All added users: ' + result;
      inputName.value = '';
      inputAge.value = '';
    })
    .catch( err => console.log(err))
}


removeID.addEventListener('click', removeUser);

function removeUser(e) {
  e.preventDefault();
  const url = API_URL_ID + inputRemoveID.value;
  fetch(url, {
    method: 'DELETE',
  })
  .then(res => res.json())
  .then(date => 
    { if(date.status === 200) return alert('User deleted');
    })
  .catch(err => console.log('Error' + err))
}


update.addEventListener('click', updateUser);

function updateUser(e) {
  e.preventDefault();
  const aNewUser = {
    name: inputNewName.value,
    age: inputNewAge.value,
  }
  fetch(`https://test-users-api.herokuapp.com/users/${inputUpdateID.value}`, {
    method: 'PUT',
    body: JSON.stringify(aNewUser),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(res => res.json())
  .then(date => tableUpdateId.textContent = date.data.name)
  .catch(err => console.log('Error' + err))
}

updatedUsers.addEventListener('click', showUpdatedUsers)
function showUpdatedUsers (e) {
  e.preventDefault();
  return fetch(API_URL)
    .then( res => {
      if(res.ok) return res.json();
      throw new Error('Error :' + res.statusText);
    })
    .then(date => {
      const mas = date.data;
      console.log(mas)
      let result = mas.reduce( (acc, el) => acc + `${el.name}, `, '');
      tableUpdateId.innerHTML = 'All users: ' + result;
      inputNewName.value = '';
      inputNewAge.value = '';
      inputUpdateID.value = '';
    })
    .catch( err => console.log(err))
}