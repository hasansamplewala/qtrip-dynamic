import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // example: http://localhost:8081/?city=bengaluru => window.location.search would return "?city=bengaluru"
  console.log("city", search, typeof search);
  let searchCity = search.slice(6);
  console.log("searchCity", searchCity);
  // fetchAdventures(searchCity)
  return searchCity;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  // http://13.235.186.236:8082/adventures?city=kolkata
  try {
    let response = await fetch(
      `${config.backendEndpoint}/adventures?city=${city}`
    );
    let data = await response.json();
    console.log("data is", data);
    return data;
  } catch (err) {
    console.log("err", err);
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  console.log("adventures", adventures);
  //Updates the DOM with the cities
  adventures.forEach((key) => {
    console.log(
      key.id,
      key.category,
      key.image,
      key.name,
      key.costPerHead,
      key.duration
    );
    createAdventureCard(
      key.id,
      key.category,
      key.image,
      key.name,
      key.costPerHead,
      key.duration
    );
  });

  function createAdventureCard(
    id,
    category,
    image,
    name,
    costPerHead,
    duration
  ) {
    console.log('Adding Adventure cards')
    let cardRow = document.getElementById("data");
    let cardMainDiv = document.createElement("div");
    cardMainDiv.classList.add("col-12", "col-sm-6", "col-lg-3", "mb-4");
    cardRow.append(cardMainDiv);
    cardMainDiv.innerHTML = `

    <a class="card-anchor" id='${id}' href="detail/?adventure=${id}">
    <div class="category-banner">${category}</div>
    <div class="activity-card">
    
           <img src=${image} class="img" alt="adventure image"/>
           <div class="card-body">
           
           <div class="d-md-flex justify-content-between">
                 <h5 class="card-title">${name}</h5>
                  <p class="card-text">₹${costPerHead}/-</p>
            </div>

           <div class="text-center d-md-flex justify-content-between">
                 <h5 class="card-title">Duration</h5>
                  <p class="card-text">${duration} (Hours)</p>
           </div>
          </div>
         </div>
       </a>
     
    `;
  }
}

// new adventure
// let adventureButton = document.getElementById("adv-btn");
// // console.log(adventureButton)
// adventureButton.addEventListener("click", addNewAdventure);

// async function addNewAdventure() {
//   let dataObject = {
//     city: "kolkata",
//   };

//   let response = await fetch(`${config.backendEndpoint}/adventures/new`, {
//     method: "POST",
//     body: JSON.stringify(dataObject),
//   });
//   const data = await response.json();
//   console.log("data", data);
//   return data;
// }
// new adventure

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
    console.log('list passed for filterByDuration',list, 'low', low, 'high', high)
    const listByDuration = list.filter((obj) => {
    return obj.duration >= low && obj.duration <= high;
    // console.log(obj.duration)
  });
  console.log('List after passing filterByDuration', listByDuration)
  return listByDuration;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  console.log("categoryList is", categoryList);
  let listByCategory = [];
  for (let item of categoryList) {
    const listFilter = list.filter((obj) => {
      console.log("obj category", obj.category, "item", item);
      return obj.category === item;
    });
    console.log("listFilter is", listFilter);
    listByCategory.push(...listFilter);
    console.log("one loop complete", "listByCategory", listByCategory);
  }

  console.log("Final listByCategory", listByCategory);
  return listByCategory;
}

// filters object looks like this filters = { duration: "", category: [] }; { duration : "6-10", category : [] }

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  console.log("list is", list, "filters are", filters);
  console.log("The lengt of category array", filters.category.length)
  let filteredList;
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if (filters.duration === "" && filters.category.length === 0) {
    console.log("no filters present");
    return list;
  }
  if (filters.duration === "") {
    console.log("running only filter by Category")
    filteredList = filterByCategory(list, filters.category);
  }
  if (filters.category.length === 0) {
    console.log("running only filter by duration")
    let low = Number(filters.duration.split("-")[0]);
    let high = Number(filters.duration.split("-")[1]);

    filteredList = filterByDuration(list, low, high);
  }
  if (filters.duration !== "" && filters.category.length !== 0) {
    console.log("running both filters")
    let low = Number(filters.duration.split("-")[0]);
    let high = Number(filters.duration.split("-")[1]);
    filteredList = filterByDuration(list, low, high);
    console.log('filteredList after passing filterByDuration', filteredList)
    filteredList = filterByCategory(filteredList, filters.category);
  }
  // Place holder for functionality to work in the Stubs
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  // window.localStorage.setItem('name', 'Obaseki Nosa');
  let filterAsString = JSON.stringify(filters)
  window.localStorage.setItem('filters', filterAsString)
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filterAsJSON = JSON.parse(window.localStorage.getItem('filters'))
  // Place holder for functionality to work in the Stubs
  return filterAsJSON;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryList = document.getElementById("category-list");
  console.log("filter for pills", filters);

  filters.category.forEach(function (item) {
    console.log(item);
    let filterPill = document.createElement("div");
    filterPill.setAttribute("class", "category-filter");
    categoryList.append(filterPill);
    filterPill.innerText = item;
  });
  document.getElementById('duration-select').value = filters.duration
  // console.log(document.getElementById('duration-select') )
  // `${filters.duration} (Hours)`
  // this.basicOptions[key], 'selected', true
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
