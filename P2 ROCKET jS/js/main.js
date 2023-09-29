'use strict';

/***********************************************************************************/
/* *********************************** DONNEES *************************************/
/***********************************************************************************/

let countdownValue = 10; // Compte à rebours initial en secondes
let isLaunched = false; // État de la mise à feu
const resetButton = document.getElementById("resetButton");
let cancelButton = document.getElementById("cancelButton");
let countdownInterval; // Référence à l'intervalle du compte à rebours
let launchButton = document.getElementById("firing-button"); // Bouton de mise à feu

/***********************************************************************************/
/* ********************************** FONCTIONS ************************************/
/***********************************************************************************/

// Fonction pour afficher le compte à rebours
function updateCountdown() {
    const billboardSpan = document.querySelector("#billboard span");
    billboardSpan.textContent = countdownValue;
}

// Fonction pour changer l'image de la fusée
function changeRocketImage(imageName) {
    document.getElementById("rocket").src = imageName;
}


// Fonction pour décoller la fusée
function tookOff() {
    clearInterval(countdownInterval); // Arrête le compte à rebours
    changeRocketImage("images/rocket3.gif"); // Change l'image de la fusée
    document.getElementById("rocket").classList.add("tookOff");
}

// Gestionnaire d'événement pour le bouton d'annulation de la mise à feu
function cancelLaunch() {
    if (isLaunched ) { // Vérifiez si la mise à feu a été lancée
        clearInterval(countdownInterval); // Arrête le compte à rebours
        isLaunched = false; // Réinitialise l'état de la mise à feu
        launchButton.disabled = false; // Réactive le bouton de mise à feu
        document.getElementById("firing-button").classList.remove("disabled");
        cancelButton.disabled = true; // Désactive le bouton d'annulation
        resetButton.disabled = false; // Active le bouton de remise à zéro du décollage
    }
}

function resetLaunch() {
    isLaunched = false; // Réinitialise l'état de la mise à feu
    launchButton.disabled = false; // Réactive le bouton de mise à feu
    document.getElementById("firing-button").classList.remove("disabled");
    countdownValue = 10; // Réinitialise le compte à rebours
    updateCountdown(); // Affiche la valeur initiale
    changeRocketImage("images/rocket1.png"); // Réinitialise l'image de la fusée
    cancelButton.disabled = true; // Désactive le bouton d'annulation
    resetButton.disabled = true; // Désactive le bouton de réinitialisation
    document.getElementById("rocket").classList.remove("tookOff"); // Réinitialise la classe tookOff de la fusée si elle était présente
    clearInterval(countdownInterval); // Arrête le compte à rebours s'il était en cours
}


// Gestionnaire d'événement pour le bouton de mise à feu
function launchRocket() {
    if (!isLaunched) { // Vérifiez si la mise à feu n'a pas déjà été lancée
        isLaunched = true; // Définissez l'état de la mise à feu sur true
        launchButton.disabled = true; // Désactive le bouton de mise à feu
        document.getElementById("firing-button").classList.add("disabled");
        updateCountdown(); // Affiche la valeur initiale
        changeRocketImage("images/rocket2.gif"); // Change l'image de la fusée
        cancelButton.disabled = false; // Active le bouton d'annulation
        generateRandomStars();
        // Lance le compte à rebours
        countdownInterval = setInterval(function () {
            countdownValue--;
            updateCountdown(); // Affiche le compte à rebours mis à jour
            if (countdownValue === 0) {
                tookOff();
                clearInterval(countdownInterval);
                 // Arrête le compte à rebours après le décollage
                }
            }, 1000);
    }
}

// Fonction pour générer une étoile aléatoire
function createRandomStar() {
    const starSizes = ["tiny", "normal", "big"];
    const randomSize = starSizes[Math.floor(Math.random() * starSizes.length)];

    const star = document.createElement("div");
    star.classList.add("star");
    star.classList.add(randomSize);

    // Définissez des positions aléatoires sur la page
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;
    star.style.left = randomX + "px";
    star.style.top = randomY + "px";

    document.body.appendChild(star); // Ajoutez l'étoile directement au corps de la page
}

// Fonction pour générer 150 étoiles aléatoires
function generateRandomStars() {
    for (let i = 0; i < 150; i++) {
        createRandomStar();
    }
}

/***********************************************************************************/
/* ******************************* CODE PRINCIPAL **********************************/
/***********************************************************************************/

// Ajoutez les gestionnaires d'événements aux boutons
launchButton.addEventListener("click", launchRocket);
cancelButton.addEventListener("click", cancelLaunch);
resetButton.addEventListener("click", resetLaunch);
document.addEventListener("domcontentloaded", generateRandomStars);


// Initialise l'affichage du compte à rebours
updateCountdown();
