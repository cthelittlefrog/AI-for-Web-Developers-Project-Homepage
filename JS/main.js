//Candice Patterson
//20 May 2026
//AI for Web Developers Module 3: Prepare files for Netlify deployment
//JS creation using ChatGPT and hands-on changes */


// Finds the RSVP form
const rsvpForm = document.getElementById("rsvp-form");

// Finds the confirmation message area
const confirmationMessage = document.getElementById("confirmation-message");

// Runs when the form is submitted
// Finds the RSVP button
const rsvpButton = document.getElementById("rsvp-submit");
// For background when answer is yes
document.querySelector(".artgala-container")

// Runs when button is clicked
rsvpButton.addEventListener("click", function() {

    // Gets the attendance selection
    const attendance = document.getElementById("attendance").value;

    // Checks if the user is attending
    if (attendance === "yes") {

        // Shows a positive party message
        confirmationMessage.innerHTML =
            "🎉 Amazing! Your RSVP has been received. Prepare to become a masterpiece!";
        // Adds the background image only to the Art Gala section
        document.querySelector(".artgala-container").classList.add("party-background");
    } else {

        // Shows a polite message if not attending
        confirmationMessage.innerHTML =
            "🎨 Thank you for your response. We hope to see you at a future gala!";
    }

    // Makes the message visible
    confirmationMessage.style.display = "block";
});

//Module 4 project 5 "FaceBomp"

// Selecting elements from the HTML
const startButton = document.getElementById("startButton");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("timer");
const holes = document.querySelectorAll(".hole");
// Select audio elements for sounds
const bompSound = document.getElementById("bomp-sound");
const endSound = document.getElementById("end-sound");
const highSound = document.getElementById("high-sound");

let score = 0;
let time = 30;
let isPlaying = false;
let countdown;

// Function to generate a random time interval
function randomTime(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to display images in holes
function displayImage() {
    // Clear any active images
    holes.forEach(hole => hole.classList.remove("active"));

    // Select a random hole
    const randomHole = holes[Math.floor(Math.random() * holes.length)];

    // Display the image in the selected hole
    randomHole.classList.add("active");

    // Set a random time for the image to be displayed
    const time = randomTime(500, 1500);

    // After the set time, hide the image
    setTimeout(() => {
        randomHole.classList.remove("active");

        // Continue the game loop if still playing
        if (isPlaying) {
            displayImage();
        }
    }, time);
}

// Function to start the game
/*
  Challenge: Start button
    * Change the start button text to "Playing..." when clicked
    * Change the button text back to "Start Game" when the game ends
*/
function startGame() {
    score = 0;
    time = 30;
    isPlaying = true;
    startButton.disabled = true;
    startButton.textContent = "Playing..."; //Challenge

    // Display the initial score and time
    scoreDisplay.textContent = `Score: ${score}`;
    timeDisplay.textContent = `Time left: ${time}`;

    // Start the countdown timer
    countdown = setInterval(() => {
        time--;
        timeDisplay.textContent = `Time left: ${time}`;

/*
    Challenge:
    * Play "highSound" if the player score is higher than 9
    * Otherwise, play "endSound"
*/
        // End the game when time is up
        if (time === 0) {
            clearInterval(countdown);
            isPlaying = false;
            startButton.disabled = false;
            startButton.textContent = "Start Game"; //Challenge
            timeDisplay.textContent = getMessage();
            if(score > 20) { //Challenge
                highSound.play();
            } else {
                endSound.play();
            }
        }
    }, 1000);

    // Start displaying images
    displayImage();
}

// Event listener for the start button
startButton.addEventListener("click", startGame);

/*
  Challenge: sound effects
    * Embed the `bomp.wav` sound file in the HTML
    * Play the "bomp.wav" sound each time a player clicks on a photo
*/

// Event listener for clicking and touching on images
holes.forEach(hole => {

    function bonkFace() {

        if (hole.classList.contains("active")) {
            hole.classList.remove("active");
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            //add audio
            bompSound.currentTime= 0;
            bompSound.play();
            // Add a red border to the clicked image
            const image = hole.querySelector("img");
            image.classList.add("clicked");
            // Remove the red border after a short delay
            setTimeout(() => {
                image.classList.remove("clicked");
            }, 300);
        }
    }

    // Desktop mouse click
    hole.addEventListener("click", bonkFace);

    // Mobile finger tap
    hole.addEventListener("touchstart", bonkFace);

});

// Function to get a fun message based on the score
function getMessage() {
    if (score === 0) {
        return "You blinked, didn't you?";
    } else if (score < 10) {
        return "Nice effort! Keep practicing!";
    } else if (score < 20) {
        return "You're getting pretty good at this!";
    } else {
        return "Wow, you're a FaceBomp genius!";
    }
}

//Module 4 Project 6

// =========================
// SELECTING ELEMENTS
// =========================

// Select all slides
const slides = document.querySelectorAll(".slide");

// Select all navigation dots
const dots = document.querySelectorAll(".dot");

// Keep track of the current slide
let currentIndex = 0;


// =========================
// FUNCTION TO SHOW A SLIDE
// =========================

function showSlide(index) {

    // Remove active classes from all slides and dots
    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    dots.forEach(dot => {
        dot.classList.remove("active-dot");
    });

    // Add active class to the selected slide
    slides[index].classList.add("active");

    // Highlight corresponding dot
    dots[index].classList.add("active-dot");

    // Update current index
    currentIndex = index;
}


// =========================
// DOT NAVIGATION FUNCTION
// =========================

// Called when a user clicks a dot
function currentSlide(index) {
    showSlide(index);
}


// =========================
// OPTIONAL AUTO SLIDE
// =========================

// Automatically switch slides every 5 seconds
setInterval(() => {

    currentIndex++;

    // Loop back to beginning
    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }

    showSlide(currentIndex);

}, 5000);