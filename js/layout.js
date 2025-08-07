document.addEventListener("DOMContentLoaded", () => {
loadComponent("components/navbar.html", "#navbar");
loadComponent("components/header.html", "#header");
loadComponent("components/footer.html", "#footer");
});

function loadComponent(file, targetSelector) {
fetch(file)
.then((res) => res.text())
.then((html) => {
document.querySelector(targetSelector).innerHTML = html;
});
}