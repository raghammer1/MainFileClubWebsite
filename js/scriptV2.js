// const mobileNavButton = document.querySelector('.btn-mobile-nav');
// const menuIcon = document.querySelector('.menu');
// const closeIcon = document.querySelector('.close');
// const navLinks = document.querySelector('.nav-links');
// const navSocial = document.querySelector('.nav-social');

// mobileNavButton.addEventListener('click', function () {
//   if (menuIcon.style.display === 'none') {
//     navLinks.style.display = 'none';
//     navSocial.style.display = 'none';
//     menuIcon.style.display = 'block';
//     closeIcon.style.display = 'none';
//   } else {
//     menuIcon.style.display = 'none';
//     closeIcon.style.display = 'block';
//     navLinks.style.display = 'block';
//     navSocial.style.display = 'block';
//   }
// });
// Select the necessary elements
// const mobileNavButton = document.querySelector('.btn-mobile-nav');
// const navLinks = document.querySelector('.nav-links');
// const navSocial = document.querySelector('.nav-social');

// // Add event listener to the mobile navigation button
// mobileNavButton.addEventListener('click', () => {
//   // Toggle the active class on the button
//   mobileNavButton.classList.toggle('active');

//   // Toggle the display property of the nav links and nav social elements
//   navLinks.style.display =
//     navLinks.style.display === 'block' ? 'none' : 'block';
//   navSocial.style.display =
//     navSocial.style.display === 'block' ? 'none' : 'block';
// });

let allBlogsFromDB = null;
let allCatsFromDB = null;
let allClubExecs = null;
let allClubEvents = null;
async function gettingMyBlogs() {
  allClubExecs = await getClubExecs();
  clubExecs();
  allClubEvents = await getClubEvents();
  clubEvents();
  allBlogsFromDB = await getBlogsData();
  allCatsFromDB = await getCategories();
  mainPageSlider();
  selectCategoryBlogSetter();
  categoryHandler();
}
gettingMyBlogs();

////////////////////////////////////////////
// GET THESE FROM DB AS WELL MAKE EACH SLIDE AS
// DICTIONARY ELEM AND GET ONLY FIRST % ITEMS FROM THE DB
// SO THAT ALL CAN BE MADE INTO SLIDES
// % WILL DEPEND ON HOW MANY PHOTOS YOU WANT IN EACH SLIDE
const links = document.querySelectorAll('.nav-links a');

links.forEach((link) => {
  link.addEventListener('click', () => {
    links.forEach((link) => link.classList.remove('active'));
    link.classList.add('active');
  });
});

///////////////////////////////////////
// Slider section--3
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach((dot) => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

///////////////////////////////////////
// Sticky Header
const section3 = document.querySelector('.section--3');
const initialCoords = section3.getBoundingClientRect();
const header = document.querySelector('.header');

window.addEventListener('scroll', function (e) {
  const homePg = document.querySelector('.home-page');
  if (this.window.scrollY > initialCoords.top) header.classList.add('sticky');
  else header.classList.remove('sticky');
});

///////////////////////////////////////
// HIDING AND SHOWING PARTS ON PAGE
const formBtn = document.querySelector('.apply-btn');
const homeBtn = document.querySelector('.home-btn');
const contactBtn = document.querySelector('.contact-btn');
const BlogBtn = document.querySelector('.blog-btn');
const homePg = document.querySelector('.home-page');
const contactUsPg = document.querySelector('.contact-us-page');
const formPg = document.querySelector('.apply-form-page');
const BlogPg = document.querySelector('.blog-main-page');
const ReadMoreBlogPg = document.querySelector('.read-more-blog-page');
const UserLoginPg = document.querySelector('.password-required-page');
const CreateBlogPg = document.querySelector('.create-blog-page');
const SignUpPg = document.querySelector('.sign-up-page');

//! REMEMBER TO HIDE ALL SECIONS THAT YOU ADD

formBtn.addEventListener('click', (event) => {
  event.preventDefault();
  formPg.classList.remove('hidden');
  homePg.classList.add('hidden');
  contactUsPg.classList.add('hidden');
  contactUsPg.classList.add('hidden');
  BlogPg.classList.add('hidden');
  ReadMoreBlogPg.classList.add('hidden');
  UserLoginPg.classList.add('hidden');
  CreateBlogPg.classList.add('hidden');
  SignUpPg.classList.add('hidden');
  window.scrollTo(0, 0);
});

homeBtn.addEventListener('click', (event) => {
  event.preventDefault();
  formPg.classList.add('hidden');
  contactUsPg.classList.add('hidden');
  homePg.classList.remove('hidden');
  ReadMoreBlogPg.classList.add('hidden');
  UserLoginPg.classList.add('hidden');
  CreateBlogPg.classList.add('hidden');
  SignUpPg.classList.add('hidden');
  BlogPg.classList.add('hidden');
  window.scrollTo(0, 0);
  // if (section.classList.contains('hidden')) {
  //   toggleLink.textContent = 'Show ';
  // } else {
  //   toggleLink.textContent = 'Hide ';
  // }
});

contactBtn.addEventListener('click', (event) => {
  event.preventDefault();
  contactUsPg.classList.remove('hidden');
  formPg.classList.add('hidden');
  homePg.classList.add('hidden');
  CreateBlogPg.classList.add('hidden');
  ReadMoreBlogPg.classList.add('hidden');
  UserLoginPg.classList.add('hidden');
  SignUpPg.classList.add('hidden');
  BlogPg.classList.add('hidden');
  window.scrollTo(0, 0);
});

BlogBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  categoryHandler();
  contactUsPg.classList.add('hidden');
  formPg.classList.add('hidden');
  homePg.classList.add('hidden');
  CreateBlogPg.classList.add('hidden');
  ReadMoreBlogPg.classList.add('hidden');
  UserLoginPg.classList.add('hidden');
  BlogPg.classList.remove('hidden');
  SignUpPg.classList.add('hidden');
  let data = allBlogsFromDB;
  createBlogsMainList(data);
  window.scrollTo(0, 0);
});

