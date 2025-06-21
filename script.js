document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("recipe-form");
    const recipesList = document.getElementById("recipes-list");
  
    function loadRecipes() {
      const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
      recipesList.innerHTML = "";
  
      recipes.forEach((recipe, index) => {
        const recipeDiv = document.createElement("div");
        recipeDiv.className = "recipe";
        recipeDiv.innerHTML = `
          <h3>${recipe.title}</h3>
          <p><strong>Ingredients:</strong><br>${recipe.ingredients}</p>
          <p><strong>Instructions:</strong><br>${recipe.instructions}</p>
          <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        recipesList.appendChild(recipeDiv);
      });
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("title").value.trim();
      const ingredients = document.getElementById("ingredients").value.trim();
      const instructions = document.getElementById("instructions").value.trim();
  
      if (title && ingredients && instructions) {
        const newRecipe = { title, ingredients, instructions };
        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipes.push(newRecipe);
        localStorage.setItem("recipes", JSON.stringify(recipes));
        form.reset();
        loadRecipes();
      }
    });
  
    recipesList.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        const index = e.target.getAttribute("data-index");
        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipes.splice(index, 1);
        localStorage.setItem("recipes", JSON.stringify(recipes));
        loadRecipes();
      }
    });
  
    loadRecipes();
  });
  