export function dataToJson(string) {
  string = string.replace('Result:', ' ');
  let elements = string.split('\n');
  const params = elements[0].split(', ');
  elements.splice(0, 1);

  let result = [];

  elements.forEach((i) => {
    const val = i.split(', ');
    const obj = {};
    params.forEach((key, i) => {
      obj[key] = val[i];
    });
    result.push(obj);
  });

  return result;
}