///////////////////////////////////////
// SUPABASE FOR CONTACT FORM
async function insertData(data) {
  const res = await fetch(
    'https://hoxqigjfqjbfdroymbgq.supabase.co/rest/v1/new',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhveHFpZ2pmcWpiZmRyb3ltYmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAzNTMwMDUsImV4cCI6MTk5NTkyOTAwNX0.sXtzhAA3gNCMvh4wMU4L-mjcjf0ayd91nsVisb7Siqc',
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhveHFpZ2pmcWpiZmRyb3ltYmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAzNTMwMDUsImV4cCI6MTk5NTkyOTAwNX0.sXtzhAA3gNCMvh4wMU4L-mjcjf0ayd91nsVisb7Siqc',
      },
      body: JSON.stringify(data),
    }
  );
  if (res.status == 200 || res.status == 201) {
    const successContact = document.querySelector('.contact-success-message');
    successContact.classList.remove('hidden');
    setTimeout(() => {
      successContact.classList.add('hidden');
      document.querySelector('#contact-form-message').value = '';
      document.querySelector('#contact-form-name').value = '';
      document.querySelector('#contact-form-phone').value = '';
      document.querySelector('#contact-form-email').value = '';
    }, 10000);
  }
}

const contactSubmitBtn = document.querySelector('.contact-form-submit');

async function insertFacts(data) {
  await insertData(data);
}

contactSubmitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const contactName = document.querySelector('#contact-form-name').value;
  const contactPhone = document.querySelector('#contact-form-phone').value;
  const contactMessage = document.querySelector('#contact-form-message').value;
  const contactEmail = document.querySelector('#contact-form-email').value;
  const errorContact = document.querySelector('.contact-error-message');
  const data = {
    Name: contactName,
    Phone: contactPhone,
    Email: contactEmail,
    Message: contactMessage,
  };
  if (formValidity(data)) {
    errorContact.classList.add('hidden');
    insertFacts(data);
  } else {
    errorContact.classList.remove('hidden');
  }
});

function formValidity(data) {
  if (
    isValidEmail(data.Email) &&
    isValidPhoneNumber(data.Phone) &&
    data.Name != '' &&
    data.Message != ''
  ) {
    return true;
  }
  return false;
}

function isValidEmail(email) {
  // regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhoneNumber(phoneNumber) {
  return (
    /^04\d{8}$/.test(phoneNumber) ||
    /^(\+61|0)4\d{8}$/.test(phoneNumber) ||
    /^\+91[1-9][0-9]{9}$/.test(phoneNumber)
  );
}
////////////////////////////////////////////////////////////////
// Main Page Supabase needs:

async function mainPageSlider() {
  const blogs = allBlogsFromDB;
  const latestBlogs = blogs.slice(-3);
  html = latestBlogs.map(
    (blog) => `<a href="#" class="tag-link" data-blog1='${JSON.stringify({
      title: blog.title,
      author: blog.author,
      uuid: blog.uuid,
      id: blog.id,
    })}'<a
            ><div class="meal">
              <img
                src="${blog.mainImage}"
                class="meal-img"
                alt="Japanese Gyozas"
              />
              <div class="meal-content">
                <div class="meal-tags">
                  <span class="tag tag--vegetarian">READ</span>
                </div>
                <p class="meal-title">${blog.title}</p>
              </div>
            </div></a
            >`
  );
  const htmlBlogsArrString = html.join('');
  const sliderCards = document.querySelector('#slider-cards-blogs');
  sliderCards.insertAdjacentHTML('afterbegin', htmlBlogsArrString);

  const readFullLinks = document.querySelectorAll('.tag-link');
  readFullLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const blogDetails2 = JSON.parse(link.getAttribute('data-blog1'));
      // const ReadMoreBlogPg = document.querySelector('.read-more-blog-here');
      window.scrollTo(0, 0);
      //! REMEMBER TO HIDE ALL SECIONS THAT YOU ADD
      formPg.classList.add('hidden');
      homePg.classList.add('hidden');
      contactUsPg.classList.add('hidden');
      contactUsPg.classList.add('hidden');
      BlogPg.classList.add('hidden');
      UserLoginPg.classList.add('hidden');
      CreateBlogPg.classList.add('hidden');
      SignUpPg.classList.add('hidden');
      ReadMoreBlogPg.classList.remove('hidden');

      createBlogsMainList(blogs);
      newPageForParticularReadMoreBlog(blogDetails2, latestBlogs);
    });
  });
}

///////////////////////////////////////
// SUPABASE FOR APPLY

async function insertApplyData(data, status) {
  const res = await fetch(
    'https://hoxqigjfqjbfdroymbgq.supabase.co/rest/v1/Apply',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhveHFpZ2pmcWpiZmRyb3ltYmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAzNTMwMDUsImV4cCI6MTk5NTkyOTAwNX0.sXtzhAA3gNCMvh4wMU4L-mjcjf0ayd91nsVisb7Siqc',
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhveHFpZ2pmcWpiZmRyb3ltYmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAzNTMwMDUsImV4cCI6MTk5NTkyOTAwNX0.sXtzhAA3gNCMvh4wMU4L-mjcjf0ayd91nsVisb7Siqc',
      },
      body: JSON.stringify(data),
    }
  );
  status = res.status;
  return status;
}

