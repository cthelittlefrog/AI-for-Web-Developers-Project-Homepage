//Candice Patterson
//20 May 2026
//AI for Web Developers Module 3: Prepare files for Netlify deployment
//JS creation using ChatGPT and hands-on changes */

// =========================
// FIREBASE IMPORTS
// =========================

// Imports the Firebase app setup tool
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";

// Imports the Realtime Database tools
// getDatabase connects to the database
// ref points to a specific location in the database
// push adds new data to that database location
// onValue listens for database changes in real time
import {
    getDatabase,
    ref,
    push,
    onValue
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";


// =========================
// FIREBASE SETUP
// =========================

// This tells Firebase which Realtime Database to connect to
const appSettings = {
    databaseURL: "https://my-first-project-489a3-default-rtdb.firebaseio.com/"
};

// Initializes Firebase using the settings above
const app = initializeApp(appSettings);

// Connects this project to the Firebase Realtime Database
const database = getDatabase(app);

// Creates a reference to the "messages" folder/location in the database
const messagesInDB = ref(database, "messages");


// =========================
// PROJECT 4 - INTERACTIVE EVENT INVITE
// =========================

const attendanceDropdown = document.getElementById("attendance");
const messageContainer = document.getElementById("message-container");
const messageField = document.getElementById("message-field");
const messageList = document.querySelector(".messages");
const rsvpButton = document.getElementById("rsvp-submit");
const confirmationMessage = document.getElementById("confirmation-message");

// Show message box only when "yes" is selected
attendanceDropdown.addEventListener("change", function() {
    if (attendanceDropdown.value === "yes") {
        messageContainer.style.display = "block";
    } else {
        messageContainer.style.display = "none";
        messageField.value = "";
    }
});


// =========================
// DISPLAY MESSAGES FROM FIREBASE
// =========================

// onValue listens to the database in real time.
// Any time a message is added, removed, or changed,
// this function runs again and updates the page.
onValue(messagesInDB, function(snapshot) {

    // Clears the current list before rebuilding it
    // This prevents duplicate messages from appearing
    messageList.innerHTML = "";

    // Checks if there is any data in the database
    if (snapshot.exists()) {

        // Converts Firebase message data into an array
        const messagesArray = Object.values(snapshot.val());

        // Loops through each message from Firebase
        for (let i = 0; i < messagesArray.length; i++) {

            // Creates a new list item for each message
            const newMessage = document.createElement("li");

            // Adds the message text to the list item
            newMessage.textContent = messagesArray[i];

            // Adds the list item to the messages list on the page
            messageList.appendChild(newMessage);
        }
    }
});


// =========================
// RSVP BUTTON CLICK EVENT
// =========================

// Runs when RSVP button is clicked
rsvpButton.addEventListener("click", function() {

    // Gets the attendance selection
    const attendance = attendanceDropdown.value;

    // Checks if the user is attending
    if (attendance === "yes") {

        // Shows a positive party message
        confirmationMessage.innerHTML =
            "🎉 Amazing! Your RSVP has been received. Prepare to become a masterpiece!";

        // Adds the background image only to the Art Gala section
        document.querySelector(".artgala-container").classList.add("party-background");

        // Gets the message and removes extra spaces from beginning/end
        const submittedMessage = messageField.value.trim();

        // Saves ONLY the submitted message to Firebase
        // This only happens if attendance is "yes" AND the message is not empty
        if (submittedMessage !== "") {
            push(messagesInDB, submittedMessage);
            messageField.value = "";
        }

    } else {

        // Shows a polite message if not attending
        confirmationMessage.innerHTML =
            "🎨 Thank you for your response. We hope to see you at a future gala!";

        // Removes party background if not attending
        document.querySelector(".artgala-container").classList.remove("party-background");

        // Clears the message field if the user is not attending
        messageField.value = "";
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

function randomTime(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayImage() {
    holes.forEach(hole => hole.classList.remove("active"));

    const randomHole = holes[Math.floor(Math.random() * holes.length)];

    randomHole.classList.add("active");

    const time = randomTime(500, 1500);

    setTimeout(() => {
        randomHole.classList.remove("active");

        if (isPlaying) {
            displayImage();
        }
    }, time);
}

function startGame() {
    score = 0;
    time = 30;
    isPlaying = true;
    startButton.disabled = true;
    startButton.textContent = "Playing...";

    scoreDisplay.textContent = `Score: ${score}`;
    timeDisplay.textContent = `Time left: ${time}`;

    countdown = setInterval(() => {
        time--;
        timeDisplay.textContent = `Time left: ${time}`;

        if (time === 0) {
            clearInterval(countdown);
            isPlaying = false;
            startButton.disabled = false;
            startButton.textContent = "Start Game";
            timeDisplay.textContent = getMessage();

            if (score > 20) {
                highSound.play();
            } else {
                endSound.play();
            }
        }
    }, 1000);

    displayImage();
}

startButton.addEventListener("click", startGame);

holes.forEach(hole => {

    function bonkFace() {

        if (hole.classList.contains("active")) {
            hole.classList.remove("active");
            score++;
            scoreDisplay.textContent = `Score: ${score}`;

            bompSound.currentTime = 0;
            bompSound.play();

            const image = hole.querySelector("img");
            image.classList.add("clicked");

            setTimeout(() => {
                image.classList.remove("clicked");
            }, 300);
        }
    }

    hole.addEventListener("click", bonkFace);
    hole.addEventListener("touchstart", bonkFace);
});

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

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let currentIndex = 0;

function showSlide(index) {
    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    dots.forEach(dot => {
        dot.classList.remove("active-dot");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active-dot");

    currentIndex = index;
}

function currentSlide(index) {
    showSlide(index);
}

setInterval(() => {
    currentIndex++;

    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }

    showSlide(currentIndex);

}, 5000);
