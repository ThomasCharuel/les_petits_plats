export default class FilterSelectorCard {
  constructor(filterSelector) {
    this.filterSelector = filterSelector;
    this.wrapper = document.createElement('li');
  }

  getHTML() {
    this.wrapper.innerHTML = `
      <div class="filter-selector filter-selector--active">
        <div class="filter-selector__input-section filter-selector__input-section--${this.filterSelector.getType()}">
          <button aria-expanded="false" class="filter-selector__toggle-dropdown">${this.filterSelector.getNamePlural()}</button>
          <input class="filter-selector__search-input" type="text" placeholder="Rechercher un ${this.filterSelector.getName()}">
          <i class="filter-selector__caret fa-solid fa-angle-down"></i>
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

    return this.wrapper;
  }
}