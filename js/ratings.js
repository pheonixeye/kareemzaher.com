import { ratings } from "./ratings_data.js";
import { url } from "./urls.js";
const length = ratings.length;
const ratingsFragments = Math.floor(length / 5);
let currentFragment = 1;

// console.log(ratingsFragments);

const template = /*html*/ `<div class="rating-item">
<div class="rating-stars no-margin">
  <img src="${url}/images_svg/star_full.svg" alt="full star color yellow" />
  <img src="${url}/images_svg/star_full.svg" alt="full star color yellow" />
  <img src="${url}/images_svg/star_full.svg" alt="full star color yellow" />
  <img src="${url}/images_svg/star_full.svg" alt="full star color yellow" />
  <img src="${url}/images_svg/star_full.svg" alt="full star color yellow" />
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
  // Logic removed as CSS handles height
  // const ratingsContainer = document.querySelector(".clinic-rating");
  // ratingsContainer.style.gridTemplateRows = `repeat(${fragment * 5}, "165px")`;
  // ratingsContainer.style.height = `${fragment * 5 * 185 + 70}px`;
}

// calculateDivHeightAndItemCount(currentFragment);

function buildTemplateRatingItem(rating, index) {
  let starList = [];
  for (let index = 0; index < rating.rating; index++) {
    starList.push(
      /*html*/ `<img src="${url}/images_svg/star_full.svg" alt="full star color yellow" />`
    );
  }
  for (let index = 0; index < 5; index++) {
    if (starList.length < 5) {
      starList.push(
        /*html*/ `<img src="${url}/images_svg/star_empty.svg" alt="empty star color grey" />`
      );
    }
  }

  if (rating.rating == null) {
    starList = [];
    for (let index = 0; index < 5; index++) {
      starList.push(
        /*html*/ `<img src="${url}/images_svg/star_full.svg" alt="full star color yellow" />`
      );
    }
  }

  const starTemplate = starList.join(" ");

  const hasRating = rating.rating != null;

  const commentText = rating.comment;
  const isLong = commentText && commentText.length > 100;

  // Wrap comment for grid positioning
  let commentBlock = '';
  if (isLong) {
    commentBlock = `
      <div class="comment-wrapper no-margin">
         <p class="comment review-text-clamped no-margin">${commentText}</p>
         <button class="review-read-more">Read More</button>
      </div>
      `;
  } else {
    commentBlock = `
      <div class="comment-wrapper no-margin">
         <p class="comment no-margin">${commentText}</p>
      </div>
      `;
  }

  const templateHTML = /*html*/ `
    <div class="rating-item" id="${index}rating">
      <div class="rating-stars no-margin">
        ${starTemplate}
      </div>
      <p class="overall-rating no-margin" lang-key="overall-rating">Overall Rating</p>
      ${commentBlock}
      <p class="user no-margin">${rating.user_name}  ${rating.user_age == undefined ? "" : rating.user_age + "years old"
    } </p>
      <p class="date no-margin">${rating.date}</p>
      ${hasRating
      ? /*html*/ `<div class="doctor-rating-number">
      
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

  for (let index = (fragment - 1) * 5; index < fragment * 5; index++) {
    ratingsContainer.insertAdjacentHTML(
      "beforeend",
      buildTemplateRatingItem(ratings[index], index)
    );
    // Removed fixed grid row assignment
    // const ratingItem = document.getElementById(`${index}rating`);
    // ratingItem.style.gridRow = `${index + 1}/${index + 2}`;
  }
}

addRatingsToRatingDiv();

//* add 'load more functionality'
const readMoreBtn = document.querySelector(".read-more-btn");

function loadMoreRatings() {
  if (currentFragment < ratingsFragments) {
    currentFragment++;
    // calculateDivHeightAndItemCount(currentFragment);
    addRatingsToRatingDiv(currentFragment);
  } else {
    readMoreBtn.style.display = "none";
    return;
  }
}

readMoreBtn.addEventListener("click", () => {
  loadMoreRatings();
});

// Event Delegation for Comment Read More
document.addEventListener("click", (e) => {
  if (e.target.matches(".review-read-more")) {
    const btn = e.target;
    const text = btn.previousElementSibling;
    text.classList.toggle("review-text-clamped");
    btn.textContent = text.classList.contains("review-text-clamped") ? "Read More" : "Show Less";
  }
});
