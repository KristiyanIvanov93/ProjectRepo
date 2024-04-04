export function showError(message) {
    const errorBox = document.getElementById('errorBox');
    errorBox.textContent = message;
    errorBox.style.display = 'block';

    setTimeout(() => {
        errorBox.textContent = '';
        errorBox.style.display = 'none';
    }, 3000); 
};