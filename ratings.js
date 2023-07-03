import data from "./json/ratings.json" assert { type: "json" };

const ratings = data;
const length = ratings.length;
const ratingsFragments = length / 5;
let currentFragment = 1;

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

function calculateDivHeightAndItemCount() {
  const ratingsContainer = document.querySelector(".clinic-rating");
  ratingsContainer.style.gridTemplateRows = `repeat(${length}, "165px")`;
  ratingsContainer.style.height = `${length * 185}px`;
  console.log(getComputedStyle(ratingsContainer)["grid-template-rows"]); //TODO: remove
}

calculateDivHeightAndItemCount();

function buildTemplateRatingItem(rating, index) {
  var starList = [];
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

  let hasRating = rating.rating != null;

  var templateHTML = `
    <div class="rating-item item-hidden" id="${index}rating">
      <div class="rating-stars no-margin">
        ${starTemplate}
      </div>
      <p class="overall-rating no-margin">Overall Rating</p>
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
        <p>Doctor rating</p>
      </div>`
          : ``
      }
      
    </div>
    `;
  return templateHTML;
}

function addRatingsToRatingDiv() {
  const ratingsContainer = document.querySelector(".clinic-rating");

  for (let index = 0; index < ratings.length; index++) {
    ratingsContainer.insertAdjacentHTML(
      "afterbegin",
      buildTemplateRatingItem(ratings[index], index)
    );
    let ratingItem = document.getElementById(`${index}rating`);
    ratingItem.style.gridRow = `${index + 1}/${index + 2}`;
  }
}

addRatingsToRatingDiv();

//TODO: add 'load more functionality'
