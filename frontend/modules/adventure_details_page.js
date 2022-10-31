import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  console.log("getAdventureIdFromURL", search, typeof search);
  let idFromURL = search.slice(11);
  console.log("idFromURL", idFromURL);

  // Place holder for functionality to work in the Stubs
  return idFromURL;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let response = await fetch(
      `${config.backendEndpoint}/adventures/detail/?adventure=${adventureId}`
    );
    let adventureDetails = await response.json();
    console.log("adventureDetails", adventureDetails);
    // Place holder for functionality to work in the Stubs
    return adventureDetails;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
/* <div class="adventure-detail-card mb-3">
                        <div>
                            <h1 id="adventure-name"></h1>
                            <p style="font-size: 20px; color: #999" id="adventure-subtitle"></p>
                        </div>
                        <div class="row mb-3" id="photo-gallery"></div>

                        <hr>
                        <h5>About the Experience</h5>
                        <div id="adventure-content"></div>
                    </div> */
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log("Running addAdventureDetailsToDOM");
  let advName = document.getElementById("adventure-name");
  let advSubtitle = document.getElementById("adventure-subtitle");
  let photoGallery = document.getElementById("photo-gallery");
  let adventureContent = document.getElementById("adventure-content");
  let imageSlot = document.createElement("img");
  advName.textContent = adventure.name;
  advSubtitle.textContent = adventure.subtitle;
  adventureContent.textContent = adventure.content;
  adventure.images.forEach((img) => {
    // photoGallery.innerHTML =
    // `
    // <img src=${img} alt=${adventure.name}>

    // `
    imageSlot = document.createElement("img");
    photoGallery.append(imageSlot);
    imageSlot.setAttribute("src", img);
    imageSlot.setAttribute("class", "activity-card-image");
    // console.log(img)
  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  console.log("running addBootstrapPhotoGallery");
  let photoGallery = document.getElementById("photo-gallery");
  // photoGallery.innerText = ''
  photoGallery.innerHTML = `
<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div id="carousel-inner" class="carousel-inner">

 

  
  </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
    </button>
  </div>
`;
  let carouselInner = document.getElementById("carousel-inner");
  console.log(carouselInner);

  // let carouselSlide = document.createElement('div')
  // carouselSlide.classList.add('carousel','slide')
  // let carouselInner = document.createElement('div')
  // carouselInner.classList.add('carousel-inner')
  // carouselSlide.append(carouselInner)
  // photoGallery.append(carouselSlide)
  // // Repeating elements
  images.forEach((img) => {
    console.log("looping for images");
    let carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    carouselItem.setAttribute("id", "carousel-item");
    carouselItem.innerHTML = `
  <img src=${img} class="d-block w-100" alt="...">
  `;
    carouselInner.append(carouselItem);
  });
  console.log(document.querySelector(".carousel-item"));
  document.querySelector(".carousel-item").classList.add("active");
  // console.log(document.querySelector('carousel-item'))
}

//Implementation of conditional rendering of DOM based on availability
// x.style.display = "none"
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(adventure.reserved);
  // adventure.reserved = true
  if (adventure.available) {
    document.getElementById("reservation-panel-available").style.display =
      "block";
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
  }else{
    document.getElementById("reservation-panel-available").style.display =
      "none";
      document.getElementById("reservation-panel-sold-out").style.display =
      "block";
      document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
  }
}

//Implementation of reservation cost calculation based on persons
// function onPersonsChange(event) {
//   calculateReservationCostAndUpdateDOM(
//       adventureDetails,
//       event.target.value
//   );
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").innerHTML =
    adventure.costPerHead * persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let submitBtn = document.querySelector(".reserve-button");
  const form = document.getElementById("myForm");

  form.addEventListener("submit", sendFormData);

  async function sendFormData(event) {
    event.preventDefault();
    const formData = new FormData(form);
    let reservationFormData = {
      name: formData.get("name"),
      date: formData.get("date"),
      person: formData.get("person"),
      adventure: adventure.id,
    };
    console.log("reservationFormData", reservationFormData);
    let url = `${config.backendEndpoint}/reservations/new`;
    try {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          }, 
        body: JSON.stringify({
          name: formData.get("name"),
          date: formData.get("date"),
          person: formData.get("person"),
          adventure: adventure.id
        })
      });
      let data = await response.json();
      console.log("Data", data);
      alert('Success!');
      return data;
    } catch (error) {
      alert("Failed!");
    }
  }
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  
  if(adventure.reserved){
    document.getElementById('reserved-banner').style.display = 'block'
  } else {
    document.getElementById('reserved-banner').style.display = 'none'
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
