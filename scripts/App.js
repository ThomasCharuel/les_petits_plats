import RecipeApi from './api/RecipeApi.js';
import Recipe from './models/Recipe.js';
import FilterTag from './models/FilterTag.js';
import FilterSelector from './models/FilterSelector.js';
import RecipeCard from './templates/RecipeCard.js';
import FilterTagCard from './templates/FilterTagCard.js';
import SearchBarCard from './templates/SearchBar.js';
import FilterSelectorCard from './templates/FilterSelectorCard.js';
import { FILTER } from './utils/const.js';
import { TextSearch, TagSearch } from './search/Search.js';

class App {
  constructor() {
    this.recipesApi = new RecipeApi();
    this.recipesUnfiltered = [];
    this.recipes = this.recipesUnfiltered;
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

  applyFilterOnRecipes() {
    // Filter recipes based on search text and filter tags
    this.recipes = this.recipesUnfiltered.filter(
      recipe => [
        // Search criterias
        new TextSearch(this.searchText), ...this.filterTags.map(tag => new TagSearch(tag))
      ]
        // Check that every search criteria is valided
        .every(searchCriteria => searchCriteria.isFound(recipe))
    );

    // Update filter selectors
    this.filterSelectors.forEach(
      filterSelector => filterSelector.setRecipes(this.recipes));

    // Update view
    this.renderRecipes();
  }

  async fetchRecipes() {
    const recipesData = await this.recipesApi.get();
    this.recipesUnfiltered = recipesData.map(recipe => new Recipe(recipe));
    this.recipes = this.recipesUnfiltered;
  }

  updateSearchText(searchText) {
    this.searchText = searchText;
    // Run search
    this.applyFilterOnRecipes();
  }

  renderSearchBar() {
    const searchBarCard = new SearchBarCard((searchText) => this.updateSearchText(searchText));
    this.searchBarWrapper.appendChild(searchBarCard.getHTML());
  }

  removeFilterTag(filterTag) {
    // Remove filter tag
    this.filterTags = this.filterTags.filter(x => x != filterTag);
    // Add back filter to filter selector
    const filterSelector = this.filterSelectors.find(
      filterSelector => filterSelector.getType() === filterTag.getType());
    filterSelector.unpickFilterTag(filterTag.getName());

    this.renderFilterTags();
    this.renderFiltersSelectors();

    // Run search
    this.applyFilterOnRecipes();
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
    this.applyFilterOnRecipes();
  }

  setFiltersSelectors() {
    Object.values(FILTER).forEach((filter) => {
      this.filterSelectors.push(
        new FilterSelector(filter.type, filter.name, this.recipes)
      );
    });
  }

  renderFiltersSelectors() {
    this.filtersSelectorsWrapper.replaceChildren();
    
    this.filterSelectors.forEach(filterSelector => {
      const filterSelectorCard = new FilterSelectorCard(filterSelector
        , (that, filterTagName) => {
          this.addFilterTag(filterSelector.getType(), filterTagName);
          filterSelector.pickFilterTag(filterTagName);
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