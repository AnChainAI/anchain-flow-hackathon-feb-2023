export const constants = {
  FLOW_NETWORK: process.env.NEXT_PUBLIC_FLOW_NETWORK,
  GTAG: process.env.NEXT_PUBLIC_GTAG_ID,
  AWS_URL: process.env.NEXT_PUBLIC_AWS_URL,
  APP: {
    TITLE: process.env.NEXT_PUBLIC_APP_TITLE,
    ICON: process.env.NEXT_PUBLIC_APP_ICON
  },
  FLOW_PRICE:
    process.env.NEXT_PUBLIC_FLOW_PRICE != null
      ? parseFloat(process.env.NEXT_PUBLIC_FLOW_PRICE)
      : undefined,
  USD_PRICE:
    process.env.NEXT_PUBLIC_USD_PRICE != null
      ? parseFloat(process.env.NEXT_PUBLIC_USD_PRICE)
      : undefined
}
