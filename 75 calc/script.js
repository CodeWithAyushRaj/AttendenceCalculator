// Function to calculate the required classes and display the current percentage
function calculate() {
    const totalClasses = parseFloat(document.getElementById('totalClasses').value);
    const attendedClasses = parseFloat(document.getElementById('attendedClasses').value);
    const targetPercentage = parseFloat(document.getElementById('targetPercentage').value);

    clearErrorStyles(); // Clear any previous error highlights

    if (isNaN(totalClasses) || isNaN(attendedClasses) || isNaN(targetPercentage)) {
        showErrorMessage("Please fill out all fields.");
        return;
    }

    const currentPercentage = (attendedClasses / totalClasses) * 100;

    if (currentPercentage >= targetPercentage) {
        showSuccessMessage("You have already achieved your target!");
    } else {
        const requiredClasses = Math.ceil(((targetPercentage * totalClasses) - (attendedClasses * 100)) / (100 - targetPercentage));
        showSuccessMessage(`You need to attend ${requiredClasses} more classes to reach ${targetPercentage}%.`);
    }
}

// Function to validate inputs (no negative numbers and check current percentage)
function validateInputs() {
    const totalClasses = parseFloat(document.getElementById('totalClasses').value);
    const attendedClasses = parseFloat(document.getElementById('attendedClasses').value);

    clearErrorStyles(); // Clear any previous error highlights

    // Check for negative numbers
    if (totalClasses < 0 || attendedClasses < 0) {
        showErrorMessage("Values cannot be negative.");
        return;
    }

    // Show the current percentage if both total and attended classes are valid numbers
    if (!isNaN(totalClasses) && !isNaN(attendedClasses) && totalClasses > 0) {
        const currentPercentage = (attendedClasses / totalClasses) * 100;
        document.getElementById('currentPercentage').textContent = `Current Percentage: ${currentPercentage.toFixed(2)}%`;
    } else {
        document.getElementById('currentPercentage').textContent = '';
    }

    document.getElementById('result').textContent = ''; // Clear previous results
}

// Function to show error messages in red
function showErrorMessage(message) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = message;
    resultElement.classList.remove('success');
    resultElement.classList.add('error');
    highlightInvalidInputs();
}

// Function to show success messages in green
function showSuccessMessage(message) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = message;
    resultElement.classList.remove('error');
    resultElement.classList.add('success');
}

// Highlight input fields with invalid data
function highlightInvalidInputs() {
    const totalClassesInput = document.getElementById('totalClasses');
    const attendedClassesInput = document.getElementById('attendedClasses');
    const targetPercentageInput = document.getElementById('targetPercentage');

    if (totalClassesInput.value < 0) {
        totalClassesInput.classList.add('invalid');
    }
    if (attendedClassesInput.value < 0) {
        attendedClassesInput.classList.add('invalid');
    }
    if (targetPercentageInput.value === "" || isNaN(targetPercentageInput.value)) {
        targetPercentageInput.classList.add('invalid');
    }
}

// Clear error highlighting on inputs
function clearErrorStyles() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.classList.remove('invalid'));
    document.getElementById('result').textContent = '';
}
