import RecipeApi from './api/RecipeApi.js';
import Recipe from './models/Recipe.js';
import FilterTag from './models/FilterTag.js';
import FilterSelector from './models/FilterSelector.js';
import RecipeCard from './templates/RecipeCard.js';
import FilterTagCard from './templates/FilterTagCard.js';
import SearchBarCard from './templates/SearchBar.js';
import FilterSelectorCard from './templates/FilterSelectorCard.js';

const FILTER = {
  INGREDIENT: { type: 'ingredient', name: 'ingrédient' },
  APPLIANCE: { type: 'appliance', name: 'appareil' },
  USTENSILS: { type: 'ustensils', name: 'ustensile' },
};

class App {
  constructor() {
    this.recipesApi = new RecipeApi();
    this.recipes = [];
    this.filterTags = [
      new FilterTag('Coco', FILTER.INGREDIENT.type),
      new FilterTag('Lait de coco', FILTER.INGREDIENT.type),
      new FilterTag('Oven', FILTER.APPLIANCE.type),
      new FilterTag('Coco', FILTER.APPLIANCE.type),
      new FilterTag('Pan', FILTER.USTENSILS.type),
    ];

    // HTML placeholder
    this.searchBarWrapper = document.querySelector('.search-bar-placeholder');
    this.filtersTagsWrapper = document.querySelector('.filters-tags-section');
    this.filtersSelectorsWrapper = document.querySelector('.filters-selectors-section');
    this.recipesWrapper = document.querySelector('.recipes-section');
    this.noRecipeMessageWrapper = document.querySelector('.no-recipes-found-message');
  }

  async fetchRecipes() {
    const recipesData = await this.recipesApi.get();
    this.recipes = recipesData.map(recipe => new Recipe(recipe));
  }

  renderSearchBar() {
    const searchBarCard = new SearchBarCard();
    this.searchBarWrapper.appendChild(searchBarCard.getHTML());
  }

  removeFilterTag(filterTag) {
    this.filterTags = this.filterTags.filter(x => x != filterTag);
    this.renderFilterTags();
  }

  renderFilterTags() {
    this.filtersTagsWrapper.replaceChildren();
    
    this.filterTags.forEach((filterTag) => {
      const filterTagCard = new FilterTagCard(filterTag, (filterTag) => this.removeFilterTag(filterTag));
      this.filtersTagsWrapper.appendChild(filterTagCard.getHTML());
    });
  }

  renderFiltersSelectors() {
    this.filtersSelectorsWrapper.replaceChildren();

    Object.values(FILTER).forEach((filter) => {
      let items;

      switch (filter.type)  {
        case FILTER.INGREDIENT.type:
          items = this.recipes.map(recipe => recipe.getIngredients().map(ingredient => ingredient.ingredient)).flat();
          break;
        case FILTER.APPLIANCE.type:
          items = this.recipes.map(recipe => recipe.getAppliance());
          break;
        case FILTER.USTENSILS.type:
          items = this.recipes.map(recipe => recipe.getUstensils()).flat();
          break;
      }
      // Deduplicate and sort items
      const uniqueItems = [...new Set(items)].sort();

      const filterSelector = new FilterSelector(filter.type, filter.name, uniqueItems);
      const filterSelectorCard = new FilterSelectorCard(filterSelector);
      this.filtersSelectorsWrapper.appendChild(filterSelectorCard.getHTML());
    });
  }

  renderRecipes() {
    this.recipesWrapper.replaceChildren(); // Empty recipes section

    if (this.recipes.length > 0) {
      this.noRecipeMessageWrapper.classList.remove('show');
      this.recipes.forEach(recipe => {
        const recipeCard = new RecipeCard(recipe);
        this.recipesWrapper.appendChild(recipeCard.getHTML());
      });
    } else {
      this.noRecipeMessageWrapper.classList.add('show');
    }
  }

  async main() {
    await this.fetchRecipes();

    this.renderSearchBar();
    this.renderFilterTags();
    this.renderFiltersSelectors();
    this.renderRecipes();
  }
}

const app = new App;
app.main();