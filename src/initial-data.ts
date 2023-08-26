import { InitialData, LanguageCode } from "@vendure/core";

export const initialData: InitialData = {
  paymentMethods: [
    {
      name: "COD",
      handler: {
        code: "dummy-payment-handler",
        arguments: [{ name: "automaticSettle", value: "true" }],
      },
    },
  ],
  roles: [],
  defaultLanguage: LanguageCode.vi,
  countries: [{ name: "Viet Nam", code: "VN", zone: "Asia" }],
  defaultZone: "Asia",
  taxRates: [
    { name: "Standard", percentage: 0 },
    { name: "Zero Tax", percentage: 0 },
  ],
  shippingMethods: [
    { name: "Standard Shipping", price: 0 },
    { name: "Express Shipping", price: 0 },
  ],
  collections: [],
};
