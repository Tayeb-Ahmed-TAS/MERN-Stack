let filters = document.getElementsByClassName("filter");

for (let filter of filters) {
  if (filter.href === window.location.href) {
    // Add active class to the filter that matches the current URL
    filter.classList.add("active");
  }
}
