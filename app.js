const galleryItems = [
  {
    tag: "Phase 01",
    title: "Condiment Diplomacy",
    caption:
      "Ketchup. Coke. Golf shirt. Strong start.",
    src: "assets/photos/gallery/hugo-golf-portrait.png",
    alt: "Hugo standing beside a friend in a restaurant while someone drinks from a glass.",
  },
  {
    tag: "Phase 02",
    title: "Formalwear",
    caption:
      "An excellent outfit in a very average room.",
    src: "assets/photos/gallery/hugo-fairway-alliance.png",
    alt: "Hugo posing in a dark coat and pink shoes in a messy bedroom.",
  },
  {
    tag: "Phase 03",
    title: "Selfie Chaos",
    caption:
      "No explanation available.",
    src: "assets/photos/gallery/hugo-chaos-selfie.png",
    alt: "A selfie with Hugo and friends outdoors, with Hugo making a dramatic face.",
  },
  {
    tag: "Phase 04",
    title: "Three-Man Scramble",
    caption:
      "Good coastline. Good jumper. Good turnout.",
    src: "assets/photos/gallery/hugo-three-man-scramble.png",
    alt: "Hugo and two friends posing on a golf course by the sea.",
  },
  {
    tag: "Phase 05",
    title: "Beach Golf",
    caption:
      "Cap, coast, socks, clubs.",
    src: "assets/photos/gallery/hugo-beach-golf.png",
    alt: "Hugo standing on a golf course by the sea with a golf bag nearby.",
  },
  {
    tag: "Phase 06",
    title: "Distant Sighting",
    caption:
      "Still unmistakably Hugo from miles away.",
    src: "assets/photos/gallery/hugo-distant-sighting.png",
    alt: "A distant photo of Hugo near a large white building at sunset.",
  },
  {
    tag: "Phase 07",
    title: "Breakfast",
    caption:
      "Orange juice. Full breakfast. Mild suspicion.",
    src: "assets/photos/gallery/hugo-breakfast-diplomacy.png",
    alt: "Hugo seated at breakfast holding a glass of orange juice and looking knowingly at the camera.",
  },
];

const panels = Array.from(document.querySelectorAll("[data-scene-panel]"));
const gallery = document.querySelector("[data-gallery]");
const beginButton = document.querySelector("[data-begin]");
const nextButtons = Array.from(document.querySelectorAll("[data-next]"));
const anthem = document.querySelector("[data-anthem]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxMedia = document.querySelector("[data-lightbox-media]");
const lightboxTitle = document.querySelector("[data-lightbox-title]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const closeButtons = document.querySelectorAll("[data-close]");

let ceremonyStarted = false;

function setScene(sceneName) {
  document.body.dataset.scene = sceneName;
  document.body.classList.toggle("is-gallery", sceneName === "gallery");

  if (sceneName !== "reveal") {
    anthem.pause();
    anthem.currentTime = 0;
  }

  panels.forEach((panel) => {
    const isActive = panel.dataset.scenePanel === sceneName;
    panel.hidden = !isActive;
    panel.classList.toggle("is-active", isActive);
  });

  window.scrollTo({ top: 0, behavior: "auto" });
}

function openLightbox(item) {
  lightboxTitle.textContent = item.title;
  lightboxCaption.textContent = item.caption;
  lightboxMedia.innerHTML = "";

  const image = document.createElement("img");
  image.src = item.src;
  image.alt = item.alt;
  lightboxMedia.append(image);

  lightbox.hidden = false;
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.classList.remove("lightbox-open");
}

function renderGallery() {
  gallery.innerHTML = "";

  galleryItems.forEach((item) => {
    const article = document.createElement("article");
    article.className = "memory";

    const frame = document.createElement("button");
    frame.className = "memory__frame";
    frame.type = "button";
    frame.setAttribute("aria-label", `Open ${item.title}`);

    const image = document.createElement("img");
    image.src = item.src;
    image.alt = item.alt;
    image.loading = "lazy";
    frame.append(image);
    frame.addEventListener("click", () => openLightbox(item));

    const meta = document.createElement("div");
    meta.className = "memory__meta";
    meta.innerHTML = `
      <span class="memory__tag">${item.tag}</span>
      <h3 class="memory__title">${item.title}</h3>
      <p class="memory__caption">${item.caption}</p>
    `;

    article.append(frame, meta);
    gallery.append(article);
  });
}

async function beginCeremony() {
  if (ceremonyStarted) {
    return;
  }

  ceremonyStarted = true;
  document.body.classList.add("is-ceremony-live");
  beginButton.disabled = true;
  beginButton.textContent = "Ceremony underway";

  try {
    anthem.volume = 0.45;
    anthem.currentTime = 0;
    await anthem.play();
  } catch (error) {}

  window.setTimeout(() => {
    beginButton.hidden = true;
    const nextRevealButton = document.querySelector('[data-next="intro"]');
    nextRevealButton.hidden = false;
  }, 2600);
}

function handleKeydown(event) {
  if (event.key === "Escape" && !lightbox.hidden) {
    closeLightbox();
  }
}

beginButton.addEventListener("click", beginCeremony);

nextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.next;
    if (target) {
      setScene(target);
    }
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeLightbox);
});

document.addEventListener("keydown", handleKeydown);

renderGallery();
setScene("reveal");
