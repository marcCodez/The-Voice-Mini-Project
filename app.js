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
		age: 23,
		location: 'UK',
        song: 'Frankie Vallie - Cant Take my Eyes Off you',
        link:'https://www.youtube.com/embed/JUeEcdS-aa0?start=12'
       
	},
	
];


document.querySelector('.turn-button').addEventListener('click', buttonSound);

// Create event for next button
document.querySelector('.next').addEventListener('click', nextContestant);


// pass the data in the profileIterator function
const contestants = profileIterator(data);


// Call first profile
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
        <li class="list-group-item" id="name">Name: ? 
        </li>
        <li class ="list-group-item" id="age">Age: ?
        </li>
        <li class ="list-group-item" id="location">Location: ?
        </li>
        <li class ="list-group-item">Song: ${currentContestant.song} 
        </li>
    </ul>
    `;
    } else {
        // No more contestants
        window.location.reload();
    }
    return {
        contestant: currentContestant
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
    document.querySelector("iFrame").style.display='block';
    document.querySelector("#name").innerText=`Name: ${currentContestant.name}`;
    document.querySelector("#age").innerText=`Age: ${currentContestant.age}`;
    document.querySelector("#location").innerText=`Location: ${currentContestant.location}`;
    // document.querySelector('#imageDisplay').innerHTML = `<img
    // src="${currentContestant.image}">`;
}

