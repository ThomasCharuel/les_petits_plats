export default class FilterSelectorCard {
  constructor(filterSelector) {
    this.filterSelector = filterSelector;
    this.wrapper = document.createElement('li');
  }

  getHTML() {
    this.wrapper.innerHTML = `
      <div class="filter filter--active">
        <div class="filter__input-section filter__input-section--${this.filterSelector.getType()}">
          <button aria-expanded="false" class="filter__toggle-dropdown">${this.filterSelector.getNamePlural()}</button>
          <input class="filter__search-input" type="text" placeholder="Rechercher un ${this.filterSelector.getName()}">
          <i class="filter__caret fa-solid fa-angle-down"></i>
        </div>
        <div aria-hidden="true" class="filter__results-section filter__results-section--${this.filterSelector.getType()}">
          <ul class="filter__results-section-list">
            ${this.filterSelector.getItems().map(item => `
              <li class="filter__results-section-list-item"><button class="filter__results-section-result">${item}</button></li>
            `).join('')}
          </ul>
        </div>
      </div>
    `;

    return this.wrapper;
  }
}