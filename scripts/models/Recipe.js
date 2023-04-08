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

  getDescription() {
    return this.description;
  }

  getTime() {
    return this.time;
  }

  getUstensils() {
    return this.ustensils;
  }

  getIngredients() {
    return this.ingredients;
  }
}