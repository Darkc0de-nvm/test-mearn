import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Ім'я є обов'язковим"],
    },
    email: {
      type: String,
      required: [true, "Email є обов'язковим"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Пароль є обов'язковим"],
    },
    lastName: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: [`user`, `admin`],
      default: `user`,
    },
    avatar: String,
    avatarPublicId: String,
  },
  { timestamps: true },
);

UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
