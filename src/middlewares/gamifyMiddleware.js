import Gamify from "../utils/gamify.js";

export const attachGamify = async (req, res, next) => {
  if (req.user) {
    req.user.gamify = new Gamify(req.user); // Create Gamify instance ONCE
  }
  next();
};
