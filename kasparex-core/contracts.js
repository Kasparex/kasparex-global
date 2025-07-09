import { getWalletAddress } from './wallet.js';
import { showToast } from './notify.js';

export function callReadContract(method, args = []) {
  // Mock for now
  console.log("Calling READ", method, args);
  return Promise.resolve("Mocked read response");
}

export function callWriteContract(method, args = []) {
  const wallet = getWalletAddress();
  if (!wallet) {
    showToast("Connect wallet first!", "error");
    return;
  }

  // Mock write interaction
  console.log("Calling WRITE", method, args, "from", wallet);
  showToast("Transaction broadcasted (mock)", "success");
}