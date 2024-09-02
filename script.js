// Funzione per caricare e analizzare il file CSV
function loadCSVData() {
    Papa.parse("projects.csv", {
        download: true,
        header: true,
        complete: function(results) {
            const projects = results.data;
            generateProjectCards(projects);
        }
    });
}

// Funzione per generare le card dei progetti
function generateProjectCards(projects) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Pulisce la galleria

    projects.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('gallery-item');
        card.setAttribute('data-category', project.category);

        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="gallery-item-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `;

        // Aggiungi un evento di click per aprire il modal
        card.addEventListener('click', () => openModal(project));

        gallery.appendChild(card);
    });
}

// Funzione per aprire il modal e visualizzare i dettagli del progetto
function openModal(project) {
    const modal = document.getElementById('projectModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalLink = document.getElementById('modalLink');

    modalImage.src = project.image;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalLink.href = project.link;

    modal.style.display = 'flex';
}

// Funzione per chiudere il modal
function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
}

// Funzione per filtrare i progetti
function filterProjects(category) {
    const allCards = document.querySelectorAll('.gallery-item');
    allCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
    loadCSVData(); // Carica e analizza il file CSV

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Rimuove la classe 'active' da tutti i bottoni
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Aggiunge la classe 'active' al bottone cliccato
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');
            filterProjects(filterValue);
        });
    });

    // Imposta la chiusura del modal quando si clicca sul pulsante di chiusura
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', closeModal);

    // Chiudi il modal cliccando fuori dal contenuto
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('projectModal');
        if (event.target === modal) {
            closeModal();
        }
    });
});
