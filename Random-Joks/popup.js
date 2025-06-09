const jokeElement = document.getElementById('joke');
const loadingElement = document.getElementById('loading');
const copyButton = document.getElementById('copyJoke');
const getJokeButton = document.getElementById('getJoke');
const toggleButton = document.getElementById('toggleMode');
const toast = document.getElementById('toast');


// Load mode on page load
window.onload = () => {
    const savedMode = localStorage.getItem('mode');
    if (savedMode === 'dark') {
        document.body.classList.add('dark-mode');
    }
};

getJokeButton.addEventListener('click', getJoke);
copyButton.addEventListener('click', copyJoke);
toggleButton.addEventListener('click', toggleMode);

function getJoke() {
    loadingElement.classList.remove('hidden');
    jokeElement.textContent = '';

    fetch('https://official-joke-api.appspot.com/random_joke')
        .then(response => response.json())
        .then(data => {
            loadingElement.classList.add('hidden');
            jokeElement.textContent = `${data.setup} - ${data.punchline}`;
        })
        .catch(error => {
            loadingElement.classList.add('hidden');
            console.error('Error fetching joke:', error);
            jokeElement.textContent = 'Failed to fetch joke. Please try again!';
        });
}

function copyJoke() {
    const jokeText = jokeElement.textContent;
    if (!jokeText) return;

    navigator.clipboard.writeText(jokeText).then(() => {
        alert('Joke copied to clipboard!');
    }).catch(err => {
        console.error('Error copying text: ', err);
    });
}

function toggleMode() {
    document.body.classList.toggle('dark-mode');
    // Save mode to localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('mode', 'dark');
    } else {
        localStorage.setItem('mode', 'light');
    }
}



function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000); // Toast will hide after 2 seconds
}


function toggleMode() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('mode', 'dark');
        showToast('Dark Mode Activated');
    } else {
        localStorage.setItem('mode', 'light');
        showToast('Light Mode Activated');
    }
}
