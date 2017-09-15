

let button = document.getElementById('searchSubmit')
let url = 'https://itunes.apple.com/search?media=music&term=';
let results = document.querySelector('.displayedResults');
let musicPlayer = document.querySelector('.audioPlayer');
let form = document.querySelector('.searchForm');

form.addEventListener('click', function(thingy) {
  let searchTerm = document.getElementById('searchCont');
  thingy.preventDefault();
  let searchValue = searchTerm.value;
  zearching(searchValue);
});

function zearching(searchValue) {
  fetch(url + searchValue)
    .then(function(response) {
      if (response.status !== 200) {
        console.log('Issue processing your search- try again later. Status Code: ' + response.status);
        return;
      }
      response.json().then(function(data) {
        results.innerHTML = '';
        for (let i = 0; i < data.results.length; i++) {
          let image = data.results[i].artworkUrl100;
          let songInfo = document.createElement('div');
          results.appendChild(songInfo)
          songInfo.classList.add('return')
          let audio = data.results[i].previewUrl
          results.addEventListener('click', function() {
            musicPlayer.src = audio;
          });
          let template = `
            <img src="${image}" alt="Album Art">
            <h3>${data.results[i].trackName}</h3>
            `
          songInfo.innerHTML += template;
        }
      });
    });
}
