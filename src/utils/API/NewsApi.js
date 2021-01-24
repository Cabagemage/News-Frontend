class newsApi {
  constructor({ baseUrl, headers, key }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
    this.key = key;
  }

  checkStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getAppinfo() {
    return Promise.all([this.getInitialCards(), this.getUserInformation()]);
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
  key: "2b98028da4304250b046d57668402fac",
});
