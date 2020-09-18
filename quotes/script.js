function githubLink() {
  const projectName = 'quotes';
  const githubUrl = 'https://github.com/meleu/js-practice/tree/master/';
  window.open(`${githubUrl}/${projectName}`, '_blank');
}

const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const quoteAuthor = document.querySelector('#author');
const twitterButton = document.querySelector('#twitter');
const newQuoteButton = document.querySelector('#new-quote');
const githubButton = document.querySelector('#github');
const loader = document.querySelector('#loader');

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

const defaultQuote = {
  quoteText: "What you are is what you have been. What you'll be is what you do now.",
  quoteAuthor: "Buddha"
};

// get quote from API
async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  let data;
  try {
    const response = await fetch(proxyUrl + apiUrl);
    data = await response.json();
    // console.log(data);
  } catch (error) {
    data = defaultQuote;
    // console.log('Whoops! No quote! :(', error);
  }

  hideLoadingSpinner();

  quoteAuthor.innerText = data.quoteAuthor || 'unknown';
  quoteText.innerText = data.quoteText;

  if (data.quoteText.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = quoteAuthor.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// event listeners
newQuoteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);
githubButton.addEventListener('click', githubLink);

// run on load
getQuote();
