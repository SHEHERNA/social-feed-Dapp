
🚀 Social Feed DApp
A simple, modern Web3 decentralized application (DApp) that lets users post short messages to the blockchain.
Built with Solidity, MetaMask, Ethers.js, HTML/CSS, and a fully redesigned Dark Mode Crypto Dashboard UI.

🌌 Features
🔐 Wallet Connection (MetaMask)

✍️ Create Posts stored permanently on blockchain

📜 Live Feed fetching posts directly from the smart contract

🌙 Dark Mode Crypto Dashboard UI

⚡ Ethers.js v5 integration

🎨 Beautiful gradient buttons, glassmorphism cards, and responsive layout

🪪 Works on test networks like Sepolia, Hoodi, Ganache, etc.

🛠️ Tech Stack
Component	Technology
Smart Contract	Solidity (0.8.x)
Blockchain	Ethereum Testnet (Sepolia/Hoodi/etc.)
Wallet	MetaMask
Frontend	HTML + CSS (Dark Mode Dashboard)
Web3 Connection	Ethers.js v5
Hosting	Localhost or static web server
📁 Folder Structure
/social-feed-dapp
│── index.html
│── styles.css
│── app.js
│── README.md
└── assets/ (optional images)
🧱 Smart Contract
SocialFeed.sol
struct Post {
    address author;
    string text;
    uint256 timestamp;
}

Post[] public posts;

function postMessage(string calldata _text) external { ... }
function getPostsCount() external view returns (uint256) { ... }
function getPost(uint256 index) external view returns (...) { ... }
🌐 Frontend Preview
Your interface includes:

Gradient navbar

Glow Connect Wallet button

Frosted glass cards

Dark background gradient

Modern feed layout

🚀 How to Run Locally
1. Clone the repo
git clone https://github.com/your-username/social-feed-dapp.git
cd social-feed-dapp
2. Install MetaMask
👉 https://metamask.io

Create/import a wallet and switch to a test network.

3. Deploy the Smart Contract
Open Remix IDE

Create a new file → paste the contract

Compile with 0.8.x

Deploy using Injected Provider (MetaMask)

Copy:

Contract Address

ABI

4. Add Your Contract Details in app.js
const CONTRACT_ADDRESS = "your_contract_address_here";
const CONTRACT_ABI = [ ...ABI here... ];
5. Start Local Server
Browsers block Web3 scripts without a server.

python -m http.server 8000
Then open:

👉 http://localhost:8000

💎 UI Sneak Peek
Dark Mode Crypto Dashboard
Neon gradient buttons

Glass cards

Smooth animations

Web3-ready layout

🧪 Testing the DApp
Click Connect Wallet

Approve connection in MetaMask

Enter a short message → Post Message

Confirm transaction

Refresh feed → 🎉 Your post is on-chain

📦 Deployment Options
You can deploy your frontend easily:

GitHub Pages
Push your project →
Go to Settings → Pages → Deploy from root

Vercel
vercel deploy
Netlify
Drag & drop the folder

🛡️ Security Notes
Never store private keys in frontend

Always use testnets for development

Validate user input in smart contracts for production

