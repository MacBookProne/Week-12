// Variable to keep track of the row currently selected for edit
var selectedRow = null;


// Function to display alerts dynamically

function showAlert(message, className){
// Create a div element to hold the alert message

    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    // Add the message text to the div

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
        // Insert the alert div before the main content area

    container.insertBefore(div, main);
    // Remove the alert after 3 seconds

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}
// clear all fields

// Function to clear all input fields in the form
function clearFields(){
    document.querySelector("#ID").value = "";
    document.querySelector("#Name").value = "";
    document.querySelector("#Category").value = "";
    document.querySelector("#Quantity").value = "";
    document.querySelector("#Price").value = "";
}
// Add an event listener to the form for the submit event
document.querySelector("#coffee-form").addEventListener("submit", (e) =>{
    e.preventDefault();

    // Retrieve the values from each input field
    const coffeeId = document.querySelector("#ID").value;
    const coffeeName = document.querySelector("#Name").value;
    const coffeeCategory = document.querySelector("#Category").value;
    const coffeeQuantity = document.querySelector("#Quantity").value;
    const coffeePrice = document.querySelector("#Price").value;

        // Check if any field is empty and display an alert if so
    if(coffeeId == "" || coffeeName == "" || coffeeCategory == "" || coffeeQuantity == "" || coffeePrice == ""){
      showAlert("Please fill in all fields", "danger");
    } else {
    // If no row is selected, add a new coffee entry
      if(selectedRow == null){
          const list = document.querySelector("#coffee-list");
          const row = document.createElement("tr");
          // Set the innerHTML of the row to include the inputted values
          row.innerHTML = `
          <td>${coffeeId}</td>
          <td>${coffeeName}</td>
          <td>${coffeeCategory}</td>
          <td>${coffeeQuantity}</td>
          <td>${coffeePrice}</td> <!-- Corrected closing tag -->
          <td>
          <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
          <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
          `;
// Append the new row to the list
          list.appendChild(row);
          selectedRow = null;
          showAlert("Coffee Added", "success");
      }
      else{
                // If a row is selected, update its contents
        selectedRow.children[0].textContent = coffeeId;
        selectedRow.children[1].textContent = coffeeName;
        selectedRow.children[2].textContent = coffeeCategory;
        selectedRow.children[3].textContent = coffeeQuantity;
        selectedRow.children[4].textContent = coffeePrice;
        selectedRow = null;
        showAlert("Coffee Info edited", "info");

        clearFields();
      }
    }
  });

// Event listener for edit operations on the list of coffees
  document.querySelector("#coffee-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#Id").value = selectedRow.children[0].textContent;
        document.querySelector("#Name").value = selectedRow.children[1].textContent;
        document.querySelector("#Category").value = selectedRow.children[2].textContent;
        document.querySelector("#Quantity").value = selectedRow.children[3].textContent;
        document.querySelector("#Price").value = selectedRow.children[4].textContent;
    }
  })

// Event listener for delete operations on the list of coffees
document.querySelector("#coffee-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted", "danger");
    }
});