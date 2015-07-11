<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Google-Play-Music-Album-Sorter](#google-play-music-album-sorter)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Limitations](#limitations)
  - [To-Do](#to-do)
  - [Changelog](#changelog)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Google-Play-Music-Album-Sorter

Greasemonkey/Tampermonkey UserScript for extending Google Play Music with album sorting functionality.

Ascending and descending orders are supported, with last used being remembered.

**Before:**

![ScreenShot](GPM_Albums_default.png?raw=true "Default Albums view")

**After:**

![ScreenShot](GPM_Albums_sorted.png?raw=true "Sorted Albums view")

## Prerequisites

To be able to employ the UserScript, your browser needs to have corresponding extensions installed:

 - Chrome: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
 - Firefox: [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)


## Installation

Once your browser is equipped with appropriate extension, simply open [this link](https://github.com/VipSaran/Google-Play-Music-Album-Sorter/raw/master/google_play_music_album_sorter.user.js). The extension should recognize the script and offer you to install it.


## Limitations

 - works only on standalone "Albums" view
 - sorts only by album year


## To-Do

 - after sorting by year, also sort by name (in same order)
 - switch between year and name sorting

## Changelog

1.1.2

 - fix for parsing non-Albums sections

1.1.1

 - adapted to material design GPM

1.0.1

 - adapted to content div id change