function formApplyValidity(data) {
  if (
    isValidEmail(data.Email) &&
    isValidPhoneNumber(data.Phone) &&
    data.Name != '' &&
    data.Position != 'Select'
  ) {
    return true;
  }
  return false;
}

const applySubmitBtn = document.querySelector('.apply-form-submit');

async function insertApply(data) {
  let status = false;
  status = await insertApplyData(data, status);
  if (status === 200 || status === 201) {
    const successApply = document.querySelector('.apply-success-message');
    successApply.classList.remove('hidden');
    setTimeout(() => {
      successApply.classList.add('hidden');
      document.querySelector('#apply-form-year').value = '';
      document.querySelector('#apply-form-name').value = '';
      document.querySelector('#apply-form-phone').value = '';
      document.querySelector('#apply-form-email').value = '';
      document.querySelector('#apply-form-degree').value = '';
      document.querySelector('#apply-form-position').value = '';
      document.querySelector('#apply-form-interested').value = '';
      document.querySelector('#apply-form-contribution').value = '';
      document.querySelector('#apply-form-time').value = '';
    }, 10000);
  }
}

applySubmitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const applyName = document.querySelector('#apply-form-name').value;
  const applyPhone = document.querySelector('#apply-form-phone').value;
  const applyEmail = document.querySelector('#apply-form-email').value;
  const applyYear = document.querySelector('#apply-form-year').value;
  const applyDegree = document.querySelector('#apply-form-degree').value;
  const applyPosition = document.querySelector('#apply-form-position').value;
  const applyInterested = document.querySelector(
    '#apply-form-interested'
  ).value;
  const applyContribution = document.querySelector(
    '#apply-form-contribution'
  ).value;
  const applyTime = document.querySelector('#apply-form-time').value;
  const errorApply = document.querySelector('.apply-error-message');
  const data = {
    Name: applyName,
    Email: applyEmail,
    Phone: applyPhone,
    Year: applyYear,
    Degree: applyDegree,
    Position: applyPosition,
    WhyInterested: applyInterested,
    Contribution: applyContribution,
    CommitTime: applyTime,
  };
  if (formApplyValidity(data)) {
    errorApply.classList.add('hidden');
    insertApply(data);
  } else {
    errorApply.classList.remove('hidden');
  }
});

////////////`/`////////``///////////`////`///
// Club Execs
async function clubEvents() {
  const event = allClubEvents.slice(-3);
  html = event.map(
    (event) => `<a href="#" class="tag-link"
    ><div class="meal">
      <img
        src=${event.image}
        class="meal-img"
        alt="Japanese Gyozas"
      />
      <div class="meal-content">
        <div class="meal-tags">
          <span class="tag tag--vegetarian">${event.dateOn}</span>
        </div>
        <p class="meal-title">${event.name}</p>
      </div>
    </div></a
  >`
  );
  const htmlBlogsArrString = html.join('');
  const sliderCards = document.querySelector('.event-main-page-slider-last');
  sliderCards.insertAdjacentHTML('afterbegin', htmlBlogsArrString);
}

