document.addEventListener('DOMContentLoaded', () => {
    const copyButton = document.getElementById('copyButton');
    const podcastText = document.getElementById('podcastText');
    const themeToggleButton = document.getElementById('themeToggleButton');
    const body = document.body;

    // Copy to clipboard functionality
    copyButton.addEventListener('click', async () => {
        try {
            // Modern Async Clipboard API
            await navigator.clipboard.writeText(podcastText.value);
            alert('Recommendation copied to clipboard!');
        } catch (err) {
            // Fallback for older browsers or when Async Clipboard API is not available (e.g., mobile Safari without user gesture)
            console.warn('Failed to copy using Async Clipboard API, falling back to execCommand:', err);
            try {
                const successful = copyTextToClipboard(podcastText.value);
                if (successful) {
                    alert('Recommendation copied to clipboard (fallback)!');
                } else {
                    alert('Failed to copy recommendation. Please try manually.');
                }
            } catch (fallbackErr) {
                console.error('Fallback copy failed:', fallbackErr);
                alert('Failed to copy recommendation. Please try manually.');
            }
        }
    });

    function copyTextToClipboard(text) {
        let textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            return successful;
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
            document.body.removeChild(textArea);
            return false;
        }
    }

    // Dark/Light mode toggle functionality
    themeToggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        // Save user preference to localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    } else { // Default to light if no theme or 'light' is saved
        body.classList.remove('dark-mode');
    }
});
