# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] - 2018-08-01

Implemented usage of `__hotClientOptions__` in the same manner as `webpack-hot-client`,
making this package pretty much feature-complete, as it now works in nearly the same as
the old overlay. v1 will likely be released soon after, with no expected changes.

### Changed
 - The `errorOverlay` now uses `__hotClientOptions__` in the same manner as `webpack-hot-client` to get
 the WebSocket url to connect to `webpack-serve`.

## [0.2.2] - 2018-06-30

`README.md` adjustments & `npm unpublish` re-publish.

## [0.2.1] - 2018-06-30

This bug fix release doesn't actually change any code.
Instead it changes the insertion method recommended by the `README.md`
as it was discovered the overlay prevents hot-reload from refreshing the page
if it's included as an entry.

See issue [#5] for more information.  

## [0.2.0] - 2018-06-30

### Added
 - Ability to provide WebSocket url via `WEBPACK_SERVE_OVERLAY_WS_URL` env property. ([45db16e])

## [0.1.0] - 2018-06-30

### Added
 - Initial commit

[Unreleased]: https://github.com/g-rath/webpack-serve-overlay/compare/v0.3.0...HEAD

[0.3.0]: https://github.com/g-rath/webpack-serve-overlay/compare/v0.2.2...v0.3.0
[0.2.2]: https://github.com/g-rath/webpack-serve-overlay/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/g-rath/webpack-serve-overlay/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/g-rath/webpack-serve-overlay/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/g-rath/webpack-serve-overlay/compare/v0.0.0...v0.1.0

[45db16e]: https://github.com/g-rath/webpack-serve-overlay/commit/45db16e

[#5]: https://github.com/g-rath/webpack-serve-overlay/issues/5
