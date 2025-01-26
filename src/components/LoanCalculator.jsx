import { Select, Input, Button, Form, Card, Modal, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { AppRoutes } from "../constant/constant";

export default function LoanCalculator() {
    // Dummy data for categories and subcategories
    const categories = {
        wedding: ["Valima", "Furniture", "Valima Food", "Jahez"],
        home: ["Structure", "Finishing", "Loan"],
        business: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
        education: ["University Fees", "Child Fees Loan"],
    };

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [subcategories, setSubcategories] = useState([]);
    const [formData, setFormData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm(); // Form instance for the main form
    const [modalForm] = Form.useForm(); // Form instance for the modal form

    // Handle category selection
    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        setSubcategories(categories[value] || []);
    };

    // Handle form submission
    const onFinish = (values) => {
        // Calculate total amount after initial deposit
        const totalLoan = parseFloat(values.totalLoan);
        const initialDeposit = parseFloat(values.initialDeposit);
        const loanPeriod = parseFloat(values.loanPeriod);

        const totalAmountAfterDeposit = totalLoan - initialDeposit;
        const monthlyInstallment = totalAmountAfterDeposit / (loanPeriod * 12);

        setFormData({
            ...values,
            totalAmountAfterDeposit: totalAmountAfterDeposit.toFixed(2),
            monthlyInstallment: monthlyInstallment.toFixed(2),
        });

        console.log("Form Values:", values);
        alert("Loan calculation submitted successfully!");
    };

    // Handle Proceed button click
    const handleProceed = () => {
        setIsModalVisible(true);
    };

    // Handle modal submission
    const handleModalSubmit = () => {
        modalForm
            .validateFields()
            .then(async (values) => {
                // Combine loan data with email and NIC
                const allData = {
                    ...formData, // Loan data
                    email: values.email,
                    nic: values.nic,
                };

                console.log("All Data:", allData);

                // Call the API
                try {
                    const response = await axios.post(AppRoutes.addRequest, allData);
                    console.log("API Response:", response.data);

                    // Reset the main form and modal form
                    form.resetFields(); // Reset the main form
                    modalForm.resetFields(); // Reset the modal form
                    setFormData(null); // Clear the form data state
                    setIsModalVisible(false); // Close the modal

                    alert("Loan request submitted successfully!");
                } catch (error) {

                    console.error("API Error:", error.response.data.msg);
                    if (error?.response?.data?.msg == 'Email already in use') {
                        message.error('Email Already Requested')
                    }
                   else if (error?.response?.data?.msg == 'NIC already in use') {
                        message.error('Nic Already Requested')
                    }
                }
            })
            .catch((error) => {
                console.log("Validation Failed:", error);
            });
    };

    // Handle modal cancel
    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Loan Calculator</h2>
            <Form form={form} onFinish={onFinish} layout="vertical">
                {/* Category Select */}
                <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: "Please select a category!" }]}
                >
                    <Select
                        size="large"
                        placeholder="Select Category"
                        className="w-full"
                        onChange={handleCategoryChange}
                    >
                        <Select.Option value="wedding">Wedding Loans</Select.Option>
                        <Select.Option value="home">Home Construction Loans</Select.Option>
                        <Select.Option value="business">Business Startup Loans</Select.Option>
                        <Select.Option value="education">Education Loans</Select.Option>
                    </Select>
                </Form.Item>

                {/* Subcategory Select */}
                <Form.Item
                    label="Subcategory"
                    name="subcategory"
                    rules={[{ required: true, message: "Please select a subcategory!" }]}
                >
                    <Select
                        size="large"
                        placeholder="Select Subcategory"
                        className="w-full"
                        disabled={!selectedCategory}
                    >
                        {subcategories.map((subcategory, index) => (
                            <Select.Option key={index} value={subcategory}>
                                {subcategory}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* Total Loan Amount */}
                <Form.Item
                    label="Total Loan Amount"
                    name="totalLoan"
                    rules={[
                        { required: true, message: "Please enter the total loan amount!" },
                        {
                            pattern: /^[0-9]+$/,
                            message: "Please enter a valid number!",
                        },
                    ]}
                >
                    <Input size="large" placeholder="Total loan" className="w-full" />
                </Form.Item>

                {/* Initial Deposit Input */}
                <Form.Item
                    label="Initial Deposit"
                    name="initialDeposit"
                    rules={[
                        { required: true, message: "Please enter the initial deposit!" },
                        {
                            pattern: /^[0-9]+$/,
                            message: "Please enter a valid number!",
                        },
                    ]}
                >
                    <Input size="large" placeholder="Initial Deposit" className="w-full" />
                </Form.Item>

                {/* Loan Period Select */}
                <Form.Item
                    label="Loan Period"
                    name="loanPeriod"
                    rules={[{ required: true, message: "Please select a loan period!" }]}
                >
                    <Select size="large" placeholder="Select Loan Period" className="w-full">
                        <Select.Option value="3">3 Years</Select.Option>
                        <Select.Option value="5">5 Years</Select.Option>
                    </Select>
                </Form.Item>

                {/* Calculate Button */}
                <Form.Item>
                    <Button type="primary" size="large" htmlType="submit" className="w-full">
                        Calculate
                    </Button>
                </Form.Item>
            </Form>

            {/* Display Form Data and Calculations in a Card */}
            {formData && (
                <Card title="Loan Calculation Result" className="mt-6">
                    <div className="space-y-2">
                        <p><strong>Category:</strong> {formData.category}</p>
                        <p><strong>Subcategory:</strong> {formData.subcategory}</p>
                        <p><strong>Total Loan Amount:</strong> {formData.totalLoan}</p>
                        <p><strong>Initial Deposit:</strong> {formData.initialDeposit}</p>
                        <p><strong>Total Amount After Initial Deposit:</strong> {formData.totalAmountAfterDeposit}</p>
                        <p><strong>Monthly Installment:</strong> {formData.monthlyInstallment}</p>
                        <p><strong>Loan Period:</strong> {formData.loanPeriod} Years</p>
                    </div>

                    {/* Proceed Button */}
                    <Button
                        type="primary"
                        size="large"
                        className="w-full mt-4"
                        onClick={handleProceed}
                    >
                        Proceed
                    </Button>
                </Card>
            )}

            {/* Modal for Email and NIC */}
            <Modal
                title="Enter Your Details"
                visible={isModalVisible}
                onOk={handleModalSubmit}
                onCancel={handleModalCancel}
            >
                <Form form={modalForm} layout="vertical">
                    {/* Email Field */}
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please enter your email!" },
                            {
                                type: "email",
                                message: "Please enter a valid email address!",
                            },
                        ]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>

                    {/* NIC Field */}
                    <Form.Item
                        label="NIC"
                        name="nic"
                        rules={[
                            { required: true, message: "Please enter your NIC!" },
                            {
                                pattern: /^[0-9]{13}$/,
                                message: "Please enter a valid 13-digit NIC (e.g., 4210116061441)!",
                            },
                        ]}
                    >
                        <Input placeholder="Enter your NIC" maxLength={13} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}