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
	/*
	 * TODO:
	 * Replace with `<button>` and remove `role` and `tabIndex`
	 * Blocked-by: https://caniuse.com/css-display-contents (note 2)
	 */
	const btn = document.createElement("div");
	btn.role = "button";
	btn.tabIndex = 0;
	btn.classList.add("lbox-btn");
	btn.innerHTML = '<span class="sr-only">Press <kbd>Enter</kbd> or click on image to preview</span>';
	btn.addEventListener("click", (e) => preview(img));
	btn.addEventListener("keyup", (e) => e.key === "Enter" && preview(img));
	btn.appendChild(img.cloneNode(true));
	img.replaceWith(btn);
});

function preview(img) {
	lbx.innerHTML = `<img src="${img.src}" alt="${img.alt}"
	                      srcset="${img.srcset}" sizes="100vw"
	                      referrerpolicy="${img.referrerPolicy}">
	                 <p autofocus>Press <kbd>Escape</kbd> or click anywhere to close</p>`;
	lbx.showModal();
}
