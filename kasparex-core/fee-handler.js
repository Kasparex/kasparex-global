import { getSelectedToken } from './token-selector.js';
import { getWalletAddress } from './wallet.js';
import { showToast } from './notify.js';

const KASPEREX_TREASURY = "kaspa:kasparexMain";
const DEFAULT_FEE = 0.01;

export async function handleDappFee(amount = DEFAULT_FEE) {
  const wallet = getWalletAddress();
  if (!wallet) {
    showToast("Connect wallet to proceed!", "error");
    return;
  }

  const token = getSelectedToken();
  if (!token) {
    showToast("Select a token first!", "error");
    return;
  }

  const tokenShare = (amount * (token.feeSplit / 100)).toFixed(8);
  const kasparexShare = (amount - tokenShare).toFixed(8);

  console.log("💸 Sending fee...");
  console.log(`→ ${tokenShare} KAS to ${token.treasury}`);
  console.log(`→ ${kasparexShare} KAS to ${KASPEREX_TREASURY}`);
  console.log(`From: ${wallet}`);

  showToast("Fee split sent (mock) ✅", "success");

  // Future: Send signed transaction to Kaspa network
}