async function getClubEvents() {
  // const accessKey = await authMeBlogsData()
  const res = await fetch(
    'https://hoxqigjfqjbfdroymbgq.supabase.co/rest/v1/eventMain',
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

////////////////////////////////////////////////////////////////////////////////////////////////
// THIS SECTION READS BLOGS FROM THE DB AND DISPLAYS THEM ON THE PAGE
// ALSO data-blog ELEMENT HAS THE FULL DATA OF CURRENT BLOG
// HENCE WHEN READ NOW IS CLICKED YOU CAN GO ON A NEW PAGE AND
// FIND YOUR BLOG IN DB AGAIN TO DISPLAY THE MAIN FULL BLOG
async function getBlogsData() {
  // const accessKey = await authMeBlogsData()
  const res = await fetch(
    'https://hoxqigjfqjbfdroymbgq.supabase.co/rest/v1/All_Blogs_Page',
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

////////////`/`////////``///////////`////`///
// Club Execs
async function clubExecs() {
  const blogs = allClubExecs;
  html = blogs.map(
    (exec) => `<div class="swiper-slide">
    <div class="profile-card-container">
      <div class="profile-card">
        <div class="profile-card__img">
          <img
            src=${exec.backImage}
            alt="${exec.name}"
          />
        </div>
        <div class="profile-card__info">
          <h2 class="profile-card__name"><br />${exec.name}</h2>
          <p class="profile-card__position">
            <br />(${exec.position})
          </p>
          <p class="profile-card__about-me">
            ${exec.about}
          </p>
          <div class="profile-card__social-links">
            <a
              href=${exec.linkedin}
              target="_blank"
              class="profile-card__social-link"
              ><ion-icon
                class="link-social logo-linkedin"
                name="logo-linkedin"
              ></ion-icon
            ></a>
            <a
              href=${exec.instagram}
              target="_blank"
              class="profile-card__social-link"
              ><ion-icon
                class="link-social logo-instagram"
                href="#"
                name="logo-instagram"
              ></ion-icon
            ></a>
            <a
              href=${exec.facebook}
              target="_blank"
              class="profile-card__social-link"
              ><ion-icon
                class="link-social logo-facebook"
                name="logo-facebook"
              ></ion-icon
            ></a>
          </div>
        </div>
      </div>
    </div>
  </div>`
  );
  const htmlBlogsArrString = html.join('');
  const sliderCards = document.querySelector('.swiper-wrapper-exec');
  sliderCards.insertAdjacentHTML('afterbegin', htmlBlogsArrString);
  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 5000,
    },
  });
}

async function getClubExecs() {
  // const accessKey = await authMeBlogsData()
  const res = await fetch(
    'https://hoxqigjfqjbfdroymbgq.supabase.co/rest/v1/clubExecs',
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

///////////////////////////////////////////////////////
// Insert categories on the blog main page

const allCatBtn = document.querySelector('.btn-all-categories');
async function getCategories() {
  const res = await fetch(
    'https://hoxqigjfqjbfdroymbgq.supabase.co/rest/v1/categories',
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

async function makeCategoryBlogMain() {
  const categoriesAll = allCatsFromDB;
  const htmlCategoriesArr = categoriesAll.map(
    (category) => `
    <li class="category">
      <button
        class="btn btn-category"
        style="background-color: ${
          category.colour ? category.colour : getRandomColor()
        }"
      >
        ${category.categories}
      </button>
    </li>
    `
  );
  htmlCategoriesArr.unshift(`<li class="category">
  <button class="btn btn-all-categories">All</button>
</li>`);
  const displayCategories = document.querySelector('.category-blog-main-pg');
  displayCategories.innerHTML = '';
  const htmlCategoriesArrString = htmlCategoriesArr.join('');
  displayCategories.insertAdjacentHTML('beforeend', htmlCategoriesArrString);
}

async function makeCategoryBlogMain2() {
  const categoriesAll = allCatsFromDB;
  const htmlCategoriesArr = categoriesAll.map(
    (category) => `
    <option class="btn btn-all-categories-2">${category.categories}</option>
    `
  );
  htmlCategoriesArr.unshift(
    `<option class="btn btn-all-categories-22">All</option>`
  );
  const displayCategories = document.querySelector('.category-blog-main-pg-2');
  displayCategories.innerHTML = '';
  const htmlCategoriesArrString = htmlCategoriesArr.join('');
  displayCategories.insertAdjacentHTML('beforeend', htmlCategoriesArrString);
}

function getRandomColor() {
  const minBrightness = 50; // adjust as needed
  const hexChars = '0123456789ABCDEF';
  let color = '#';
  let r, g, b;

  do {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
  } while (0.299 * r + 0.587 * g + 0.114 * b < minBrightness);

  color += hexChars[r >> 4] + hexChars[r & 0x0f];
  color += hexChars[g >> 4] + hexChars[g & 0x0f];
  color += hexChars[b >> 4] + hexChars[b & 0x0f];

  return color;
}

const searchBlog = document.querySelector('.search-bar-search');
searchBlog.addEventListener('input', async (e) => {
  let data = allBlogsFromDB;
  data = data.filter((item) =>
    item.title.toLowerCase().includes(searchBlog.value.trim().toLowerCase())
  );
  createBlogsMainList(data);
});

async function categoryHandler() {
  await makeCategoryBlogMain();
  await makeCategoryBlogMain2();
  const categoryButtons = document.querySelectorAll('.btn-category');
  const allCategory = document.querySelector('.btn-all-categories');
  allCategory.addEventListener('click', async () => {
    let data = allBlogsFromDB;
    createBlogsMainList(data);
  });
  categoryButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      let data = allBlogsFromDB;
      data = data.filter((blog) => blog.subject === button.textContent.trim());
      createBlogsMainList(data);
    });
  });
  const allCategory2 = document.querySelector('.category-blog-main-pg-2');
  allCategory2.addEventListener('change', async () => {
    if (allCategory2.value.toLowerCase() == 'all') {
      let data = allBlogsFromDB;
      createBlogsMainList(data);
    } else {
      let data = allBlogsFromDB;
      data = data.filter((blog) => blog.subject === allCategory2.value);
      createBlogsMainList(data);
    }
  });
}

const allCategoryButton = document.querySelector('.btn-all-categories');
allCategoryButton.addEventListener('click', async () => {
  let data = allBlogsFromDB;
  createBlogsMainList(data);
});

function createBlogsMainList(blogData) {
  const blogList = document.querySelector('.blog-list');

  blogList.innerHTML = '';
  const htmlBlogsArr = blogData.map(
    (blog) => `
  <li class="blogs">
    <img class="blogs-img" src="${blog.mainImage}"/>
    <div class="blogs-content">
      <h3>
        ${blog.title}
      </h3>
      <h4 class="category-tag">
        ${blog.subject}
      </h4>
      <p>
        ${
          blog.summary.length > 300
            ? blog.summary.slice(0, 300) + '...'
            : blog.summary
        }
      </p>
      <button class="blog-main-button like-button" data-item-id ="${blog.id}">
        ${
          blog.likes > 10
            ? '<span class="blog-main-icon">❤️‍🔥</span>'
            : blog.likes > 5
            ? '<span class="blog-main-icon">❤️</span>'
            : '<span class="blog-main-icon">👍</span>'
        }  ${blog.likes}
      </button>
      <a href="#" class="blog-read-more" data-blog='${JSON.stringify({
        title: blog.title,
        author: blog.author,
        uuid: blog.uuid,
        id: blog.id,
      })}'>Read More</a>
    </div>
  </li>
  `
  );

  const htmlBlogsArrString = htmlBlogsArr.join('');
  blogList.insertAdjacentHTML('afterbegin', htmlBlogsArrString);

  const likeButtons = document.querySelectorAll('.like-button');
  likeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const itemId = JSON.parse(button.getAttribute('data-item-id'));
      const blogData = allBlogsFromDB;
      let currentLikes = blogData.find((item) => item.id === itemId).likes;
      const newLikes = currentLikes + 1;
      button.innerHTML = `${
        newLikes > 10
          ? '<span class="blog-main-icon">❤️‍🔥</span>'
          : newLikes > 5
          ? '<span class="blog-main-icon">❤️</span>'
          : '<span class="blog-main-icon">👍</span>'
      }  ${newLikes}`;
      updateLikes(itemId, newLikes);
    });
  });

  // THIS IS TO GET ESSENTIAL BLOG DETAILS WHEN READ MORE IS CLICKED
  const readMoreLinks = document.querySelectorAll('.blog-read-more');
  readMoreLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const blogDetails = JSON.parse(link.getAttribute('data-blog'));
      // const ReadMoreBlogPg = document.querySelector('.read-more-blog-here');
      window.scrollTo(0, 0);
      //! REMEMBER TO HIDE ALL SECIONS THAT YOU ADD
      formPg.classList.add('hidden');
      homePg.classList.add('hidden');
      contactUsPg.classList.add('hidden');
      contactUsPg.classList.add('hidden');
      BlogPg.classList.add('hidden');
      UserLoginPg.classList.add('hidden');
      CreateBlogPg.classList.add('hidden');
      SignUpPg.classList.add('hidden');
      ReadMoreBlogPg.classList.remove('hidden');

      newPageForParticularReadMoreBlog(blogDetails, blogData);
    });
  });
}
async function newPageForParticularReadMoreBlog(blogDetails, blogData) {
  const allUsers = await getAllUsers();
  const obj = allUsers.find((user) => user.UUID === blogDetails.uuid);
  const readNowBlog = blogData.find((item) => item.id === blogDetails.id);
  const readBlogInsert = document.querySelector('.read-more-blog-section');
  readBlogInsert.innerHTML = '';
  ReadMoreBlogPg.style.backgroundImage = `url(${readNowBlog.secondaryImage})`;
  const readBlogArr = `
  <button class="go-back-blog-btn">ᗕBack</button>
  <header>
    <h1 id="main-blog-title">${readNowBlog.title}</h1>
  </header>
  <div class="read-now-blog-here">
    <article class="read-now-blog-main-article">
      <p>${readNowBlog.fullBlog}</p>
    </article>
    <aside class="read-now-blog-about-author">
      <h2>About the Author</h2>
      <p>Name: ${obj.user_name} <br/> ${obj.about_user}</p>
    </aside>
  </div>
  `;
  // const mainblogtitle = document.querySelectorAll('#main-blog-title');
  // mainblogtitle.style.background = "url(https://images.pexels.com/photos/3767825/pexels-photo-3767825.jpeg?auto=compress&cs=tinysrgb&w=800)";
  readBlogInsert.insertAdjacentHTML('afterbegin', readBlogArr);
  const goBackBtnBlog = document.querySelectorAll('.go-back-blog-btn');
  goBackBtnBlog.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      //! REMEMBER TO HIDE ALL SECIONS THAT YOU ADD
      contactUsPg.classList.add('hidden');
      formPg.classList.add('hidden');
      homePg.classList.add('hidden');
      ReadMoreBlogPg.classList.add('hidden');
      UserLoginPg.classList.add('hidden');
      CreateBlogPg.classList.add('hidden');
      SignUpPg.classList.add('hidden');
      BlogPg.classList.remove('hidden');
      window.scrollTo(0, 0);
    });
  });
}

