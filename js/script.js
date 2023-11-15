function calculateEnergy(event) {
    event.preventDefault();
    const quantity = parseFloat(document.querySelector('input[type="number"][placeholder="1 or 2"]').value);
    const power = parseFloat(document.querySelector('input[type="number"][placeholder="150 or 200"]').value);
    const time = parseFloat(document.querySelector('input[type="number"][placeholder="10 or 15"]').value);

    const energy = (quantity * power * time) / 1000;

    const energyOutput = document.getElementById('energyOutput');
    const unitsConsumed = document.getElementById('unitsConsumed');
    if (!isNaN(energy)) {
        energyOutput.textContent = energy.toFixed(2);
        unitsConsumed.textContent = 'units total consumed';
    } else {
        energyOutput.textContent = 'Invalid input';
    }
}

document.getElementById('powerConsumptionForm').addEventListener('submit', calculateEnergy);

function resetForm() {
    document.getElementById('powerConsumptionForm').reset();
}

function printDetails() {
    window.print();
}