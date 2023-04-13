import { FILTER } from '../utils/const.js';

class Search {
  isFound(recipe) {
    return this.isFoundInRecipe(recipe);
  }
}

export class TextSearch extends Search {
  constructor(searchText) {
    super();
    this.searchText = searchText;
  }

  isFoundInRecipe(recipe) {
    // No filtering if search text is less than 3 chars
    if (this.searchText.length < 3) {
      return true;
    }

    // Split Search text in words
    const searchWords = this.searchText.toUpperCase().split(' ');

    // Apply textual search. Every words in search must match the recipe
    for (let i = 0; i < searchWords.length; i++) {
      if (!recipe.getAsSearchString().includes(searchWords[i])) {
        return false; // Break the loop when unmatching word is found
      }
    }
    return true;
  }
}

export class TagSearch extends Search {
  constructor(searchTag) {
    super();
    this.searchTag = searchTag;
  }

  isFoundInRecipe(recipe) {
    let searchString;

    // Define search string based on filter type
    switch (this.searchTag.getType()) {
      case FILTER.INGREDIENT.type:
        searchString = recipe.getIngredientsAsSearchString();
        break;
      case FILTER.APPLIANCE.type:
        searchString = recipe.getApplianceAsSearchString();
        break;
      case FILTER.USTENSILS.type:
        searchString = recipe.getUstensilsAsSearchString();
        break;
      default:
        throw new Error(`Unknown filter tag: ${this.searchTag.getType()}`);
    }
    // Check if search tag is included in the search string
    return searchString.includes(this.searchTag.getName());
  }
}
