let links = JSON.parse(localStorage.getItem('links')) || [];
let isDark = JSON.parse(localStorage.getItem('theme')) || false;

const container = document.getElementById('link-container');
const nameInput = document.getElementById('link-name');
const urlInput = document.getElementById('link-url');
const addBtn = document.getElementById('add-link');
const toggleBtn = document.getElementById('toggle-theme');

document.body.classList.toggle('dark', isDark);

function renderLinks() {
    container.innerHTML = '';
    links.forEach((link, index) => {
        const div = document.createElement('div');
        div.className = 'link-item';

        const name = document.createElement('span');
        name.textContent = link.name;

        const buttons = document.createElement('div');
        buttons.className = 'link-buttons';

        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'Copy';
        copyBtn.onclick = () => {
            navigator.clipboard.writeText(link.url);
            copyBtn.textContent = 'Copied!';
            setTimeout(() => copyBtn.textContent = 'Copy', 1000);
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.onclick = () => {
            links.splice(index, 1);
            saveLinks();
            renderLinks();
        };

        buttons.appendChild(copyBtn);
        buttons.appendChild(deleteBtn);

        div.appendChild(name);
        div.appendChild(buttons);
        container.appendChild(div);
    });
}

function saveLinks() {
    localStorage.setItem('links', JSON.stringify(links));
}

addBtn.onclick = () => {
    const name = nameInput.value.trim();
    const url = urlInput.value.trim();

    if (name && url) {
        links.push({ name, url });
        saveLinks();
        renderLinks();
        nameInput.value = '';
        urlInput.value = '';
    }
};

toggleBtn.onclick = () => {
    isDark = !isDark;
    document.body.classList.toggle('dark', isDark);
    localStorage.setItem('theme', JSON.stringify(isDark));
};

// Initial Render
renderLinks();
