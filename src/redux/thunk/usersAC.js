import { editProfile, loginUser } from '../actions/usersAction';
import { useNavigate } from "react-router-dom";


export const loginUserAC = (data) => {
  return async (dispatch) => {
    //console.log('beforeFetch');
    try {
      const response = await fetch("/auth/signin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        //console.log(response);
        const result = await response.json();
        dispatch(loginUser(result));
        if (result.name) {
          console.log("login successful");
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
      //console.log(result);
      dispatch(loginUser(result));
    }
  };
};

export const editProfileAC = (data) => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:3001/users/profile`, { 
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
   const response = await axios.put('http://localhost:3001/users/profile', data)
   console.log('response', response)
      dispatch(editProfile(response.data));
    
  };
};

export const checkUserAC = () => {
  return async (dispatch) => {
    const response = await fetch('/auth/checkiflogged', { method:'GET'});
    if (response.ok) {
      const result = await response.json();
      console.log('Already logged: ',result);
      dispatch(loginUser(result));
    }    
  }
}

export const logoutUserAC = () => {
  return async (dispatch) => {
    const response = await fetch('/auth/signout', { method:'GET'});
    if (response.ok) {
      dispatch(loginUser({}));
    }    
  }
}
