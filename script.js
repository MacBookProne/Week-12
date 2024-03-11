var selectedRow = null;


// alerts are shown

function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}
// clear all fields


function clearFields(){
    document.querySelector("#ID").value = "";
    document.querySelector("#Name").value = "";
    document.querySelector("#Category").value = "";
    document.querySelector("#Quantity").value = "";
    document.querySelector("#Price").value = "";
}

document.querySelector("#coffee-form").addEventListener("submit", (e) =>{
    e.preventDefault();

    // Adjusted to match corrected ID selectors
    const coffeeId = document.querySelector("#ID").value;
    const coffeeName = document.querySelector("#Name").value;
    const coffeeCategory = document.querySelector("#Category").value;
    const coffeeQuantity = document.querySelector("#Quantity").value;
    const coffeePrice = document.querySelector("#Price").value;

    if(coffeeId == "" || coffeeName == "" || coffeeCategory == "" || coffeeQuantity == "" || coffeePrice == ""){
      showAlert("Please fill in all fields", "danger");
    } else {
      if(selectedRow == null){
          const list = document.querySelector("#coffee-list");
          const row = document.createElement("tr");

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
          list.appendChild(row);
          selectedRow = null;
          showAlert("Coffee Added", "success");
      }
      else{
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

  //Edit

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

//DELETE

document.querySelector("#coffee-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted", "danger");
    }
});