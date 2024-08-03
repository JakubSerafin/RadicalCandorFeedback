const canvas = document.getElementById('canvas');

function addNote(color) {
    const note = document.createElement('div');
    note.classList.add('note', `${color}-note`);
    note.contentEditable = true;
    note.setAttribute('draggable', true);
    note.addEventListener('dragstart', dragStart);
    note.addEventListener('dragend', dragEnd);
    canvas.appendChild(note);
}

canvas.addEventListener('dragover', (e) => {
    e.preventDefault();
});

canvas.addEventListener('drop', (e) => {
    e.preventDefault();
    const note = document.querySelector('.dragging');
    note.style.left = `${e.clientX - canvas.offsetLeft - 50}px`;
    note.style.top = `${e.clientY - canvas.offsetTop - 50}px`;
    saveNote(note);
});

function dragStart(e) {
    e.target.classList.add('dragging');
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
}

function saveNote(note) {
    const feedback = note.innerText;
    const type = note.classList.contains('green-note') ? 'Positive' : 'Critical';
    const x = parseInt(note.style.left) / canvas.clientWidth * 10;
    const y = parseInt(note.style.top) / canvas.clientHeight * 10;

    const data = {
        feedback,
        type,
        x,
        y
    };

    fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
