# Hugo Birthday Site

This is a static GitHub Pages site for `hugo-wu.com`. No build step, no framework, and no CMS.

## Structure

- `index.html`: the three-scene journey
- `styles.css`: theme, animation, layout, and lightbox styles
- `app.js`: scene switching, theme toggle, anthem playback, and gallery rendering
- `assets/photos/gallery/`: the published Hugo photo set used by the archive scene
- `assets/audio/`: optional anthem audio file location
- `CNAME`: custom domain for GitHub Pages

## Current Flow

1. Opening ceremony:
   `Happy birthday, pookie.` with the animated flag.
2. Intro scene:
   a short message about the site being able to change over time.
3. Archive scene:
   the photo sequence plus the closing birthday quote.

## Anthem Audio

If you want the opening scene to play audio, add this file:

```text
assets/audio/chinese-anthem.mp3
```

The site already attempts to play it on the first button click. If the file is missing, the opening still works silently.

## Photos

The live archive currently uses the files in `assets/photos/gallery/`.

If you want to swap or add images:

1. Put the replacement image in `assets/photos/gallery/`.
2. Update the matching entry in `app.js`.
3. Commit and push to `main`.

Temporary preview files are ignored through `.gitignore`.

## GitHub Pages

- Repo: `https://github.com/LordPam/hugo-wu`
- Branch: `main`
- Folder: `/(root)`
- Custom domain: `hugo-wu.com`
