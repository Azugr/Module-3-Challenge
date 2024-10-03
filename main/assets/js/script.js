// Declare the employees array globally
let employees = []; // Declare the employees array once

// Function to collect employee data
function collectEmployees() {
    let addMore = true;

    while (addMore) {
        // Initialize an array to store error messages
        let errorMessages = [];
        
        // Prompt for employee details
        const firstName = prompt("Enter first name:").trim();
        if(firstName === null) break; //Exit if canceled

        const lastName = prompt("Enter last name:").trim();
        if(lastName === null) break; //Exit if canceled

        let salaryInput = prompt("Enter salary (non-negative number):");
        if(salaryInput === null) break; //Exit if canceled

        let salary = parseFloat(salaryInput);

        // Validate inputs (checks if name is just empty or whitespace)
        if (!firstName) {
            errorMessages.push("First name cannot be empty or just whitespace.");
        }

        if (!lastName) {
            errorMessages.push("Last name cannot be empty or just whitespace.");
        }

        // Validate salary input (non-negative number)
        if (isNaN(salary) || salary < 0) {
            errorMessages.push("Salary must be a non-negative number.");
            salary = 0; //Default to $0 if input is not a valid number
        }

        // If there are errors with names,display them in a single alert and continue the loop
        if (errorMessages.length > 0) {
            alert(errorMessages.join("\n")); // Display all error messages at once
            continue; // Skip to the next iteration
        }

        // Log employee details before adding them to the array
        console.log(`Adding employee: ${firstName} ${lastName} with salary ${salary}`);
        
        // Add employee object to the array
        employees.push({ firstName, lastName, salary });

        // Log the current employees array after each addition
        console.log("Current employees list:", employees);

        // Ask if the user wants to add another employee
        addMore = confirm("Would you like to add another employee?");
    }

    // Function to track employee data
    trackEmployeeData();

    return employees; //Return the employees array
}

function trackEmployeeData(){
    // Sort employees by last name
    employees.sort((a, b) => a.lastName.localeCompare(b.lastName));

    // Display the employees and calculate the average salary
    displayEmployees(employees);
    displayAverageSalary(employees);
    getRandomEmployee(employees);
}

// Function to display employees in a table
function displayEmployees(employeeArray) {
    const employeeList = document.getElementById('employee-list');
    employeeList.innerHTML = ''; // Clear existing rows

    employeeArray.forEach(employee => {
    const employeeRow = document.createElement('tr');
    employeeRow.innerHTML = `
        <td>${employee.firstName}</td>
        <td>${employee.lastName}</td>
        <td>$${employee.salary.toFixed(2)}</td>
        `;
        employeeList.appendChild(employeeRow); // Don't forget to append the row to the table
    });
}
        
// Function to calculate and display the average salary
function displayAverageSalary(employees) {
    if (!Array.isArray(employees) || employees.length === 0) {
        console.log("No employees to calculate average salary.");
        return;
    }

    let validSalaryCount = 0;
    const totalSalary = employees.reduce((total, employee) => {
        const salary = parseFloat(employee.salary);
        if (!isNaN(salary)) {
            validSalaryCount++;
            return total + salary;
        }
        return total;
    }, 0);

    // Calculate the average salary
    const averageSalary = validSalaryCount > 0 ? (totalSalary / validSalaryCount).toFixed(2) : 0;

    // Log the result using backticks for template literals
    console.log(`The average employee salary between our ${employees.length} employee(s) is $${averageSalary}`);
}

    // Function to randomly select an employee
    function getRandomEmployee(employees) {
    if (!Array.isArray(employees) || employees.length === 0) {
        console.log("No employees available for the drawing.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * employees.length);
    const randomEmployee = employees[randomIndex];

    // Log the selected employee directly
    console.log(`Congratulations to ${randomEmployee.firstName} ${randomEmployee.lastName}, our random drawing winner!`);
    }

    // Attach event listener to the button
    const addEmployeeButton = document.getElementById('add-employee');
    if (addEmployeeButton) {
        addEmployeeButton.addEventListener('click', collectEmployees);
    } else {
        console.error("Button with ID 'add-employee' not found.");
    }

