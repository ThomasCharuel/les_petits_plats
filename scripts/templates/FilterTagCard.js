export default class FilterTagCard {
  constructor(filter) {
    this.filter = filter;
    this.wrapper = document.createElement('li');
  }

  getHTML() {
    this.wrapper.innerHTML = `
      <button 
        class="filter-tag filter-tag--${this.filter.getType()}"
      >
        ${this.filter.getName()}<i class="fa-regular fa-circle-xmark"></i>
      </button>
    `;

    return this.wrapper;
  }
}