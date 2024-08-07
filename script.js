/******w**************
    
    Assignment 4 Javascript
    Name: Samuel Musafiri
    Date: 2024-07-03
    Description: Fetching API Data from Winnipeg Open Data Portal

*********************/

// add event listener on search button
document.getElementById('searchForm').addEventListener('submit', function(e) {
    // prevents default loading 
    e.preventDefault();
    
    // store the value of the input inside searchterm variable
    let searchTerm = document.getElementById('searchInput').value.trim();
    // if search term does not exist, return
    if (!searchTerm) {
        return;
    }
    
    // APIURL with all the parameters
    const apiUrl = `https://data.winnipeg.ca/resource/xuqw-wemm.json?$where=lower(complex_name) LIKE lower('%${searchTerm}%')&$order=complex_name ASC&$limit=100`;
    //encode the url
    const encodedURL = encodeURI(apiUrl);
    
    // fetch the url then display results by calling the display results function
    fetch(encodedURL)
        .then(response => response.json())
        .then(data => {
            displayResults(data);
        })
        // if theres an error, error display will show
        .catch(error => {
            console.error('Error fetching data:', error);
            displayError();
        });
});

// function to display results
function displayResults(data) {
    // access the div that will carry the results
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ''; // Clears previous results

    if (data.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">No results found.</p>';
        return;
    }
    // iterrate through all the results
    // and create new div element and in it store h3 tags of all the results
    data.forEach(item => {
        let resultDiv = document.createElement('div');
        resultDiv.className = 'result';
        resultDiv.innerHTML = `<h3>${item.complex_name}</h3><p>${item.address}</p>`;
        resultsContainer.appendChild(resultDiv);
    });
}
// function to display error
function displayError() {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '<p class="no-results">Error fetching data. Please try again later.</p>';
}
