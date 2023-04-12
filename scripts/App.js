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
    this.searchText = '';
    this.filterTags = [];
    this.filterSelectors = [];

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

  updateSearchText(searchText) {
    this.searchText = searchText;
    console.log(this.searchText)
    // Run search
  }

  renderSearchBar() {
    const searchBarCard = new SearchBarCard(this.updateSearchText);
    this.searchBarWrapper.appendChild(searchBarCard.getHTML());
  }

  removeFilterTag(filterTag) {
    // Remove filter tag
    this.filterTags = this.filterTags.filter(x => x != filterTag);
    // Add back filter to filter selector
    const filterSelector = this.filterSelectors.find(
      filterSelector => filterSelector.getType() === filterTag.getType());
    filterSelector.addItem(filterTag.getName());

    this.renderFilterTags();
    this.renderFiltersSelectors();

    // Run search
  }

  renderFilterTags() {
    this.filtersTagsWrapper.replaceChildren();
    
    this.filterTags.forEach((filterTag) => {
      const filterTagCard = new FilterTagCard(filterTag, (filterTag) => this.removeFilterTag(filterTag));
      this.filtersTagsWrapper.appendChild(filterTagCard.getHTML());
    });
  }

  addFilterTag(filterType, item) {
    const filterTag = new FilterTag(item, filterType);
    this.filterTags.push(filterTag);
    this.renderFilterTags();
    // Run search
  }

  setFiltersSelectors() {
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

      this.filterSelectors.push(
        new FilterSelector(filter.type, filter.name, items)
      );
    });
  }

  renderFiltersSelectors() {
    this.filtersSelectorsWrapper.replaceChildren();
    
    this.filterSelectors.forEach(filterSelector => {
      const filterSelectorCard = new FilterSelectorCard(filterSelector
        , (that, item) => {
          this.addFilterTag(filterSelector.getType(), item);
          filterSelector.removeItem(item);
          that.updateItemsHTML();
        }, (that, searchText) => {
          filterSelector.setFilterText(searchText);
          that.updateItemsHTML();
        });
      this.filtersSelectorsWrapper.appendChild(filterSelectorCard.getHTML());
    })
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

    this.setFiltersSelectors();
    this.renderFiltersSelectors();

    this.renderRecipes();
  }
}

const app = new App;
app.main();