export default class FilterTagCard {
  constructor(filter, handleClick) {
    this.filter = filter;
    this.handleClick = handleClick;
    this.wrapper = document.createElement('li');
  }

  getHTML() {
    const capitalizedName = `${this.filter.getName()[0]}${this.filter.getName().slice(1).toLowerCase()}`;
    
    this.wrapper.innerHTML = `
      <button 
        class="filter-tag filter-tag--${this.filter.getType()}"
      >
        ${capitalizedName}<i class="fa-regular fa-circle-xmark"></i>
      </button>
    `;

    // Events handling
    this.wrapper.querySelector('.filter-tag')
      .addEventListener('click', () => this.handleClick(this.filter));

    return this.wrapper;
  }
}