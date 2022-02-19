class CocktailService {
  static #apiBaseUrl = "https://www.thecocktaildb.com/api/json/v1/";
  static #apiKey = "1";

  static #buildApiURL() {
    return `${this.#apiBaseUrl + this.#apiKey}/`;
  }

  static async getCocktailDetailsByID(id) {
    const url = `${this.#buildApiURL()}lookup.php?i=${id}`;
    const data = await fetch(url);
    return await data.json();
  }

  static async getAlcoholicCocktail() {
    const url = `${this.#buildApiURL()}filter.php?a=Alcoholic`;
    const data = await fetch(url);
    return await data.json();
  }

  static async getNonAlcoholicCocktail() {
    const url = `${this.#buildApiURL()}filter.php?a=Non_Alcoholic`;
    const data = await fetch(url);
    return await data.json();
  }

  static getRandomCocktail() {
    const url = `${this.#buildApiURL()}random.php`;
    return fetch(url)
      .then((data) => data.json());
  }

  static async getCocktailFilteredByCategory(category) {
    const url = `${this.#buildApiURL()}filter.php?c=${category}`;
    const data = await fetch(url);
    return await data.json();
  }
}
export default CocktailService;
