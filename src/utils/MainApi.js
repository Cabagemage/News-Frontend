class MainApi {
  constructor({ baseUrl, headers, key}) {
      this.baseUrl = baseUrl;
      this.headers = headers;
      this.key = key
  }

  async checkStatus(res) {
      if (res.ok) {
          return await res.json()
      }
      else { return  Promise.reject(`Ошибка: ${res.status}`) }
  }


 async getOwnerInfo(token)  {
    try{
      const response = await fetch(`${this.baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      return response.json()
    }
    catch(error){
    console.log (error)
    }
  }

  // Получение массива карточек с сервера
  async getSavedCards() {
      return await fetch(`${this.baseUrl}/saved-news`, {
          headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${this.key}`,
            }
      })
          .then(this.checkStatus)
  }

  // Метод для создания новой карточки
  async addNewCard(data, token) {
      return await fetch(`${this.baseUrl}/saved-news`, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          body: JSON.stringify({
              name: data.name,
              link: data.link,
          }),
      })
          .then(this.checkStatus)
  };

  // Метод для удаления карточки
 async deleteThisCard(cardId, token) {
      return await fetch(`${this.baseUrl}/saved-news/${cardId}`, {
          method: 'Delete',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
      })
          .then(this.checkStatus)
  }
  // Метод для получения инфы профиля


}
export const mainApi = new MainApi({
  baseUrl: 'http://localhost:3000',
  key: '2b98028da4304250b046d57668402fac'
});