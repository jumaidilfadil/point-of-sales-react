const PercentFormat = num => {
  return `${num > 0 ? '+' : ''}${parseFloat(num).toFixed(2)}%`;
};

export default PercentFormat;
