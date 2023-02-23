export const constants = {
  FLOW_NETWORK: process.env.NEXT_PUBLIC_FLOW_NETWORK,
  APP: {
    TITLE: process.env.NEXT_PUBLIC_APP_TITLE,
    ICON: process.env.NEXT_PUBLIC_APP_ICON
  },
  IPFS_URL:
    process.env.NEXT_PUBLIC_TENZING_IPFS_BASEURL ??
    'https://ipfs.tenzingai.com/ipfs/'
}
