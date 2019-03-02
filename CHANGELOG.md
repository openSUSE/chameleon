# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unrelease]

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

## 1.0.0 - 2018-09-26

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

[unreleased]: https://github.com/openSUSE/opensuse-theme-chameleon/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/openSUSE/opensuse-theme-chameleon/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/openSUSE/opensuse-theme-chameleon/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/openSUSE/opensuse-theme-chameleon/compare/v1.0.0...v1.1.0
