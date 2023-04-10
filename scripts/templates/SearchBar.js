export default class SearchBarCard {
  constructor() {
    this.wrapper = document.createElement('form');
    this.wrapper.classList.add('search-bar');
    this.wrapper.setAttribute('role', 'search');
  }

  getHTML() {
    this.wrapper.innerHTML = `
      <input id="search-bar__input" class="search-bar__input" type="text" placeholder="Rechercher une recette">
      <label class="search-bar__label" for="search-bar__input" aria-label="Rechercher une recette"><i class="fa-solid fa-magnifying-glass"></i></label>
    `;

    return this.wrapper;
  }
}