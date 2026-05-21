const galleryItems = [
  {
    tag: "Observed Phase 01",
    title: "Condiment Diplomacy",
    caption:
      "One witness brought ketchup. Another brought a drink. Hugo brought a look that suggests he already knew this website was coming.",
    src: "assets/photos/gallery/hugo-golf-portrait.png",
    alt: "Hugo standing beside a friend in a restaurant while someone drinks from a glass.",
  },
  {
    tag: "Observed Phase 02",
    title: "The Formalwear Incident",
    caption:
      "A serious pose, a chaotic room, and a level of commitment that the surrounding laundry refused to match.",
    src: "assets/photos/gallery/hugo-fairway-alliance.png",
    alt: "Hugo posing in a dark coat and pink shoes in a messy bedroom.",
  },
  {
    tag: "Observed Phase 03",
    title: "Uncontrolled Selfie Conditions",
    caption:
      "A photograph that answers no questions and somehow creates at least six new ones.",
    src: "assets/photos/gallery/hugo-chaos-selfie.png",
    alt: "A selfie with Hugo and friends outdoors, with Hugo making a dramatic face.",
  },
  {
    tag: "Observed Phase 04",
    title: "Three-Man Scramble",
    caption:
      "Proof that Hugo can stand on a coastline, hold a putter, and accidentally look like part of a campaign poster.",
    src: "assets/photos/gallery/hugo-three-man-scramble.png",
    alt: "Hugo and two friends posing on a golf course by the sea.",
  },
  {
    tag: "Observed Phase 05",
    title: "Beach Golf Era",
    caption:
      "Some people acquire hobbies. Hugo appears to acquire full landscapes.",
    src: "assets/photos/gallery/hugo-beach-golf.png",
    alt: "Hugo standing on a golf course by the sea with a golf bag nearby.",
  },
  {
    tag: "Observed Phase 06",
    title: "Distant Sighting at Sunset",
    caption:
      "A tiny figure near a huge building, and still somehow unmistakably Hugo.",
    src: "assets/photos/gallery/hugo-distant-sighting.png",
    alt: "A distant photo of Hugo near a large white building at sunset.",
  },
  {
    tag: "Observed Phase 07",
    title: "Breakfast Diplomacy",
    caption:
      "A polite glass of orange juice and the face of a man who knows he is being documented.",
    src: "assets/photos/gallery/hugo-breakfast-diplomacy.png",
    alt: "Hugo seated at breakfast holding a glass of orange juice and looking knowingly at the camera.",
  },
];

const panels = Array.from(document.querySelectorAll("[data-scene-panel]"));
const gallery = document.querySelector("[data-gallery]");
const beginButton = document.querySelector("[data-begin]");
const nextButtons = Array.from(document.querySelectorAll("[data-next]"));
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeLabel = document.querySelector("[data-theme-label]");
const anthem = document.querySelector("[data-anthem]");
const audioHint = document.querySelector("[data-audio-hint]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxMedia = document.querySelector("[data-lightbox-media]");
const lightboxTitle = document.querySelector("[data-lightbox-title]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const closeButtons = document.querySelectorAll("[data-close]");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)");

let ceremonyStarted = false;

function getEffectiveTheme() {
  const explicitTheme = document.documentElement.dataset.theme;
  if (explicitTheme === "light" || explicitTheme === "dark") {
    return explicitTheme;
  }
  return prefersLight.matches ? "light" : "dark";
}

function updateThemeLabel() {
  const nextTheme = getEffectiveTheme() === "dark" ? "light" : "dark";
  themeLabel.textContent = `Switch to ${nextTheme}`;
  themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
}

function applyStoredTheme() {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    document.documentElement.dataset.theme = storedTheme;
  }
  updateThemeLabel();
}

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
  audioHint.hidden = true;

  try {
    anthem.volume = 0.45;
    anthem.currentTime = 0;
    await anthem.play();
  } catch (error) {
    audioHint.textContent =
      "Add an MP3 named assets/audio/chinese-anthem.mp3 if you want the anthem to play during this opening scene.";
    audioHint.hidden = false;
  }

  window.setTimeout(() => {
    beginButton.hidden = true;
    const nextRevealButton = document.querySelector('[data-next="intro"]');
    nextRevealButton.hidden = false;
  }, 4200);
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

themeToggle.addEventListener("click", () => {
  const nextTheme = getEffectiveTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("theme", nextTheme);
  updateThemeLabel();
});

prefersLight.addEventListener("change", () => {
  if (!localStorage.getItem("theme")) {
    updateThemeLabel();
  }
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeLightbox);
});

document.addEventListener("keydown", handleKeydown);

applyStoredTheme();
renderGallery();
setScene("reveal");
