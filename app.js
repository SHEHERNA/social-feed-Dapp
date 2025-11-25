// ========= CONFIG =========
const CONTRACT_ADDRESS = "0x8F3e46b9DD9c147986e1378efc77b6d66fbaAa9B";

const CONTRACT_ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "author",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "text",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "NewPost",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_text",
                "type": "string"
            }
        ],
        "name": "postMessage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getPost",
        "outputs": [
            {
                "internalType": "address",
                "name": "author",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "text",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPostsCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "posts",
        "outputs": [
            {
                "internalType": "address",
                "name": "author",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "text",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];


// ========= DOM ELEMENTS =========
const connectButton = document.getElementById('connectButton');
const accountDiv = document.getElementById('account');
const networkDiv = document.getElementById('network');
const postBox = document.getElementById('postBox');
const messageInput = document.getElementById('messageInput');
const postButton = document.getElementById('postButton');
const feedDiv = document.getElementById('feed');
const statusDiv = document.getElementById('status');
const refreshButton = document.getElementById('refreshButton');

let provider, signer, contract;


// ========= CONNECT WALLET =========
async function connectWallet() {
    if (!window.ethereum) {
        alert("MetaMask not detected. Install MetaMask.");
        return;
    }

    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    signer = provider.getSigner();
    const address = await signer.getAddress();
    const network = await provider.getNetwork();

    connectButton.innerText = "Connected";
    connectButton.disabled = true;

    accountDiv.innerText = `Account: ${address}`;
    networkDiv.innerText = `Network: ${network.name} (chainId: ${network.chainId})`;

    postBox.classList.remove('hidden');

    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    loadFeed();
}


// ========= LOAD FEED =========
async function loadFeed() {
    feedDiv.innerHTML = '';

    if (!contract) return;

    try {
        const count = await contract.getPostsCount();
        const n = count.toNumber();

        if (n === 0) {
            feedDiv.innerHTML = '<div class="muted">No posts yet.</div>';
            return;
        }

        for (let i = n - 1; i >= 0; i--) {
            const post = await contract.getPost(i);
            const author = post[0];
            const text = post[1];
            const timestamp = new Date(post[2] * 1000);

            const box = document.createElement('div');
            box.className = "post";

            box.innerHTML = `
                <div class="meta">${author} • ${timestamp.toLocaleString()}</div>
                <div>${escapeHtml(text)}</div>
            `;

            feedDiv.appendChild(box);
        }

    } catch (error) {
        console.error(error);
        feedDiv.innerHTML = '<div class="muted">Error loading posts.</div>';
    }
}


// ========= POST MESSAGE =========
postButton.onclick = async () => {
    const text = messageInput.value.trim();
    if (!text) return alert("Message cannot be empty");

    postButton.disabled = true;
    statusDiv.innerText = "Waiting for MetaMask confirmation...";

    try {
        const tx = await contract.postMessage(text);
        await tx.wait();

        statusDiv.innerText = "Posted successfully!";
        messageInput.value = "";

        loadFeed();
    } catch (err) {
        console.error(err);
        statusDiv.innerText = "Transaction failed.";
    }

    postButton.disabled = false;
};


// ========= HELPER =========
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}


// ========= EVENT LISTENERS =========
connectButton.onclick = connectWallet;
refreshButton.onclick = loadFeed;


// ========= CONFIG =========
const CONTRACT_ADDRESS = "0x8F3e46b9DD9c147986e1378efc77b6d66fbaAa9B";

const CONTRACT_ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "author",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "text",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "NewPost",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_text",
                "type": "string"
            }
        ],
        "name": "postMessage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getPost",
        "outputs": [
            {
                "internalType": "address",
                "name": "author",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "text",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPostsCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "posts",
        "outputs": [
            {
                "internalType": "address",
                "name": "author",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "text",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];


// ========= DOM ELEMENTS =========
const connectButton = document.getElementById('connectButton');
const accountDiv = document.getElementById('account');
const networkDiv = document.getElementById('network');
const postBox = document.getElementById('postBox');
const messageInput = document.getElementById('messageInput');
const postButton = document.getElementById('postButton');
const feedDiv = document.getElementById('feed');
const statusDiv = document.getElementById('status');
const refreshButton = document.getElementById('refreshButton');

let provider, signer, contract;


// ========= CONNECT WALLET =========
async function connectWallet() {
    if (!window.ethereum) {
        alert("MetaMask not detected. Install MetaMask.");
        return;
    }

    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    signer = provider.getSigner();
    const address = await signer.getAddress();
    const network = await provider.getNetwork();

    connectButton.innerText = "Connected";
    connectButton.disabled = true;

    accountDiv.innerText = `Account: ${address}`;
    networkDiv.innerText = `Network: ${network.name} (chainId: ${network.chainId})`;

    postBox.classList.remove('hidden');

    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    loadFeed();
}


// ========= LOAD FEED =========
async function loadFeed() {
    feedDiv.innerHTML = '';

    if (!contract) return;

    try {
        const count = await contract.getPostsCount();
        const n = count.toNumber();

        if (n === 0) {
            feedDiv.innerHTML = '<div class="muted">No posts yet.</div>';
            return;
        }

        for (let i = n - 1; i >= 0; i--) {
            const post = await contract.getPost(i);
            const author = post[0];
            const text = post[1];
            const timestamp = new Date(post[2] * 1000);

            const box = document.createElement('div');
            box.className = "post";

            box.innerHTML = `
                <div class="meta">${author} • ${timestamp.toLocaleString()}</div>
                <div>${escapeHtml(text)}</div>
            `;

            feedDiv.appendChild(box);
        }

    } catch (error) {
        console.error(error);
        feedDiv.innerHTML = '<div class="muted">Error loading posts.</div>';
    }
}


// ========= POST MESSAGE =========
postButton.onclick = async () => {
    const text = messageInput.value.trim();
    if (!text) return alert("Message cannot be empty");

    postButton.disabled = true;
    statusDiv.innerText = "Waiting for MetaMask confirmation...";

    try {
        const tx = await contract.postMessage(text);
        await tx.wait();

        statusDiv.innerText = "Posted successfully!";
        messageInput.value = "";

        loadFeed();
    } catch (err) {
        console.error(err);
        statusDiv.innerText = "Transaction failed.";
    }

    postButton.disabled = false;
};


// ========= HELPER =========
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}


// ========= EVENT LISTENERS =========
connectButton.onclick = connectWallet;
refreshButton.onclick = loadFeed;


