// Temporary hardcoded data
const data = [
	{
		name: 'Dua Lipa',
		age: 22,
		location: 'UK',
        song: 'Arctic Monkeys - Do I Wanna Know?',
        link:'https://www.youtube.com/embed/fZB-ptAnoQc?start=26'
	},
	{
		name: 'James Arthur',
		age: 24,
		location: 'UK',
        song: 'Frankie Vallie - Cant Take my Eyes Off you',
        link:'https://www.youtube.com/embed/JUeEcdS-aa0?start=12'
       
    },
    {
		name: 'Francisco Martin',
		age: 22,
		location: 'America',
        song: 'Harry Styles - Falling',
        link:'https://www.youtube.com/embed/b4IDCCJDCTg?start=2'
       
	},
	
];


document.querySelector('.turn-button').addEventListener('click', buttonSound);

// Create event for next button
document.querySelector('.next').addEventListener('click', nextContestant);

document.querySelector('.negative').addEventListener('click', negativeReact);

document.querySelector('.positive').addEventListener('click', positiveReact);


// pass the data in the profileIterator function
const contestants = profileIterator(data);

// Call first profile
// nextContestant();
nextContestant();







// Next profile Display
function nextContestant() {
    const currentContestant = contestants.next().value;

 
    // Add a condition if it finishes looping through the array
    if(currentContestant !== undefined){
    document.querySelector('#profileDisplay').innerHTML = `
    <iframe class="hidden-vid" width="560" height="315" src="${currentContestant.link}&rel=0&autoplay=1&mute=2" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    <div id="imageDisplay"><img class="anon"
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

