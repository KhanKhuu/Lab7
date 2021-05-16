// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
  .then(response => response.json())
  .then(entries => {
    let i = 1;
    entries.forEach(entry => {  
      let newPost = document.createElement('journal-entry');
      newPost.entry = entry;
      newPost.id = i;
      newPost.addEventListener('click', () => {
        document.body.classList.add('single-entry');
        let pageTitle = document.querySelector('h1');
        pageTitle.innerHTML = 'Entry ' + newPost.id;
        let entryPageElement = document.querySelector('entry-page');
        entryPageElement.remove();
        let newEntry = document.createElement('entry-page');
        newEntry.entry = newPost.entry;
        document.querySelector('body').appendChild(newEntry);
        history.pushState({page: 'entry' + newPost.id}, 'entry' + newPost.id, "#entry" + newPost.id);
      })
      ++i;
      document.querySelector('main').appendChild(newPost);
    });
  });
});
