export const Generics = (() => {
  const generateUniqueId = () => {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000000);
    const uniqueInteger = parseInt(`${timestamp}${random}`, 10);
    return uniqueInteger;
  };

  return { generateUniqueId };
})();
