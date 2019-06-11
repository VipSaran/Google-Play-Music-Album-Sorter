// ==UserScript==
// @name          Google Play Music Album Sorter
// @description   Greasemonkey/Tampermonkey UserScript for extending Google Play Music with album sorting functionality
// @namespace     http://github.com/VipSaran/Google-Play-Music-Album-Sorter
// @updateURL     https://github.com/VipSaran/Google-Play-Music-Album-Sorter/raw/master/google_play_music_album_sorter.user.js
// @version       1.2.1
// @author        VipSaran
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @resource      sort_asc https://github.com/VipSaran/Google-Play-Music-Album-Sorter/raw/master/sort_asc.png
// @resource      sort_desc https://github.com/VipSaran/Google-Play-Music-Album-Sorter/raw/master/sort_desc.png
// @grant         GM_getResourceURL
// @include       http://play.google.com/music/listen*
// @include       https://play.google.com/music/listen*
// @include       http://music.google.com/music/listen*
// @include       https://music.google.com/music/listen*
// @match         http://play.google.com/music/listen*
// @match         https://play.google.com/music/listen*
// @match         http://music.google.com/music/listen*
// @match         https://music.google.com/music/listen*
// @run-at        document-end
// ==/UserScript==

var DEBUG = false;

var $ = window.jQuery;

function GooglePlayMusicAlbumSorter() {
  if (DEBUG) console.log('GooglePlayMusicAlbumSorter()');
}

GooglePlayMusicAlbumSorter.prototype.loadOrder = function () {
  if (DEBUG) console.log('GooglePlayMusicAlbumSorter.loadOrder()');
  return window.localStorage.getItem('order');
};

GooglePlayMusicAlbumSorter.prototype.saveOrder = function (order) {
  if (DEBUG) console.log('GooglePlayMusicAlbumSorter.saveOrder()');

  window.localStorage.setItem('order', order);
};

var sectionHeaderText = '';
var sortingInProgress = false;
var domModifiedTimeout;
var domModifiedCallback = function () {
  if (DEBUG) console.log('domModifiedCallback()');

  if (domModifiedTimeout) {
    clearTimeout(domModifiedTimeout);
  }

  var laneContent = $('#music-content .lane-content');
  if (DEBUG) console.log('laneContent=', laneContent);

  var sectionHeader = $('.header');
  if (sectionHeader) {
    sortingInProgress = true;

    var sortOrder = sorter.loadOrder() || 'asc';
    if (DEBUG) console.log('sortOrder=', sortOrder);

    // if (DEBUG) console.log('$(#gpmas_sorter)=', $('#gpmas_sorter').html());
    if ($('#gpmas_sorter').html() === undefined) {
      sectionHeader.append('<span id="gpmas_sorter" class="' + sortOrder + '" title="Sort"></span>');

      $('#gpmas_sorter').click(function (event) {
        var currClass = $(this).attr('class');
        if (DEBUG) console.log('gpmas_sorter click', currClass);

        $(this).toggleClass('asc desc');

        currClass = $(this).attr('class');
        if (DEBUG) console.log('gpmas_sorter click', currClass);

        sorter.saveOrder(currClass);

        domModifiedCallback();
      });
    }

    var albums = $("div").find("[data-type='album']").filter(':not(.player-album)');
    if (DEBUG) console.log('albums=', albums);

    albums.sort(function (a, b) {
      var aYear = $(a).find("a.sub-title").html();
      var bYear = $(b).find("a.sub-title").html();
      return sortOrder === 'asc' ? aYear - bYear : bYear - aYear;
    });

    laneContent.children("[data-type='album']").fadeOut("fast").promise().done(function () {
      laneContent.empty();

      for (var i = 0; albums.length > 0; i++) {
        var album = albums.get(0);
        albums.splice(0, 1);
        laneContent.append(album);
      }

      laneContent.children("[data-type='album']").each(function (i) {
        $(this).delay(i * 50).fadeIn("fast");
      });

      sortingInProgress = false;
    });
  }
};

GooglePlayMusicAlbumSorter.prototype.init = function () {
  if (DEBUG) console.log('GooglePlayMusicAlbumSorter.init()');

  $('head').append(
    '<style>\n' +
    '#gpmas_sorter {float: right; width: 40px; height: 40px; position: absolute; top: -5px; right: 0; cursor: pointer; background-repeat: no-repeat; background-position: center center;}\n' +
    '#gpmas_sorter.asc {background-image: url("' + GM_getResourceURL("sort_asc") + '");}\n' +
    '#gpmas_sorter.desc {background-image: url("' + GM_getResourceURL("sort_desc") + '");}\n' +
    '</style>'
  );

  // if (DEBUG) console.log($('#music-content .lane-content'));
  $('#music-content').bind("DOMNodeInserted", function (event) {
    if (DEBUG) console.log('DOMNodeInserted', event.target.nodeName);

    var element = $(event.target);
    if (!(element.hasClass('g-content') || element.hasClass('cluster'))) {
      return;
    }

    var sectionHeaderTitleText = $('.header .title').html();
    // if (DEBUG) console.log('sectionHeaderTitleText=', sectionHeaderTitleText);
    if (sectionHeaderTitleText !== 'Albums') {
      return;
    }

    if (domModifiedTimeout) {
      clearTimeout(domModifiedTimeout);
    }
    if (sortingInProgress) {
      return;
    }
    domModifiedTimeout = setTimeout(function () {
      domModifiedCallback();
    }, 500);

  });
};

var sorter = new GooglePlayMusicAlbumSorter();

$(document).ready(function () {
  sorter.init();
});