async function updateLikes(itemId, newLikes) {
  try {
    const res = await fetch(
      `https://hoxqigjfqjbfdroymbgq.supabase.co/rest/v1/All_Blogs_Page?id=eq.${itemId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          apikey:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhveHFpZ2pmcWpiZmRyb3ltYmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAzNTMwMDUsImV4cCI6MTk5NTkyOTAwNX0.sXtzhAA3gNCMvh4wMU4L-mjcjf0ayd91nsVisb7Siqc',
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhveHFpZ2pmcWpiZmRyb3ltYmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAzNTMwMDUsImV4cCI6MTk5NTkyOTAwNX0.sXtzhAA3gNCMvh4wMU4L-mjcjf0ayd91nsVisb7Siqc`,
        },
        body: JSON.stringify({ likes: newLikes }),
      }
    );
    // if (res.status == 200 || res.status == 201) {
    // }
  } catch (error) {}
}

////////////////////////////////////////////////////////////////////////////////////////////////
// Blog Creation

const checkboxAuth = document.getElementById('my-checkbox-auth');
const userPass = document.getElementById('actual-password');
checkboxAuth.addEventListener('click', (link) => {
  if (checkboxAuth.checked) {
    userPass.type = 'text';
  } else {
    userPass.type = 'password';
  }
});

const create_blog_btn = document.querySelector('.footer-link-create-blog');
create_blog_btn.addEventListener('click', (link) => {
  //! REMEMBER TO HIDE ALL SECIONS THAT YOU ADD
  link.preventDefault();
  contactUsPg.classList.add('hidden');
  formPg.classList.add('hidden');
  homePg.classList.add('hidden');
  ReadMoreBlogPg.classList.add('hidden');
  UserLoginPg.classList.remove('hidden');
  CreateBlogPg.classList.add('hidden');
  BlogPg.classList.add('hidden');
  SignUpPg.classList.add('hidden');
  window.scrollTo(0, 0);
});

async function getFullUser(accessToken) {
  const res = await fetch(
    'https://hoxqigjfqjbfdroymbgq.supabase.co/auth/v1/user',
    {
      headers: {
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhveHFpZ2pmcWpiZmRyb3ltYmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAzNTMwMDUsImV4cCI6MTk5NTkyOTAwNX0.sXtzhAA3gNCMvh4wMU4L-mjcjf0ayd91nsVisb7Siqc',
        authorization: `Bearer ${accessToken}`,
      },
    }
  );
  let data = await res.json();
  if (data == undefined) {
    return null;
  }
  return data;
}

