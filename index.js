// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="
// Your code here!
/**
 * Step 1: Fetch Alerts for a State from the API
 */
async function fetchWeatherAlerts(state) {
  const display = document.getElementById('alerts-display');
  const errorDiv = document.getElementById('error-message');

  try {
    const response = await fetch(`https://api.weather.gov/alerts/active?area=${state}`);
    
    if (!response.ok) {
      throw new Error(`Invalid state or API error (Status: ${response.status})`);
    }

    const data = await response.json();
    console.log("API Data:", data); // Log for testing (Step 1)
    
    displayAlerts(data, state);
  } catch (errorObject) {
    // Step 4: Handle network and API errors
    console.log(errorObject.message);
    showError(errorObject.message);
  }
}

/**
 * Step 2: Display the Alerts on the Page
 */
function displayAlerts(data, stateFull) {
  const display = document.getElementById('alerts-display');
  const alerts = data.features;
  
  // Create summary message
  const summary = document.createElement('h3');
  summary.textContent = `Current watches, warnings, and advisories for ${stateFull}: ${alerts.length}`;
  display.appendChild(summary);

  // Create list of headlines
  const list = document.createElement('ul');
  alerts.forEach(alert => {
    const listItem = document.createElement('li');
    listItem.textContent = alert.properties.headline;
    list.appendChild(listItem);
  });
  
  display.appendChild(list);
}

/**
 * Step 4: Error Handling UI
 */
function showError(msg) {
  const errorDiv = document.getElementById('error-message');
  errorDiv.textContent = msg;
  errorDiv.classList.remove('hidden');
}

/**
 * Step 3: Clear and Reset the UI
 */
function resetUI() {
  const display = document.getElementById('alerts-display');
  const errorDiv = document.getElementById('error-message');
  const input = document.getElementById('state-input');

  display.innerHTML = "";
  errorDiv.textContent = "";
  errorDiv.classList.add('hidden');
  // Optional Step 3: Clear input field
  // input.value = ""; 
}

// Event Listener to trigger the logic
document.getElementById('fetch-alerts').addEventListener('click', () => {
  const stateInput = document.getElementById('state-input');
  const stateValue = stateInput.value.trim().toUpperCase();

  // Reset UI before new request
  resetUI();

  // Step 5: Simple Input Validation
  if (stateValue.length !== 2) {
    showError("Please enter a 2-letter state abbreviation.");
    return;
  }

  fetchWeatherAlerts(stateValue);
  
  // Step 3: Clear input field after submit
  stateInput.value = "";
});