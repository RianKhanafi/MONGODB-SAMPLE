const { MoneyIn, Spending, CashFlow } = require("../Schema/finance.schema");
module.exports = {
  ADD_NEW_INCOME: (req, res) => {
    const { name, nominal, desription, date } = req.body;
    const moneyData = { name, nominal, desription, date };
    const moneyInSave = new MoneyIn(moneyData);
    moneyInSave
      .save()
      .then((result) => {
        const cashflowData = {
          casin_id: result._id,
          date: result.date,
        };
        const cashFlowSave = new CashFlow(cashflowData);
        cashFlowSave
          .save(cashFlowSave)
          .then((result) => {
            res.json({
              status: 200,
              message: "New Income and Cash Flow Added",
              data: result,
            });
          })
          .catch((error) =>
            res.status(500).json({ status: 500, message: error })
          );
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message: "Insert failed",
        });
      });
  },
  GET_ALL_INCOME: (req, res) => {
    MoneyIn.find()
      .then((result) => {
        res.status(200).json({
          status: 200,
          message: "Income data",
          data: result,
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message: "Faild get Income data",
          data: null,
        });
      });
  },
  ADD_SPENDING: (req, res) => {
    const { name, nominal, desription, date } = req.body;
    const moneyData = { name, nominal, desription, date };
    const SpendingSave = new Spending(moneyData);
    SpendingSave.save()
      .then((result) => {
        const cashflowData = {
          cashout_id: result._id,
          date: result.date,
        };
        const cashFlowSave = new CashFlow(cashflowData);
        cashFlowSave
          .save(cashFlowSave)
          .then((result) => {
            res.json({
              status: 200,
              message: "Income Out and Cash Flow Added",
              data: result,
            });
          })
          .catch((error) =>
            res.status(500).json({ status: 500, message: error })
          );
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message: "Insert failed",
        });
      });
  },
  GET_ALL_SPENDING: (req, res) => {
    Spending.find()
      .then((result) => {
        res.status(200).json({
          status: 200,
          message: "Income data",
          data: result,
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: 500,
          message: "Faild get Income data",
          data: null,
        });
      });
  },
  CASH_FLOW: (req, res) => {
    CashFlow.find()
      .populate("casin_id")
      .populate("cashout_id")
      .lean()
      .exec()
      .then((result) => {
        res.json(result);
      });
  },
  INCOME_DELETE: (req, res) => {
    const { id } = req.query;
    MoneyIn.deleteOne({ _id: id })
      .then(() => {
        res.status(200).json({
          message: "delete success",
        });
      })
      .catch(() => {
        res.status(500).json({
          message: "Delete Fail",
        });
      });
  },
  SPENDING_DELETE: (req, res) => {
    const { id } = req.query;
    Spending.deleteOne({ _id: id })
      .then(() => {
        res.status(200).json({
          message: "delete success",
        });
      })
      .catch(() => {
        res.status(500).json({
          message: "Delete Fail",
        });
      });
  },
  INCOME_UPDATE: (req, res) => {
    const { id } = req.query;
    const { name, nominal, date } = req.body;
    const data = { name, nominal, date };
    MoneyIn.updateOne(
      { _id: id },
      { $set: { ...data }, $currentDate: { lastModified: true } }
    )
      .then(() => {
        res.json({ message: "updateted success" });
      })
      .catch(() => {
        res.status(500).json({
          message: "Delete Fail",
        });
      });
  },
  SPENDING_UPDATE: (req, res) => {
    const { id } = req.query;
    const { name, nominal, date } = req.body;
    const data = { name, nominal, date };
    Spending.updateOne(
      { _id: id },
      { $set: { ...data }, $currentDate: { lastModified: true } }
    )
      .then(() => {
        res.json({ message: "updateted success" });
      })
      .catch(() => {
        res.status(500).json({
          message: "Delete Fail",
        });
      });
  },
};
