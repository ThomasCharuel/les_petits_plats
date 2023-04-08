export default class RecipeApi {
  constructor() {
    this.url = '/les_petits_plats/data/recipes.json';
  }

  async get() {
    return fetch(this.url)
      .then(res => res.json())
      .catch(err => console.log('An error occured', err));
  }
}