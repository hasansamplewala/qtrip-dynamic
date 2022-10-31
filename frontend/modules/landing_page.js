import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let response = await fetch(`${config.backendEndpoint}/cities`);
    let data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log("err", err);
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  
  let cardRow = document.getElementById("data");
  let cardMainDiv = document.createElement("div");
  cardMainDiv.classList.add("col-12", "col-sm-6", "col-lg-3", "mb-4");

  // let cardAnchor = document.createElement("a");
  // cardAnchor.setAttribute("href", "pages/adventures/");
  // let cardTile = document.createElement("div");
  // cardTile.classList.add("tile", id);

  // let cardImage = document.createElement("img");
  // cardImage.setAttribute("src", image);

  // let cardText = document.createElement("div");
  // cardText.innerHTML = `
  // <h5>${city}</h5>
  // <p>${description}</p>
  // `;
  
  cardRow.append(cardMainDiv);
  // cardMainDiv.append(cardAnchor);
  // cardAnchor.append(cardTile);
  // cardTile.append(cardImage, cardText);

// using InnerHTML
  cardMainDiv.innerHTML = `

<a id='${id}' href="pages/adventures/?city=${id}">
<div class="tile ${id}">
       <img src=${image} />
       <div class="tile-text text-center">
             <h5>${city}</h5>
              <p>${description}</p>
       </div>
     </div>
   </a>
 
`;



  console.log('cardRow', cardRow)
  
}

// <div class="col-12 col-sm-6 col-lg-3 mb-4">
//   <a href="pages/adventures/">
//     <div class="tile">
//       <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Ubcity2.jpg" />
//       <div class="tile-text text-center">
//         <h5>Bengaluru</h5>
//         <p>100+ places</p>
//       </div>
//     </div>
//   </a>
// </div>

export { init, fetchCities, addCityToDOM };
