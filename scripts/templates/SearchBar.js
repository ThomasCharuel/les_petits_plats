export default class SearchBarCard {
  constructor(updateSearchText) {
    this.updateSearchText = updateSearchText;
    this.wrapper = document.createElement('form');
    this.wrapper.classList.add('search-bar');
    this.wrapper.setAttribute('role', 'search');
  }

  handleSearchChange(e) {
    this.updateSearchText(e.target.value);
  }

  getHTML() {
    this.wrapper.innerHTML = `
      <input id="search-bar__input" class="search-bar__input" type="text" placeholder="Rechercher une recette">
      <label class="search-bar__label" for="search-bar__input" aria-label="Rechercher une recette"><i class="fa-solid fa-magnifying-glass"></i></label>
    `;

    // Events handling
    this.wrapper.querySelector('.search-bar__input')
      .addEventListener('input', (e) => this.handleSearchChange(e));

    return this.wrapper;
  }
}