// function loadCustomer(){
//     fetch("http://localhost:8080/customer/getAll")
//     .then(res=>res.json())
//     .then(data=>console.log(data)
//     )
// }
// loadCustomer();


function loadCustomer() {
    fetch("http://localhost:8080/customer/getAll")
        .then(res => res.json())
        .then(data => {
            console.log(data)

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

            data.forEach(customer => {
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
        })
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
        "name": name,
        "address": address,
        "salary": salary
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };
    
    fetch("http://localhost:8080/customer/add", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
   

}


