import { FILTER } from "../utils/const.js";

export default class FilterSelector {
  constructor(type, name, recipes) {
    this.type = type;
    this.name = name;
    this.recipes = recipes;
    this.filterText = '';
    this.pickedFilterTags = [];
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

  setRecipes(recipes) {
    this.recipes = recipes;
  }

  pickFilterTag(filterTag) {
    this.pickedFilterTags.push(filterTag);
  }

  unpickFilterTag(filterTagToUnpick) {
    this.pickedFilterTags = this.pickedFilterTags.filter(
      filterTag => filterTag != filterTagToUnpick);
  }

  setFilterText(filterText) {
    this.filterText = filterText;
  }

  getFilterTagsUnfiltered() {
    let filterTags = [];

    // Get available tags based on filtered recipes
    switch (this.getType())  {
      case FILTER.INGREDIENT.type:
        filterTags = this.recipes.map(recipe => recipe.getIngredients().map(ingredient => ingredient.ingredient)).flat();
        break;
      case FILTER.APPLIANCE.type:
        filterTags = this.recipes.map(recipe => recipe.getAppliance());
        break;
      case FILTER.USTENSILS.type:
        filterTags = this.recipes.map(recipe => recipe.getUstensils()).flat();
        break;
    }

    // Prepare filter tags
    const filterTagsPrepared = [
      ...new Set( // Deduplicate
        filterTags.map(filterTag => filterTag.toUpperCase()))
    ].sort();

    return filterTagsPrepared;
  }

  getFilterTags() {
    // We check if item contains the words in filterText
    const filterWords = this.filterText.toUpperCase().split(' ');

    return this.getFilterTagsUnfiltered()
      // Remove already picked filter tags
      .filter(filterTag => !this.pickedFilterTags.includes(filterTag))

      // Filter filterTags based on search text
      .filter(filterTag => filterWords
        .map(filterWord => filterTag.includes(filterWord))
        .reduce((a, b) => a && b) // Every word must be included
    );
  }
}