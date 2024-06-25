import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";
import memberApi from "../../api/memberApi";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { logout } = useAuth();

  const handleChangePassword = async (values) => {
    const { currentPassword, newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      message.error("New password and confirm password do not match");
      return;
    }

    try {
      await memberApi.changePassword({
        oldPassword: currentPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      });

      message.success("Password changed successfully!");

      setTimeout(() => {
        logout();
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Failed to change password:", error);
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === "Old password is incorrect"
      ) {
        message.error("Current password is incorrect");
      } else {
        message.error("Please change new password");
      }
    }
  };

  return (
    <div className="w-full">
      <div className="">
        <p className="text-xl font-semibold ml-5 mt-5">Your Profile</p>
        <div className="ml-10 mt-8 w-1/2">
          <Form
            form={form}
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 17 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            onFinish={handleChangePassword}
          >
            <Form.Item
              label="Current Password"
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your current password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: "Please input your new password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirm New Password"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <div className="flex justify-center space-x-2">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button type="primary" onClick={() => form.resetFields()}>
                Reset
              </Button>
              <Button type="primary" onClick={() => navigate("/profile")}>
                Back
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
