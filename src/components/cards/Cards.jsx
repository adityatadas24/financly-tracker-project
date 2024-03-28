import { Card, Row , } from 'antd'
import React from 'react'
import "./style.css";
import Buttons from "../buttons/Buttons";
const Cards = ({income,expense,totalBalance ,showExpenceModal,showIncomeModal, resetBalanceModal}) => {
  return (
    <div>
     <Row className='cards'>
         <Card bordered={true} className='my-card' title={'Current Balance'}>
          <p>₹ {totalBalance}</p>
          <Buttons text={'Reset Balance'} blue={true} onClick={ resetBalanceModal}/>
         </Card>
         <Card bordered={true} className='my-card' title={'Total Income'}>
          <p>₹ {income}</p>
          <Buttons text={'Add Income'} blue={true} onClick={showIncomeModal}/>
         </Card>
         <Card bordered={true} className='my-card' title={'Total Expenses'}>
          <p>₹ {expense}</p>
          <Buttons text={'Add Expense'} blue={true} onClick={showExpenceModal}/>
         </Card>
    </Row>
    </div>
    

  )
}

export default Cards
