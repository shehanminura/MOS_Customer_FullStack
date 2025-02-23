// function loadCustomer(){
//     fetch("http://localhost:8080/customer/getAll")
//     .then(res=>res.json())
//     .then(data=>console.log(data)
//     )
// }
// loadCustomer();

function loadCustomer() {
    fetch("http://localhost:8080/customer/getAll")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

            let tableRow = `
                <caption>2025 MOS Customers</caption>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Salary</th>
                </tr>
        `;

            let customerTable = document.getElementById("tblCustomers");

            data.forEach((customer) => {
                tableRow += `    
                <tr>
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.address}</td>
                    <td>${customer.salary}</td>
                </tr>
            `;
            });
            customerTable.innerHTML = tableRow;
        });
}
loadCustomer();

function addCustomer() {
    let name = document.getElementById("txtName").value;
    let address = document.getElementById("txtAddress").value;
    let salary = document.getElementById("txtSalary").value;

    console.log(name);
    console.log(address);
    console.log(salary);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        name: name,
        address: address,
        salary: salary,
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    fetch("http://localhost:8080/customer/add", requestOptions)
        .then((response) => response.text())
        .then((result) => {  
            alert("Customer added successfully!");
            console.log(result)
            loadCustomer();
            clearFields();
        })
        .catch((error) => {
            alert("Failed to add customer.");
            console.error(error)});

         
}

function deleteCustomer() {
    let id = document.getElementById("txtId").value;

    const requestOptions = {
        method: "DELETE",
        redirect: "follow",
    };

    fetch(`http://localhost:8080/customer/delete/${id}`, requestOptions)
        .then((response) => response.text())
        .then((result) =>{
            alert("Customer Delete successfully!");
            console.log(result)
            loadCustomer();
            clearFields();
        })
        .catch((error) =>{ 
            alert("Failed to Delete customer.");
            console.error(error)});

     
}

function seartchCustomer() {
    let id = document.getElementById("txtId").value;
    const requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    fetch(`http://localhost:8080/customer/search-by-id/${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);

            if (result) {
                document.getElementById("txtId").value = result.id || "";
                document.getElementById("txtName").value = result.name || "";
                document.getElementById("txtAddress").value = result.address || "";
                document.getElementById("txtSalary").value = result.salary || "";
                alert("Customer Found !");

            }
        })
        .catch((error) =>{
            alert("Failed to customer Found.");
            console.error(error)
        } );
}

function updateCustomer() {
    let id = document.getElementById("txtId").value;
    let name = document.getElementById("txtName").value;
    let address = document.getElementById("txtAddress").value;
    let salary = document.getElementById("txtSalary").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        id: id,
        name: name,
        address: address,
        salary:  salary ,
    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch("http://localhost:8080/customer/update_Customer", requestOptions)
        .then((response) => response.text())
        .then((result) =>{ 
            alert("Customer Update successfully!");
            console.log(result)
            loadCustomer();
            clearFields();
        })
        .catch((error) =>{
            console.error(error)
            alert("Failed to Customer Update.");

        });
    
}

function clearFields() {
    document.getElementById("txtId").value = "";
    document.getElementById("txtName").value = "";
    document.getElementById("txtAddress").value = "";
    document.getElementById("txtSalary").value = "";
}
