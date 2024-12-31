const formatToDecimal = (number) => {
  if (number > 10) {
    number = number / 1000;
  }
  const truncated = Math.floor(number * 10) / 10;
  return truncated.toFixed(1);
};

export { formatToDecimal };
