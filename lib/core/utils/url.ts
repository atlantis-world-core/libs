export function formatIPFSToCloudflareURL(value: string) {
  return value.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/");
}
