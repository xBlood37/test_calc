const digits = {
  Z: 2000,
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

function romanToArabic(str) {
  const regular = /^[IVXLCDMZ]+$/i.test(str);
  if (!regular) {
    throw new Error("низя такие цифры, нужны римские, ясно?");
  }

  return str
    .toUpperCase()
    .split("")
    .reduce((r, v, i, arr) => {
      const [a, b, c] = [
        digits[arr[i]],
        digits[arr[i + 1]],
        digits[arr[i + 2]],
      ];
      if (b && c && a <= b && b < c) {
        throw new Error("низя такие цифры, нужны римские, ясно?");
      }
      return b > a ? r - a : r + a;
    }, 0);
}

function arabicToRoman(num) {
  const regular = /^\-?\d+$/.test(num + "");
  if (!regular) {
    throw new Error("никак не могу переделать арабские числа в римские");
  }

  if (num < 1) {
    return "";
  }

  let result = "";
  for (const key in digits) {
    while (num >= digits[key]) {
      result += key;
      num -= digits[key];
    }
  }
  return result;
}

function calculator(str) {
  let latterValid = [];

  str = str.replace(/[^IVXLCDMZ\d+\-*\/]/gi, (ch) => {
    if (ch !== " ") latterValid.push(ch);
    return "";
  });

  if (latterValid.length > 0) {
    throw new Error("низя такие символы");
  }

  let regVars = str.split(/[+\-*\/]/g);

  if (regVars.length !== 2) {
    throw new Error("низя так много, два надо");
  }

  const isRomeNumber = /[IVXLCDMZ]+$/i;

  const r = regVars.reduce((s, v) => s + isRomeNumber.test(v), 0);
  if (r === 1) {
    throw new Error("Числа должны быть арабскими или римскими");
  } else if (r === 2) {
    regVars = regVars.map((v) => romanToArabic(v));
  }

  if (regVars.some((v) => v < 1 || v > 10))
    throw Error("можно только от 1 до 10, больше низя");

  let acr = str.match(/[+\-*\/]/)[0];
  let result = Math.floor(eval(regVars.join(acr)));

  return r === 0 ? result.toString() : arabicToRoman(result);
}
