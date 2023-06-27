const open_modal = document.querySelectorAll("#open_modal");
const open_vid = document.getElementById("btn_left");
const open_vid1 = document.getElementById("btn_left1");
const modal = document.getElementById("dialog");
const vid = document.getElementById("dialog1")
const close_modal = document.getElementById("close_modal");
const close_video = document.getElementById("close_video");
const play_btn = document.getElementById("source_video");
const play_btn1 = document.getElementById("video1");
const heartIcons = document.querySelectorAll('.survey_main_article2_section1_h3_div1_div1 i.fa-heart-o');

open_modal.forEach((mod) => {
  mod.addEventListener("click", () => {
    modal.showModal();
  })
})

open_vid.addEventListener("click", () => {
  vid.showModal();
    if(play_btn.paused){
      play_btn.play();
    }else{
      play_btn.pause();
    }
});

open_vid1.addEventListener("click", () => {
  vid.showModal();
    if(play_btn.paused){
      play_btn.play();
    }else{
      play_btn.pause();
    }
});

close_modal.addEventListener("click", () => {
  modal.close();
});

close_video.addEventListener("click", () => {
  vid.close();
  if(play_btn.paused){
    play_btn.play();
  }else{
    play_btn.pause();
  }
});

modal.addEventListener("click", e => {
  const bound = modal.getBoundingClientRect();
  if(e.clientX < bound.left ||
    e.clientX > bound.right ||
    e.clientY < bound.top ||
    e.clientY > bound.bottom) {
      modal.close();
    }
});

// add click event listener to each icon and update count
heartIcons.forEach((icon, index) => {
  // get the sibling span element containing the count
  const countElement = icon.nextElementSibling;

  // get the count value from localStorage or set it to 0 if it is not set
  let storedCount = parseInt(localStorage.getItem(`icon_${index}`), 10) || 100;
  countElement.textContent = storedCount;

  // add click event listener to icon and update count
  icon.addEventListener('click', () => {
    // increment the count and update the DOM and localStorage
    storedCount++;
    countElement.textContent = storedCount;
    localStorage.setItem(`icon_${index}`, storedCount);
  });
});