async function getAllUsers() {
  const res = await fetch(
    'https://hoxqigjfqjbfdroymbgq.supabase.co/rest/v1/UUID',
    {
      headers: {
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhveHFpZ2pmcWpiZmRyb3ltYmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAzNTMwMDUsImV4cCI6MTk5NTkyOTAwNX0.sXtzhAA3gNCMvh4wMU4L-mjcjf0ayd91nsVisb7Siqc',
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhveHFpZ2pmcWpiZmRyb3ltYmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAzNTMwMDUsImV4cCI6MTk5NTkyOTAwNX0.sXtzhAA3gNCMvh4wMU4L-mjcjf0ayd91nsVisb7Siqc',
      },
    }
  );
  let data = await res.json();
  if (data == undefined) {
    return null;
  }
  return data;
}

const passSubBtn = document.querySelector('#submit-btn-pass');
passSubBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const userProvidedPass = document.getElementById('actual-password').value;
  const userProvidedUserName = document.getElementById('actual-username').value;
  try {
    const accessKey = await authMeBlogsData(
      userProvidedPass,
      userProvidedUserName
    );
    if (accessKey == null) {
      showError(` 
                  <ul>
                    <li>1. Your account doesn't exist OR</li>
                    <li>2. If already signed up check email for authorization</li>
                  </ul>`);
      return;
    }
    const user = await getFullUser(accessKey);
    const allUsers = await getAllUsers();
    if (allUsers == null || user == null) {
      showError(` 
                  <ul>
                    <li>1. Your account doesn't exist OR</li>
                    <li>2. If already signed up check email for authorization</li>
                  </ul>`);
      return;
    }
    const userId = user.id;
    const obj = allUsers.find((user) => user.UUID === userId);
    if (obj.UUID === userId) {
      createBlogShowPg(obj, accessKey);
    }
  } catch (error) {}
});

async function createBlogShowPg(user, accessKey) {
  contactUsPg.classList.add('hidden');
  formPg.classList.add('hidden');
  homePg.classList.add('hidden');
  ReadMoreBlogPg.classList.add('hidden');
  CreateBlogPg.classList.remove('hidden');
  UserLoginPg.classList.add('hidden');
  BlogPg.classList.add('hidden');
  SignUpPg.classList.add('hidden');
  createBlog(user, accessKey);
}

const createBlogCategory = document.querySelector(
  '#apply-create-blog-form-category'
);
const createBlogOther = document.querySelector('.create-blog-form-row-other');
createBlogCategory.addEventListener('change', () => {
  if (createBlogCategory.value == 'other') {
    createBlogOther.classList.remove('hidden');
  } else {
    createBlogOther.classList.add('hidden');
  }
});

async function createBlog(user, accessKey) {
  const usernameDisplay = document.querySelector('.create-blog-form-name');
  usernameDisplay.innerHTML = '';
  usernameDisplay.innerHTML = `Hello ${user.user_name}`;
  const createBlogSubmit = document.querySelector(
    '.apply-create-blog-form-submit'
  );
  createBlogSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    createBlogDataBuilder(user, accessKey);
  });
}

async function createBlogDataBuilder(user, accessKey) {
  const author = user.user_name;
  const uuid = user.UUID;
  const title = document.querySelector('#apply-create-blog-form-title').value;
  let subject = document.querySelector(
    '#apply-create-blog-form-category'
  ).value;
  const summary = document.querySelector(
    '#apply-create-blog-form-summary'
  ).value;
  const mainImage = document.querySelector(
    '#apply-create-blog-form-card-img'
  ).value;
  const secondaryImage = document.querySelector(
    '#apply-create-blog-img-blog'
  ).value;
  const fullBlog = document.querySelector(
    '#apply-create-blog-form-body-main'
  ).value;
  if (subject.trim().toLowerCase() === 'other') {
    subject = document.querySelector(
      '#apply-create-blog-form-other-category'
    ).value;
  }
  data = {
    author,
    title,
    subject,
    summary,
    mainImage,
    secondaryImage,
    fullBlog,
    uuid,
  };
  if (valueChecker(data) === false) {
    return console.log('error');
  }
  insertCreateBlogData(data, accessKey);
}

function valueChecker(data) {
  if (
    (data.title === '',
    data.subject === '',
    data.mainImage === '',
    data.secondaryImage === '',
    data.fullBlog === '')
  ) {
    showError(`
      <p><br/>ERROR</p>
    `);
    return false;
  }
  if (data.summary === '') {
    data.summary = data.fullBlog;
  }
  return true;
}

async function insertCreateBlogData(data, accessKey) {
  const res = await fetch(
    'https://hoxqigjfqjbfdroymbgq.supabase.co/rest/v1/new_blogs',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhveHFpZ2pmcWpiZmRyb3ltYmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAzNTMwMDUsImV4cCI6MTk5NTkyOTAwNX0.sXtzhAA3gNCMvh4wMU4L-mjcjf0ayd91nsVisb7Siqc',
        authorization: `Bearer ${accessKey}`,
      },
      body: JSON.stringify(data),
    }
  );
  if (res.status == 200 || res.status == 201) {
    const successCreateBlog = document.querySelector(
      '.create-blog-success-message'
    );
    await logUserOut(accessKey);
    successCreateBlog.classList.remove('hidden');
    window.scrollTo(0, 0);
    setTimeout(() => {
      successCreateBlog.classList.add('hidden');
      document.querySelector('#apply-create-blog-form-title').value = '';
      document.querySelector('#apply-create-blog-form-category').value = '';
      document.querySelector('#apply-create-blog-form-summary').value = '';
      document.querySelector('#apply-create-blog-form-card-img').value = '';
      document.querySelector('#apply-create-blog-img-blog').value = '';
      document.querySelector('#apply-create-blog-form-body-main').value = '';
      document.querySelector('#apply-create-blog-form-other-category').value =
        '';
    }, 10000);
  }
}

