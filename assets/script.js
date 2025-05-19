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

document.querySelectorAll("main img:not(a img)").forEach((el) => {
	el.style.cursor = "zoom-in";
	el.addEventListener("click", (e) => {
		lbx.innerHTML = `<img src="${el.src}" alt="${el.alt}"
		                      srcset="${el.srcset}" sizes="100vw"
		                      referrerpolicy="${el.referrerPolicy}">`;
		lbx.showModal();
	});
});
