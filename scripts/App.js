import RecipeApi from './api/RecipeApi.js';
import Recipe from './models/Recipe.js';
import RecipeCard from './templates/RecipeCard.js';

class App {
  constructor() {
    this.recipesApi = new RecipeApi();
    this.recipes = [];

    // HTML placeholder
    this.recipesWrapper = document.querySelector('.recipes-section');
  }

  async fetchRecipes() {
    const recipesData = await this.recipesApi.get();
    this.recipes = recipesData.map(recipe => new Recipe(recipe));
  }

  renderRecipes() {
    this.recipesWrapper.replaceChildren(); // Empty recipes section

    this.recipes.forEach(recipe => {
      const recipeCard = new RecipeCard(recipe);
      this.recipesWrapper.appendChild(recipeCard.getHTML());
    });
  }

  async main() {
    await this.fetchRecipes();
    this.renderRecipes();
  }
}

const app = new App;
app.main();