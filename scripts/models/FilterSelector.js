export default class FilterSelector {
  constructor(type, name, items) {
    this.type = type;
    this.name = name;
    this.items = items;
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

  removeItem(itemToRemove) {
    this.items = this.items.filter(item => item != itemToRemove);
  }
}