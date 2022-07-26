const generateRandomString = (lengthOfString: number) => {
  var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return [...Array(lengthOfString)].reduce(
    (a) => a + p[~~(Math.random() * p.length)],
    ""
  ) as string;
};

export default generateRandomString;
