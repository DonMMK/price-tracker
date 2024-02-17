const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'frontend')));

// Handle any other routes by serving index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Write function to get the Information of each of the cars (Price , Odometer, Year, Color, Range, Modifications) using nightmare
const nightmare = require('nightmare')()

// const url = 'https://www.carsales.com.au/cars/toyota/86/queensland-state/'

// nightmare.goto(url)
//     .wait("#currency")
//     .evaluate(() => {
//         const odometer = document.getElementById("currency").innerText
//         return odometer
//     })
//     .end()
//     .then(console.log)
//     .catch(error => {
//         console.error('Search failed:', error)
//     })

// <div class="price">
//     <div class="currency"></div>
//     <a href="/cars/details/2015-toyota-86-gts-manual/SSE-AD-15872854/?Cr=0&amp;gts=SSE-AD-15872854&amp;gtsSaleId=SSE-AD-15872854&amp;gtsViewType=showcase&amp;rankingType=showcase" class="js-encode-search" data-webm-clickvalue="sv-price">$28,500*</a>
// </div>

// Function to fetch car information using Nightmare
async function getCarInfo() {
    try {
        await nightmare
            .goto('https://www.carsales.com.au')
            .wait('.search-form') // Wait for search form to load
            .type('input[name="keywords"]', 'toyota 86')
            .click('select[name="state"] option[value="QLD"]')
            .click('button[type="submit"]')
            .wait('.listing-item') // Wait for listings to load
            .evaluate(() => {
                const listingElements = document.querySelectorAll('.listing-item');
                const carInfoArray = [];

                listingElements.forEach((element) => {
                    const priceElement = element.querySelector('.price');
                    const price = priceElement ? priceElement.textContent.trim() : 'N/A';

                    // Extract other information as needed (adjust selectors)
                    // const odometer = ...
                    // const year = ...
                    // const color = ...
                    // const range = ...
                    // const modifications = ...

                    carInfoArray.push({ price }); // Add other properties as needed
                });

                return carInfoArray;
            });

        console.log(result); // Log the extracted car information
    } catch (error) {
        console.error('Error fetching car information:', error);
    } finally {
        await nightmare.end(); // Close the browser instance
    }
}

// Example usage:
getCarInfo(); // Call the function to fetch car information
