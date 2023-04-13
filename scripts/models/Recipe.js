export default class Recipe {
  constructor(data) {
    this.name = data.name;
    this.appliance = data.appliance;
    this.description = data.description;
    this.time = data.time;
    this.ustensils = data.ustensils;
    this.ingredients = data.ingredients;
  }

  getName() {
    return this.name;
  }

  getAppliance() {
    return this.appliance;
  }

  getApplianceAsSearchString() {
    return this.getAppliance().toUpperCase();
  }

  getDescription() {
    return this.description;
  }

  getTime() {
    return this.time;
  }

  getUstensils() {
    return this.ustensils;
  }

  getUstensilsAsSearchString() {
    return this.getUstensils().join(' ').toUpperCase();
  }

  getIngredients() {
    return this.ingredients;
  }

  getIngredientsAsSearchString() {
    return this.getIngredients()
      .map(ingredient => ingredient.ingredient)
      .join(' ')
      .toUpperCase();
  }

  getAsSearchString() {
    // Search in description, title and ingredients
    return `${this.getDescription()} ${this.getName()} ${this.getIngredientsAsSearchString()}`
      .toUpperCase();
  }
}