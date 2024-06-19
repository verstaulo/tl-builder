export const keyToTitle = (string: string) => {
  const result = string.split("_").map((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  return result.join(" ");
};
