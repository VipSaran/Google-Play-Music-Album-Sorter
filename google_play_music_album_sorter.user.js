// ==UserScript==
// @name           Google Play Music Album Sorter
// @description    Greasemonkey/Tampermonkey UserScript for extending Google Play Music with album sorting functionality
// @namespace      http://github.com/VipSaran/Google-Play-Music-Album-Sorter
// @updateURL      https://github.com/VipSaran/Google-Play-Music-Album-Sorter/raw/master/google_play_music_album_sorter.user.js
// @version        0.1
// @author         VipSaran
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include        http://play.google.com/music/listen*
// @include        https://play.google.com/music/listen*
// @include        http://music.google.com/music/listen*
// @include        https://music.google.com/music/listen*
// @match          http://play.google.com/music/listen*
// @match          https://play.google.com/music/listen*
// @match          http://music.google.com/music/listen*
// @match          https://music.google.com/music/listen*
// @run-at         document-end
// ==/UserScript==

var DEBUG = true;

function GooglePlayMusicAlbumSorter() {
  if (DEBUG) console.log('GooglePlayMusicAlbumSorter()');

  this.order = this.loadOrder() || 'asc';
  if (DEBUG) console.log('this.order=', this.order);
}

GooglePlayMusicAlbumSorter.prototype.loadOrder = function() {
  if (DEBUG) console.log('GooglePlayMusicAlbumSorter.loadOrder()');
  return window.localStorage.getItem('order');
};

GooglePlayMusicAlbumSorter.prototype.saveOrder = function(order) {
  if (DEBUG) console.log('GooglePlayMusicAlbumSorter.saveOrder()');

  window.localStorage.setItem('order', order);
};

var sortingInProgress = false;
var domModifiedTimeout;
var domModifiedCallback = function() {
  if (DEBUG) console.log('domModifiedCallback()');

  if (domModifiedTimeout) {
    clearTimeout(domModifiedTimeout);
  }

  var albums = $("div").find("[data-type='album']");
  var albumsParent = albums.first().parent();
  if (albumsParent && albumsParent.hasClass('artist-view')) {
    if (DEBUG) console.log('albumsParent=', albumsParent);
    var firstSibling = albums.first().siblings().first();
    if (firstSibling && firstSibling.hasClass('section-header')) {
      sortingInProgress = true;

      if (DEBUG) console.log('albums=', albums);
      albums.sort(function(a, b) {
        var aYear = $(a).find("a.sub-title").html();
        var bYear = $(b).find("a.sub-title").html();
        return sorter.order === 'asc' ? aYear - bYear : bYear - aYear;
      });

      albumsParent.empty();
      albumsParent.append('<div class="section-header">Albums</div>');
      $.each(albums, function(i, album) {
        // if (DEBUG) console.log('each', i, album);
        albumsParent.append(album);
      });

      sortingInProgress = false;
    }
  }
};

GooglePlayMusicAlbumSorter.prototype.init = function() {
  if (DEBUG) console.log('GooglePlayMusicAlbumSorter.init()');

  // $('#content').bind("DOMSubtreeModified", function() {
  $('#content').bind("DOMNodeInserted DOMNodeRemoved", function() {
    if (DEBUG) console.log('DOMNodeInserted DOMNodeRemoved');

    if (domModifiedTimeout) {
      clearTimeout(domModifiedTimeout);
    }
    if (sortingInProgress) {
      return;
    }
    domModifiedTimeout = setTimeout(function() {
      domModifiedCallback();
    }, 1000);

  });
};

var sorter = new GooglePlayMusicAlbumSorter();

$(document).ready(function() {
  sorter.init();
});