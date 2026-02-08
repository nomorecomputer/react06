export const emailValidator = {
  required: "請輸入Email",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "必須符合Email格式",
  },
};

export const emailPattern = {
  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  message: "必須符合Email格式",
};
