const btn = document.getElementById("invert-colors");
if (btn) {
	btn.checked = localStorage.getItem("_") === "true";
	btn.addEventListener("change", (e) => localStorage.setItem("_", e.target.checked));
}

const lbx = document.createElement("dialog");
lbx.id = "lbox";
lbx.ariaLabel = "Image preview";
lbx.addEventListener("click", () => lbx.close());
lbx.addEventListener("keyup", (e) => e.key === "Escape" && lbx.close());
document.body.appendChild(lbx);

document.querySelectorAll("main img:not(a img)").forEach((img) => {
	img.tabIndex = 0;
	img.style.cursor = "zoom-in";
	img.ariaDescription = "Press Enter or click on image to preview";
	img.addEventListener("click", (e) => preview(img));
	img.addEventListener("keyup", (e) => e.key === "Enter" && preview(img));
});

function preview(img) {
	lbx.innerHTML = `<img src="${img.src}" alt="${img.alt}"
	                      srcset="${img.srcset}" sizes="100vw"
	                      referrerpolicy="${img.referrerPolicy}">`;
	lbx.showModal();
}
