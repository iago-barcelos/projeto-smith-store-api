const validFieldsUser = {
  id: 3,
  username: 'Helga',
  vocation: 'Curandeira',
  level: 9, 
  password: '$2a$10$amgSIrLf2hPUINRNnxfo7OfG3jiH9Tdow.QNLJORT4jlyycwaOZ3m',
}

const missingUsername = {
  username: "", 
  password: "password",
}

const missingPassword = {
  username: "username", 
  password: "",
}

const invalidUsername = { 
  username: "invalid", 
  password: "password",
};

const invalidPassword = { 
  username: "username", 
  password: "invalid" 
};

const validLogin = { 
  username: "username", 
  password: "password" 
};

export default {
  validFieldsUser,
  missingUsername,
  missingPassword,
  invalidPassword,
  invalidUsername,
  validLogin,
}