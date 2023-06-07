const open_modal = document.getElementById("open_modal");
const open_vid = document.getElementById("btn_left");
const open_vid1 = document.getElementById("btn_left1");
const modal = document.getElementById("dialog");
const vid = document.getElementById("dialog1")
const close_modal = document.getElementById("close_modal");
const close_video = document.getElementById("close_video");
const play_btn = document.getElementById("source_video");
const play_btn1 = document.getElementById("video1");

open_modal.addEventListener("click", () => {
  modal.showModal();
});

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


