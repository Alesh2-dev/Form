document.getElementById('admissionForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = '';

    try {
        const response = await fetch('/sign_up', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData),
        });

        if (response.ok) {
            messageDiv.innerHTML = '<p class="success-message">Form submitted successfully!</p>';
        } else {
            const errorText = await response.text();
            messageDiv.innerHTML = `<p class="error-message">Error: ${errorText}</p>`;
        }
    } catch (err) {
        messageDiv.innerHTML = `<p class="error-message">Failed to submit: ${err.message}</p>`;
    }
});
