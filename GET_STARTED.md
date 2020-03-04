# Get Started

## CDN

Chameleon asset files are hosted at <https://static.opensuse.org> to improve
webpage loading speed. This is the most recommended way to use Chameleon.

```html
<!-- Chameleon Style -->
<link
  rel="stylesheet"
  href="https://static.opensuse.org/chameleon-2.0/dist/css/chameleon.css"
/>

<!-- Chameleon Script Bundled with jQuery and Bootstrap -->
<script
  src="https://static.opensuse.org/chameleon-2.0/dist/js/chameleon.js"
  defer
></script>
```

If the website (WordPress, MediaWiki, etc.) already provides jQuery:

```html
<!-- Chameleon Script Bundled with Bootstrap -->
<script
  src="https://static.opensuse.org/chameleon-2.0/dist/js/chameleon-no-jquery.js"
  defer
></script>
```

If the website (for Weblate, etc.) already provides jQuery and Bootstrap 4:

```html
<!-- Chameleon Script -->
<script
  src="https://static.opensuse.org/chameleon-2.0/dist/js/chameleon-no-bootstrap.js"
  defer
></script>
```

## NPM

If the website requires a lot of SaSS variables and mixins from Chameleon and
Bootstrap, then you need to install the package locally.

```bash
npm install --save @opensuse/chameleon
```

Here are different build system you can use: Webpack, Gulp, Grunt, Rollup. But
ways to import SCSS and JS files are similiar.

```scss
// SCSS
@import "@opensuse/chameleon";
```

```js
// CJS
require("@opensuse/chameleon");
// ES6
import "@opensuse/chameleon";
```

## Files

- **dist**: compiled styles, scripts and images
  - **css**: compiled styles
    - **chameleon.css**: main style
    - **chameleon.css.map**: source map for debugging
  - **js**: compiled scripts
    - **chameleon.js**: bundled with jQuery and Bootstrap
    - **chameleon-no-jquery.js**: bundled with Bootstrap but not jQuery
    - **chameleon-no-bootstrap.js**: bundled with neither Bootstrap nor jQuery
- **lib**: only used by the Chameleon website
- **src**: source icons, svgs, sass and js
  - **icons**: icons in svg format, extending Remix Icon
    - **sprite.svg**: compiled svg sprite. it is then compiled to `src/js/data/sprite.js`
  - **images**: other images from openSUSE/artwork repo
  - **js**: source scripts
  - **langs**: translation files in JSON format. mainly for mega menu.
  - **pug**: generate Chameleon website pages
  - **sass**: sass files
    - **wiki**: style patches for MediaWiki
- **\*.html**: Chameleon website pages

## Examples

Here are already several websites integrated with Chameleon.

- [Wikis](https://en.opensuse.org/) ([code](https://github.com/openSUSE/wiki/tree/master/skins/Chameleon)): MediaWiki, use CDN
- [Software](https://software.opensuse.org/) ([code](https://github.com/openSUSE/software-o-o)): Ruby On Rails, out-dated Ruby Gem package
