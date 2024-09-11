import React, { useState, useEffect } from "react";
import Headers from "../components/headers/Headers";
import Cards from "../components/cards/Cards";
import AddIncome from "../components/modal/AddIncome";
import AddExpence from "../components/modal/AddExpence";
import moment from "moment";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { doc, deleteDoc,updateDoc } from "firebase/firestore";

import { auth, db } from "../Firebase";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import Tables from "../components/transactionTable/Tables";
import Charts from "../chart/Charts";
import ResetBalance from "../components/modal/ResetBalance";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [incomeModal, setIncomeModal] = useState(false);
  const [expenceModal, setExpenceModal] = useState(false);
  const [incomes, setIncomes] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [resetBlance, setResetBlance] = useState(false);
  function showIncomeModal() {
    setIncomeModal(true);
  }

  function showExpenceModal() {
    setExpenceModal(true);
  }

  function handleIncomeCancle() {
    setIncomeModal(false);
  }
  function handleExpenceCancle() {
    setExpenceModal(false);
  }

  function resetBalanceModal() {
    setResetBlance(true);
  }

  function handleResetCancle() {
    setResetBlance(false);
  }

  function onFinish(values, type) {
    const newTransaction = {
      type: type,
      date: values.date,
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    setExpenceModal(false);
    setIncomeModal(false);
    setResetBlance(false);
    addtransation(newTransaction);
  }

  async function addtransation(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("document", docRef.id);
      if (!many) toast.success("transaction Added");
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
      currentBalance();
     
    } catch (e) {
      console.log(e);
      if (!many) toast.error("couldn't add transaction");
    }
  }

  async function cancleTransaction() {
    try {
      const transactionsRef = collection(db, `users/${user.uid}/transactions`);
      const querySnapshot = await getDocs(transactionsRef);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      setTransactions([]);
      toast.success("All transactions reset successfully");
    } catch (error) {
      toast.error("Error canceling transactions: " + error.message);
    }
  }

  async function fetchTransaction(many) {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const quertSnapShot = await getDocs(q);
      let transactionArray = [];
      quertSnapShot.forEach((doc) => {
        transactionArray.push(doc.data());
      });
      
      setTransactions(transactionArray);
      console.log(transactionArray);
      if (!many){toast.success("Fetch transaction")};
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchTransaction();
  }, [user]);

  useEffect(() => {
    currentBalance();
  }, [transactions]);

  const currentBalance = () => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }
    });
    setIncomes(totalIncome);
    setExpense(totalExpense);
    setTotalBalance(totalIncome - totalExpense);
  };

  const sortTransactions = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });





  return (
    <div>
      <Headers />
      {loading ? (
        <div className="load">
          <p className="loader"></p>
        </div>
      ) : (
        <>
          {user && user.photoURL ? (
            <h2 style={{marginLeft:'50px'}} className="name">
              Hi, Welcome
              <span style={{ marginLeft: "10px", fontWeight: "lighter" }}>
                {user.displayName} 👋
              </span>
            </h2>
          ) : null}
          

          <Cards
            income={incomes}
            expense={expense}
            totalBalance={totalBalance}
            showExpenceModal={showExpenceModal}
            showIncomeModal={showIncomeModal}
            resetBalanceModal={resetBalanceModal}
          />
          <Charts
            sortTransactions={sortTransactions}
            transactions={transactions}
          />
          <ResetBalance
            resetBlance={resetBlance}
            handleResetCancle={handleResetCancle}
            cancleTransaction={cancleTransaction}
          />
          <AddIncome
            incomeModal={incomeModal}
            handleIncomeCancle={handleIncomeCancle}
            onFinish={onFinish}
          />
          <AddExpence
            expenceModal={expenceModal}
            handleExpenceCancle={handleExpenceCancle}
            onFinish={onFinish}
          />
          <Tables
            transactions={transactions}
            fetchTransaction={fetchTransaction}
            addtransation={addtransation}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
