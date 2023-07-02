const allowed = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "-",
  "_",
];

export default {
  beforeCreate(event) {
    const { data } = event.params;
    event.params.data.url =
      process.env.ASTRO_HANDBOOK_URL + stringToUrl(data.apartment);
  },
  beforeUpdate(event) {
    const { data } = event.params;
    event.params.data.url =
      process.env.ASTRO_HANDBOOK_URL + stringToUrl(data.apartment);
  },
};

function stringToUrl(value: string) {
  const clean = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s/g, "-")
    .toLowerCase();

  let result = "";

  for (const char of clean) {
    if (allowed.includes(char)) {
      result += char;
    }
  }

  return result;
}
