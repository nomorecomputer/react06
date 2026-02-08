function isNumeric(value) {
  // 1. 如果不是字串也不是數字，直接回傳 false (排除 null, undefined, boolean, object)
  if (typeof value !== "string" && typeof value !== "number") return false;

  // 2. 如果是字串，排除只包含空白的情況 (因為 Number(" ") 會變 0)
  if (typeof value === "string" && value.trim() === "") return false;

  // 3. 嘗試轉換並檢查是否為 NaN
  return !isNaN(Number(value));
}
export const taiwanCurrency = (value) => {
  if (!isNumeric(value)) {
    return "NTD$0";
  } else {
    return Number(value).toLocaleString(
      "zh-TW",
      {
        style: "currency",
        currency: "NTD",
        minimumFractionDigits: 0, // 最少小數位數為 0
        maximumFractionDigits: 0,
      }, // 最多小數位數為 0 (自動四捨五入)})
    );
  }
};

export const Currency = (value) => {
  if (!isNumeric(value)) {
    return "NTD$0";
  } else {
    return Number(value).toLocaleString(
      "zh-TW",
      {
        style: "currency",
        currency: "NTD",
        minimumFractionDigits: 0, // 最少小數位數為 0
        maximumFractionDigits: 0,
      }, // 最多小數位數為 0 (自動四捨五入)})
    );
  }
};
