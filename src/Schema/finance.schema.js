const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Types } = mongoose;

const moneyIn = new Schema(
  {
    _id: Schema.Types.ObjectId,
    name: {
      type: String,
      trim: true,
      require: true,
    },
    nominal: {
      type: Number,
      require: true,
    },
    desription: {
      type: String,
      trim: true,
      require: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "money_in",
  }
);

const MoneyOut = new Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
    },
    nominal: {
      type: Number,
      require: true,
    },
    desription: {
      type: String,
      trim: true,
      require: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "money_out",
  }
);

const cFlow = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    casin_id: [{ type: Types.ObjectId, ref: "cash_in" }],
    cashout_id: [{ type: Types.ObjectId, ref: "spending" }],
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "cash_flow",
  }
);

const MoneyIn = mongoose.model("cash_in", moneyIn);
const Spending = mongoose.model("spending", MoneyOut);
const CashFlow = mongoose.model("cash_flow", cFlow);
module.exports = {
  MoneyIn,
  Spending,
  CashFlow,
};
