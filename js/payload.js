let accordian = document.getElementsByClassName("payroll_container_faq_accordion");
console.log(accordian)
for(let a=0; a < accordian.length; a++){
    accordian[a].addEventListener("click", function() {
        let panel = this.nextElementSibling;
        let toggles = this.lastElementChild;
        if(panel.style.display === "block") {
            panel.style.display = "none"
            toggles.className = "fa fa-angle-down"
        }else{
            panel.style.display = "block"
            toggles.className = "fa fa-angle-up"
        }
    })
}

