export function truncateBytes32Hash(bytes32: string): string {
  const [a, b, c, ...others] = bytes32;
  return [
    a,
    b,
    c,
    "...",
    others[others.length - 3],
    others[others.length - 2],
    others[others.length - 1],
  ].join("");
}

export function transformIpfsUri(uri: string): string {
  return uri.replace("ipfs://", "https://ipfs.io/ipfs/");
}
