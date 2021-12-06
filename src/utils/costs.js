export const getTotalCosts = (costs) => {
  return costs.reduce((acc, cv) => {
    acc += parseFloat(cv.data.amount);
    return acc;
  }, 0);
};
