class Api {
  constructor({ baseUrl, headers, key}) {
      this.baseUrl = baseUrl;
      this.headers = headers;
      this.key = key
  }

  checkStatus(res) {
      if (res.ok) {
          return res.json()
      }
      else { return Promise.reject(`Ошибка: ${res.status}`) }
  }

  getAppinfo() {
      return Promise.all([this.getInitialCards(), this.getUserInformation()])
  }

  // Получение массива карточек с сервера
  async getCards() {
      return await fetch(`${this.baseUrl}/everything?q=bitcoin&${this.key}`, {
          headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${this.key}`,
            }
      })
          .then(this.checkStatus)
  }

  // Метод для создания новой карточки
  async postNewCard(data, token) {
      return await fetch(`${this.baseUrl}/cards`, {
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
  deleteThisCard(cardId, token) {
      return fetch(`${this.baseUrl}/cards/${cardId}`, {
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
export const apiProfile = new Api({
  baseUrl: 'https://newsapi.org/v2',
  key: '2b98028da4304250b046d57668402fac'
});