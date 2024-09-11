import React, { useState } from "react";
import { Line, Pie } from "@ant-design/charts";
import "./style.css";
import noTransaction from "../../src/assets/6024630.webp";
const Charts = ({ transactions, sortTransactions }) => {
  const [allDataChart, setAllDataChart] = useState(true);
  const [incomeDataChart, setincomeDataChart] = useState(false);
  const [expenseDataChart, setExpenseDataChart] = useState(false);
  const [incomeDataPie, setincomeDataPie] = useState(false);
  const [expenseDataPie, setExpenseDataPie] = useState(true);
  // const [message, setMessage] = useState("");

  // chart

  function allHandleChart() {
    setAllDataChart(true);
    setExpenseDataChart(false);
    setincomeDataChart(false);
  }

  function incomeHandleChart() {
    setAllDataChart(false);
    setExpenseDataChart(false);
    setincomeDataChart(true);
  }

  function expenseHandleChart() {
    setAllDataChart(false);
    setExpenseDataChart(true);
    setincomeDataChart(false);
  }

  //pie chart

  function handleIncome() {
    setincomeDataPie(true);
    setExpenseDataPie(false);
  }

  function handleExpense() {
    setExpenseDataPie(true);
    setincomeDataPie(false);
   
  }

  const DataAll = sortTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });

  const dataIncome = sortTransactions.filter((item) => {
    if (item.type === "income") {
      return { date: item.date, amount: item.amount };
    }
  });

  const dataExpense = sortTransactions.filter((item) => {
    if (item.type === "expense") {
      return { date: item.date, amount: item.amount };
    }
  });

  const spendingDataExpense = sortTransactions.filter((transaction) => {
    if (transaction.type === "expense") {
      return { tag: transaction.tag, amount: transaction.amount };
    }
  });

  let newSpending = [
    { tag: "food", amount: 0 },
    { tag: "education", amount: 0 },
    { tag: "office", amount: 0 },
  ];

  spendingDataExpense.forEach((item) => {
    if (item.tag === "food") {
      newSpending[0].amount += item.amount;
    } else if (item.tag === "education") {
      newSpending[1].amount += item.amount;
    } else {
      newSpending[2].amount += item.amount;
    }
  });

  //income
  const spendingDataIncome = sortTransactions.filter((transaction) => {
    if (transaction.type === "income") {
      return { tag: transaction.tag, amount: transaction.amount };
    }
  });

  let newSpendingIncome = [
    { tag: "salary", amount: 0 },
    { tag: "freelance", amount: 0 },
    { tag: "investment", amount: 0 },
  ];

  spendingDataIncome.forEach((item) => {
    if (item.tag === "salary") {
      newSpendingIncome[0].amount += item.amount;
    } else if (item.tag === "freelance") {
      newSpendingIncome[1].amount += item.amount;
    } else {
      newSpendingIncome[2].amount += item.amount;
    }
  });

  const configAll = {
    data: DataAll,
    autoFit: true,
    xField: "date",
    yField: "amount",

    point: {
      size: 5,
      shape: "diamond",
    },

    label: {
      style: {
        fill: "#000",
      },
    },
  };

  const configIncome = {
    data: dataIncome,
    autoFit: true,
    xField: "date",
    yField: "amount",

    point: {
      size: 5,
      shape: "diamond",
    },

    label: {
      style: {
        fill: "#000",
      },
    },
  };

  const configExpense = {
    data: dataExpense,
    autoFit: true,
    xField: "date",
    yField: "amount",

    point: {
      size: 5,
      shape: "diamond",
    },

    label: {
      style: {
        fill: "#000",
      },
    },
  };

  const spendingConfigIncome = {
    data: spendingDataIncome,
    angleField: "amount",
    colorField: "tag",
    radius: 1,
    innerRadius: 0.55,
  
  };

  const spendingConfigExpense = {
    data: spendingDataExpense,
    angleField: "amount",
    colorField: "tag",
    radius: 1,
    innerRadius: 0.55,
  };

  let chartAll;
  let chartIncome;
  let chartExpense;
  let pieChartIncome;
  let pieChartExpense;

  return (
    <div className="charts">
      {transactions.length !== 0 ? (
        <div className="charts">
          <div className="line">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className="heading"
            >
              <h2 style={{ paddingBottom: "30px" }}>Financial Statastics</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent:'center',
                  alignItems: "center",
                  marginRight: "180px",
                  
                }}
              >
                <p className="para-chart" onClick={allHandleChart}>
                  <span
                    style={{
                      fontSize: "50px",
                      color: "black",
                      marginRight: "5px",
                    }}
                  >
                    •
                  </span>
                  All
                </p>
                <p className="para-chart" onClick={incomeHandleChart}>
                  <span
                    style={{
                      fontSize: "50px",
                      color: "green",
                      marginRight: "5px",
                    }}
                  >
                    •
                  </span>
                  Money Income
                </p>
                <p className="para-chart" onClick={expenseHandleChart}>
                 
                  <span
                    style={{
                      fontSize: "50px",
                      color: "rgb(163, 13, 13)",
                      marginRight: "2px",
                    }}
                  >
                    •
                  </span>
                  Spending
                </p>
              </div>
            </div>
            <div
              style={allDataChart ? { display: "block" } : { display: "none" }}
            >
              <Line
                className="chart-line"
                {...configAll}
                onReady={(chartInstance) => (chartAll = chartInstance)}
              
              />
            </div>
            <div
              style={
                incomeDataChart ? { display: "block" } : { display: "none" }
              }
            >
              <Line
                className="chart-line"
                {...configIncome}
                onReady={(chartInstance) => (chartIncome = chartInstance)}
               
              />
            </div>

            <div
              style={
                expenseDataChart ? { display: "block" } : { display: "none" }
              }
            >
              {dataExpense >= 0 ? (
               <div style={{
                display: "flex",
                justifyContent:'center',
                alignItems: "center",
                color: "rgb(151, 149, 149)",
                height:'40vh'
              }}>
               <h2>No expenses are added</h2>
             </div>
              ) : null}
              <Line
                className="chart-line"
                {...configExpense}
                onReady={(chartInstance) => (chartExpense = chartInstance)}
               
              />
            </div>
          </div>

          <div className="pie">
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "start",
              }}
              className="pie-heading"
            >
              <h2>All Expenses</h2>
              <div
                style={{
                  display: "flex",
                  marginRight: "50px",
                 
                }}
              >
                <p className="income-btn" onClick={handleIncome}>
                  <span
                    style={{
                      fontSize: "50px",
                      color: "green",
                      marginRight: "5px",
                    }}
                  >
                    •
                  </span>
                  income
                </p>
                <p className="expense-btn" onClick={handleExpense}>
                  <span
                    style={{
                      fontSize: "50px",
                      color: "rgb(163, 13, 13)",
                      marginRight: "5px",
                    }}
                  >
                    •
                  </span>
                  Expense
                </p>
              </div>
            </div>
            <div
              style={
                expenseDataPie ? { display: "block" } : { display: "none" }
              }
            >
              {spendingDataExpense >= 0 ? (
               <div style={{
                display: "flex",
                justifyContent:'center',
                alignItems: "center",
                color: "rgb(151, 149, 149)",
                height:'40vh'
              }}>
               <h2>No expenses are added</h2>
             </div>
              ) : null}
              <Pie
                className="pie-line"
                {...spendingConfigExpense}
                onReady={(pieChartInstance) =>
                  (pieChartIncome = pieChartInstance)
                }
               
              />
            </div>

            <div
              style={incomeDataPie ? { display: "block" } : { display: "none" }}
            >
              <Pie
                className="pie-line"
                {...spendingConfigIncome}
                onReady={(pieChartInstance) =>
                  (pieChartExpense = pieChartInstance)
                }
             
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <img src={noTransaction} alt="no transaction" />
          <h2 style={{ marginLeft: "53px", color: "rgb(151, 149, 149)" }}>
            No Transactions Available
          </h2>
        </div>
      )}
    </div>
  );
};

export default Charts;
