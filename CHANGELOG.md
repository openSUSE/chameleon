# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## Added

- icon: add bootstrap-icons

## Changed

- bootstrap: update to 4.5.0
- js: `jquery.js` and `bootstrap.js` are not bundled anymore **BREAKING CHANGE**
- js,icon: optimize size
- js,css: new megamenu design

## Removed

- icon: remove _remix icon_ **BREAKING CHANGE**

## Fixed

- css: table colors in dark mode

## [2.0.0] - 2020-03-04

### Added

- gulp, js: individual component js files
- gulp, js: split wiki js into chameleon-wiki.js
- gulp, css: split wiki js into chameleon-wiki.css
- icon: _Remix Icon_ with openSUSE additional icons
- css: dark mode
- css,js: megamenu component
- css,js: table of content (toc) component
- l10n: more translations and language codes support
- wiki: heading anchors and edit buttons with icons

### Chagned

- npm: update bootstrap to 4.4.1
- gulp: don't minify/uglify css and js, so the code is more human readable
- font: use _Source Sans Pro_ and _Source Code Pro_ fonts
- css: disable border-radius
- css: colors follow [openSUSE Design System](https://opensuse.eosdesignsystem.com/colors)
- css: alert
- css: dropdown

### Removed

- icon: _Typicons_. **BREAKING CHANGE**: use _Remix Icon_ instead
- font: removed _Open Sans_ fonts. Use _Source Sans Pro_ instead

## [1.3.0] - 2019-03-02

### Added

- German translation.
- Russian translation.
- Japanese translation.
- Remove `google-group` string in translation.
- `.pre` helper class for wiki.

### Changed

- Drop jQuery from localization scripts.

### Fixed

- `npm audit fix`.

## [1.2.0] - 2018-11-24

### Added

- Wiki styles and scripts are moved to this theme.

### Changed

- Use `font-diaplay: auto;` to render text faster.

## [1.1.1] - 2018-09-30

### Fixed

- Loading remote Open Sans fonts even if it is available in system.

## [1.1.0] - 2018-09-30

### Added

- Enable Traditional Chinese, Brazilian Portuguese translations.

### Changed

- Language auto detection and language select rendering is executed only when
  needed.

### Fixed

- A bug that causes lang attribute changed by JavaScript in wiki.

## [1.0.0] - 2018-09-26

### Added

- Based on Bootstrap 4.1.1.
- Typicons.
- Implemented [openSUSE Brand Guideline](https://opensuse.github.io/branding-guidelines/).
- Gulp, SaSS and Browserify configuration.
- Translation support for footer and header.
- Simplified Chinese translation from openSUSE contributors.
- Traditional Chinese translation from openSUSE contributors.
- Brazilian Portuguese translation from openSUSE contributors.
- Detailed README for using it in other openSUSE projects.

[unreleased]: https://github.com/openSUSE/chameleon/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/openSUSE/chameleon/compare/v1.3.0...v2.0.0
[1.3.0]: https://github.com/openSUSE/chameleon/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/openSUSE/chameleon/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/openSUSE/chameleon/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/openSUSE/chameleon/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/openSUSE/chameleon/releases/tag/v1.0.0
