export const BASE_URL = 'http://localhost:3000';


export async function register(email, password, name)  {
  try{
    const response = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password, name})
    })
    return response.json()
  }
  catch(error){
  console.log (error)
  }
}


export async function signIn(email, password)  {
  try{
    const response = await fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    return response.json()
  }
  catch(error){
  console.log (error)
  }
}



export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((res) => {
    if (res.ok) {
        return res.json();
}   return Promise.reject(res.status)
})
}