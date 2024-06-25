import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Rate, Input, Form, message } from "antd";
import moment from "moment";
import watchApi from "../../api/watchApi";
import { useAuth } from "../authContext";

const DetailPage = () => {
  const { id } = useParams();
  const [watch, setWatch] = useState(null);
  const [comments, setComments] = useState([]);
  const [form] = Form.useForm();
  const { user } = useAuth();

  useEffect(() => {
    const fetchWatchDetails = async () => {
      try {
        const response = await watchApi.getDetailWatch(id);
        setWatch(response.data);
        setComments(response.data.comments || []);
      } catch (error) {
        console.error("Failed to fetch watch details:", error);
      }
    };
    fetchWatchDetails();
  }, [id]);

  const handleCommentSubmit = async (values) => {
    if (!user) {
      message.error("You must be logged in to comment");
      return;
    }

    if (user.isAdmin) {
      message.error("Admin cannot comment");
      return;
    }

    try {
      const newComment = {
        rating: values.rating,
        content: values.content,
      };

      const response = await watchApi.addComment(id, newComment);

      setComments(response.data.comments);

      form.resetFields();
      message.success("Comment added successfully!");
    } catch (error) {
      console.error("Failed to submit comment:", error);
      if (error.response && error.response.data) {
        message.error(error.response.data.error);
      } else {
        message.error("Failed to submit comment. Please try again.");
      }
    }
  };

  if (!watch) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-8 my-16">
        <div className="col-span-5">
          <img src={watch.image} alt={watch.watchName} className="w-full" />
        </div>
        <div className="col-span-7">
          <div className="flex justify-between items-center mb-5">
            <div className="text-3xl font-bold">{watch.watchName}</div>
          </div>
          <div className="mt-28">
            <div className="mb-3">
              <span className="text-lg font-semibold">Brand: </span>
              <span>{watch?.brand?.brandName || "No brand"}</span>
            </div>
            <div className="mb-3">
              <span className="text-lg font-semibold">Price: </span>
              <span>{watch.price} VND</span>
            </div>
            <div className="mb-3">
              <span className="text-lg font-semibold">Description: </span>
              <p>{watch.watchDescription}</p>
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="w-36 h-10 bg-zinc-800 text-white font-semibold">
              Add to cart
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-10">
        <p className="text-2xl font-semibold border-b-2 pb-5">Comments</p>
        {comments.map((comment, index) => (
          <div key={index} className="mt-5 flex bg-gray-200 p-4 rounded-md">
            <Avatar size={50} icon={<UserOutlined />} />
            <div className="ml-4">
              <span className="font-bold">
                {comment.author && comment.author.membername
                  ? comment.author.membername
                  : "Unknown User"}
              </span>
              <span className=" text-gray-500 ml-3 text-sm">
                {moment(comment.createdAt).format("HH:mm - DD/MM/YYYY")}
              </span>
              <div className="flex items-center mt-2">
                <Rate value={comment.rating} disabled count={3} />
              </div>
              <p className="mt-2">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mx-5 px-4 my-10">
        <Form form={form} onFinish={handleCommentSubmit}>
          <Form.Item
            name="rating"
            rules={[{ required: true, message: "Please provide a rating!" }]}
          >
            <Rate count={3} />
          </Form.Item>
          <Form.Item
            name="content"
            rules={[{ required: true, message: "Please input your comment!" }]}
          >
            <Input.TextArea rows={5} placeholder="Input your comment" />
          </Form.Item>
          <div className="flex justify-center my-5">
            <Button
              htmlType="submit"
              className="w-20 h-10 text-white bg-zinc-800"
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default DetailPage;
