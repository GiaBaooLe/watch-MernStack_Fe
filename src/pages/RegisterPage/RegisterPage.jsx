import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import memberApi from "../../api/memberApi";

const RegisterPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await memberApi.register({
        membername: values.membername,
        password: values.password,
        name: values.name,
        YOB: values.yob,
      });
      if (response.status === 201) {
        message.success("Registration successful!");
        navigate("/login");
      } else {
        message.error("Registration failed!");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        message.error(error.response.data.error);
      } else {
        console.error("Registration error:", error);
        message.error("An error occurred during registration.");
      }
    }
  };

  return (
    <div>
      <div className="w-full flex justify-center">
        <div className="bg-zinc-700 text-white w-[30vw] mt-32 rounded-md border-solid">
          <div className="flex justify-center my-5 text-lg font-semibold w-full">
            Register
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
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input placeholder="input username" />
              </Form.Item>
              <Form.Item
                label={<span style={{ color: "white" }}>Name</span>}
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input placeholder="input name" />
              </Form.Item>{" "}
              <Form.Item
                label={<span style={{ color: "white" }}>Password</span>}
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  placeholder="input password"
                  visibilityToggle={{
                    visible: passwordVisible,
                    onVisibleChange: setPasswordVisible,
                  }}
                />
              </Form.Item>
              <Form.Item
                label={<span style={{ color: "white" }}>Year of birth</span>}
                name="yob"
                rules={[
                  {
                    required: true,
                    message: "Please input your year of birth!",
                  },
                ]}
              >
                <Input placeholder="input year of birth" />
              </Form.Item>
              <p className="text-white">
                Already have an account? Please{" "}
                <Link to="/login" className="font-semibold text-red-600">
                  login
                </Link>
              </p>
              <div className="flex justify-center mb-5 space-x-1">
                <Link to="/">
                  <Button className="h-8 w-16">Back</Button>
                </Link>
                <Button
                  htmlType="submit"
                  className="h-8 w-16 bg-zinc-800 text-white"
                >
                  Register
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
