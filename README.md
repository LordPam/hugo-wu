# Hugo Birthday Site

This is a plain static GitHub Pages site for `hugo-wu.com`. No build step, no framework, and no CMS.

## Files

- `index.html`: page structure
- `styles.css`: site design
- `app.js`: gallery data and lightbox behavior
- `assets/photos/`: place image files here
- `CNAME`: custom domain for GitHub Pages

## How to add real photos

1. Put your image files in `assets/photos/`.
2. Open `app.js`.
3. For each gallery entry, replace `src: ""` with a real path such as:

```js
src: "assets/photos/hugo-party-01.jpg",
```

4. Update the `title` and `caption` text if you want.
5. Commit and push to `main`.

## Recommended image approach

- Use 6 to 10 strong images, not dozens.
- Mix one or two sincere portraits with the funnier shots.
- Keep file names simple: lowercase, hyphens, no spaces.

## GitHub Pages

- Repo: `https://github.com/LordPam/hugo-wu`
- Branch: `main`
- Folder: `/(root)`
- Custom domain: `hugo-wu.com`
