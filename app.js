// Temporary hardcoded data
// const data = [
// 	{
// 		name: 'Dua Lipa',
// 		age: 22,
// 		location: 'UK',
//         song: 'Arctic Monkeys - Do I Wanna Know?',
//         link:'https://www.youtube.com/embed/fZB-ptAnoQc?start=26'
// 	},
// 	{
// 		name: 'James Arthur',
// 		age: 24,
// 		location: 'UK',
//         song: 'Frankie Vallie - Cant Take my Eyes Off you',
//         link:'https://www.youtube.com/embed/JUeEcdS-aa0?start=12'
       
//     },
//     {
// 		name: 'Francisco Martin',
// 		age: 22,
// 		location: 'America',
//         song: 'Harry Styles - Falling',
//         link:'https://www.youtube.com/embed/b4IDCCJDCTg?start=2'
       
// 	},
	
// ];

class Contestant {
    constructor(name, age, location, song, link){
        this.name = name;
        this.age = age;
        this.location = location;
        this.song = song;
        this.link = link;

    }
}

class UI {
    addContestantToStage(contestant){

    }
}

class Store {
    // Fetch from local storage
    static getContestants() {
        let contestants;
        if(localStorage.getItem('contestants') === null){
            contestants = [];
        } else {
            // convert to JS object to push item
            contestants = JSON.parse(localStorage.getItem('contestants'))
        }
        return contestants;
    }

    // Add to local storage
    static addContestant(contestant) {
        const contestants = Store.getContestants();

        // push it in the converted JS object
        contestants.push(contestant);
        // set local storage back to string with the new contestant
        localStorage.setItem('contestants', JSON.stringify(contestants));
    }
}

const contestantDataArray =[];



document.querySelector(".regoForm").addEventListener('submit', 
function(e){
    // Get values from contestant rego form
const name = document.querySelector("#contName").value,
 age = document.querySelector("#contAge").value,
 location = document.querySelector("#contLocation").value,
 song = document.querySelector("#song").value,
 link = document.querySelector("#link").value;

// Instantiate Contestant - create an instance
const contestant = new Contestant(name, age, location, song, link);


Store.addContestant(contestant);

contestantDataArray.push(contestant);

 //close modal - need to use jQuery
 $('#contestantModal').modal('hide');


    e.preventDefault();
    
});





document.querySelector('.turn-button').addEventListener('click', buttonSound);

// Create event for next button
document.querySelector('.next').addEventListener('click', nextContestant);

document.querySelector('.negative').addEventListener('click', negativeReact);

document.querySelector('.positive').addEventListener('click', positiveReact);

// document.querySelector('.start').addEventListener('click', ;


// pass the data in the profileIterator function
const contestants = profileIterator(contestantDataArray);

// Call first profile





// Next profile Display
function nextContestant() {
    const currentContestant = contestants.next().value;

 
    // Add a condition if it finishes looping through the array
    if(currentContestant !== undefined){
    document.querySelector('#profileDisplay').innerHTML = `
    <iframe class="mb-3 hidden-vid" width="539" height="315" src="${currentContestant.link}&rel=0&autoplay=1&mute=2" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    <div id="imageDisplay"><img class="anon mb-3"
                            src="media/anon.png"></div>
    <ul class="list-group">
        <li class="list-group-item" id="name">Name: ${currentContestant.name}
        </li>
        <li class ="list-group-item" id="age">Age: ${currentContestant.age}
        </li>
        <li class ="list-group-item" id="location">Location: ${currentContestant.location}
        </li>
        <li class ="list-group-item">Song: ${currentContestant.song} 
        </li>
    </ul>
    `;
    document.querySelector('.next').innerHTML = 'Next Contestant';
    document.querySelector(".turn-button").style.display = 'inline';
    document.querySelector(".positive").style.display = 'inline';
    document.querySelector(".negative").style.display = 'inline';
    document.querySelector(".voice-font1").style.display = 'none';
  
    } else {
        // No more contestants
        window.location.reload();
    }

  
  
   
    

    // document.querySelector('#imageDisplay').innerHTML = `<img
    // src="${currentContestant.image}">`;
}



// Profile Iterator
function profileIterator(contestants) {
    // counter
let nextIndex = 0;

// return object with next function
return {
    next: function(){
        return nextIndex < contestants.length ?
        {value: contestants[nextIndex++], done: false} :
        {done: true}
    } 
};

}



function buttonSound(){
 
    const sound = document.querySelector('#audio');
    sound.play();
    document.querySelector(".anon").style.display = 'none'
    document.querySelector("iframe").style.display='block';
    document.querySelector("#name").style.display='inline';
    document.querySelector("#age").style.display=`inline`;
    document.querySelector("#location").style.display=`inline`;
    // document.querySelector('#imageDisplay').innerHTML = `<img
    // src="${currentContestant.image}">`;
}


function negativeReact(){
     //An array to house all of the URLs of your sounds
     var sounds = [ "audio/boring.mp3",
     "audio/what.mp3",
    "audio/garbage.mp3",
"audio/no.mp3",
"audio/stop.mp3"];

//This line will select a random sound to play out of your provided URLS
var soundFile = sounds[Math.floor(Math.random()*sounds.length)];

//Find the player element that you created and generate an embed file to play the sound within it
document.querySelector("#player").src= soundFile ;
const negReact = document.querySelector("#player");
negReact.play();


}

function positiveReact(){
    //An array to house all of the URLs of your sounds
    const sounds = [ "audio/clap.mp3",
"audio/unbev.mp3",
"audio/greatness.mp3",
"audio/fav.mp3",
"audio/winner.mp3",
"audio/genius.mp3"
];

//This line will select a random sound to play out of your provided URLS
const soundFile = sounds[Math.floor(Math.random()*sounds.length)];

//Find the player element that you created and generate an embed file to play the sound within it
document.querySelector("#player2").src=soundFile;
const posReact = document.querySelector("#player2");
posReact.play();
    
}

