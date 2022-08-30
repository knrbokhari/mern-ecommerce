import User from "../Models/User";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    res.status(200).json(user);
  } catch (e) {
    if (e.code === 11000) return res.status(400).send("Email already exists");
    res.status(400).send(e.message);
  }
};
// export const signup = async (req, res) => {}
// export const signup = async (req, res) => {}
// export const signup = async (req, res) => {}
