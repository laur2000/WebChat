export const formatTime = (timeSeconds) => {
  const minutes = Math.floor(timeSeconds / 60).toString();
  const seconds = (timeSeconds % 60).toString();

  return AddZeroIfSingleDigit(minutes) + ":" + AddZeroIfSingleDigit(seconds);
};

export const AddZeroIfSingleDigit = (str) =>
  str.length === 1 ? "0" + str : str;
