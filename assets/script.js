const btn = document.getElementById("invert-colors");
if (btn) {
	btn.checked = localStorage.getItem("_") === "true";
	btn.addEventListener("change", (e) => localStorage.setItem("_", e.target.checked));
}

const lbx = document.createElement("dialog");
lbx.id = "lightbox";
lbx.addEventListener("click", () => lbx.close());
lbx.addEventListener("keyup", (e) => e.key === "Escape" && lbx.close());
document.body.appendChild(lbx);

const zoomIn = (img) => {
	lbx.innerHTML = `<img src="${img.src}" alt="${img.alt}"
	                      srcset="${img.srcset}" sizes="100vw"
	                      referrerpolicy="${img.referrerPolicy}">`;
	lbx.ariaLabelledByElements = [lbx.querySelector("img")];
	lbx.showModal();
};
document.querySelectorAll("main img:not(a img)").forEach((el) => {
	el.style.cursor = "zoom-in";
	el.tabIndex = 0;
	el.addEventListener("keyup", (e) => e.key === "Enter" && zoomIn(el));
	el.addEventListener("click", (e) => zoomIn(el));
});
