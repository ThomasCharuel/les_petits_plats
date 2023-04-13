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

    // We search in description, title and ingredients
    const getSearchString = (recipe) => (
      `${recipe.getDescription()} ${recipe.getName()} 
       ${recipe.getIngredients().map(ingredient => ingredient.ingredient).join(' ')}`
      .toUpperCase()
    );

    // Split Search text in words
    const searchWords = this.searchText.toUpperCase().split(' ');

    // Apply textual search
    return searchWords.every(word => getSearchString(recipe).includes(word));
  }
}

export class TagSearch extends Search {
  constructor(searchTag) {
    super();
    this.searchTag = searchTag;
  }

  isFoundInRecipe(recipe) {
    switch (this.searchTag.getType()) {
      case FILTER.INGREDIENT.type:
        return recipe.getIngredients()
          .map(ingredient => ingredient.ingredient.toUpperCase())
          .includes(this.searchTag.getName());
      case FILTER.APPLIANCE.type:
        return recipe.getAppliance().toUpperCase === this.searchTag.getName();
      case FILTER.USTENSILS.type:
        return recipe.getUstensils()
          .map(u => u.toUpperCase())
          .includes(this.searchTag.getName());
    }
  }
}
