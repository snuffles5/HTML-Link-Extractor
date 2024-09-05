// Create a context menu item for selected text
chrome.contextMenus.create({
    id: "extractURL",
    title: "Extract URL in new tab",
    contexts: ["selection"]
});

// Function to extract URL from the selected text (assuming it's an <a> tag)
function extractURLFromHTML(text) {
    const urlPattern = /<a\s+href="([^"]+)"[^>]*>(.*?)<\/a>/;
    const match = text.match(urlPattern);
    return match ? match[1] : null;
}

// Listen for clicks on the context menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "extractURL" && info.selectionText) {
        const extractedURL = extractURLFromHTML(info.selectionText);

        if (extractedURL) {
            // Open the extracted URL in a new tab
            chrome.tabs.create({ url: extractedURL });
        } else {
            console.log("No valid URL found in the selected text.");
        }
    }
});
