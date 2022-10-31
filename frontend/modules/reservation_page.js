import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let response = await fetch(`${config.backendEndpoint}/reservations/`);
    let reservationData = await response.json();
    console.log("reservationData", reservationData);
    // Place holder for functionality to work in the Stubs
    return reservationData;
  } catch (error) {
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
/* <tbody id="reservation-table">
<tr>
    <th>Hasan</th>
    <th>Hasan</th>
    <th>Hasan</th>
    <th>Hasan</th>
    <th>Hasan</th>
    <th>Hasan</th>
    <th>Hasan</th>
    <th>Hasan</th>
                    </tr></tbody> */

function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  if (reservations.length === 0) {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  } else {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  }

  let tbody = document.getElementById("reservation-table");

  //Conditionally render the no-reservation-banner and reservation-table-parent
  // adventureDate.toLocaleDateString('en-IN', options)
  // bookingDate.toLocaleDateString('en-IN', options)

  // Intl.DateTimeFormat('en-IN').format(date)


  reservations.forEach((entry) => {
    console.log("entry", entry);
    const bookingDate = new Date(entry.time);

// console.log('formattedBookingDate',formattedBookingDate)
// let dateArray = formattedBookingDate.split(' ')
// console.log('formattedBookingDate after split',formattedBookingDate)
// let indexOfAt = dateArray.indexOf('at')
// console.log('indexOfAt', indexOfAt)
// dateArray.splice(indexOfAt, 1, ',')
// let finalDate = dateArray.join(' ')
// console.log('finalDate', finalDate)

    const adventureDate = new Date(entry.date);
    
let BookingDate = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "long",
  timeStyle: "medium"
}).format(bookingDate)
let formattedBookingDate = BookingDate.split(' at ').join(', ');
    // const options = { year: "numeric", month: "long", day: "numeric" };
    console.log(formattedBookingDate.length)
    let trow = document.createElement("tr");
    trow.innerHTML = `
    
    <th>${entry.id}</th>
    <td>${entry.name}</td>
    <td>${entry.adventureName}</td>
    <td>${entry.person}</td>
    <td>${adventureDate.toLocaleDateString("en-IN")}</td>
    <td>${entry.price}</td>
    <td>${formattedBookingDate}</td>
    <td id="${entry.id}"> <a href="../../adventures/detail/?adventure=${entry.adventure}">
    <button class="reservation-visit-button">Visit Adventure</button>
      </a>
        </td>
                 
    `;
    tbody.append(trow);
  });
  
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page
    
    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
}

export { fetchReservations, addReservationToTable };
