class MainApi {
  constructor({ baseUrl, headers, key }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
    this.key = key;
  }

  async checkStatus(res) {
    if (res.ok) {
      return await res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  async getOwnerInfo(token) {
    try {
      const response = await fetch(`${this.baseUrl}/users/me`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  // Получение массива карточек с сервера
  async getSavedCards(token) {
    return await fetch(`${this.baseUrl}/articles`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this.checkStatus);
  }

  // Метод для создания новой карточки
  async addNewCard(keyword, title, text, date, link, image, source, token) {
    return await fetch(`${this.baseUrl}/articles`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(keyword, title, text, date, source, link, image),
    }).then(this.checkStatus);
  }

  // Метод для удаления карточки
  async deleteThisCard(cardId, token) {
    return await fetch(`${this.baseUrl}/articles/${cardId}`, {
      method: "Delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this.checkStatus);
  }
  // Метод для получения инфы профиля
}
export const mainApi = new MainApi({
  baseUrl: "http://localhost:3000",
});
