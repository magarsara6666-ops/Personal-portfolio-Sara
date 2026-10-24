export const PRODUCT = {
  name: "MedStitch Scrub Dress",
  shortName: "Scrub Dress",
  singlePrice: 2200,
  pairPrice: 4000,
  currency: "Rs",
  images: [
    "/images/medstitch-scrub-blue.png",
    "/images/medstitch-scrub-colors.png",
    "/images/medstitch-scrub-fit.png",
    "/images/medstitch-scrub-burgundy.png",
  ],
} as const;

export type DeliveryArea = "inside-ktm" | "outside-ktm";

export function productSubtotal(quantity: number) {
  const pairs = Math.floor(quantity / 2);
  const singles = quantity % 2;
  return pairs * PRODUCT.pairPrice + singles * PRODUCT.singlePrice;
}

export function deliveryFee(area: DeliveryArea) {
  return area === "inside-ktm" ? 100 : 120;
}

export function orderPricing(quantity: number, area: DeliveryArea) {
  const subtotal = productSubtotal(quantity);
  const shipping = deliveryFee(area);
  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
    pricePerPiece: Math.round(subtotal / quantity),
  };
}

export function formatNpr(value: number) {
  return `Rs ${value.toLocaleString("en-NP")}`;
}
