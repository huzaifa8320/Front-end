import { Card, Input, Button, Form, message } from "antd";
import { loginUser } from "../../api/user/user";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import LoadingScreen from "../../components/LoadingScreen";

const Login = () => {
    const [ loading , setLoading ] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user, setUser, updateToken } = useContext(AuthContext);
console.log(user);

  const handleLoginSubmit = async (values) => {
    setIsSubmitting(true);
    await loginUser(values)
      .then((token) => {
        console.log("Login Successful, Token:", token);
        Cookies.set("token", token);
        setIsSubmitting(false);
        updateToken(token);
        message.success("Login Successful");
      })
      .catch((err) => {
        console.log("Error:", err.message);
        setIsSubmitting(false);
        if (err.message === "Invalid Password") {
          message.error("Wrong Password");
        } else if (err.message === "User not found") {
          message.error("User not found");
        }
      });
  };

  console.log("User" , user);
  


  useEffect(() => {
    setLoading(true);
    if (user) {
      if (user?.role == "student") {
        setLoading(false);
        navigate("/");
      }
    }
    else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingScreen />
      </div>
    )
  }

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
          Welcome Back
        </h2>
        <Form layout="vertical" onFinish={handleLoginSubmit}>
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
              { required: true, message: "Please enter your password!" },
            ]}
          >
            <Input.Password
              autoComplete="password"
              placeholder="Enter your password"
              className="p-3 rounded-lg border-gray-300"
            />
          </Form.Item>

          <Button
            type="primary"
            block
            loading={isSubmitting}
            htmlType="submit"
            className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 text-white font-bold rounded-lg py-3 shadow-lg"
          >
            Login
          </Button>
        </Form>

        <p className="text-center mt-4 text-gray-700">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-medium">
            Sign Up
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
