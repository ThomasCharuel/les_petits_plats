export default class RecipeCard {
  constructor(recipe) {
    this.recipe = recipe;
    this.wrapper = document.createElement('li');
  }

  getHTML() {
    this.wrapper.innerHTML = `
      <article class="recipe-card">
        <div class="recipe-card__thumbnail"></div>
        <div class="recipe-card__info-wrapper">
          <header class="recipe-card__header">
            <h2 class="recipe-card__title">${this.recipe.getName()}</h2>
            <p class="recipe-card__time"><i class="fa-regular fa-clock"></i>${this.recipe.getTime()} min</p>
          </header>
          <div class="recipe-card__info">
            <ul class="recipe-card__ingredients">
              ${this.recipe.getIngredients().map(ingredient => `
                <li>
                  <p>
                    <span class="recipe-card__ingredient">${ingredient.ingredient}
                      ${ingredient.quantity ? `:</span> ${ingredient.quantity}${ingredient.unit ? ` ${ingredient.unit}` : ''}` 
                    : '</span>'}
                  </p>
                </li>
              `).join('')}
            </ul>
            <p class="recipe-card__description">${this.recipe.getDescription()}</p>
          </div>
        </div>
      </article>
    `;

    return this.wrapper;
  }
}