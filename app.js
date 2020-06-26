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

    // Display contestants from local storage in the UI
    // So when you refresh the page the contestants will remain visible
    static displayContestants(){
        // get contestants that are stored in local storage
        const contestants = Store.getContestants();

        //loop through the contestants in ls
        contestants.forEach(contestant=>{
            const ui = new UI;

            ui.addContestantToList(contestant);
        });
    }

    // Add to local storage
    static addContestant(contestant) {
        const contestants = Store.getContestants();

        // push it in the converted JS object
        contestants.push(contestant);
        // set local storage back to string with the new contestant
        localStorage.setItem('contestants', JSON.stringify(contestants));
    }

    static removeContestant(contestantFromList){
        let contestants;

        // If no contestants in local storage set it to an empty array
        if (localStorage.getItem('contestants') === null){
            contestants =[];
        } else {
            // grab contestants from local storage and convert to JSON object
            contestants = JSON.parse(localStorage.getItem('contestants'));
        }

        // Loop through each contestant, if contestant from list is equal to one from local storage delete it
        contestants.forEach((contestant, index) =>{
            if (contestantFromList === contestant.name){
                contestants.splice(index, 1);
                
            }
        });
        // set back to a string
        localStorage.setItem('contestants', JSON.stringify(contestants));

    }
}

document.addEventListener('DOMContentLoaded', Store.displayContestants);

class UI {
    // Add contestant to list function
    addContestantToList(contestant) {
        //get the eleement to append the row
        const list = document.querySelector('#contestant-list');

        // create a row element
        const row = document.createElement('tr');

       // Insert columns inside row
       row.innerHTML = `
       <td>${contestant.name}</td>
       <td>${contestant.age}</td>
       <td>${contestant.location}</td>
       <td>${contestant.song}</td>
       <td><a href="#" class="delete">X<a></td>
       `
    //    append row to table body list
    list.appendChild(row);
    }

    formAlert(message, alertClassName){
        // Construct the element
        const alertBox = document.createElement('div');

        // Add classes
        alertBox.className = `alert ${alertClassName}`

        // Add text
        alertBox.appendChild(document.createTextNode(message));

        // Get parent to position the message
        const container = document.querySelector('.modContentContainer');
        const form = document.querySelector('.regoBody');
        const tableContainer = document.querySelector('.contList');
        const table = document.querySelector('.listTable');

     

        if (alertClassName === 'alert-danger') {
        // Insert alert - Inside container insert div before form
        container.insertBefore(alertBox, form);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
        } else if (alertClassName === 'alert-success'){
            // Insert alert - Inside container insert div before form
        tableContainer.insertBefore(alertBox, table);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
        }

    }

    deleteContestant(target){
        if (target.className === 'delete') {
            // if the X a tag is select traverse up the DOM to get the table row and delete it from UI
            target.parentElement.parentElement.remove();
            
           

        }
    }


    // Clear form fields function
    clearFields(){
        document.querySelector("#contName").value = '';
        document.querySelector("#contAge").value = '';
        document.querySelector("#contLocation").value = '';
        document.querySelector("#song").value = '';
        document.querySelector("#link").value = '';
        

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

// Instantiate UI
const ui = new UI()

if (name === '' || age === '' || location === '' || song === '' || link === '') {
ui.formAlert('Please fill in all fields', 'alert-danger');

} else {

  
    // Add contestant to list
ui.addContestantToList(contestant);

contestantDataArray.push(contestant);

Store.addContestant(contestant);


ui.formAlert('Successfully added a contestant!', 'alert-success');

// Clear Form Fields
ui.clearFields()


 //close modal - need to use jQuery
 $('#contestantModal').modal('hide');

}

    e.preventDefault();
    
});





document.querySelector('.turn-button').addEventListener('click', buttonSound);

// Create event for next button
document.querySelector('.next').addEventListener('click', nextContestant);

document.querySelector('.negative').addEventListener('click', negativeReact);

document.querySelector('.positive').addEventListener('click', positiveReact);

// document.querySelector('.start').addEventListener('click', ;


// pass the data in the profileIterator function
let contestants = profileIterator(contestantDataArray);

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
    document.querySelector(".contList").style.display = 'none';
    document.querySelector(".register").style.display = 'none';
  
    } else  {

        // // set time out prob
        // window.location.reload();

        // No contestants popup
        document.querySelector('#popupModal').innerHTML =   `
       
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-danger">No contestants in queue</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Please register your contestants</p>
            </div>
           
          </div>
        </div>
      </div>
      `;

      document.querySelector('.popupButton').click();

      setTimeout(function(){
        window.location.reload();
    }, 3000);
        // Erase Contestant list
       
      
        // No more contestants
      

       
    localStorage.clear();

    }

    // document.querySelector('#imageDisplay').innerHTML = `<img
    // src="${currentContestant.image}">`;
}



// Profile Iterator
function profileIterator(contestants) {
    // counter
let nextIndex = 0;
// let finalIndex = contestants.length-1;


// return object with next function
return {
    next: function(){
        

        return nextIndex < contestants.length ?
        {value: contestants[nextIndex++], done: false} :
        {done: true}
      

    //     next: function(){
    //         if (contestants === contestants[contestants.length-1]){
    //             return nextIndex < contestants.length ?
    //             {value: contestants[0++], done: false} :
    //             {done: true}
    //         } else {
    //         return nextIndex < contestants.length ?
    //         {value: contestants[nextIndex++], done: false} :
    //         {done: true}
    //         }
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

// Event delegation for delete button
document.querySelector('#contestant-list').addEventListener('click', function(e){
   
    // Instantiate UI
     const ui = new UI();

    ui.deleteContestant(e.target);
    // finding name delete
    

    Store.removeContestant(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent);

    
    e.preventDefault();
});

