import { editProfile, loginUser, getUserData } from '../actions/usersAction';
import axios from 'axios';

export const loginUserAC = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch("/auth/signin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.json();
        dispatch(loginUser(result));
        if (result.name) {
          const userState = {name: result.name, password: data.password};
          

          localStorage.setItem('userstate', JSON.stringify(userState));
        } 
      } else {
        const message = document.querySelector(".message");
        message.innerHTML =
          "Неверное имя пользователя или пароль. Попробуйте еще раз";
        setTimeout(() => {
          message.innerHTML = "&nbsp;";
        }, 2000);
      }
    } catch (err) {
      console.log("Error login: ", err);
    }
  };
};

export const registerUserAC = (data) => {
  return async (dispatch) => {
    const response = await fetch('/auth/signup', { method:'POST', headers:{'Content-type': 'application/json'}, body: JSON.stringify(data)});
    if (response.ok) {
      const result = await response.json();
      dispatch(loginUser(result));
    }
  };
};

export const editProfileAC = (data) => {
  return async (dispatch) => {
    const response = await fetch(`/users/profile`, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const result = await response.json();
      dispatch(editProfile(result));
    }
  };
};

export const uploadAvatarAC = (file, id) => {
  return async (dispatch) => {
    const data = new FormData();
    data.append('file', file);
    data.append('id', id)
   const response = await axios.put('/users/profile', data)
      dispatch(editProfile(response.data));
    
  };
};

export const checkUserAC = () => {
  
  
  return async (dispatch) => {
    const userState = localStorage.getItem("userstate") ? JSON.parse(localStorage.getItem("userstate")) : {};
    
    const values = {};
    values.name = userState.name;
    values.password = userState.password;
    const answer = await dispatch(loginUserAC(values));

    const response = await fetch('/auth/checkiflogged', { method:'GET'});
    if (response.ok) {
      const result = await response.json();
      dispatch(loginUser(result));
    }  
  }
}

export const logoutUserAC = () => {
  localStorage.removeItem('userstate');
  return async (dispatch) => {
    localStorage.removeItem('userstate')
    const response = await fetch('/auth/signout', { method:'GET'});
    if (response.ok) {
      dispatch(loginUser({}));
    }    
  }
}

export const getUserDataAC = () => {
  return async (dispatch) => {
    const response = await fetch('/users/data');
    if(response.ok) {
      const answer = await response.json();
      dispatch(getUserData(answer))
    }
  }
}
