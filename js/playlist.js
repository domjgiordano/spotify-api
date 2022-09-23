

let access_token = "";
let refresh_token = "";
let songJson = {};
let songAttrJson = {};
const maxGenres = 25;

export const renderPage = function() {
    return `<section class="hero is-success is-fullheight">
    <!-- Hero head: will stick at the top -->
    <div class="hero-head has-background-black-bis">
      <header class="navbar">
        <div class="container has-background-black-bis">
          <div id="navbarMenuHeroC" class="navbar-menu has-background-black-bis">
            <div class="navbar-start">
            <a class="navbar-item" onclick="location.href='http://localhost:8080/api/user?access_token=${access_token}&refresh_token=${refresh_token}'">
              Home
            </a>
            <a class="navbar-item" onclick="location.href='http://localhost:8080/api/songs?access_token=${access_token}&refresh_token=${refresh_token}'">
              Top Songs
            </a>
            <a class="navbar-item" onclick="location.href='http://localhost:8080/api/artists?access_token=${access_token}&refresh_token=${refresh_token}'">
              Top Artists
            </a>
            <a class="navbar-item" onclick="location.href='http://localhost:8080/api/genres?access_token=${access_token}&refresh_token=${refresh_token}'">
              Top Genres
            </a>
            <a class="navbar-item is-active" onclick="location.href='http://localhost:8080/api/playlist?access_token=${access_token}&refresh_token=${refresh_token}'">
              Playlist Generator
            </a>
          </div>
          </div>
        </div>
      </header>
    </div>

    <div class="hero-body">

      <div id="main" class="container has-text-centered">
        <p class="title is-1">Select Filters</p>
        <div id="filterValues" class="columns is-multiline">
            <div class="column is-one-quarter">
              <div class="column is-half>
                <p class="subtitle is-4" style="text-align: center">Danceability</p>
                MIN: <input id="danceMin" class="input is-rounded is-normal is-link" min="0.00" max="1.00" value="0.00" type="number"><br>
                MAX: <input id="danceMax" class="input is-rounded is-normal is-link" min="0.00" max="1.00" value="1.00" type="number">
              </div>
              <div class="column is-half>
                <p class="subtitle is-4" style="text-align: center">Loudness</p>
                MIN <input id="loudMin" class="input is-rounded is-normal is-link" min="-60.00" max="0.00" value="-60.00" type="number"><br>
                MAX <input id="loudMax" class="input is-rounded is-normal is-link" min="-60.00" max="0.00" value="0.00" type="number">
              </div>
            </div>
            <div class="column is-one-quarter">
              <div class="column is-half>
                <p class="subtitle is-4" style="text-align: center">Tempo</p>
                MIN: <input id="tempoMin" class="input is-rounded is-normal is-link" min="0" max="200" value="0" type="number"><br>
                MAX: <input id="tempoMax" class="input is-rounded is-normal is-link" min="0" max="200" value="200" type="number">
              </div>
              <div class="column is-half>
                <p class="subtitle is-4" style="text-align: center">Energy</p>
                MIN <input id="energyMin" class="input is-rounded is-normal is-link" min="0.00" max="1.00" value="0" type="number"><br>
                MAX <input id="energyMax" class="input is-rounded is-normal is-link" min="0.00" max="1.00" value="1.00" type="number">
              </div>
            </div>
            <div class="column is-one-quarter">
              <div class="column is-half>
                <p class="subtitle is-4" style="text-align: center">Instrumentalness</p>
                MIN: <input id="instruMin" class="input is-rounded is-normal is-link" min="0.00" max="1.00" value="0" type="number"><br>
                MAX: <input id="instruMax" class="input is-rounded is-normal is-link" min="0.00" max="1.00" value="1.00" type="number">
              </div>
              <div class="column is-half>
                <p class="subtitle is-4" style="text-align: center">Valence</p>
                MIN: <input id="valenceMin" class="input is-rounded is-normal is-link" min="0.00" max="1.00" value="0" type="number"><br>
                MAX: <input id="valenceMax" class="input is-rounded is-normal is-link" min="0.00" max="1.00" value="1.00" type="number">
              </div>
            </div>
            <div class="column is-one-quarter">
              <div class="column is-half>
                <p class="subtitle is-4" style="text-align: center">Acousticness</p>
                MIN: <input id="acoustMin" class="input is-rounded is-normal is-link" min="0.00" max="1.00" value="0" type="number"><br>
                MAX: <input id="acoustMax" class="input is-rounded is-normal is-link" min="0.00" max="1.00" value="1.00" type="number">
              </div>
              <div class="column is-half>
                <p class="subtitle is-4" style="text-align: center">Popularity</p>
                MIN: <input id="popMin" class="input is-rounded is-normal is-link" min="0" max="100" value="0" type="number"><br>
                MAX: <input id="popMax" class="input is-rounded is-normal is-link" min="0" max="100" value="100" type="number">
              </div>
            </div>
            <div class="column is-half">
              <p class="subtitle is-4" style="text-align: center">Saved to Library Date:</p>
            </div>
            <div class="column is-half">
              <p class="subtitle is-4" style="text-align: center">Song Creation Date:</p>
            </div>
              <div class="column is-one-quarter">
                MIN Date: <input id="minMonthSaved" class="input is-rounded is-normal is-link" min="1" max="12" value="1" type="number">
                <input id="minYearSaved" class="input is-rounded is-normal is-link" min="1900" max="2022" value="1900" type="number">
              </div>
              <div class="column is-one-quarter">
                MAX Date: <input id="maxMonthSaved" class="input is-rounded is-normal is-link" min="1" max="12" value="12" type="number">
                <input id="maxYearSaved" class="input is-rounded is-normal is-link" min="1900" max="2022" value="2022" type="number">
              </div>
              <div class="column is-quarter">
                MIN Date: <input id="minMonthCreated" class="input is-rounded is-normal is-link" min="1" max="12" value="1" type="number">
                <input id="minYearCreated" class="input is-rounded is-normal is-link" min="1900" max="2022" value="1900" type="number">
              </div>
              <div class="column is-one-quarter">
                MAX Date: <input id="maxMonthCreated" class="input is-rounded is-normal is-link" min="1" max="12" value="12" type="number">
                <input id="maxYearCreated" class="input is-rounded is-normal is-link" min="1900" max="2022" value="2022" type="number">
              </div>
            </div>




            <div id="genreCheckBoxes" class="column is-full">
            </div>
            <button id="playlistBtn" class="button is-link is-light is-large is-outlined is-rounded">
              SUBMIT
            </button>
        </div>


      </div>
    </div>

    <!-- Hero footer: will stick at the bottom -->
    <div id="footer" class="hero-foot has-background-black-bis">
    </div>
  </section>`
  };

  export const getToken = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    access_token = urlParams.get('access_token');
    refresh_token = urlParams.get('refresh_token');
    console.log(access_token + " : " + refresh_token)
    return;
  }

  async function getSongs(filterVals, offset, allSongs, topGenres, artistGenres) {
    console.log(Object.keys(allSongs).length)

    let genreFilter = [];
    console.log(allSongs)
    console.log(topGenres);

    let songs = await allSongs;
    // get checkbox values if genres have been loaded
    let count = 1;
    for(let genres in topGenres){
      if(document.getElementById('genre' + count).checked){
        genreFilter.push(genres.toLowerCase());
      }
      count++;
      if(count == 26){break;}
    }

    console.log(genreFilter.length)

    //Check filter values
    if(filterVals['energyMin'] >= filterVals['energyMax']){
        alert("Invalid Energy Values. Try again.")
        document.getElementById("playlistBtn").classList.remove('is-loading')
        return;
    }
    if(filterVals['danceMin'] >= filterVals['danceMax']){
        alert("Invalid Dancability Values. Try again.")
        document.getElementById("playlistBtn").classList.remove('is-loading')
        return;
    }
    if(filterVals['tempoMin'] >= filterVals['tempoMax']){
        alert("Invalid Tempo Values. Try again.")
        document.getElementById("playlistBtn").classList.remove('is-loading')
        return;
    }
    if(filterVals['loudMin'] >= filterVals['loudMax']){
        alert("Invalid Loudness Values. Try again.")
        document.getElementById("playlistBtn").classList.remove('is-loading')
        return;
    }
    if(filterVals['instruMin'] >= filterVals['instruMax']){
        alert("Invalid Instrumentalness Values. Try again.")
        document.getElementById("playlistBtn").classList.remove('is-loading')
        return;
    }
    if(filterVals['valenceMin'] >= filterVals['valenceMax']){
        alert("Invalid Valence Values. Try again.")
        document.getElementById("playlistBtn").classList.remove('is-loading')
        return;
    }

    if(filterVals['acoustMin'] >= filterVals['acoustMax']){
      alert("Invalid Acousticness Values. Try again.")
      document.getElementById("playlistBtn").classList.remove('is-loading')
      return;
    }

    if(filterVals['popMin'] >= filterVals['popMax']){
      alert("Invalid Popularity Values. Try again.")
      document.getElementById("playlistBtn").classList.remove('is-loading')
      return;
    }

    if(filterVals['minYearSaved'] > filterVals ['maxYearSaved']){
      alert("Invalid Date Range, doofus")
      document.getElementById("playlistBtn").classList.remove('is-loading')
      return;
    }

    if(filterVals['minYearSaved'] == filterVals['maxYearSaved'] && filterVals['minMonthSaved'] > filterVals['maxMonthSaved']){
      alert("Invalid Date Range, nerd")
      document.getElementById("playlistBtn").classList.remove('is-loading')
      return;
    }

    if(filterVals['minYearCreated'] == filterVals['maxYearCreated'] && filterVals['minMonthCreated'] > filterVals['maxMonthCreated']){
      alert("Invalid Date Range, dweeb")
      document.getElementById("playlistBtn").classList.remove('is-loading')
      return;
    }

    const maxSongs = 50;
    let playlistSongCount=0;
    let songInfo = '';
    if(offset == 0) {
        //ongInfo+='<div id="cardGroup" class="columns is-multiline" style="margin-left: 0.025%">';
        songInfo+= '<table id="playlistTable" class="table is-hoverable">';
        songInfo+= '<thead><tr><th><abbr title="Number">Num</abbr></th>';
        songInfo+='<th class="has-text-centered"> Cover Art </th>'
        songInfo+= '<th id= "pTableSong" class="has-text-centered">Song Title</th>';
        songInfo+='<th id="pTableArtist" class="has-text-centered">Artist</th>';
        songInfo+='<th id="pTableDance" class="has-text-centered"><abbr title="Danceability">DNC</abbr></th>';
        songInfo+='<th id="pTableTempo" class="has-text-centered"><abbr title="Tempo">BPM</abbr></th>';
        songInfo+='<th id="pTableInstru" class="has-text-centered"><abbr title="Instrumentalness">INSTRU</abbr></th>';
        songInfo+='<th id="pTableAcoust" class="has-text-centered"><abbr title="Acousticness">ACOUST</abbr></th>';
        songInfo+='<th id="pTableLoud" class="has-text-centered"><abbr title="Loudness">db</abbr></th>';
        songInfo+='<th id="pTableEnergy" class="has-text-centered"><abbr title="Energy">ENG</abbr></th>';
        songInfo+='<th id="pTableValence" class="has-text-centered"><abbr title="Valence">VAL</abbr></th>';
        songInfo+='<th id="pTablePop" class="has-text-centered"><abbr title="Popularity">POP</abbr></th>';
        songInfo+='<th id="pTableDate" class="has-text-centered">Date Added</th>';
        songInfo+='<th id="pTableReleaseDate" class="has-text-centered">Date Released</th>';
        songInfo+='</tr></thead>';
        songInfo+='<tbody id="playlistTableBody">'
    }
    let songIds = [];
    let tempSongJson = {};

    for(let songID in allSongs){
      let month = allSongs[songID].added_at.slice(5,7);
      let year = allSongs[songID].added_at.slice(0,4);

      let releaseMonth = allSongs[songID].track.album.release_date.slice(5,7);
      let releaseYear = allSongs[songID].track.album.release_date.slice(0,4);


      let validDate = false;
      if( parseInt(month) <= parseInt(filterVals['maxMonthSaved']) && parseInt(month) >= parseInt(filterVals['minMonthSaved']) && parseInt(year) <= parseInt(filterVals['maxYearSaved']) && parseInt(year) >= parseInt(filterVals['minYearSaved'])){
        if(parseInt(releaseYear) <= parseInt(filterVals['maxYearCreated']) && parseInt(releaseYear) >= parseInt(filterVals['minYearCreated'])){
          if(releaseMonth != ""){
            if(parseInt(releaseMonth) <= parseInt(filterVals['maxMonthCreated']) && parseInt(releaseMonth) >= parseInt(filterVals['minMonthCreated'])){
              validDate = true;
            }
          }
          else{
            validDate = true;
          }

        }
      }

      let validGenre = false;
      if(genreFilter.length != 0){
        loopJ:
          for(let j = 0; j < allSongs[songID].track.artists.length; j++){
            let currArtistGenres = artistGenres[allSongs[songID].track.artists[j].id]
            if(currArtistGenres == null){continue;}
            for(let k = 0; k < currArtistGenres.length; k++){
              for(let l = 0; l < genreFilter.length; l++){
                if(genreFilter[l] == currArtistGenres[k]){
                  validGenre = true;
                  break loopJ;
                }
              }
            }
          }
      }
      else{
        validGenre = true;
      }


      if(validDate && validGenre){
        tempSongJson[allSongs[songID].track.id] = allSongs[songID];
        songIds.push(allSongs[songID].track.id);
      }

      offset++;
    }

    let tempSongAttrJson = {};
    console.log(Object.keys(tempSongJson).length)

    let trackCount = 0;
    loopAllSongs:
    for(let i = 1; i < songIds.length + 1; i++){
        console.log("Track Count: " + trackCount);
        let songName = tempSongJson[songIds[i-1]].track.name;
        let songArtists = tempSongJson[songIds[i-1]].artist_string;

        let songImage = tempSongJson[songIds[i-1]].track.album.images[0].url;

        const headers = {
          Authorization: 'Bearer ' + access_token
        }

        const songURL = 'https://api.spotify.com/v1/audio-features/' + songIds[i-1];
        const songResponse = await fetch(songURL, { headers });
        const songData = await songResponse.json();


        if (songData.energy > filterVals['energyMin'] && songData.energy < filterVals['energyMax'] &&
                songData.danceability > filterVals['danceMin'] && songData.danceability < filterVals['danceMax'] &&
                songData.tempo > filterVals['tempoMin'] && songData.tempo < filterVals['tempoMax'] &&
                songData.loudness > filterVals['loudMin'] && songData.loudness < filterVals['loudMax'] &&
                songData.instrumentalness > filterVals['instruMin'] && songData.instrumentalness < filterVals['instruMax'] &&
                songData.valence > filterVals['valenceMin'] && songData.valence < filterVals['valenceMax'] &&
                songData.acousticness > filterVals['acoustMin'] && songData.acousticness < filterVals['acoustMax'] &&
                tempSongJson[songIds[i-1]].track.popularity > filterVals['popMin'] && tempSongJson[songIds[i-1]].track.popularity < filterVals['popMax']){

            playlistSongCount++;
            let monthSaved = tempSongJson[songIds[i-1]].added_at.slice(5,7);
            let yearSaved = tempSongJson[songIds[i-1]].added_at.slice(0,4);
            let daySaved = tempSongJson[songIds[i-1]].added_at.slice(8,10);
            let dateCreated = tempSongJson[songIds[i-1]].track.album.release_date.slice(5,7);

            if(tempSongJson[songIds[i-1]].track.album.release_date_precision == 'day') {
              dateCreated += '/' + tempSongJson[songIds[i-1]].track.album.release_date.slice(8,10);
            }

            dateCreated += '/' + tempSongJson[songIds[i-1]].track.album.release_date.slice(0,4);

            songInfo+='<tr><th>' + i + '</th>';
            songInfo+='<td><img src="' + songImage + '" height="100" width="100"></td>';
            songInfo+='<td>' + songName + '</td>';
            songInfo+='<td>' + songArtists + '</td>';
            songInfo+='<td>' + songData.danceability + '</td>';
            songInfo+='<td>' + songData.tempo + '</td>';
            songInfo+='<td>' + songData.instrumentalness + '</td>';
            songInfo+='<td>' + songData.acousticness + '</td>';
            songInfo+='<td>' + songData.loudness + '</td>';
            songInfo+='<td>' + songData.energy + '</td>';
            songInfo+='<td>' + songData.valence + '</td>';
            songInfo+='<td>' + tempSongJson[songIds[i-1]].track.popularity + '</td>';
            songInfo+='<td>' + monthSaved + '/' + daySaved + '/' + yearSaved + '</td>';
            songInfo+='<td>' + dateCreated + '</td>';
            songInfo+='</tr>';
            songData.added_at = tempSongJson[songIds[i-1]].added_at;
            songData.release_date = tempSongJson[songIds[i-1]].track.album.release_date;
            songData.popularity = tempSongJson[songIds[i-1]].track.popularity;
            songData.name = songName;
            songData.artist = tempSongJson[songIds[i-1]].track.artists[0].name;
            tempSongAttrJson[songIds[i-1]] = songData;
            trackCount++;

            if(trackCount >= 250){
              break loopAllSongs;
            }

        }
        else{
          delete tempSongJson[songIds[i-1]];
        }


    }

    console.log(Object.keys(tempSongJson).length)

    songInfo+='</tbody>';
    console.log(songIds)

    let resetButton = document.getElementById("resetBtn");
    let buttonInfo ='<div><button id="resetBtn" class="button is-warning is-light is-large is-outlined is-rounded"> Reset Page pls. </button></div>';
    let songNumberInfo='<div id="pTotal"><p class="title is-3">Number of Songs Selected: ' + Object.keys(tempSongJson).length + '</p>';
    songInfo+='</table>';
    $('#main').append(songNumberInfo);
    $('#main').append(songInfo);
    $('#main').append(buttonInfo);
    document.getElementById("playlistBtn").classList.remove('is-loading')

    songJson = tempSongJson;
    songAttrJson = tempSongAttrJson;

    return Promise.resolve([tempSongJson, tempSongAttrJson]);
  }

  async function sortPlaylist(songs, songAttrs, sortVal, isASC) {
    console.log(sortVal);
    console.log(isASC);
    console.log(songs);
    console.log(songAttrs);

    sortVal = sortVal.toLowerCase();
    let tempVals = Object.values(songAttrs);
    let tempKeys = Object.keys(songAttrs);
    let sortValCount = {};

    //makes obj with Key: SongID - Value: SortVal
    for(let i = 0; i < tempVals.length; i++){
      let key = tempKeys[i]
      sortValCount[key] = (tempVals[i])[sortVal];
    }

    let sortable = [];
    for(var id in sortValCount){
        if(sortVal == 'added_at' || sortVal == 'release_date'){
          sortable.push([id, new Date(sortValCount[id])]);
        }
        else{
          sortable.push([id, sortValCount[id]])
        }

    }

    if(isASC){
      if(sortVal == 'name' || sortVal == 'artist'){
        sortable.sort((a,b) => a[1].localeCompare(b[1]));
      }
      else{
        sortable.sort(function(a, b) {
          return a[1] - b[1];
        });
      }
    }
    if(!isASC){
      if(sortVal == 'name' || sortVal == 'artist'){
        sortable.sort((a,b) => b[1].localeCompare(a[1]));
      }
      else{
        sortable.sort(function(a, b) {
          return b[1] - a[1];
        });
      }
    }


    let valueSorted = {};
    sortable.forEach(function(item){
      valueSorted[item[0]]=item[1]
    });
    console.log(valueSorted);

    //Reload data sorted
    $('#resetBtn').trigger('click');
    let playlistSongCount=1;

    //Construct Table Header
    let songInfo = '';
    songInfo+= '<table id="playlistTable" class="table is-hoverable">';
    songInfo+= '<thead><tr><th><abbr title="Number">Num</abbr></th>';
    songInfo+='<th class="has-text-centered"> Cover Art </th>'
    songInfo+= '<th id= "pTableSong" class="has-text-centered">Song Title</th>';
    songInfo+='<th id="pTableArtist" class="has-text-centered">Artist</th>';
    songInfo+='<th id="pTableDance" class="has-text-centered"><abbr title="Danceability">DNC</abbr></th>';
    songInfo+='<th id="pTableTempo" class="has-text-centered"><abbr title="Tempo">BPM</abbr></th>';
    songInfo+='<th id="pTableInstru" class="has-text-centered"><abbr title="Instrumentalness">INSTRU</abbr></th>';
    songInfo+='<th id="pTableAcoust" class="has-text-centered"><abbr title="Acousticness">ACOUST</abbr></th>';
    songInfo+='<th id="pTableLoud" class="has-text-centered"><abbr title="Loudness">db</abbr></th>';
    songInfo+='<th id="pTableEnergy" class="has-text-centered"><abbr title="Energy">ENG</abbr></th>';
    songInfo+='<th id="pTableValence" class="has-text-centered"><abbr title="Valence">VAL</abbr></th>';
    songInfo+='<th id="pTablePop" class="has-text-centered"><abbr title="Popularity">POP</abbr></th>';
    songInfo+='<th id="pTableDate" class="has-text-centered">Date Added</th>';
    songInfo+='<th id="pTableReleaseDate" class="has-text-centered">Date Released</th>';
    songInfo+='</tr></thead>';
    songInfo+='<tbody id="playlistTableBody">'

    //Construct Table Rows
    for(var id in valueSorted){
      let song = songs[id].track;
      let songAttr = songAttrs[id];
      let songName = song.name;
      let songArtists = "";
      for(let j = 0; j < song.artists.length; j++){
        if (j == 0) {
          songArtists += song.artists[j].name;
        }
        else if (j == 1) {
          songArtists += " ft. " + song.artists[j].name;
        }
        else {
          songArtists += " & " + song.artists[j].name;
        }
      }

      let songImage = song.album.images[0].url;

      let month = songAttr.added_at.slice(5,7);
      let year = songAttr.added_at.slice(0,4);
      let day = songAttr.added_at.slice(8,10);
      let dateCreated = song.album.release_date.slice(5,7);

      if(song.album.release_date_precision == 'day') {
        dateCreated += '/' + song.album.release_date.slice(8,10);
      }

      dateCreated += '/' + song.album.release_date.slice(0,4);



      songInfo+='<tr><th>' + playlistSongCount + '</th>';
      songInfo+='<td><img src="' + songImage + '" height="100" width="100"></td>';
      songInfo+='<td>' + songName + '</td>';
      songInfo+='<td>' + songArtists + '</td>';
      songInfo+='<td>' + songAttr.danceability + '</td>';
      songInfo+='<td>' + songAttr.tempo + '</td>';
      songInfo+='<td>' + songAttr.instrumentalness + '</td>';
      songInfo+='<td>' + songAttr.acousticness + '</td>';
      songInfo+='<td>' + songAttr.loudness + '</td>';
      songInfo+='<td>' + songAttr.energy + '</td>';
      songInfo+='<td>' + songAttr.valence + '</td>';
      songInfo+='<td>' + song.popularity + '</td>';
      songInfo+='<td>' + month + '/' + day + '/' + year + '</td>';
      songInfo+='<td>' + dateCreated + '</td>';
      songInfo+='</tr>';
      playlistSongCount++;
    }

    songInfo+='</tbody>';

    let resetButton = document.getElementById("resetBtn");
    let buttonInfo ='<div><button id="resetBtn" class="button is-warning is-light is-large is-outlined is-rounded"> Reset Page pls. </button></div>';
    let songNumberInfo='<div id="pTotal"><p class="title is-3">Number of Songs Selected: ' + Object.keys(songs).length + '</p>';
    songInfo+='</table>';
    $('#main').append(songNumberInfo);
    $('#main').append(songInfo);
    $('#main').append(buttonInfo);
    document.getElementById("playlistBtn").classList.remove('is-loading')

    songJson = songs;
    songAttrJson = songAttrs;

    return;

  }

  export const loadPage = function() {

    const $root = $('#root');

    $root.append(renderPage());

    $(document).ready(function() {
        $("#playlistBtn").click(function(){
            document.getElementById("playlistBtn").classList.add('is-loading');
            let playlistTable = document.getElementById("playlistTable");
            if(playlistTable){
                playlistTable.remove();
                document.getElementById("resetBtn").remove();
                document.getElementById("pTotal").remove();
            }
            var filterVals = {
                danceMin: document.getElementById('danceMin').value,
                danceMax: document.getElementById('danceMax').value,
                tempoMin: document.getElementById('tempoMin').value,
                tempoMax: document.getElementById('tempoMax').value,
                loudMin: document.getElementById('loudMin').value,
                loudMax: document.getElementById('loudMax').value,
                energyMin: document.getElementById('energyMin').value,
                energyMax: document.getElementById('energyMax').value,
                instruMin: document.getElementById('instruMin').value,
                instruMax: document.getElementById('instruMax').value,
                valenceMin: document.getElementById('valenceMin').value,
                valenceMax: document.getElementById('valenceMax').value,
                popMin: document.getElementById('popMin').value,
                popMax: document.getElementById('popMax').value,
                acoustMin: document.getElementById('acoustMin').value,
                acoustMax: document.getElementById('acoustMax').value,
                minMonthSaved: document.getElementById('minMonthSaved').value,
                minYearSaved: document.getElementById('minYearSaved').value,
                maxMonthSaved: document.getElementById('maxMonthSaved').value,
                maxYearSaved: document.getElementById('maxYearSaved').value,
                minMonthCreated: document.getElementById('minMonthCreated').value,
                minYearCreated: document.getElementById('minYearCreated').value,
                maxMonthCreated: document.getElementById('maxMonthCreated').value,
                maxYearCreated: document.getElementById('maxYearCreated').value,
            };

            console.log(filterVals)

            localforage.getItem('artistGenres').then(function(artistGenres) {
              localforage.getItem('topGenres').then(function(topGenres) {
                localforage.getItem('allSongs').then(function(allSongs) {
                  getSongs(filterVals, 0, allSongs, topGenres, artistGenres);
                });
              });
            });

            //let songResults = getSongs(filterVals, 0);
            //let songJson = songResults[0];
            //let songAttrJson = songResults[1];
            //console.log(songJson);
            //console.log(songAttrJson);
        });
    });

      if(localStorage.getItem('artistGenres') != null){
        //Render Checkboxes for filters
        let checkBoxInfo = '<p class="title is-4">Filter by Genre:</p>';
        checkBoxInfo += '<div class="columns is-multiline has-text-left">';
        checkBoxInfo += '<div class="column is-one-fifth">';
        checkBoxInfo += '<form method="post" action="/Tests/Post/">';
        checkBoxInfo += '<fieldset>';

        for(let i = 1; i < maxGenres + 1; i++){
          checkBoxInfo+='<input type="checkbox" id="genre' + i + '" name="filterGenre" value="'+ localStorage.getItem("genre" + i) +'">';
          checkBoxInfo+='<label for="'+ localStorage.getItem("genre" + i) +'"> '+ localStorage.getItem("genre" + i).toUpperCase() +' </label><br>';
          if(i % 5 == 0){
            checkBoxInfo+='</fieldset>';
            checkBoxInfo+='</form>';
            checkBoxInfo+='</div>';
            if(i != maxGenres){
              checkBoxInfo += '<div class="column is-one-fifth">';
              checkBoxInfo += '<form method="post" action="/Tests/Post/">';
              checkBoxInfo += '<fieldset>';
            }

          }
        }
        checkBoxInfo+='</div>';
        $('#genreCheckBoxes').append(checkBoxInfo);
      }
      else{
        alert("Go to 'Top Genres' to download and use your top genres as filters for playlists.");
      }



    $(document).on("click", "#resetBtn", function(){
        document.getElementById("playlistTable").remove();
        document.getElementById("resetBtn").remove();
        document.getElementById("pTotal").remove();

    })


    let pTableSong= true;
    let pTableArtist= true;
    let pTableDance= true;
    let pTableEnergy= true;
    let pTableLoud= true;
    let pTableTempo= true;
    let pTableInstru= true;
    let pTableValence= true;
    let pTableDate = true;
    let pTableReleaseDate = true;
    let pTablePop = true;
    let pTableAcoust = true;


    $(document).on("click", "#pTableSong", function(){
      console.log("click table song");
      console.log(pTableSong)
      sortPlaylist(songJson, songAttrJson, "name", pTableSong)
      pTableSong = !pTableSong;
    });
    $(document).on("click", "#pTableArtist", function(){
      console.log("click table artist");
      console.log(pTableArtist)
      sortPlaylist(songJson, songAttrJson, "artist", pTableArtist)
      pTableArtist = !pTableArtist;
    });
    $(document).on("click", "#pTableDance", function(){
      console.log("click table dance");
      console.log(pTableDance)
      sortPlaylist(songJson, songAttrJson, "danceability", pTableDance)
      pTableDance = !pTableDance;
    });
    $(document).on("click", "#pTableEnergy", function(){
      console.log("click table energy");
      console.log(pTableEnergy)
      sortPlaylist(songJson, songAttrJson, "energy", pTableEnergy)
      pTableEnergy = !pTableEnergy;
    });
    $(document).on("click", "#pTableLoud", function(){
      console.log("click table loud");
      console.log(pTableLoud)
      sortPlaylist(songJson, songAttrJson, "loudness", pTableLoud)
      pTableLoud = !pTableLoud;
    });
    $(document).on("click", "#pTableTempo", function(){
      console.log("click table tempo");
      console.log(pTableTempo)
      sortPlaylist(songJson, songAttrJson, "tempo", pTableTempo)
      pTableTempo = !pTableTempo;
    });
    $(document).on("click", "#pTableInstru", function(){
      console.log("click table instru");
      console.log(pTableInstru)
      sortPlaylist(songJson, songAttrJson, "instrumentalness", pTableInstru)
      pTableInstru = !pTableInstru;
    });
    $(document).on("click", "#pTableValence", function(){
      console.log("click table valence");
      console.log(pTableValence)
      sortPlaylist(songJson, songAttrJson, "valence", pTableValence)
      pTableValence = !pTableValence;
    });
    $(document).on("click", "#pTableDate", function(){
      console.log("click table date");
      console.log(pTableDate)
      sortPlaylist(songJson, songAttrJson, "added_at", pTableDate)
      pTableDate = !pTableDate;
    });

    $(document).on("click", "#pTablePop", function(){
      console.log("click table pop");
      console.log(pTablePop)
      sortPlaylist(songJson, songAttrJson, "popularity", pTablePop)
      pTablePop = !pTablePop;
    });

    $(document).on("click", "#pTableReleaseDate", function(){
      console.log("click table release date");
      console.log(pTableReleaseDate)
      sortPlaylist(songJson, songAttrJson, "release_Date", pTableReleaseDate)
      pTableReleaseDate = !pTableReleaseDate;
    });

    $(document).on("click", "#pTableAcoust", function(){
      console.log("click table acoust");
      console.log(pTableAcoust)
      sortPlaylist(songJson, songAttrJson, "acousticness", pTableAcoust)
      pTableAcoust = !pTableAcoust;
    });

  };


  $(function() {
    getToken();
    loadPage();

    //getSongs();
  });

