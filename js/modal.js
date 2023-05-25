const favDialog = document.getElementById("favDialog");
const showButton = document.querySelector("[data-open-modal]");
const close_btn = document.querySelector("[data-close-modal]");

showButton.addEventListener('click', () => {
  favDialog.showModal();
});

close_btn.addEventListener("click", () => {
  favDialog.close();
})

favDialog.addEventListener("click", e => {
  const dimensions = favDialog.getBoundingClientRect();
  if( e.clientX < dimensions.left ||
    e.clientX > dimensions.right ||
    e.clientY < dimensions.top ||
    e.clientY > dimensions.bottom) {
      favDialog.close()
  }
});


const copyText = () =>{
  const copy = document.getElementById("copy");
  const confirmCopied = document.getElementById("copied");

  copy.select();
  // copy for mobile devices
  copy.setSelectionRange(0, 99999);

  // copy to textfield
  navigator.clipboard.writeText(copy.value);
 
  const apromise = new Promise((resolve, reject) => {
    resolve()
  })

  apromise.then(
    setTimeout(() => {
      confirmCopied.innerHTML = "copy"
    }, 1000))
    confirmCopied.innerHTML = "copied"
}