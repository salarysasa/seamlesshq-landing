function calculate_nssf(salary) {
  /*
    This function calculates NSSF
    */
  let nssf;

  if (salary > 18000) {
    nssf = 1080;
  } else if (salary <= 18000) {
    // The nssf contribution for salary amount below KES 18000
    nssf = 0.06 * salary;
  }

  return nssf;
}

function calculate_nhif(salary) {
  /*
    This function calculates NHIF
    */
  let nhif;

  if (salary >= 100000) {
    nhif = 1700;
  } else if (salary < 6000) {
    nhif = 150;
  } else if (6000 <= salary && salary < 8000) {
    nhif = 300;
  } else if (8000 <= salary && salary < 12000) {
    nhif = 400;
  } else if (12000 <= salary && salary < 15000) {
    nhif = 500;
  } else if (15000 <= salary && salary < 20000) {
    nhif = 600;
  } else if (20000 <= salary && salary < 25000) {
    nhif = 750;
  } else if (25000 <= salary && salary < 30000) {
    nhif = 850;
  } else if (30000 <= salary && salary < 35000) {
    nhif = 900;
  } else if (35000 <= salary && salary < 40000) {
    nhif = 950;
  } else if (40000 <= salary && salary < 45000) {
    nhif = 1000;
  } else if (45000 <= salary && salary < 50000) {
    nhif = 1100;
  } else if (50000 <= salary && salary < 60000) {
    nhif = 1200;
  } else if (60000 <= salary && salary < 70000) {
    nhif = 1300;
  } else if (70000 <= salary && salary < 80000) {
    nhif = 1400;
  } else if (80000 <= salary && salary < 90000) {
    nhif = 1500;
  } else if (90000 <= salary && salary < 100000) {
    nhif = 1600;
  }

  return nhif;
}

// calculate monthly paye 
function calculate_paye(grossPay) {
  const deductNHIF = document.getElementById("deductnhif").checked;
  // const nhifRelief = deductNHIF ? 0 : 0.15 * calculate_nhif(grossPay);
  const nhifRelief = deductNHIF ? 0.15 * calculate_nhif(grossPay) : 0;
  let personalRelief = 2400;
  const nssf = calculate_nssf(grossPay);
  const nhif_relief = 0.15 * calculate_nhif(grossPay);

  let taxableIncome = grossPay - nssf;
  let paye = 0;

  if (taxableIncome <= 24000) {
    paye = taxableIncome * 0.1;
  } else if (taxableIncome <= 32333) {
    paye = 24000 * 0.1 + (taxableIncome - 24000) * 0.25;
  } else {
    const remainingIncome = taxableIncome - 32333;
    paye = 24000 * 0.1 + 8333 * 0.25 + remainingIncome * 0.3;
  }

  const taxbeforeRelief = paye;
  const taxafterRelief = paye - personalRelief - nhifRelief;
  const finalPaye = Math.max(0, taxafterRelief);

  // Update the corresponding fields with the calculated values
  document.getElementById("personalrelief").textContent = personalRelief.toLocaleString("en-US", { minimumFractionDigits: 2 });
  document.getElementById("taxbeforRelief").textContent = taxbeforeRelief.toLocaleString("en-US", { minimumFractionDigits: 2 });
  document.getElementById("nhifrelief").textContent = nhifRelief.toLocaleString("en-US", { minimumFractionDigits: 2 });


  return finalPaye;
}



  
// calculate monthly net pay 
function calculateNetPay() {
  // Get the input value from the form
  // const grossIncome = parseFloat(document.getElementById("grossIncome").value);
  const grossIncomeInput = document.getElementById("grossIncome");
  const grossIncome = parseFloat(grossIncomeInput.value);

  // Check if grossIncome is NaN or empty
  if (isNaN(grossIncome) || grossIncomeInput.value.trim() === "") {
    // Set all field values to 0
    document.querySelectorAll(".main_body_article2_section_div_h4 span,.main_body_article2_div_h3 span").forEach((element) => {
      element.textContent = "0.00";
    });
    return; // Exit the function
  }
  // deduct nhif if the box is checked 
  const deductNHIF = document.getElementById("deductnhif").checked;


  // Call the functions to calculate NSSF, PAYE, and net pay
  const nssfContribution = calculate_nssf(grossIncome);

  const nhifContribution = deductNHIF ? calculate_nhif(grossIncome) : 0;
  // const nhifContribution = calculate_nhif(grossIncome);
  const taxableIncome = grossIncome - nssfContribution;
  // const personalRelief = calculate_paye(personalRelief);
  const paye = calculate_paye(grossIncome);
  const netPay = grossIncome - (paye + nhifContribution + nssfContribution);

  // Update the corresponding fields with the calculated values
  document.getElementById("grosspay").textContent = grossIncome.toLocaleString("en-US", { minimumFractionDigits: 2 });
  document.getElementById("nssfContribution").textContent =
    nssfContribution.toLocaleString("en-US", { minimumFractionDigits: 2 });
  document.getElementById("taxableIncome").textContent =
    taxableIncome.toLocaleString("en-US", { minimumFractionDigits: 2 });
  // document.getElementById("personalrelief").textContent = personalRelief.toFixed(2);
  document.getElementById("paye").textContent = paye.toLocaleString("en-US", { minimumFractionDigits: 2 });
  document.getElementById("nhifContribution").textContent =
    nhifContribution.toLocaleString("en-US", { minimumFractionDigits: 2 });

const netPayElements = document.querySelectorAll(".netPay");
netPayElements.forEach((element) => {
  element.textContent = netPay.toLocaleString("en-US", { minimumFractionDigits: 2 });
});
}

// Event listener for the NHIF checkbox
document.getElementById("deductnhif").addEventListener("change", calculateNetPay);

// calculate yearly netpay and paye 
function calculateYearlyNetPaye() {
    // Get the input value from the form
    const grossIncome = parseFloat(document.getElementById("grossIncome").value);
  
    // Call the functions to calculate NSSF, PAYE, and net pay
    const monthlyPaye = calculate_paye(grossIncome);
    const yearlyPaye = monthlyPaye * 12;
    const nssfContribution = calculate_nssf(grossIncome);
    const nhifContribution = calculate_nhif(grossIncome);
    const taxableIncome = grossIncome - nssfContribution;
    const monthlyNetPay = grossIncome - (monthlyPaye + nhifContribution + nssfContribution);
    const yearlyNetPay = monthlyNetPay * 12; 
    // Return the yearly net pay and PAYE
    return {
      yearlyNetPay,
      yearlyPaye
    };
  }
  
  const toggle = document.getElementById("main_body_article1_div_btn2");
  let togglebtn1 = document.getElementById("main_body_article1_div_btn1");
  toggle.addEventListener("click", () => {
    let net_form = document.getElementById("net_form");
    let gross_form = document.getElementById("gross_form");
      gross_form.style.display = "none";
      net_form.style.display = "flex";
      toggle.style.backgroundColor = "#fff"
      togglebtn1.style.backgroundColor = "transparent"
  });

  
  togglebtn1.addEventListener("click", () => {
    const net_form = document.getElementById("net_form");
    const gross_form = document.getElementById("gross_form");
      net_form.style.display = "none";
      gross_form.style.display = "flex";
      togglebtn1.style.backgroundColor = "#fff"
      toggle.style.backgroundColor = "transparent"
  });
  