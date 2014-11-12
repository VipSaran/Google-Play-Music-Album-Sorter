// ==UserScript==
// @name           Google Play Music Album Sorter
// @description    Greasemonkey/Tampermonkey user script for adding sorting functionality to Google Play Music
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
}

GooglePlayMusicAlbumSorter.prototype.loadOrder = function() {
  if (DEBUG) console.log('GooglePlayMusicAlbumSorter.loadOrder()');
  return window.localStorage.getItem('order');
};

GooglePlayMusicAlbumSorter.prototype.saveOrder = function(order) {
  if (DEBUG) console.log('GooglePlayMusicAlbumSorter.saveOrder()');

  window.localStorage.setItem('order', order);
};

GooglePlayMusicAlbumSorter.prototype.init = function() {
  if (DEBUG) console.log('GooglePlayMusicAlbumSorter.init()');

  $('.artist-view').bind("DOMSubtreeModified", function() {
    alert('changed');
  });

  $('.artist-view').bind("DOMNodeInserted DOMNodeRemoved", function() {
    alert('changed 2');
  });

  this.order = this.loadOrder() || 'asc';
  console.log('this.order=', this.order);
  this.saveOrder('desc');
};

GooglePlayMusicAlbumSorter.prototype.sort = function() {
  if (DEBUG) console.log('GooglePlayMusicAlbumSorter.sort()');

  var header = '<div class="section-header">Albums</div>';

  var albums = $("div").find("[data-type='album']");
  console.log('children #: ', albums.length);

  var albumsParent = albums.first().parent();
  console.log('albumsParent=', albumsParent);
};

var sorter = new GooglePlayMusicAlbumSorter();

$(document).ready(function() {
  sorter.init();
  // console.log(new Date().getTime());
  setTimeout(function() {
    // console.log(new Date().getTime());
    sorter.sort();
  }, 7000);
});