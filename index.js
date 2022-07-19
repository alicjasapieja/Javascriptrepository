window.onload = function () {


    // Quote //
    const quote = "https://type.fit/api/quotes"

    fetch(quote)
    .then(response => response.json())
    .then(json => {
        let index = parseInt(Math.random() * 1643)
            let newQuote = document.createElement('p');
            newQuote.innerHTML = json[index].text;
            document.querySelector('.quote').appendChild(newQuote);
    })


// API for Gallery//
const gallery = "https://foodish-api.herokuapp.com/api/"
fetch(gallery)
.then(response => response.json())
.then(json => {
    let galleryimage = document.createElement('img');
    galleryimage.innerHTML= json.image;
    document.querySelector('.galleryimg').appendChild(galleryimage);
})

    // Shopping List //
    let addToDoButton = document.getElementById('addToDo');
    let toDoContainer = document.getElementById('toDoContainer');
    let inputField = document.getElementById('inputField');
    
    addToDoButton.addEventListener('click', function(){
        var paragraph = document.createElement('p');
        paragraph.classList.add('paragraph-styling');
        paragraph.innerText = inputField.value;
        toDoContainer.appendChild(paragraph);
        inputField.value = "";
        paragraph.addEventListener('click', function(){
            paragraph.style.textDecoration = "line-through";
        })
        paragraph.addEventListener('dblclick', function(){
            toDoContainer.removeChild(paragraph);
        })
    })


// API RECIPE APP //

const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners //
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// Meal list- matches with the ingredients //
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


// Get Recipe Of The Meal //
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipe (data.meals));
    }
}

// Create A Recipe Instruction //
function mealRecipe (meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}
};