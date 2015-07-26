/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  
  // Configure app parameters here
  app.backendUrl = 'https://script.google.com/macros/s/AKfycbxFBtNjlSqUBKN0Y2SDZLl4V1k7_p0qOxnpmk6IDLBT9BFt11f-/exec';
  app.folders = [{folderId: '0B9SGRkeQnLXyfnByZGMtYjJxZHB3ZE51QTNWQWtsaU8zLVFWZ01nLUZfUUJPWVVBcXJNNkE', title: 'Conference Resources'},
                 {folderId: '0B9SGRkeQnLXyflhrcG1VMU1VWFRIeFNSWjh1SDdWVmUtdFltSFYwYzRCOFlPODNhREtDTVU', title: 'Background Guides'}];
  //Optional settings, comment/remove lines if not needed 
  app.aboutFileId = 'linkToWeb';
  app.socials = [{'name':'Facebook',
                   'url':'http://facebook.com/uirimal'},
                 {'name':'Twitter',
                   'url':'https://www.twitter.com/uirimal'},
                 {'name':'Google +',
                   'url':'https://plus.google.com/+UIRIMAL'},
                 {'name':'YouTube',
                   'url':'https://www.youtube.com/c/UIRIMAL'}
                ];
  
  // Bound to the main headed panel title 
  app.blogTitle = 'Delegate Resources';
  app.showSocials = (app.socials && app.socials.length > 0);

  app.displayInstalledToast = function() {
    document.querySelector('#caching-complete').show();
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock&roll !!!');
  });

  // Close drawer after menu item is selected if drawerPanel is narrow
  app.onMenuSelect = function() {
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };
  
  app.toggleSocialCollapse = function() {
    document.querySelector('#socialSubmenu').toggle();
  };
  
  app._forceRefresh = function(event){
    document.querySelector('articles-list').refreshList(event);
  };
  
  app._getArticle = function(articleId, articleList) {
    var article = {};
    if (articleList) {
      articleList.some(function(item) {
        if (item.id === articleId) {
          article = item;
          //Set the Title of the page
          app.title = article.title;
          return true;
        }
        return false;
      });
    }
    return article;
  };
  app._articleUrl = function(articleId, articleList){
    var article = null;
    if (articleList) {
      articleList.some(function(item) {
        if (item.id === articleId) {
          article = item;
          //Set the Title of the page
          app.title = article.title;
          return true;
        }
        return false;
      });
    }
    if (article){
      return app._getUrl(article.id);
    }
  };
  app._getUrl = function(id) {
    return 'https://docs.google.com/document/d/' + id + '/pub?embedded=true';
  };

})(document);
