document.addEventListener("DOMContentLoaded", function () {
    // Gemeinsames Formularhandling für alle drei Seiten
    const form = document.getElementById('challengeForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const challenge = document.getElementById('challenge').value;
            localStorage.setItem('challenge', challenge);

            // Zielseite anhand des data-target-Attributs bestimmen
            const target = form.getAttribute('data-target');
            if (target) {
                window.location.href = target;
            }
        });
    }

    // Anzeige auf der jeweiligen Ergebnis-Seite
    const resultOutput = document.getElementById('resultText');
    const copyButton = document.getElementById('copyButton');

    if (resultOutput) {
        const challenge = localStorage.getItem('challenge') || '[keine Herausforderung eingegeben]';

        // Prompt dynamisch erzeugen – kann je nach Seite variiert werden
        const page = window.location.pathname;
        let prompt = '';

        if (page.includes('result-herausforderung.html')) {
            prompt = `Hier ist eine Herausforderung: ${challenge}. Entwickle drei kreative Lösungsideen.`;
        } else if (page.includes('result-spiel.html')) {
            prompt = `Spiele ein kreatives Spiel basierend auf dieser Herausforderung: ${challenge}. Erfinde eine passende Spielmechanik.`;
        } else if (page.includes('result-methoden.html')) {
            prompt = `Remixe eine bekannte Methode, um diese Herausforderung zu lösen: ${challenge}. Beschreibe den Ablauf in drei Schritten.`;
        }

        resultOutput.textContent = prompt;
    }

    // Kopierfunktion
    if (copyButton) {
        copyButton.addEventListener('click', function () {
            const textToCopy = document.getElementById('resultText').innerText;
            navigator.clipboard.writeText(textToCopy).then(() => {
                alert('Prompt wurde kopiert!');
            }).catch(err => {
                console.error('Kopieren fehlgeschlagen: ', err);
            });
        });
    }
});
