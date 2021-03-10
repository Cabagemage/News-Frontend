class newsApi {
  constructor({ baseUrl, headers, key }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
    this.key = key;
  }
//  Проверка на статус ответа с сервера
  checkStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  // Получение массива карточек с сервера
  async getCards(keyword) {
    return await fetch(
      `${this.baseUrl}/everything?q=${keyword}=ru&apiKey=${this.key}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${this.key}`,
        },
      }
    ).then(this.checkStatus);
  }
}
export const newsProfile = new newsApi({
  baseUrl: " https://nomoreparties.co/news/v2",
  key: "4cb18b1d9b4c4e3d8122046d71c1e2b0",
});
