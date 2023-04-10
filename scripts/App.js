import RecipeApi from './api/RecipeApi.js';
import Recipe from './models/Recipe.js';
import FilterTag from './models/FilterTag.js';
import RecipeCard from './templates/RecipeCard.js';
import FilterTagCard from './templates/FilterTagCard.js';

class App {
  constructor() {
    this.recipesApi = new RecipeApi();
    this.recipes = [];
    this.filterTags = [
      new FilterTag('Coco', 'ingredient'),
      new FilterTag('Lait de coco', 'ingredient'),
      new FilterTag('Oven', 'appliance'),
      new FilterTag('Coco', 'appliance'),
      new FilterTag('Pan', 'ustensils'),
    ];

    // HTML placeholder
    this.filtersTagsWrapper = document.querySelector('.filters-tags-section');
    this.recipesWrapper = document.querySelector('.recipes-section');
  }

  async fetchRecipes() {
    const recipesData = await this.recipesApi.get();
    this.recipes = recipesData.map(recipe => new Recipe(recipe));
  }

  renderFilterTags() {
    this.filtersTagsWrapper.replaceChildren();
    
    this.filterTags.forEach(filterTag => {
      const filterTagCard = new FilterTagCard(filterTag);
      this.filtersTagsWrapper.appendChild(filterTagCard.getHTML());
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
    this.renderFilterTags();

    await this.fetchRecipes();
    this.renderRecipes();
  }
}

const app = new App;
app.main();