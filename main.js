// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'
//putting this here so I can have global scope access
const errorModal = document.querySelector("#modal")

//Add the .hidden class to the error modal in the HTML so it does not appear when the page first load
errorModal.classList.add("hidden")

// Your JavaScript code goes here!
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Has Loaded")
 
//call clickHeartListener()
clickHeartListener()

})

// When a user clicks on an empty heart (This is one way to do it, you then call it in the above function)
// function likeHeart() {
//   const likeHeart = document.querySelectorAll(".like-glyph")

//   likeHeart.forEach((oneLike) => {
//     oneLike.addEventListener("click",() => console.log("LIKE!"))
//   })
//   }

// When a user clicks on an empty heart:
function clickHeartListener() {
  document.addEventListener('click', (event) => {
    if (event.target.classList[0] === 'like-glyph'){
// Invoke mimicServerCall to simulate making a server request
    mimicServerCall()
//When the "server" returns a success status:
     .then((resp) => {
        const activated = event.target.classList.contains("activated-heart");

        if (activated) {
//Remove the .activated-heart class to make the heart appear red
          event.target.classList.remove("activated-heart");
//Change the heart to a full heart
          event.target.innerHTML = EMPTY_HEART;
        }else
//Add the .activated-heart class
        event.target.classList.add("activated-heart");
//Change the heart back to an empty heart
        event.target.innerHTML = FULL_HEART;

        activated;
      })

//When the "server" returns a failure status:
  //Display the error modal by removing the .hidden class
      .catch(errMes => {
        console.log(errMes);
        errorModal.classList.remove("hidden");
 //Use setTimeout to hide the modal after 3 seconds (add the .hidden class)
      setTimeout((errTimeout) => {
        errorModal.classList.add("hidden")
         }, 3000)
      })
    }
  })
}


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
