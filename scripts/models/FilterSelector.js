export default class FilterSelector {
  constructor(type, name, items) {
    this.type = type;
    this.name = name;

    this.items = items;
    // Deduplicate and sort items
    this.prepareItems();
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

  prepareItems() {
    this.items = [...new Set(this.items)].sort();
  }
}