let nameField = document.getElementsByClassName("name-field")[0];
let dateField = document.getElementsByClassName("date-field")[0];
let activeCheckbox = document.getElementsByClassName("check-box")[0];
let departmentSelect = document.getElementsByTagName("select")[0];
let submitButton = document.querySelector("footer button");
let employeeRecords = [];
let serialNumber = 1;
let employeeIdCounter = localStorage.getItem("employeeId") + 1 ?? 1001;

nameField.addEventListener("keydown", (event) => {
  const allowedKeys = ["Backspace", "Delete", "Tab", " "];
  if (allowedKeys.includes(event.key)) return;

  const regex = /^[a-zA-Z0-9]$/;

  if (!regex.test(event.key)) {
    event.preventDefault();
  }
});

activeCheckbox.addEventListener("change", () => {
  const activeBox = document.querySelector(".active-box");
  const statusBox = document.getElementsByClassName("statusBox")[0];
  if (activeCheckbox.checked) {
    statusBox.textContent = "ACTIVE";
    statusBox.style.color = "green";
  } else {
    statusBox.textContent = "INACTIVE";
    statusBox.style.color = "red";
  }
});


const today = new Date().toISOString().split("T")[0];
dateField.setAttribute("min", today);


dateField.addEventListener("change", () => {
  const selectedDate = new Date(dateField.value);
  const currentDate = new Date(today);

  if (selectedDate < currentDate) {
    alert("Please select today or a future date!");
    dateField.value = "";
  }
});


submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (!nameField.value.trim()) {
    alert("Please enter employee name!");
    return;
  }

  if (!departmentSelect.value) {
    alert("Please select a department!");
    return;
  }

  if (!dateField.value) {
    alert("Please select a joining date!");
    return;
  }

  const employeeData = {
    s_no: serialNumber,
    name: nameField.value.trim(),
    department: departmentSelect.options[departmentSelect.selectedIndex].text,
    joining_date: dateField.value,
    active_status: activeCheckbox.checked,
    employee_id: employeeIdCounter,
    submitted: true,
  };

  employeeRecords.push(employeeData);

  console.log("Employee Record Added:");
  console.log(JSON.stringify(employeeData, null, 2));
  console.log("\nAll Employee Records:");
  console.log(JSON.stringify(employeeRecords, null, 2));

  serialNumber++;
  employeeIdCounter++;
  localStorage.setItem("employeeId", employeeIdCounter);
  alert(`Employee "${employeeData.name}" added successfully!`);

  nameField.value = "";
  dateField.value = "";
  activeCheckbox.checked = false;
  departmentSelect.selectedIndex = 0;

});
