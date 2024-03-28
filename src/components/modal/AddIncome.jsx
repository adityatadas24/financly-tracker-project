import { Modal, Form, Input, DatePicker, Select, Button } from "antd";
import React from "react";
import "./modal.css";

const AddIncome = ({ incomeModal, handleIncomeCancle, onFinish }) => {
  const [form] = Form.useForm();
  return (
    <div>
      <Modal
        className="modal"
        title={"Add Income"}
        visible={incomeModal}
        onCancel={handleIncomeCancle}
        footer={null}
      >
        <Form
          form={form}
          layout="verticle"
          onFinish={(values) => {
            onFinish(values, "income");
            form.resetFields();
          }}
        >
          <Form.Item
            className="custom"
            style={{ fontWeight: "600" }}
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "please input the name of the transations",
              },
            ]}
          >
            <Input type="text" className="custom-input" />
          </Form.Item>

          <Form.Item
            className="custom"
            style={{ fontWeight: "600" }}
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "please input the income amount",
              },
            ]}
          >
            <Input type="number" className="custom-input-2" />
          </Form.Item>

          <Form.Item
            className="custom"
            style={{ fontWeight: "600" }}
            label="Date"
            name="date"
            rules={[
              {
                required: true,
                message: "please select the income date",
              },
            ]}
          >
               <Input type="date" className="custom-input-3"/>
            {/* <DatePicker format="YYYY-MM-DD" className="custom-input-3" /> */}
          </Form.Item>

          <Form.Item
            className="custom"
            style={{ fontWeight: "600" }}
            label="Tag"
            name="tag"
            rules={[
              {
                required: true,
                message: "please select a tag",
              },
            ]}
          >
            <Select className="custom-input-4">
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="freelance">Freelance</Select.Option>
              <Select.Option value="investment">Investment</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button className="btn" type="primary" htmlType="submit">
              Add Income
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddIncome;
