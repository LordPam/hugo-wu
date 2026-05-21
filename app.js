const photos = [
  {
    title: "The Arrival Shot",
    caption:
      "Reserved for the exact frame where Hugo enters the room looking more composed than everyone else.",
    src: "",
    layout: "feature",
    tone: "amber",
  },
  {
    title: "Candid, Allegedly",
    caption:
      "For the photo where he clearly noticed the camera but chose to let the moment play out anyway.",
    src: "",
    layout: "portrait",
    tone: "sage",
  },
  {
    title: "Museum-Grade Side Profile",
    caption:
      "One proper portrait belongs here so the joke never becomes cheap.",
    src: "",
    layout: "square",
    tone: "berry",
  },
  {
    title: "Evidence of Mischief",
    caption:
      "A strong home for the most incriminating funny image that is still birthday-safe.",
    src: "",
    layout: "landscape",
    tone: "dusk",
  },
  {
    title: "The Group Photo He Didn't Escape",
    caption:
      "For the rare case in which the photographer is successfully trapped in the frame.",
    src: "",
    layout: "portrait",
    tone: "gold",
  },
  {
    title: "Last Shot of the Night",
    caption:
      "Something warm, slightly chaotic, and conclusive enough to end the gallery well.",
    src: "",
    layout: "landscape",
    tone: "clay",
  },
];

const gallery = document.querySelector("[data-gallery]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxMedia = document.querySelector("[data-lightbox-media]");
const lightboxTitle = document.querySelector("[data-lightbox-title]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const closeButtons = document.querySelectorAll("[data-close]");

function createPlaceholder(photo, index, className) {
  const placeholder = document.createElement("div");
  placeholder.className = `${className} tone-${photo.tone}`;

  const label = document.createElement("span");
  label.className = "photo-card__placeholder-label";
  label.textContent = `Slot ${String(index + 1).padStart(2, "0")}`;

  const title = document.createElement("strong");
  title.textContent = photo.title;

  placeholder.append(label, title);
  return placeholder;
}

function renderCard(photo, index) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = `photo-card photo-card--${photo.layout}`;
  card.setAttribute("aria-label", `Open ${photo.title}`);
  card.dataset.index = String(index);

  const media = document.createElement("div");
  media.className = "photo-card__media";

  if (photo.src) {
    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.title;
    img.loading = "lazy";
    img.addEventListener(
      "error",
      () => {
        media.replaceChildren(createPlaceholder(photo, index, "photo-card__placeholder"));
      },
      { once: true }
    );
    media.append(img);
  } else {
    media.append(createPlaceholder(photo, index, "photo-card__placeholder"));
  }

  const meta = document.createElement("div");
  meta.className = "photo-card__meta";
  meta.innerHTML = `<h3>${photo.title}</h3><p>${photo.caption}</p>`;

  card.append(media, meta);
  card.addEventListener("click", () => openLightbox(index));

  return card;
}

function openLightbox(index) {
  const photo = photos[index];
  lightboxTitle.textContent = photo.title;
  lightboxCaption.textContent = photo.caption;
  lightboxMedia.replaceChildren();

  if (photo.src) {
    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.title;
    img.addEventListener(
      "error",
      () => {
        lightboxMedia.replaceChildren(
          createPlaceholder(photo, index, "lightbox__placeholder")
        );
      },
      { once: true }
    );
    lightboxMedia.append(img);
  } else {
    lightboxMedia.append(createPlaceholder(photo, index, "lightbox__placeholder"));
  }

  lightbox.hidden = false;
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.classList.remove("lightbox-open");
}

function handleKeydown(event) {
  if (event.key === "Escape" && !lightbox.hidden) {
    closeLightbox();
  }
}

photos.forEach((photo, index) => {
  gallery.append(renderCard(photo, index));
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeLightbox);
});

document.addEventListener("keydown", handleKeydown);
