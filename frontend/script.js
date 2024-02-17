let carData = [{
        "odometer": 154000,
        "price": 16800,
        "year": 2012,
        "color": "Unknown",
        "range": "Unknown",
        "advertised": "FB Marketplace - Person",
        "modifications": [""]
    },
    {
        "odometer": 54000,
        "price": 19990,
        "year": 2012,
        "color": "Unknown",
        "range": "Unknown",
        "advertised": "Carsales - Dealer",
        "modifications": [""]
    },
    {
        "odometer": 156000,
        "price": 18000,
        "year": 2012,
        "color": "Unknown",
        "range": "Unknown",
        "advertised": "Carsales - Dealer",
        "modifications": [""]
    },
    {
        "odometer": 84000,
        "price": 22500,
        "year": 2013,
        "color": "Unknown",
        "range": "Unknown",
        "advertised": "FB Marketplace - Person",
        "modifications": [""]
    },
    {
        "odometer": 156000,
        "price": 20500,
        "year": 2014,
        "color": "Unknown",
        "range": "Unknown",
        "advertised": "FB Marketplace - Person",
        "modifications": [""]
    },
    {
        "odometer": 128000,
        "price": 21700,
        "year": 2014,
        "color": "Unknown",
        "range": "GTS",
        "advertised": "Carsales - Dealer",
        "modifications": [""]
    }, {
        "odometer": 106000,
        "price": 24000,
        "year": 2014,
        "color": "Unknown",
        "range": "Unknown",
        "advertised": "Carsales - Dealer",
        "modifications": [""]
    },
    {
        "odometer": 133000,
        "price": 24780,
        "year": 2015,
        "color": "Unknown",
        "range": "Unknown",
        "advertised": "Carsales - Dealer",
        "modifications": [""]
    },
    {
        "odometer": 70000,
        "price": 22900,
        "year": 2015,
        "color": "Unknown",
        "range": "Unknown",
        "advertised": "Carsales - Dealer",
        "modifications": [""]
    },
    {
        "odometer": 95000,
        "price": 26500,
        "year": 2015,
        "color": "Unknown",
        "range": "GTS",
        "advertised": "Carsales - Dealer",
        "modifications": [""]
    },
    {
        "odometer": 80000,
        "price": 25000,
        "year": 2016,
        "color": "Unknown",
        "range": "GT",
        "advertised": "Carsales - Dealer",
        "modifications": [""]
    },
    {
        "odometer": 36000,
        "price": 33990,
        "year": 2016,
        "color": "Unknown",
        "range": "GTS",
        "advertised": "Carsales - Dealer",
        "modifications": [""]
    },
    {
        "odometer": 57000,
        "price": 35000,
        "year": 2016,
        "color": "Unknown",
        "range": "GTS",
        "advertised": "Carsales - Dealer",
        "modifications": [""]
    },
    {
        "odometer": 134000,
        "price": 23950,
        "year": 2016,
        "color": "Unknown",
        "range": "GTS",
        "advertised": "Carsales - Dealer",
        "modifications": [""]
    },

    {
        "odometer": 49000,
        "price": 26990,
        "year": 2017,
        "color": "Unknown",
        "range": "GT",
        "advertised": "Carsales - Dealer",
        "modifications": [""]
    },
    {
        "odometer": 150000,
        "price": 26500,
        "year": 2017,
        "color": "Unknown",
        "range": "GTS",
        "advertised": "Carsales - Dealer",
        "modifications": [""]
    },
    {
        "odometer": 40000,
        "price": 36990,
        "year": 2017,
        "color": "Unknown",
        "range": "Unknown",
        "advertised": "Carsales - Dealer",
        "modifications": [""]
    },

    {
        "odometer": 39000,
        "price": 23950,
        "year": 2018,
        "color": "Unknown",
        "range": "Unknown",
        "advertised": "Carsales - Dealer",
        "modifications": [""]
    }





];

function submitCar() {
    const odometer = document.getElementById('odometer').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;
    const color = document.getElementById('color').value || 'Not specified';
    const range = document.getElementById('range').value || 'Not specified';
    const advertised = document.getElementById('advertised').value || 'Not specified';
    const modifications = document.getElementById('modifications').value || 'Not specified';

    const newCar = {
        odometer: parseInt(odometer),
        price: parseInt(price),
        year: parseInt(year),
        color: color,
        range: range,
        advertised: advertised,
        modifications: modifications,
    };

    carData.push(newCar);
    clearForm();
}

function clearForm() {
    document.getElementById('carForm').reset();
}

function skipToVisualization() {
    document.getElementById('carEntry').style.display = 'none';
    document.getElementById('visualization').style.display = 'block';
    visualizeData();
}

function visualizeData() {
    const years = Array.from(new Set(carData.map(car => car.year)));
    const colors = ['blue', 'green', 'red', 'purple', 'orange', 'brown', 'pink', 'gray', 'cyan', 'magenta', 'yellow'];

    const traces = years.map((year, index) => {
        const carsOfYear = carData.filter(car => car.year === year);

        // Sort the cars by odometer value
        carsOfYear.sort((a, b) => a.odometer - b.odometer);

        const trace = {
            type: 'scatter',
            mode: 'markers+lines',
            x: carsOfYear.map(car => car.odometer),
            y: carsOfYear.map(car => car.price),
            text: carsOfYear.map(car => `Color: ${car.color}<br>Modifications: ${car.modifications}<br>Year: ${car.year}<br>Advertised: ${car.advertised}<br>Range: ${car.range}`),
            marker: {
                size: 10,
                color: colors[index], // Assign a unique color for each year
            },
            line: {
                shape: 'linear',
            },
            name: year.toString(),
        };

        return trace;
    });

    const layout = {
        title: 'Car Visualization',
        xaxis: {
            title: 'Odometer (km)',
        },
        yaxis: {
            title: 'Price (AUD)',
        },
        legend: {
            x: 0.8,
            y: 1
        },
    };

    Plotly.newPlot('plot', traces, layout);

    // Create buttons for each year
    const buttonDiv = document.getElementById('buttons');
    years.forEach((year, index) => {
        const button = document.createElement('button');
        button.textContent = `Show ${year}`;
        button.onclick = function() {
            Plotly.restyle('plot', 'visible', 'legendonly', [...Array(traces.length).keys()]);
            Plotly.restyle('plot', 'visible', true, index);
        };
        buttonDiv.appendChild(button);
    });

    // Create button to show all years
    const allYearsButton = document.createElement('button');
    allYearsButton.textContent = 'Show All Years';
    allYearsButton.onclick = function() {
        Plotly.restyle('plot', 'visible', true, [...Array(traces.length).keys()]);
    };
    buttonDiv.appendChild(allYearsButton);
}

// Additional code for loading existing data
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('carEntry').style.display = 'block';
    document.getElementById('visualization').style.display = 'none';
    visualizeData(); // Call this function to visualize existing data when the page loads
});