async function logUserOut(accessKey) {
  const res = await fetch(
    `https://hoxqigjfqjbfdroymbgq.supabase.co/auth/v1/logout`,
    {
      method: 'POST',
      headers: {
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhveHFpZ2pmcWpiZmRyb3ltYmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAzNTMwMDUsImV4cCI6MTk5NTkyOTAwNX0.sXtzhAA3gNCMvh4wMU4L-mjcjf0ayd91nsVisb7Siqc',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessKey}`,
      },
    }
  );
  return res;
}

async function authMeBlogsData(userProvidedPass, userProvidedUserName) {
  const res = await fetch(
    `https://hoxqigjfqjbfdroymbgq.supabase.co/auth/v1/token?grant_type=password&client_id=`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhveHFpZ2pmcWpiZmRyb3ltYmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAzNTMwMDUsImV4cCI6MTk5NTkyOTAwNX0.sXtzhAA3gNCMvh4wMU4L-mjcjf0ayd91nsVisb7Siqc',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userProvidedUserName,
        password: userProvidedPass,
      }),
    }
  );
  const data = await res.json();
  if (data == undefined) {
    return null;
  }
  const accessToken = data.access_token;
  return accessToken;
}

async function selectCategoryBlogSetter() {
  const selectCategoryBlog = document.querySelector(
    '#apply-create-blog-form-category'
  );
  const categoriesAll = allCatsFromDB;
  const htmlCategoriesArr = categoriesAll.map(
    (category) =>
      `<option value="${category.categories}">${category.categories}</option>`
  );
  const htmlCategoriesArrString =
    '<option value="select">Select</option>' +
    htmlCategoriesArr.join('') +
    '<option value="other">Other</option>';
  selectCategoryBlog.insertAdjacentHTML('afterbegin', htmlCategoriesArrString);
}

////////////////////////////////////////////////////////////////////////////////////////////////
// Creating Sign up for users
// signMeUpBlogsData()

const sign_up_btn = document.querySelector('.footer-link-sign-up');
sign_up_btn.addEventListener('click', (link) => {
  link.preventDefault();
  contactUsPg.classList.add('hidden');
  formPg.classList.add('hidden');
  homePg.classList.add('hidden');
  ReadMoreBlogPg.classList.add('hidden');
  UserLoginPg.classList.add('hidden');
  CreateBlogPg.classList.add('hidden');
  BlogPg.classList.add('hidden');
  SignUpPg.classList.remove('hidden');
  window.scrollTo(0, 0);
});

async function signMeUpBlogsData(email, password) {
  const res = await fetch(
    `https://hoxqigjfqjbfdroymbgq.supabase.co/auth/v1/signup`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhveHFpZ2pmcWpiZmRyb3ltYmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAzNTMwMDUsImV4cCI6MTk5NTkyOTAwNX0.sXtzhAA3gNCMvh4wMU4L-mjcjf0ayd91nsVisb7Siqc',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }
  );
  const data = await res.json();
  if (data == undefined) {
    return null;
  }
  const userid = data.id;
  return userid;
}

async function makeUserProfile(profile) {
  const res = await fetch(
    `https://hoxqigjfqjbfdroymbgq.supabase.co/rest/v1/UUID`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhveHFpZ2pmcWpiZmRyb3ltYmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAzNTMwMDUsImV4cCI6MTk5NTkyOTAwNX0.sXtzhAA3gNCMvh4wMU4L-mjcjf0ayd91nsVisb7Siqc',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
    }
  );
}

const submit_sign_up_btn = document.querySelector('#submit-btn-sig-up');
submit_sign_up_btn.addEventListener('click', async (link) => {
  link.preventDefault();
  const user_name = document.querySelector('#for-signup-actual-username').value;
  const sign_up_pass = document.querySelector('.sign-up-pass').value;
  const sign_up_passCheck = document.querySelector('.sign-up-pass-check').value;
  if (checkSamePass(sign_up_pass, sign_up_passCheck) === false) {
    showError("<p>Password doesn't match</p>");
    return;
  }

  const aboutUser = document.querySelector('#char-limit').value;
  const name = document.querySelector('.name-sign-up').value;
  if (!checkInfo(name, aboutUser)) {
    showError(`<div>
                  <p><br/>Error Sign in failed</p>
                  <ul>
                    <li>Name or About Me missing</li>
                  </ul>
                </div>`);
    return;
  }
  user_unique_id = await signMeUpBlogsData(user_name, sign_up_pass);
  if (user_unique_id == null) {
    showError(`<div>
                  <p><br/>Error Sign in failed</p>
                  <ul>
                    <li>1.Please recheck your email ID</li>
                    <li>2.Password should be longer than 6 number<br/>It should contain alphanumerics and atleast one of (@#$%&*^)</li>
                  </ul>
                </div>`);
    return;
  }
  profile = {
    UUID: user_unique_id,
    user_name: name,
    about_user: aboutUser,
  };
  user_profile = await makeUserProfile(profile);
  showError(
    `<p>Thank you for signing up with us.<br/>Please check your email for Verification</p>`
  );
});

function checkInfo(user_name, about_user) {
  if (user_name == '' || about_user == '') {
    return false;
  }
  return true;
}

function checkSamePass(passOne, passTwo) {
  if (passOne == passTwo) {
    return true;
  }
  return false;
}

const textarea = document.getElementById('char-limit');
const countLabel = document.getElementById('count');

// initialize the character count
let charCount = textarea.value.length;
countLabel.innerText = charCount;

