const PRICE_FIELD_PATTERN = /\D+/;

const validatePriceField = (value) => {
  if (PRICE_FIELD_PATTERN.test(value)) {
    value = 0;
  }

  return +value;
};

const ucFirst = (string) => {
  if (!string) {
    return string;
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
};

export { ucFirst, validatePriceField };
