import { Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { AppRoutes } from "../constant/constant"; // Adjust the path to your constants

const AdminDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch loan requests from the API
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get(AppRoutes.addRequest); // Replace with your API endpoint
        if (!response.data.error) {
          setLoans(response.data.data); // Set the loan data
        } else {
          console.error("API Error:", response.data.msg);
        }
      } catch (error) {
        console.error("Failed to fetch loan requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  // Define table columns
  const columns = [
    {
      title: "Application ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Subcategory",
      dataIndex: "subcategory",
      key: "subcategory",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "NIC",
      dataIndex: "nic",
      key: "nic",
    },
    {
      title: "Total Loan",
      dataIndex: "totalLoan",
      key: "totalLoan",
    },
    {
      title: "Monthly Installment",
      dataIndex: "monthlyInstallment",
      key: "monthlyInstallment",
    },
    {
      title: "Status",
      key: "status",
      render: () => <Tag color="blue">Pending</Tag>, // Static status for now
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-blue-800 mb-4">Admin Dashboard</h2>
      <Table
        columns={columns}
        dataSource={loans}
        loading={loading}
        rowKey="_id" // Use _id as the unique key for each row
        pagination={{
            pageSize: 5, // Show 5 rows per page
            showSizeChanger: false, // Hide the page size changer
          }}
      />
    </div>
  );
};

export default AdminDashboard;