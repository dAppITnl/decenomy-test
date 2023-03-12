class Wait2SecondsClass {
  async okValue() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return "OK";
  }
}

function wait2SecondsFunction() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("OK");
    }, 2000);
  });
}

module.exports = { Wait2SecondsClass, wait2SecondsFunction };
