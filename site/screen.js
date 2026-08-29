const image = document.querySelector(".dashboard");
const status = document.querySelector(".status");
const source = image.dataset.source;

function refresh() {
  image.src = source + "?t=" + Date.now();
}

image.addEventListener("load", () => { status.style.display = "none"; });
image.addEventListener("error", () => {
  status.style.display = "flex";
  status.textContent = "جارٍ تحديث التقرير…";
});

refresh();
setInterval(refresh, 5 * 60 * 1000);
