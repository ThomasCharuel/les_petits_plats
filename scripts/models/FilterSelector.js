export default class FilterSelector {
  constructor(type, name, items) {
    this.type = type;
    this.name = name;

    this.items = items;
    // Deduplicate and sort items
    this.prepareItems();

    this.filterText = '';
  }

  getType() {
    return this.type;
  }

  getName() {
    return this.name;
  }

  getNamePlural() {
    const firstCharacter = this.name.charAt(0).toUpperCase();
    return `${firstCharacter}${this.name.slice(1)}s`;
  }

  getItems() {
    return this.items;
  }

  addItem(item) {
    this.items.push(item);
    this.prepareItems();
  }

  removeItem(itemToRemove) {
    this.items = this.items.filter(item => item != itemToRemove);
  }

  setFilterText(filterText) {
    this.filterText = filterText;
  }

  getFilteredItems() {
    // We check if item contains the words in filterText
    const filterWords = this.filterText.toUpperCase().split(' ');

    return this.items.filter(item =>
      filterWords.map(filterWord => item.includes(filterWord))
        .reduce((a, b) => a && b) // Every word must be included
    );
  }

  prepareItems() {
    this.items = [
      ...new Set( // Deduplicate
        this.items.map(item => item.toUpperCase()))
    ].sort();
  }
}