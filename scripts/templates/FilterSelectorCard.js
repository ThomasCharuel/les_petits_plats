export default class FilterSelectorCard {
  constructor(filterSelector) {
    this.filterSelector = filterSelector;
    this.wrapper = document.createElement('li');
  }

  openDropdown() {
    const dropdownButton = this.wrapper.querySelector('.filter-selector__toggle-dropdown');
    const filterSelector = this.wrapper.querySelector('.filter-selector');
    const searchResults = this.wrapper.querySelector('.filter-selector__search-input');

    filterSelector.classList.add('filter-selector--active');
    dropdownButton.setAttribute('aria-expanded', 'true');
    searchResults.setAttribute('aria-hidden', 'false');
  }

  closeDropdown() {
    const dropdownButton = this.wrapper.querySelector('.filter-selector__toggle-dropdown');
    const filterSelector = this.wrapper.querySelector('.filter-selector');
    const searchResults = this.wrapper.querySelector('.filter-selector__search-input');

    filterSelector.classList.remove('filter-selector--active');
    dropdownButton.setAttribute('aria-expanded', 'false');
    searchResults.setAttribute('aria-hidden', 'true');
  }

  toggleDropdown() {
    const dropdownButton = this.wrapper.querySelector('.filter-selector__toggle-dropdown');
    if (dropdownButton.getAttribute('aria-expanded') === 'false') {
      this.openDropdown();
      // Set focus on text input
      this.wrapper.querySelector('.filter-selector__search-input').focus();
    } else {
      this.closeDropdown();
      // Set focus on caret
      this.wrapper.querySelector('.filter-selector__toggle-dropdown').focus();
    } 
  }

  getHTML() {
    this.wrapper.innerHTML = `
      <div class="filter-selector">
        <div class="filter-selector__input-section filter-selector__input-section--${this.filterSelector.getType()}">
          <p class="filter-selector__open-selector-text">${this.filterSelector.getNamePlural()}</p>
          <button aria-expanded="false" class="filter-selector__toggle-dropdown"><i class="filter-selector__caret fa-solid fa-angle-down"></i></button>
          <input class="filter-selector__search-input" type="text" placeholder="Rechercher un ${this.filterSelector.getName()}">
        </div>
        <div aria-hidden="true" class="filter-selector__results-section filter-selector__results-section--${this.filterSelector.getType()}">
          <ul class="filter-selector__results-section-list">
            ${this.filterSelector.getItems().map(item => `
              <li class="filter-selector__results-section-list-item"><button class="filter-selector__results-section-result">${item}</button></li>
            `).join('')}
          </ul>
        </div>
      </div>
    `;

    // Events handling
    this.wrapper.querySelector('.filter-selector__toggle-dropdown') // Dropdown button
      .addEventListener('click', () => this.toggleDropdown());

    return this.wrapper;
  }
}