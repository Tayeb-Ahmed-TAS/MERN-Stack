// Selecting all the required elements

let f_name = document.querySelector("#fname");
let l_name = document.querySelector("#lname");
let dob = document.querySelector("#dob");
let gender = document.querySelector("#gender");
let email = document.querySelector("#email");
let phone = document.querySelector("#phone");
let city = document.querySelector("#city");
let zip = document.querySelector("#zipcode");
let country = document.querySelector("#country");

let generate_btn = document.querySelector("#fetchBtn");

// Fake API URL

let api_url = `https://fakerapi.it/api/v2/persons?_quantity=1`;

// Async function to fetch data from the API

async function generate_data() {
  try {
    let res = await fetch(api_url);

    if (res.status !== 200) {
      throw new Error(`Error ! ${res.status}`);
    }

    let info = await res.json();

    f_name.innerText = info.data[0].firstname;
    l_name.innerText = info.data[0].lastname;
    dob.innerText = info.data[0].birthday;
    gender.innerText = info.data[0].gender;
    email.innerText = info.data[0].email;
    phone.innerText = info.data[0].phone;
    city.innerText = info.data[0].address.city;
    zip.innerText = info.data[0].address.zipcode;
    country.innerText = info.data[0].address.country;
  } catch (err) {
    console.log(err);

    f_name.innerText =
      l_name.innerText =
      dob.innerText =
      gender.innerText =
      email.innerText =
      phone.innerText =
      city.innerText =
      zip.innerText =
      country.innerText =
        "";
  }
}

generate_data();

// Event listener to the button

generate_btn.addEventListener("click", generate_data);
