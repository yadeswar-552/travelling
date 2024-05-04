
async function calculate() {
    // Get user input
    var amount = parseFloat(document.getElementById('amount').value);
    var fromCountry = document.getElementById('fromCountry').value;
    var toCountry = document.getElementById('toCountry').value;

    // Fetch exchange rates from an API
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCountry}`);
        // const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCountry}`);

        const data = await response.json();

        // Get the exchange rate for the selected countries
        const exchangeRate = data.rates[toCountry];

        // Calculate result
        const result = amount * exchangeRate;

        // Display result
        document.getElementById('result').value = result.toFixed(2);
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        alert('Failed to fetch exchange rates. Please try again later.');
    }
}

// Populate country dropdowns dynamically
async function populateCountryDropdowns() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();

        // Sort countries alphabetically by name
        countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

        // Populate dropdowns
        const fromCountryDropdown = document.getElementById('fromCountry');
        const toCountryDropdown = document.getElementById('toCountry');

        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.cca2;
            option.textContent = country.name.common;
            fromCountryDropdown.appendChild(option.cloneNode(true));
            toCountryDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching country list:', error);
        alert('Failed to fetch country list. Please try again later.');
    }
}

// Call populateCountryDropdowns function when the page loads
window.onload = populateCountryDropdowns;
