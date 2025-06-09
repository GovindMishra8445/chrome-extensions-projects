const jokeElement = document.getElementById('joke');
const loadingElement = document.getElementById('loading');
const copyButton = document.getElementById('copyJoke');
const getJokeButton = document.getElementById('getJoke');

getJokeButton.addEventListener('click', getJoke);
copyButton.addEventListener('click', copyJoke);

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
