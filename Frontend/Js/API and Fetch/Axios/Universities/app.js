let url = "http://universities.hipolabs.com/search?country=";

let inpt = document.querySelector("#state-input");
let btn = document.querySelector("#search-button");
let totalUniversities = document.querySelector("#total-universities");

btn.addEventListener("click", async () => {
  let country = inpt.value;
  let uniArr = await getUniversities(country);

  show_res(uniArr);
});

function show_res(uniArr) {
  let tbody = document.querySelector("#university-table-body");
  tbody.innerText = ""; // Clear Previous Data
  let sl_no = 1;

  for (col of uniArr) {
    let tr = document.createElement("tr");
    let td_sl = document.createElement("td"),
      td_name = document.createElement("td"),
      td_state = document.createElement("td"),
      td_website_link = document.createElement("a"),
      td_website = document.createElement("td");

    td_sl.innerText = sl_no++;
    td_name.innerText = col.name;
    td_state.innerText = col["state-province"] || "N/A"; // Handling null values (here we use [] because of hyphen in key)
    td_website_link.innerText = col.web_pages;

    td_website_link.setAttribute("href", col.web_pages); // Setting href attribute
    td_website_link.setAttribute("target", "_blank"); // Open link in new tab

    td_website.appendChild(td_website_link);

    tr.appendChild(td_sl);
    tr.appendChild(td_name);
    tr.appendChild(td_state);
    tr.appendChild(td_website);

    tbody.appendChild(tr);
  }

  totalUniversities.innerText = sl_no - 1;
}

async function getUniversities(country) {
  try {
    let res = await axios.get(url + country);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

// Link with enter key

inpt.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});
