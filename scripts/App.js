import RecipeApi from './api/RecipeApi.js';
import Recipe from './models/Recipe.js';
import FilterTag from './models/FilterTag.js';
import FilterSelector from './models/FilterSelector.js';
import RecipeCard from './templates/RecipeCard.js';
import FilterTagCard from './templates/FilterTagCard.js';
import SearchBarCard from './templates/SearchBar.js';
import FilterSelectorCard from './templates/FilterSelectorCard.js';

const FILTER_TYPE = {
  INGREDIENT: { type: 'ingredient', name: 'ingrédient' },
  APPLIANCE: { type: 'appliance', name: 'appareil' },
  USTENSILS: { type: 'ustensils', name: 'ustensile' },
};

class App {
  constructor() {
    this.recipesApi = new RecipeApi();
    this.recipes = [];
    this.filterTags = [
      new FilterTag('Coco', FILTER_TYPE.INGREDIENT.type),
      new FilterTag('Lait de coco', FILTER_TYPE.INGREDIENT.type),
      new FilterTag('Oven', FILTER_TYPE.APPLIANCE.type),
      new FilterTag('Coco', FILTER_TYPE.APPLIANCE.type),
      new FilterTag('Pan', FILTER_TYPE.USTENSILS.type),
    ];
    this.filtersSelectors = [
      new FilterSelector(FILTER_TYPE.INGREDIENT.type, FILTER_TYPE.INGREDIENT.name, ['Coco', 'Lait de coco']),
      new FilterSelector(FILTER_TYPE.APPLIANCE.type, FILTER_TYPE.APPLIANCE.name, ['Coco', 'Lait de coco']),
      new FilterSelector(FILTER_TYPE.USTENSILS.type, FILTER_TYPE.USTENSILS.name, ['Coco', 'Lait de coco']),
    ];

    // HTML placeholder
    this.searchBarWrapper = document.querySelector('.search-bar-placeholder');
    this.filtersTagsWrapper = document.querySelector('.filters-tags-section');
    this.filtersSelectorsWrapper = document.querySelector('.filters-section');
    this.recipesWrapper = document.querySelector('.recipes-section');
  }

  async fetchRecipes() {
    const recipesData = await this.recipesApi.get();
    this.recipes = recipesData.map(recipe => new Recipe(recipe));
  }

  renderSearchBar() {
    const searchBarCard = new SearchBarCard();
    this.searchBarWrapper.appendChild(searchBarCard.getHTML());
  }

  renderFilterTags() {
    this.filtersTagsWrapper.replaceChildren();
    
    this.filterTags.forEach(filterTag => {
      const filterTagCard = new FilterTagCard(filterTag);
      this.filtersTagsWrapper.appendChild(filterTagCard.getHTML());
    });
  }

  renderFiltersSelectors() {
    this.filtersSelectorsWrapper.replaceChildren();

    this.filtersSelectors.forEach(filterSelector => {
      const filterSelectorCard = new FilterSelectorCard(filterSelector);
      this.filtersSelectorsWrapper.appendChild(filterSelectorCard.getHTML());
    });
  }

  renderRecipes() {
    this.recipesWrapper.replaceChildren(); // Empty recipes section

    this.recipes.forEach(recipe => {
      const recipeCard = new RecipeCard(recipe);
      this.recipesWrapper.appendChild(recipeCard.getHTML());
    });
  }

  async main() {
    this.renderSearchBar();
    this.renderFilterTags();
    this.renderFiltersSelectors();

    await this.fetchRecipes();
    this.renderRecipes();
  }
}

const app = new App;
app.main();