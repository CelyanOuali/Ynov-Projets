// Tableau pour stocker les contacts
let contacts = [];

document.getElementById('ajouter').addEventListener('click', ajouterContact);
document.getElementById('supprimer').addEventListener('click', supprimerContact);

function ajouterContact() {
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const telephone = document.getElementById('telephone').value;
    const adresse = document.getElementById('adresse').value;

    // Vérifier que les champs ne sont pas vides
    if (nom === "" || prenom === "" || telephone === "" || adresse === "") {
        alert("Veuillez remplir tous les champs");
        return;
    }

    // Créer un objet de contact
    const contact = {
        nom: nom,
        prenom: prenom,
        telephone: telephone,
        adresse: adresse
    };

    // Ajouter le contact au tableau
    contacts.push(contact);

    // Effacer les champs du formulaire
    document.getElementById('nom').value = "";
    document.getElementById('prenom').value = "";
    document.getElementById('telephone').value = "";
    document.getElementById('adresse').value = "";

    // Mettre à jour la liste des contacts et la liste déroulante
    afficherContacts();
}

function modifierContact(index) {
    const contact = contacts[index];
    document.getElementById('nom').value = contact.nom;
    document.getElementById('prenom').value = contact.prenom;
    document.getElementById('telephone').value = contact.telephone;
    document.getElementById('adresse').value = contact.adresse;

    // Supprimez le contact existant de la liste
    contacts.splice(index, 1);

    // Mettre à jour la liste des contacts et la liste déroulante
    afficherContacts();
}

function supprimerContact() {
    const selectContact = document.getElementById('selectContact');
    const selectedIdx = selectContact.selectedIndex;
    if (selectedIdx === -1) {
        alert("Veuillez sélectionner un contact à supprimer");
        return;
    }

    contacts.splice(selectedIdx, 1);

    selectContact.selectedIndex = -1;

    // Mettre à jour la liste des contacts et la liste déroulante
    afficherContacts();
}

function afficherContacts() {
    const selectContact = document.getElementById('selectContact');
    selectContact.innerHTML = "";

    const listeContacts = document.getElementById('listeContacts');
    listeContacts.innerHTML = "";

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];

        // Créer un élément de liste pour chaque contact avec un bouton "Modifier"
        const li = document.createElement('li');
        li.innerHTML = `Nom: ${contact.nom}, Prénom: ${contact.prenom}, Téléphone: ${contact.telephone}, Adresse: ${contact.adresse}`;

        const modifierBtn = document.createElement('button');
        modifierBtn.textContent = "Modifier";
        modifierBtn.addEventListener('click', () => modifierContact(i));

        li.appendChild(modifierBtn);

        listeContacts.appendChild(li);

        // Créer une option pour la liste déroulante de sélection
        const option = document.createElement('option');
        option.value = i;
        option.text = `${contact.prenom} ${contact.nom}`;
        selectContact.appendChild(option);
    }
}
