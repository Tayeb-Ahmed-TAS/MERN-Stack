let taxSwitch = document.querySelector("#switchCheckDefault");
taxSwitch.addEventListener("click", () => {
  let taxInfo = document.getElementsByClassName("tax_info");

  for (let info of taxInfo) {
    info.style.display != "inline"
      ? (info.style.display = "inline")
      : (info.style.display = "none");
  }
});
