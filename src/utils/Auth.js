export const BASE_URL = "https://news-finder.students.nomoreparties.xyz";

// export async function register(email, password, name)  {
//   try{
//     const response = await fetch(`${BASE_URL}/signup`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({email, password, name})
//     })
//     const resJson = response.json()
//     return resJson
//   }
//   catch(err){
//     const error = err.json()
//     console.log(error)
//   }
// }

export const register = (email, password, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
};
// export async function signIn(email, password)  {
//   try{
//     const response = await fetch(`${BASE_URL}/signin`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({email, password})
//     })
//     return response.json()
//   }
//   catch(error){
//   console.log (error)
//   }
// }
export const signIn = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
};
