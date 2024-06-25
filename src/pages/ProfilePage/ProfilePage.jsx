import { Button, Form, Input, message } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../authContext";
import memberApi from "../../api/memberApi";

const ProfilePage = () => {
  const { user, login } = useAuth();
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        username: user.membername,
        name: user.name,
        YOB: user.YOB,
      });
    }
  }, [user, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const updatedUser = {
        ...user,
        name: values.name,
        YOB: values.YOB,
      };

      const response = await memberApi.updateProfile(updatedUser);
      if (response.status === 200) {
        login(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        message.success("Profile updated successfully!");
      } else {
        message.error("Failed to update profile.");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      message.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <div className="">
        <p className="text-xl font-semibold ml-5 mt-5">Your Profile</p>
        <div className="ml-10 mt-8 w-1/2">
          <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            onFinish={handleSave}
          >
            <Form.Item label="Username" name="username">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="YOB" name="YOB" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <div className="flex justify-center space-x-2 mr-20">
              <Button className="bg-zinc-900 text-white" htmlType="submit">
                Save
              </Button>
              <Link to="/profile/change-password">
                <Button className="text-zinc-900 bg-white">
                  Change Password
                </Button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
