// https://www.themealdb.com/api/json/v1/1/random.php

// var axios = require("axios").default;

// var options = {
//   method: 'GET',
//   url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${prevMeal}`
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

// Get the modal
var prevModal = document.getElementById("prevModal");

// Get the button that opens the modal
var prevBtn = document.getElementById("prevBtn");

// Get the <span> element that closes the modal
var modalClose = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
prevBtn.onclick = function () {
  prevModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
modalClose.onclick = function () {
  prevModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == prevModal) {
    prevModal.style.display = "none";
  }
};

const getMealBtn = document.getElementById("get_meal");

const getPrevBtn = document.getElementById("prevBtn");

const url = "https://www.themealdb.com/api/json/v1/1/random.php";

const result = document.getElementById("meal");



// const previous = document.getElementById("previous");

// let prevMealCount = 0;

// idsArr = [];

// prevMeals = [];
// prevMealsNames = [];
// prevMealsAll = [];

getMealBtn.addEventListener("click", (e) => {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      displayMeal(res.meals[0]);
      // prevMeals.push(res.meals[0].idMeal);
      // prevMealsNames.push(res.meals[0].strMeal);
      // prevMealsAll.push(res.meals[0]);
      
      var html_to_insert = `<img class="modal-thumb" src="${res.meals[0].strMealThumb}" alt="Meal Image">`;

      var prevDiv = document.getElementById("listOfPrev");
      var prevItem = document.createElement("div");
      var itemId = "prevMealId=" + res.meals[0].idMeal;
      prevItem.appendChild(document.createTextNode(`${res.meals[0].strMeal}`));
      prevItem.setAttribute("id", itemId); // added line
      prevItem.setAttribute("class", "previous-meal");

      prevItem.insertAdjacentHTML("beforeend", html_to_insert);

      prevItem.addEventListener("click", (e) => {
        fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${res.meals[0].idMeal}`
        )
          .then((res) => res.json())
          .then((res) => {
            displayMeal(res.meals[0]);
          prevModal.style.display = "none";
          })
          .catch(function (error) {
            console.log(error);
          });
        e.preventDefault();
      });
      prevDiv.appendChild(prevItem);
    let countPrev = document.getElementById("listOfPrev").childElementCount; 
    if (countPrev >= 2) {
      getPrevBtn.style.display = "block";
    }
    })
    .catch(function (error) {
      console.log(error);
    });
  e.preventDefault();
});



const displayMeal = (meal) => {

  getMealBtn.firstChild.textContent = "Get New Meal ";
  let mealName = meal.strMeal;
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    }
  }

  result.innerHTML = `
    <div class="meal-overview">
    <div class="info-col">
    <div class="meal-header info-inner">
      <h2>${meal.strMeal}</h2>
      <span>Cuisine Area: <em>${meal.strArea}</em></span><br>
      <span>Cuisine Category: <em>${meal.strCategory}</em></span>
      <img src="${meal.strMealThumb}" alt="Meal Image">
      </div>
      <div class="meal-ingredients info-inner">
      <h5>Ingredients:</h5>
				<ul>
					${ingredients
            .map(
              (ingredient) => `<li>
              ${ingredient}
            </li>`
            )
            .join("")}
				</ul>
        </div>
    </div>
    <div class="details-col">
      <div class="details-copy-container">
      <div class="meal-instructions">
<h3>Meal Instructions</h3>
      <p>${meal.strInstructions}</p>
      </div>
      </div>
    ${
      meal.strYoutube
        ? `
      <div class="meal-vid">
			<h5>Video Recipe</h5>
			<div class="videoWrapper">
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				</iframe>
			</div>`
        : ""
    }
    </div>
    </div>
    </div>
    `;

  //   previous.innerHTML = `
  // <h5>Previous Meals:</h5>

  // 				<ul>
  // 					${prevMealsAll
  //             .map(
  //               (prevMeal) => `<li>
  //               <a class="prev-meal-class" id="prev-meal-link-${prevMealCount++}" href="${prevMeal.strMeal}" onclick="myFunction(event)">
  //               ${prevMeal.strMeal} - ${this.href}</a>
  //             </li>`
  //             )
  //             .join("")}
  // 				</ul>
  // `;
};

// function myFunction(event) {
//   console.log(this.event.currentTarget.href);
//    event.preventDefault();
// }
