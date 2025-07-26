export const convertCentsToCurrency = (cents: string | number | undefined) => {
  const centsAsNumber = Number(cents);
  const currency = isNaN(centsAsNumber) ? 0 : centsAsNumber / 100;
  return currency.toFixed(2);
};