import React, { useState } from "react";
import { Form, Select, InputNumber, Button, Card, Typography, Modal, Input } from "antd";
import Navbar from "../../components/navbar";

const { Option } = Select;
const { Title, Text } = Typography;

const LoanCalculator = () => {
  const categories = {
    wedding: ["Valima", "Furniture", "Valima Food", "Jahez"],
    home: ["Structure", "Finishing", "Loan"],
    business: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
    education: ["University Fees", "Child Fees Loan"],
  };

  const [subCategories, setSubCategories] = useState([]);
  const [form] = Form.useForm();
  const [result, setResult] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userDetails, setUserDetails] = useState({ email: "", nic: "" });

  const onCategoryChange = (value) => {
    setSubCategories(categories[value]);
    form.setFieldsValue({ subCategory: undefined }); // Reset subCategory
  };

  const onFinish = (values) => {
    const { category, subCategory, loanAmount, initialDeposit, loanPeriod } = values;
    const totalAfterDeposit = loanAmount - initialDeposit;
    const monthlyInstallment = (totalAfterDeposit / (loanPeriod * 12)).toFixed(2);
  
    setResult({
      category, // Add category
      subCategory, // Add subcategory
      totalAmount: loanAmount,
      totalAfterDeposit,
      loanPeriod,
      monthlyInstallment,
    });
  };
  

  const generateRandomPassword = (length = 8) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
  };

  const handleProceed = () => {
    const password = generateRandomPassword();
    setResult((prevResult) => ({
      ...prevResult,
      password,
    }));
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    console.log({ ...result, ...userDetails });
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <Navbar/>
      <h1 className="text-3xl font-semibold my-5">Loan Calculator</h1>
      <Card>
        <Title level={4}>Loan Calculator</Title>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Select Category" onChange={onCategoryChange}>
              {Object.keys(categories).map((category) => (
                <Option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="subCategory"
            label="Sub Category"
            rules={[{ required: true, message: "Please select a subcategory" }]}
          >
            <Select placeholder="Select Sub Category" disabled={!subCategories.length}>
              {subCategories.map((subCategory) => (
                <Option key={subCategory} value={subCategory}>
                  {subCategory}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="loanAmount"
            label="Loan Amount"
            rules={[{ required: true, message: "Please enter loan amount" }]}
          >
            <InputNumber
              placeholder="Enter Loan Amount"
              min={0}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="initialDeposit"
            label="Initial Deposit"
            rules={[{ required: true, message: "Please enter initial deposit" }]}
          >
            <InputNumber
              placeholder="Enter Initial Deposit"
              min={0}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="loanPeriod"
            label="Loan Period (Years)"
            rules={[{ required: true, message: "Please select loan period" }]}
          >
            <Select placeholder="Select Loan Period">
              {Array.from({ length: 30 }, (_, i) => i + 1).map((year) => (
                <Option key={year} value={year}>
                  {year} {year === 1 ? "Year" : "Years"}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Calculate
            </Button>
          </Form.Item>
        </Form>

        {result && (
          <Card style={{ marginTop: "20px", background: "#f6f8fa" }}>
            <Text><strong>Total Amount Payable:</strong> {result.totalAmount}</Text>
            <br />
            <Text><strong>Total Amount After Initial Deposit:</strong> {result.totalAfterDeposit}</Text>
            <br />
            <Text><strong>Loan Period:</strong> {result.loanPeriod} years</Text>
            <br />
            <Text><strong>Monthly Installment:</strong> {result.monthlyInstallment}</Text>
            <br />
            {result.password && (
              <>
                <Text><strong>Generated Password:</strong> {result.password}</Text>
                <br />
              </>
            )}
            <Button type="primary" onClick={handleProceed} style={{ marginTop: "10px" }}>
              Proceed
            </Button>
          </Card>
        )}

        <Modal
          title="Enter Your Details"
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        >
          <Form layout="vertical">
            <Form.Item label="Email" required>
              <Input
                placeholder="Enter your email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
              />
            </Form.Item>

            <Form.Item label="NIC" required>
              <Input
                placeholder="Enter your NIC"
                name="nic"
                value={userDetails.nic}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default LoanCalculator;
