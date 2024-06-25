import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
import memberApi from "../../api/memberApi";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values) => {
    try {
      const response = await memberApi.login(values);
      const userData = response.data;
      login(userData);
      localStorage.setItem("token", userData.token);
      message.success("Login successful!");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        message.error(error.response.data.error);
      } else {
        console.error("Login error:", error);
        message.error("Login failed! Please check your credentials.");
      }
    }
  };

  return (
    <div>
      <div className="w-full flex justify-center">
        <div className="bg-zinc-700 text-white w-[30vw] mt-32 rounded-md border-solid">
          <div className="flex justify-center my-5 text-lg font-semibold w-full">
            Login
          </div>
          <div className="flex justify-center">
            <Form
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
              layout="horizontal"
              style={{ maxWidth: 600 }}
              onFinish={onFinish}
            >
              <Form.Item
                label={<span style={{ color: "white" }}>Membername</span>}
                name="membername"
                rules={[
                  { required: true, message: "Please input your membername!" },
                ]}
              >
                <Input placeholder="Input membername" />
              </Form.Item>
              <Form.Item
                label={<span style={{ color: "white" }}>Password</span>}
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  placeholder="Input password"
                  visibilityToggle={{
                    visible: passwordVisible,
                    onVisibleChange: setPasswordVisible,
                  }}
                />
              </Form.Item>
              <p className="text-white">
                Do not have an account? Please{" "}
                <Link to="/register" className="font-semibold text-red-600">
                  register
                </Link>
              </p>
              <div className="flex justify-center mb-5 space-x-1">
                <Link to="/">
                  <Button className="h-8 w-16 text-zinc-800 ">Back</Button>
                </Link>
                <Button
                  htmlType="submit"
                  className="h-8 w-16 bg-zinc-800 text-white"
                >
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
