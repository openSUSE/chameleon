# Get Started

## CDN

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

- **dist/**: compiled styles, scripts and images
  - **css/**: compiled styles
    - **chameleon.css**: chameleon style
  - **js/**: compiled scripts
    - **chameleon.js**: chameleon script
    - **jquery.slim.js**: jQuery without some uncommon modules
    - **bootstrap.bundle.js**: Bootstrap with Popper.js
    - **\*.js**: individual components
- **src/**: source icons, svgs, sass and js
  - **icons/**: icons in svg format, extending Remix Icon
    - **\*.svg**: icon svg files
    - **sprite.svg**: compiled svg sprite. it is then compiled to `src/js/data/sprite.js`
  - **images/**: other images from openSUSE/artwork repo
  - **js/**: source scripts
    - **components/**: invidual components
    - **data/**: data files
    - **util/**: shared utility functions
    - **wiki/**: wiki related scripts
  - **langs/**: translation files in JSON format. mainly for mega menu.
  - **sass/**: sass files
    - **dark-mode/**: dark mode style
    - **wiki/**: style patches for wikis

## Examples

Here are already several websites integrated with Chameleon.

| Site                           | Code                                     | Software      | Chameleon Version |
| ------------------------------ | ---------------------------------------- | ------------- | ----------------- |
| https://news.opensuse.org/     | https://github.com/openSUSE/news-o-o     | Jekyll        | v2.0              |
| https://en.opensuse.org/       | https://github.com/openSUSE/wiki         | MediaWiki     | v2.0              |
| https://software.opensuse.org/ | https://github.com/openSUSE/software-o-o | Ruby On Rails | v1.0              |
