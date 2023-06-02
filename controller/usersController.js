const { generateToken, validateToken } = require("../config/token");
const { Users } = require("../models");

const signup = async (req, res) => {
  try {
    const existingUser = await Users.findOne({
      where: { email: req.body.email },
    });
    if (existingUser) {
      return res.status(409).send("El correo electrónico ya está registrado");
    }
    await Users.create(req.body);
    res.send("usuario creado exitosamente").status(200);
  } catch (err) {
    res.send(err);
  }
};

const login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { email: req.body.email },
    });
    if (!user) return res.sendStatus(401);
    const { id, admin, name, lastName, email, phoneNumber } = user;
    user.validatePassword(req.body.password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);
      else {
        const token = generateToken({
          id,
          admin,
          name,
          lastName,
          email,
          phoneNumber,
        });
        res.cookie("token", token);
        res.sendStatus(200);
      }
    });
  } catch (err) {
    res.status(404).send(err);
  }
};

const secret = (req, res) => {
  const { payload } = validateToken(req.cookies.token);
  req.user = payload;
  res.send(payload);
};

const me = (req, res) => {
  res.send(req.user);
};

module.exports = { signup, login, secret, me };
