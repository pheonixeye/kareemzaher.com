import data from "../json/ratings.json" assert { type: "json" };

const ratings = data;
const length = ratings.length;
const ratingsFragments = Math.floor(length / 5);
let currentFragment = 1;

// console.log(ratingsFragments);

const template = `<div class="rating-item">
<div class="rating-stars no-margin">
  <img src="images_svg/star_full.svg" alt="full star color yellow" />
  <img src="images_svg/star_full.svg" alt="full star color yellow" />
  <img src="images_svg/star_full.svg" alt="full star color yellow" />
  <img src="images_svg/star_full.svg" alt="full star color yellow" />
  <img src="images_svg/star_full.svg" alt="full star color yellow" />
</div>
<p class="overall-rating no-margin">Overall Rating</p>
<p class="comment no-margin">ياريت يبقي فيه سونار في العياده</p>
<p class="user no-margin">Saied H.</p>
<p class="date no-margin">Thursday, 5 November 2020 11:05 PM</p>
<div class="doctor-rating-number">
  <div class="doctor-rating-number-background">
    <p>5</p>
  </div>
</div>
<div class="doctor-rating-text">
  <p>Doctor rating</p>
</div>
</div>`;

function calculateDivHeightAndItemCount(fragment) {
  const ratingsContainer = document.querySelector(".clinic-rating");
  ratingsContainer.style.gridTemplateRows = `repeat(${fragment * 5}, "165px")`;
  ratingsContainer.style.height = `${fragment * 5 * 185 + 70}px`;
  // console.log(getComputedStyle(ratingsContainer)["grid-template-rows"]); //TODO: remove
}

calculateDivHeightAndItemCount(currentFragment);

function buildTemplateRatingItem(rating, index) {
  let starList = [];
  for (let index = 0; index < rating.rating; index++) {
    starList.push(
      `<img src="images_svg/star_full.svg" alt="full star color yellow" />`
    );
  }
  for (let index = 0; index < 5; index++) {
    if (starList.length < 5) {
      starList.push(
        `<img src="images_svg/star_empty.svg" alt="empty star color grey" />`
      );
    }
  }

  if (rating.rating == null) {
    starList = [];
    for (let index = 0; index < 5; index++) {
      starList.push(
        `<img src="images_svg/star_full.svg" alt="full star color yellow" />`
      );
    }
  }

  const starTemplate = starList.join(" ");

  const hasRating = rating.rating != null;

  let templateHTML = `
    <div class="rating-item" id="${index}rating">
      <div class="rating-stars no-margin">
        ${starTemplate}
      </div>
      <p class="overall-rating no-margin" lang-key="overall-rating">Overall Rating</p>
      <p class="comment no-margin">${rating.comment}</p>
      <p class="user no-margin">${rating.user_name}  ${
    rating.user_age == undefined ? "" : rating.user_age + "years old"
  } </p>
      <p class="date no-margin">${rating.date}</p>
      ${
        hasRating
          ? `<div class="doctor-rating-number">
      
      <div class="doctor-rating-number-background">
          <p>${rating.rating}</p>
        </div>
      </div>
      <div class="doctor-rating-text">
        <p lang-key="doctor-rating">Doctor rating</p>
      </div>`
          : ``
      }
      
    </div>
    `;
  return templateHTML;
}

function addRatingsToRatingDiv(fragment) {
  fragment = fragment || 1;
  const ratingsContainer = document.querySelector(".clinic-rating");

  for (let index = fragment - 1; index < fragment * 5; index++) {
    ratingsContainer.insertAdjacentHTML(
      "beforeend",
      buildTemplateRatingItem(ratings[index], index)
    );
    let ratingItem = document.getElementById(`${index}rating`);
    ratingItem.style.gridRow = `${index + 1}/${index + 2}`;
  }
}

addRatingsToRatingDiv();

//* add 'load more functionality'
const readMoreBtn = document.querySelector(".read-more-btn");

function loadMoreRatings() {
  if (currentFragment < ratingsFragments) {
    currentFragment++;
    calculateDivHeightAndItemCount(currentFragment);
    addRatingsToRatingDiv(currentFragment);
  } else {
    readMoreBtn.style.display = "none";
    return;
  }
}

readMoreBtn.addEventListener("click", () => {
  loadMoreRatings();
});
