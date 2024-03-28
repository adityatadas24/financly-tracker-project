import { Modal } from 'antd'
import React from 'react'


const ResetBalance = ({ resetBlance,cancleTransaction, handleResetCancle}) => {
  return (
    <div>
      <Modal style={{border:'1.5px solid red' , borderRadius:'10px',height:'147px', }}
        className="modal"
         visible={resetBlance}
        onOk={cancleTransaction}
        onCancel={handleResetCancle}
        okText="Yes"
        okButtonProps={{ style: { backgroundColor: 'red', borderColor: 'red' } }}
      >
        <h3 style={{marginBottom:'30px'}}>Are you sure you want to reset all transactions?</h3>
      </Modal>
    </div>
  )
}

export default ResetBalance
