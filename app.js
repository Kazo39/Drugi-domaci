var movies = [
    {
        odgledan: false,
        naziv: 'The Lord of the Rings',
        godina: 2001,
        drzava: 'USA',
        napomena: 'Film pripada zanru naucna fantastika',
        glumci: ['Elijah Wood','Ian McKellen','Liv Tyler','Viggo Mortensen']
    },
    {
        odgledan: false,
        naziv: 'The Hobbit',
        godina: 2012,
        drzava: 'USA',
        napomena: 'Film pripada zanru naucna fantastika',
        glumci: ['Ian McKellen','Martin Freeman','Richard Armitage','James Nesbitt']
    },
    {
        odgledan: false,
        naziv: 'American Pie',
        godina: 1999,
        drzava: 'USA',
        napomena: 'Film pripada zanru komedija',
        glumci: ['Jason Biggs', 'Chris Klein','Natasha Lyonne','Thomas Ian Nicholas']
    }
];


function displayMovies(){
    let moviesD = [];
    
    movies.forEach((movie,index) =>{
        let watchedClass = "bg-danger";
        let watched = "";

        if(movie.odgledan){
            watched = "checked";
            watchedClass = "bg-success";
        }
        watchedCheckbox = `<input type=checkbox class="form-check-input" id="${index}" onclick="checkWatchedMovies('${index}')" ${watched}></input>`;
        moviePom = `<div class="row mt-4 ${watchedClass}" id="${index}b">
        <div class="col-2" >${watchedCheckbox}</div>
        <div class="col-2">${movie.naziv}</div>
        <div class="col-2">${movie.godina}</div>
        <div class="col-2">${movie.drzava}</div>
        <div class="col-2">${movie.napomena}</div>
        <div class="col-2">${movie.glumci.join(', ')}</div>
        </div>`;

        moviesD.push(moviePom)
    });

    document.getElementById('tableBody').innerHTML = moviesD.join('');
}

function checkWatchedMovies(id){
    if(!document.getElementById(id).checked){
        document.getElementById(id).checked = false;
        document.getElementById(id+'b').classList.remove('bg-success');
        document.getElementById(id+'b').classList.add('bg-danger');
    }
    else{
        document.getElementById(id).checked = true;
        document.getElementById(id+'b').classList.remove('bg-danger');
        document.getElementById(id+'b').classList.add('bg-success');
    }
    
}

function getUserInput(){
    let new_movie_name = document.getElementById('movieNameInput').value;
    let new_movie_country_name = document.getElementById('countryInput').value;
    let new_movie_release_date = document.getElementById('yearInput').value;
    let new_movie_note = document.getElementById('noteInput').value;
    let new_movie_actors = document.getElementById('actorsInput').value;
    let new_movie_have_watched = document.getElementById('watchedInput').checked;

    movieReleaseDateInd = true;
    clearWarnings();

    if(new_movie_name == ""){
        document.getElementById('nameWarning').innerHTML='Morate unijeti naziv filma!';
    }
    if(new_movie_actors == ""){
        document.getElementById('actorsWarning').innerHTML='Morate unijeti bar jednog glumca!';
    }
    if(new_movie_release_date < 1930 || new_movie_release_date > 2021){
        document.getElementById('releaseDateWarning').innerHTML='Morate unijeti datum izmedju 1930 i 2021!';
        movieReleaseDateInd = false;
    }

    if(new_movie_name != "" && new_movie_actors != "" && movieReleaseDateInd){
        return {
            naziv : new_movie_name,
            godina : new_movie_release_date,
            napomena: new_movie_note,
            drzava : new_movie_country_name,
            glumci : new_movie_actors.split(','),
            odgledan : new_movie_have_watched
        }
    }
}

function clearInputs(){
    inputs = document.getElementsByClassName('clearInputs');
    for(let input of inputs){
        input.value = '';
    }
    document.getElementById('watchedInput').checked = false;
}

function clearWarnings(){
    document.getElementById('nameWarning').innerHTML='';
    document.getElementById('actorsWarning').innerHTML='';
    document.getElementById('releaseDateWarning').innerHTML=''; 
}

function saveNewMovie(){
    let newMovie = getUserInput();
    if(newMovie != null){
        movies.push(newMovie);
        clearInputs();
        displayMovies();
        var myModalEl = document.getElementById('exampleModal');
        var modal = bootstrap.Modal.getInstance(myModalEl)
        modal.hide();
    }
}

document.getElementById('openModal').addEventListener('click',clearWarnings);
var inputButton = document.getElementById('inputSave');
inputButton.addEventListener('click', saveNewMovie);
displayMovies();
