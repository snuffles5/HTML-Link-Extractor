// Function to extract URL from an <a> tag
function extractURLFromHTML(html) {
    const urlPattern = /<a\s+href="([^"]+)"[^>]*>(.*?)<\/a>/;
    const match = html.match(urlPattern);
    return match ? match[1] : null;
}

// Listen for clipboard content and redirect if it contains an <a> tag
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const clipboardContent = await navigator.clipboard.readText();
        const extractedURL = extractURLFromHTML(clipboardContent);

        if (extractedURL) {
            // Send message to background script to update tab
            chrome.runtime.sendMessage({ action: 'redirect', url: extractedURL });
        }
    } catch (error) {
        console.error("Error reading clipboard or extracting URL:", error);
    }
});
