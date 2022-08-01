let elMovieWrapper = document.querySelector(".movie__wrapper");
let elTemplate = document.querySelector("#movie_card").content;
const elMovieInputRating = document.querySelector('.movie-input__rating')
const elMovieCount = document.querySelector('.count__span')
const elFormfilter = document.querySelector('.form')
const elMovieBtn = document.querySelector('.btn__search')

let moviesArray = movies.slice(0, 70);

function normolize(array) {
    let newArray = [];

    array.forEach(item => {
        let newObject = {}

        newObject.title = item.Title.toString();
        newObject.videoUrl = `https://www.youtube.com/watch?v=${item.ytid}`;
        newObject.categories = item.Categories.split("|");
        newObject.movieYear = item.movie_year;
        newObject.rating = item.imdb_rating;
        newObject.image = `https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`;

        newArray.push(newObject)
    });
    


    return newArray
}


let newArray = normolize(moviesArray);

function renderMovies(array, wrapper) {
    wrapper.innerHTML = null

    elMovieCount.textContent = array.length

    let tempFragment = document.createDocumentFragment()

    for (const item of array) {
        let templateItem = elTemplate.cloneNode(true)

        templateItem.querySelector(".movie__img").src = item.image;
        templateItem.querySelector(".movie__title").textContent = item.title;
        templateItem.querySelector(".movie__year").textContent = item.movieYear;
        templateItem.querySelector(".movie__rating").textContent = item.rating;
        templateItem.querySelector(".movie__url").href = item.videoUrl;

        tempFragment.appendChild(templateItem)
    }
    wrapper.appendChild(tempFragment)  
}

renderMovies(newArray, elMovieWrapper);


// Catigories
const categoriesArray = [];

newArray.forEach(item => {
    const catigoriesMovies = item.categories;
    
    catigoriesMovies.forEach(item => {
        const elMoviesCatigories = categoriesArray.includes(item);

        if(!elMoviesCatigories) {
            categoriesArray.push(item)
        }
    })
    
})

const elFormSelect = document.querySelector('.select__categories')

function getCotegories(array) {
    const selectFragment = document.createDocumentFragment();
    array.forEach((item) => {
        const selectOption = document.createElement('option')
        selectOption.textContent = item
        selectOption.setAttribute('value', `${item}`)
        selectFragment.append(selectOption)

    })
    elFormSelect.append(selectFragment)
}
getCotegories(categoriesArray.sort())


// categories filter

function filteredCategories(event) {
    event.preventDefault()

    const selectCategories = elFormSelect.value
    const InputValueRating = Number(elMovieInputRating.value.trim())

    const newMovieArray = []
    newMovieArray.innerHTML = ''

    if(selectCategories == "All" && InputValueRating) {
        newArray.forEach((item, index) => {
            if(InputValueRating <= newArray[index].rating) {
                newMovieArray.push(newArray[index]) 
            }
            renderMovies(newMovieArray, elMovieWrapper);
        }) 
    }
    else if(InputValueRating){
        newArray.forEach((item, index) => {
            if(InputValueRating <= newArray[index].rating && item.categories.includes(selectCategories)) {
                newMovieArray.push(newArray[index]) 
            }
            renderMovies(newMovieArray, elMovieWrapper);
        }) 
} 
}

elFormfilter.addEventListener('submit', filteredCategories)




















