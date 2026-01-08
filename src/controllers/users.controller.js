import userService from "../services/user.service.js";

class userController {
  constructor() {}

  async register(req, res) {
    const data = await userService.register(req.body);

    res.status(201).json(data);
  }

    async login(req, res) {
    const data = await userService.login(req.body);

    res.status(200).json(data);
  }
}

export default new userController();
