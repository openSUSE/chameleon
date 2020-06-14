# Chameleon

openSUSE Design System for Web.

- Based on [Bootstrap 4](https://getbootstrap.com/)
- Extend [Remix Icon](https://remixicon.com/)
- Comply [openSUSE Brand Guidelines](https://opensuse.github.io/branding-guidelines/)
- Use graphics from [openSUSE Artwork](https://github.com/openSUSE/artwork)
- Combine [EOS Design System](https://opensuse.eosdesignsystem.com/)

## Use CDN

Chameleon asset files are hosted at <https://static.opensuse.org> to improve
webpage loading speed. This is the most recommended way to use Chameleon.

```html
<!-- Chameleon Style -->
<link
  rel="stylesheet"
  href="https://static.opensuse.org/chameleon-3.0/dist/css/chameleon.css"
/>

<!-- jQuery Slim -->
<script
  src="https://static.opensuse.org/chameleon-3.0/dist/js/jquery.slim.js"
  defer
></script>
<!-- Bootstrap Script -->
<script
  src="https://static.opensuse.org/chameleon-3.0/dist/js/bootstrap.bundle.js"
  defer
></script>
<!-- Chameleon Script -->
<script
  src="https://static.opensuse.org/chameleon-3.0/dist/js/chameleon.js"
  defer
></script>
```

## Use NPM

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

## Examples

Here are already several websites integrated with Chameleon.

- <https://news.opensuse.org>
- <https://en.opensuse.org/>
- <https://software.opensuse.org/>
