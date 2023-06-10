'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) {
  elem.classList.toggle('active');
};

/**
 * navbar variables
 */

const navbar = document.querySelector('[data-navbar]');
const navToggleBtn = document.querySelector('[data-nav-toggle-btn]');
const overlay = document.querySelector('[data-overlay]');

const navElemArr = [navToggleBtn, overlay];

for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener('click', function () {
    elemToggleFunc(navbar);
    elemToggleFunc(overlay);
  });
}

/**
 * header sticky
 */

const header = document.querySelector('[data-header]');

let lastScrollPosition = 0;

window.addEventListener('scroll', function () {
  let scrollPosition = window.pageYOffset;

  if (scrollPosition > lastScrollPosition) {
    header.classList.remove('active');
  } else {
    header.classList.add('active');
  }

  lastScrollPosition = scrollPosition <= 0 ? 0 : scrollPosition;
});

/**
 * form validation
 */

const input = document.querySelector('[data-input]');
const submitBtn = document.querySelector('[data-submit]');

input.addEventListener('input', function () {
  if (input.checkValidity()) {
    submitBtn.removeAttribute('disabled');
  } else {
    submitBtn.setAttribute('disabled', '');
  }
});

/**
 * go top
 */

const goTopBtn = document.querySelector('[data-go-top]');

window.addEventListener('scroll', function () {
  window.scrollY >= 200
    ? goTopBtn.classList.add('active')
    : goTopBtn.classList.remove('active');
});

async function getPodcasts() {
  const res = await fetch(
    'https://hoxqigjfqjbfdroymbgq.supabase.co/rest/v1/podcasts',
    {
      headers: {
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhveHFpZ2pmcWpiZmRyb3ltYmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAzNTMwMDUsImV4cCI6MTk5NTkyOTAwNX0.sXtzhAA3gNCMvh4wMU4L-mjcjf0ayd91nsVisb7Siqc',
        authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhveHFpZ2pmcWpiZmRyb3ltYmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAzNTMwMDUsImV4cCI6MTk5NTkyOTAwNX0.sXtzhAA3gNCMvh4wMU4L-mjcjf0ayd91nsVisb7Siqc`,
      },
    }
  );
  let data = await res.json();
  return data;
}

// getPodcasts()


async function makeCategoryPodcastMain() {
  const podcastList = document.querySelector('.podcast-list');
  const podcastsAll = await getPodcasts();

  const htmlpodcastsArr = podcastsAll.map(
    (category) => {
      let un_class = `podcast-card-${category.id}`
      return `
    <li class="podcast-card-main">
      <a href="#" class="podcast-card">
        <figure class="card-banner play-btn2" id="${un_class}">
          <img src=${category.image} alt="Tube Preamps, TLM103 vs. OJ 818, Podcastage's Beanies">

          <div class="card-banner-icon">
            <ion-icon name="play" class="play-btn" id="${un_class}"></ion-icon>
          </div>
        </figure>
        
        <div class="card-content">
          <div class="card-meta">
            <time datetime="2022-02-15">${category.publishedOn}</time>

            <p class="pod-epi">Episode: ${category.episodeNum}</p>
          </div>
          <h3 class="h3 card-title">${category.podcastTitle}</h3>
        </div>
        <a class="yt-link" href="${category.youtubeLink}">(Watch here)</a>
        <audio controls class="audio-player ${un_class}" controlsList="nodownload">
              <source src="${category.audio}" type="audio/mpeg">
              Your browser does not support the audio element.
        </audio>
      </a>
    </li>
    `}
  );

  const htmlpodcastsArrString = htmlpodcastsArr.join('');
  podcastList.insertAdjacentHTML('beforeend', htmlpodcastsArrString);
}
makePodcast()

async function makePodcast() {
  await makeCategoryPodcastMain();
  const podcastCards = document.querySelectorAll('.podcast-card');
  podcastCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault()
    });
  });

  let currentlyPlaying;
  const playBtn = document.querySelectorAll('.play-btn2');
    playBtn.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault()
      const audio = document.querySelector(`.${card.id}`);
      if (currentlyPlaying && currentlyPlaying !== audio) {
        currentlyPlaying.pause();
      }
      if (audio.paused) {
        // audio.currentTime = 0
        audio.play();
        currentlyPlaying = audio;
      } else {
        audio.pause();
        currentlyPlaying = null;
      }
    });
  });
  const searchValue = document.querySelector(".search-bar-search");
  searchValue.addEventListener('input', (e) => {
    console.log(searchValue.value);
  });
}



const searchToggle = document.getElementById('search-toggle');
const searchBar = document.querySelector('.search-bar-search');

searchToggle.addEventListener('click', function() {
  searchBar.classList.toggle('active');
});