// listen for changes to the textarea
textarea.addEventListener('input', () => {
  // get the current character count
  const currentCount = textarea.value.length;

  // if the current count exceeds the limit, remove the excess characters
  if (currentCount > 200) {
    // prevent the user from typing or pasting additional text
    textarea.value = textarea.value.substring(0, 200);
    // reset the character count
    charCount = textarea.value.length;
  } else {
    // update the character count
    charCount = currentCount;
  }

  // update the count label
  countLabel.innerText = charCount;
});

// prevent the user from typing or pasting additional text
textarea.addEventListener('keydown', (event) => {
  if (charCount >= 200 && event.keyCode !== 8 && !event.metaKey) {
    event.preventDefault();
  }
});

textarea.addEventListener('paste', (event) => {
  const clipboardData = event.clipboardData || window.clipboardData;
  const pastedText = clipboardData.getData('text');
  const pastedChars = pastedText.length;
  if (charCount + pastedChars > 200) {
    event.preventDefault();
  }
});

textarea.addEventListener('cut', (event) => {
  if (charCount >= 200 && !event.metaKey) {
    event.preventDefault();
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////
// Overlay settings
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('close-btn');

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    overlay.style.display = 'none';
  }
});

closeBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
});

function showError(message) {
  const errorMessage = document.querySelector('.error-message');
  // errorMessage.textContent = message;
  errorMessage.innerHTML = '';
  errorMessage.insertAdjacentHTML('afterbegin', message);
  overlay.style.display = 'block';
}

////////////////////////////////////////////////////////////////////////////////////////////////
// Youtube API here:
getVideoDets();
async function getVideoDets() {
  // Replace YOUR_VIDEO_ID with the ID of the YouTube video you want to retrieve
  // Getting this from supabase will get last three for latest 3 videos
  const videoIds = await getYoutubeIds();

  const ytIDs = videoIds.map((item) => item.ytID);

  const lastSixYtIDs = ytIDs.slice(-6);
  const lastThreeYtIDs = lastSixYtIDs.slice(-3);
  const firstThreeYtIDs = lastSixYtIDs.slice(0, 3);

  // const videoId = ytIDs[0];

  // Make a request to the YouTube Data API to retrieve information about the video

  const latestVidDets = await getVid(lastThreeYtIDs);
  const latestVidDetsFirst = await getVid(firstThreeYtIDs);

  const html2 = latestVidDetsFirst.map(
    (yt) => `
                <a href="${yt.youtubeUrl}" class="tag-link">
                  <div class="meal">
                    <img
                      src="${yt.thumbnailUrl}"
                      class="meal-img"
                      alt="Japanese Gyozas"
                    />
                    <div class="meal-content">
                      <div class="meal-tags">
                        <span class="tag ${getLanguageTag(
                          yt.ytLanguage
                        )}">${getLanguageName(yt.ytLanguage)}</span>
                      </div>
                      <p class="meal-title">${yt.youtubeTitle}</p>
                    </div>
                  </div>
                </a>
                    `
  );
  const htmlBlogsArrString2 = html2.join('');

  const sliderCards2 = document.querySelector('#slider-cards-yt-2');
  sliderCards2.innerHTML = '';
  sliderCards2.insertAdjacentHTML('afterbegin', htmlBlogsArrString2);

  const html = latestVidDets.map(
    (yt) => `
                <a href="${yt.youtubeUrl}" class="tag-link">
                  <div class="meal">
                    <img
                      src="${yt.thumbnailUrl}"
                      class="meal-img"
                      alt="Japanese Gyozas"
                    />
                    <div class="meal-content">
                      <div class="meal-tags">
                        <span class="tag ${getLanguageTag(
                          yt.ytLanguage
                        )}">${getLanguageName(yt.ytLanguage)}</span>
                      </div>
                      <p class="meal-title">${yt.youtubeTitle}</p>
                    </div>
                  </div>
                </a>
                    `
  );
  const htmlBlogsArrString = html.join('');

  const sliderCards = document.querySelector('#slider-cards-yt');
  sliderCards.innerHTML = '';
  sliderCards.insertAdjacentHTML('afterbegin', htmlBlogsArrString);
}

function getLanguageTag(language) {
  if (language === 'en') {
    return 'tag--vegetarian';
  } else if (language === 'hi') {
    return 'tag--paleo';
  } else {
    return 'tag--vegan';
  }
}

function getLanguageName(languageCode) {
  switch (languageCode) {
    case 'en':
      return 'English';
    case 'hi':
      return 'Hindi';
    // add more cases for other languages as needed
    default:
      return languageCode; // fallback to language code if name is not available
  }
}

async function getVid(lastThreeYtIDs) {
  let latestVidDets = [];
  for (const videoId of lastThreeYtIDs) {
    const data = await needThisToAwait(videoId);
    const videoData = data.items[0].snippet;
    const ytLanguage = videoData.defaultAudioLanguage;
    const thumbnailUrl = videoData.thumbnails.medium.url;
    let youtubeTitle = videoData.title;
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    if (youtubeTitle.length > 50) {
      youtubeTitle = youtubeTitle.substring(0, 30) + '...';
    }

    latestVidDets.push({ thumbnailUrl, youtubeUrl, youtubeTitle, ytLanguage });
    // latestVidDets.push(dets);
    // return { thumbnailUrl, youtubeUrl, youtubeTitle };
  }
  return latestVidDets;
}

async function needThisToAwait(videoId) {
  const apiKey = 'AIzaSyAZnx3cDhdeGGv3kkffl9ywoNHlYXQ03_Y';
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
  ).catch((error) => {
    console.error(error);

    return error;
  });
  const data = await response.json();
  return data;
}

async function getYoutubeIds() {
  // const accessKey = await authMeBlogsData()
  const res = await fetch(
    'https://hoxqigjfqjbfdroymbgq.supabase.co/rest/v1/youtube_vid_ids',
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
