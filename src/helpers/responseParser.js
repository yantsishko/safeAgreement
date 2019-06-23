export function dataToJson(string) {
  string = string.replace('Result:', ' ');
  let elements = string.split('\n');
  const params = elements[0].split(', ');
  elements.splice(0, 1);

  let result = [];

  elements.forEach((i) => {
    let val = i.split('%, ');
    const obj = {};
    params.forEach((key, i) => {
      val[i] = val[i].slice(1);

      val[i] = val[i][val[i].length - 1] === '%' ? val[i].slice(0, -1) : val[i];

      obj[key] = val[i];
    });
    result.push(obj);
  });

  return result;
}
