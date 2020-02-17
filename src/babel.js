(async () => {
  await new Promise(resolve => {
    setTimeout(() => resolve(), 2000);
  });
  console.log("I am async function!");
})();

class Util {
  static id = Date.now();
}

console.log(Util.id);
