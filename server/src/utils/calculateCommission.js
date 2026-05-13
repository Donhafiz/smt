export const calculateCommission = (
  total,
  rate
) => {

  const commission =
    (total * rate) / 100

  const vendorEarning =
    total - commission

  return {
    commission,
    vendorEarning
  }

}