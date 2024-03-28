import React, { useState } from "react";
import { Radio, Select, Table } from "antd";
import "./style.css";
import Search from "../../assets/Search.svg";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";

const Tables = ({ transactions, addtransation, fetchTransaction }) => {
  const { Option } = Select;
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sorting, setSorting] = useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
  ];

  let searchTransaction = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
  );

  const sortTranctions = searchTransaction.sort((a, b) => {
    if (sorting == "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sorting === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  function exportCSV() {
    var csv = unparse({
      fields: ["name", "type", "date", "amount", "tag"],
      data: transactions,
    });
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    var url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function importCSV(e) {
    e.preventDefault();
    try {
      parse(e.target.files[0], {
        header: true,
        complete: async function (results) {
          for (const transaction of results.data) {
            console.log("Transaction", transaction);
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount),
            };
            await addtransation(newTransaction, true);
          }
        },
      });
      toast.success('All Transaction Added')
      fetchTransaction();
      e.target.files = null
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <div className="table">
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <div className="table-line">
          <img src={Search} alt="search" />
          <input
            className="input-table"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search name here"
          />
        </div>
        <div className="tag">
          <Select
            className="tag-2"
            value={typeFilter}
            onChange={(value) => setTypeFilter(value)}
            placeholder="Filter"
            allowClear
          >
            <Option value="">All</Option>
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
          </Select>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="my-t">My Transactions</h2>
        <Radio.Group
          className="radio"
          value={sorting}
          onChange={(e) => setSorting(e.target.value)}
        >
          <Radio.Button className="radio-btn" value="">No Sort</Radio.Button>
          <Radio.Button className="radio-btn" value="date"> Sort by Date</Radio.Button>
          <Radio.Button className="radio-btn" value="amount"> Sort by Amount</Radio.Button>
        </Radio.Group>
        <div className="csv">
          <button
            style={{ marginRight: "15px" }}
            className="btns"
            onClick={exportCSV}
          >
            Export to CSV
          </button>
          <label className="btns btns-blue" htmlFor="file-csv">
            Import to CSV
          </label>
          <input
            type="file"
            accept=".csv"
            id="file-csv"
            onChange={importCSV}
            style={{ display: "none" }}
          />
        </div>
      </div>
      <Table className="transaction-table" dataSource={sortTranctions} columns={columns} />
    </div>
  );
};

export default Tables;
