import { commentModel } from "../../../Database/models/comment.model.js";
import { postModel } from "../../../Database/models/post.model.js";
import { userModel } from "../../../Database/models/user.model.js";
import bcrypt from "bcrypt";

// * =================== GET ALL USERS ===============================
export const getUsers = async (req, res) => {
  const users = await userModel.findAll();
  res.status(201).json({ message: "sucess ", users });
};

// * ==================  ADD USER WITH UNIQUE E-MAIL  ======================

export const addUser = async (req, res) => {
    const { username, email, password } = req.body;

    // Validate user input
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill in all fields" });
    }

    // Check if email is already in use
    const existingUser = await userModel.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already in use" });
    }

    // Hash password
    const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const user = await userModel.create({username, email, password: hashedPassword });

    // Return success response
    res.status(201).json({ success: true, message: "User created successfully", user });
  } 

// * =================== LOGIN USER ===============================


export const loginUser = async (req, res) =>{
  const { email, password } = req.body;

  // Find the user in the database
  const user = await userModel.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: 'Incorrect username or password.' });
  }

  // Check the password using bcrypt
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return res.status(401).json({ message: 'Incorrect username or password.' });
  }

  // Login successful, return a token or session
  res.status(200).json({
        success: true,
        message: "User login successfully",
      });
    }
// * =================== DELETE USER ===============================

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await userModel.destroy({ where: { id } });
  if (!user) {
    return res.status(404).json({ message: "user Not Found" });
  }
  res.status(201).json({ message: "User deleted successfully", user });
};

// * =================== UPDATE USER ===============================

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, email } = req.body;
  const user = await userModel.update(
    { username, password, email },
    { where: { id } }
  );
  if (!user[0]) {
    return res.status(404).json({ message: "user Not Found" });
  }
  res.status(201).json({ message: "User updated successfully", user });
};

// * =================== GET USER BY ID WITH POSTS AND COMMENTS ===============================

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userModel.findOne({
    where: { id },
    include: {
      model: postModel,
      attributes: ["title", "content"],
      include: {
        model: commentModel,
        attributes: ["content"],
      },
    },
  });
  if (!user) {
    return res.status(404).json({ message: "user Not Found" });
  }
  res.status(201).json({ message: "User found successfully", user });
};
