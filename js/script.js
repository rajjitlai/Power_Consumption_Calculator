document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('powerForm');
    const resultsContainer = document.getElementById('results');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get values
        const applianceName = document.getElementById('applianceName').value;
        const quantity = parseFloat(document.getElementById('quantity').value) || 1;
        const powerWatts = parseFloat(document.getElementById('powerWatts').value) || 0;
        const hoursPerDay = parseFloat(document.getElementById('hoursPerDay').value) || 0;
        const daysPerMonth = parseFloat(document.getElementById('daysPerMonth').value) || 30;
        const costPerUnit = parseFloat(document.getElementById('costPerUnit').value) || 0;
        
        // Calculations
        // Daily Energy in kWh = (Watts * Hours) / 1000 * Quantity
        const dailyEnergyKwh = ((powerWatts * hoursPerDay) / 1000) * quantity;
        
        // Monthly Energy in kWh = Daily Energy * Days per Month
        const monthlyEnergyKwh = dailyEnergyKwh * daysPerMonth;
        
        // Monthly Cost = Monthly Energy * Cost per Unit
        const monthlyCostBase = monthlyEnergyKwh * costPerUnit;
        
        // Display Results
        document.getElementById('dailyEnergy').textContent = `${dailyEnergyKwh.toFixed(2)} kWh`;
        document.getElementById('monthlyEnergy').textContent = `${monthlyEnergyKwh.toFixed(2)} kWh`;
        
        const costInrElement = document.getElementById('monthlyCostInr');
        const costUsdElement = document.getElementById('monthlyCostUsd');
        
        if (costPerUnit > 0) {
            // We'll show the base input as both for convenience or you can specify.
            // Since the user asked for "both", we can display the input as INR and convert to USD, 
            // or vice versa. Let's assume input is INR and provide USD equivalent at approx 83 rate.
            // Or better yet, just treat the 'cost' as a number and prefix it.
            costInrElement.textContent = `₹${monthlyCostBase.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
            
            // Assuming the input was in INR, convert to USD (approx 1 USD = 83 INR)
            const approxUsd = monthlyCostBase / 83;
            costUsdElement.textContent = `$${approxUsd.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        } else {
            costInrElement.textContent = '₹0.00';
            costUsdElement.textContent = '$0.00';
        }
        
        // Set print date
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' };
        document.getElementById('printDate').textContent = new Date().toLocaleDateString(undefined, dateOptions);
        
        // Show results with animation
        resultsContainer.classList.remove('hidden');
        
        // Optional: Scroll to results on mobile
        if (window.innerWidth <= 640) {
            resultsContainer.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

function resetForm() {
    const form = document.getElementById('powerForm');
    const resultsContainer = document.getElementById('results');
    
    form.reset();
    resultsContainer.classList.add('hidden');
    
    // Reset focus to first input
    document.getElementById('applianceName').focus();
}