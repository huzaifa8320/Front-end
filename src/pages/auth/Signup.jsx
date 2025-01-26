import React, { useState } from "react";
import { Card, Input, Button, Form, message } from "antd";
import { signupUser } from "../../api/user/user";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {

  const [ loading , setLoading ] = useState(false)
  const navigate = useNavigate();

  const handleSignupSubmit = async (values) => {
    setLoading(true)
    console.log("Signup Values:", values);
    await signupUser(values)
      .then((response) => {
        console.log(response);
        message.success("User registered successfully!");
        setLoading(false)
        navigate("/login");
      })
      .catch((error) => {
        console.error(error.message);
        if (error.message == 'User with this Email is already registered') {
          message.error('User with this Email is already')
        }
        // message.error("Registration failed. Please try again.");
        setLoading(false)
      });
  };

  return (
    <div className="flex p-5 items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Card
        className="w-full max-w-md shadow-2xl rounded-3xl"
        bordered={false}
        bodyStyle={{
          padding: "2.5rem",
          backgroundColor: "#ffffffdd",
          borderRadius: "1.5rem",
        }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
          Create an Account
        </h2>
        <Form layout="vertical" onFinish={handleSignupSubmit}>
          <Form.Item
            label={<span className="text-gray-700 font-medium">Name</span>}
            name="fullName"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input
              type="text"
              autoComplete="fullName"
              placeholder="Enter your name"
              className="p-3 rounded-lg border-gray-300"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-gray-700 font-medium">Email</span>}
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="p-3 rounded-lg border-gray-300"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-gray-700 font-medium">Password</span>}
            name="password"
            rules={[
              { required: true, message: "Please create a password!" },
            ]}
          >
            <Input.Password
              autoComplete="password"
              placeholder="Create a password"
              className="p-3 rounded-lg border-gray-300"
            />
          </Form.Item>

          <Button
            type="primary"
            block
            loading={loading}
            htmlType="submit"
            className="mt-6 bg-gradient-to-r from-green-500 to-teal-500 hover:from-teal-500 hover:to-green-500 text-white font-bold rounded-lg py-3 shadow-lg"
          >
            Sign Up
          </Button>
        </Form>

        <p className="text-center mt-4 text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default SignUp;
