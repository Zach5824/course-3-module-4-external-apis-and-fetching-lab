// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="
// Your code here!
document.addEventListener('DOMContentLoaded', function() {
  const button = document.getElementById('fetch-alerts');
  const input = document.getElementById('state-input');
  const alertsDisplay = document.getElementById('alerts-display');
  const errorMessage = document.getElementById('error-message');
}

  button.addEventListener('click', async function() {
    const state = input.value;
    input.value = '';
    alertsDisplay.innerHTML = '';
    errorMessage.innerHTML = '';
    errorMessage.classList.add('hidden');
}

try {
  const response = await fetch('https://api.weather.gov/alerts/active?area=' + state);
  const data = await response.json();

  alertsDisplay.innerHTML = '<p>' + data.title + ': ' + data.features.length + '</p>';

  data.features.forEach(function(feature) {
    const p = document.createElement('p');
    p.textContent = feature.properties.headline;
    alertsDisplay.appendChild(p);
  });
} 
catch(error) {
  errorMessage.textContent = 'Error: ' + error.message;
  errorMessage.classList.remove('hidden');
}