// Simuler des stats (visites et temps moyen)
function updateStats() {
    let stats = JSON.parse(localStorage.getItem('siteStats')) || { visits: 0, totalTime: 0 };
    stats.visits += 1;
    const startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        stats.totalTime += (Date.now() - startTime) / 1000; // Temps en secondes
        localStorage.setItem('siteStats', JSON.stringify(stats));
    });
    document.getElementById('visit-count').textContent = stats.visits;
    document.getElementById('avg-time').textContent = stats.visits > 0 ? (stats.totalTime / stats.visits).toFixed(1) + 's' : '0s';
}

function loadData() {
    const data = JSON.parse(localStorage.getItem('cvData')) || {
        adminId: 'yacouba',
        adminPass: 'diakite',
        nom: 'DIAKITE Yacouba',
        titre: '[Ton Titre]',
        photo: 'https://via.placeholder.com/1200x400',
        intro: 'Je suis DIAKITE Yacouba, [ton titre]. Explorez mon parcours.',
        about: '[Décris-toi ici via l’admin.]',
        email: 'ton.email@example.com',
        linkedin: 'https://linkedin.com/in/tonprofil',
        cv: '[Ton CV s’affichera ici.]',
        experiences: [
            'Développeur - TechNova | Juin 2022 - Présent | Codage, Optimisation | https://www.youtube.com/embed/dQw4w9WgXcQ'
        ],
        projets: [
            'Portfolio | Site vitrine audacieux'
        ]
    };

    document.getElementById('nom').textContent = data.nom;
    document.getElementById('titre').textContent = data.titre;
    document.getElementById('cover-photo').style.backgroundImage = `url(${data.photo})`;
    document.getElementById('intro').textContent = data.intro;
    document.getElementById('about-text').textContent = data.about;
    document.getElementById('email-link').href = `mailto:${data.email}`;
    document.getElementById('email-link').textContent = data.email;
    document.getElementById('linkedin-link').href = data.linkedin;
    document.getElementById('linkedin-link').textContent = data.linkedin;
    document.getElementById('cv-content').innerHTML = data.cv;

    const expList = document.getElementById('exp-list');
    expList.innerHTML = '';
    data.experiences.forEach(exp => {
        const [title, dates, missions, video] = exp.split(' | ');
        const div = document.createElement('div');
        div.className = 'experience';
        div.innerHTML = `
            <h3>${title}</h3>
            <p><em>${dates}</em></p>
            <ul>${missions.split(', ').map(m => `<li>${m}</li>`).join('')}</ul>
            ${video ? `<iframe src="${video}" allowfullscreen></iframe>` : ''}
        `;
        expList.appendChild(div);
    });

    const projList = document.getElementById('proj-list');
    projList.innerHTML = '';
    data.projets.forEach(proj => {
        const [title, desc] = proj.split(' | ');
        const div = document.createElement('div');
        div.className = 'projet';
        div.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
        projList.appendChild(div);
    });
}

// Accès Admin via Ctrl + Shift + A
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        const data = JSON.parse(localStorage.getItem('cvData')) || { adminId: 'yacouba', adminPass: 'diakite' };
        const id = prompt('Identifiant :');
        const pass = prompt('Mot de passe :');
        if (id === data.adminId && pass === data.adminPass) {
            const panel = document.getElementById('admin-panel');
            panel.classList.remove('admin-hidden');
            document.getElementById('admin-id').value = data.adminId;
            document.getElementById('admin-pass').value = data.adminPass;
            document.getElementById('admin-nom').value = data.nom;
            document.getElementById('admin-titre').value = data.titre;
            document.getElementById('admin-photo').value = data.photo;
            document.getElementById('admin-intro').value = data.intro;
            document.getElementById('admin-about').value = data.about;
            document.getElementById('admin-email').value = data.email;
            document.getElementById('admin-linkedin').value = data.linkedin;
            document.getElementById('admin-cv').value = data.cv;
            document.getElementById('admin-exp').value = data.experiences.join('\n');
            document.getElementById('admin-proj').value = data.projets.join('\n');
            updateStats();
        } else {
            alert('Identifiant ou mot de passe incorrect !');
        }
    }
});

document.getElementById('close-admin').addEventListener('click', () => {
    document.getElementById('admin-panel').classList.add('admin-hidden');
});

document.getElementById('admin-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        adminId: document.getElementById('admin-id').value,
        adminPass: document.getElementById('admin-pass').value,
        nom: document.getElementById('admin-nom').value,
        titre: document.getElementById('admin-titre').value,
        photo: document.getElementById('admin-photo').value,
        intro: document.getElementById('admin-intro').value,
        about: document.getElementById('admin-about').value,
        email: document.getElementById('admin-email').value,
        linkedin: document.getElementById('admin-linkedin').value,
        cv: document.getElementById('admin-cv').value,
        experiences: document.getElementById('admin-exp').value.split('\n').filter(line => line.trim()),
        projets: document.getElementById('admin-proj').value.split('\n').filter(line => line.trim())
    };
    localStorage.setItem('cvData', JSON.stringify(data));
    loadData();
    document.getElementById('admin-panel').classList.add('admin-hidden');
    alert('Mise à jour réussie !');
});

// Charger les données et stats au démarrage
loadData();
updateStats();