import { Schema, model } from "mongoose";

const EmplSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Empl = model("empl", EmplSchema);

export default Empl;