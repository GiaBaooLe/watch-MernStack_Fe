import { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Checkbox, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import watchApi from "../../api/watchApi";
import brandApi from "../../api/brandApi";

const ManageWatchPage = () => {
  const [watches, setWatches] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedWatch, setSelectedWatch] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchWatchesAndBrands = async () => {
      try {
        const [watchResponse, brandResponse] = await Promise.all([
          watchApi.getAllWatch(),
          brandApi.getAllBrand(),
        ]);
        setWatches(watchResponse.data);
        setBrands(brandResponse.data);
      } catch (error) {
        console.error("Failed to fetch watches and brands:", error);
      }
    };
    fetchWatchesAndBrands();
  }, []);

  const handleCreate = async (values) => {
    try {
      await watchApi.addWatch(values);
      const response = await watchApi.getAllWatch();
      setWatches(response.data);
      setOpenCreateModal(false);
      form.resetFields();
      message.success("Watch created successfully");
    } catch (error) {
      console.error("Failed to create watch:", error);
      if (error.response && error.response.data && error.response.data.error) {
        message.error(error.response.data.error);
      } else {
        message.error("Failed to create watch");
      }
    }
  };

  const handleUpdate = async (values) => {
    try {
      await watchApi.updateWatch({ ...values, id: selectedWatch._id });
      const response = await watchApi.getAllWatch();
      setWatches(response.data);
      setOpenUpdateModal(false);
      setSelectedWatch(null);
      form.resetFields();
    } catch (error) {
      console.error("Failed to update watch:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await watchApi.deleteWatch(selectedWatch._id);
      const response = await watchApi.getAllWatch();
      setWatches(response.data);
      setOpenDeleteModal(false);
      setSelectedWatch(null);
    } catch (error) {
      console.error("Failed to delete watch:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="my-10">
        <p className="flex justify-center text-2xl font-semibold">
          Manage Watch
        </p>
        <div className="flex justify-end mr-8 mb-5">
          <Button
            className="bg-zinc-800 text-white"
            onClick={() => setOpenCreateModal(true)}
          >
            Create
          </Button>
        </div>
        <div className="w-full">
          <table className="mx-20 border-collapse border border-slate-500">
            <thead className="bg-zinc-800 text-white">
              <tr>
                <th className="border border-slate-600 w-28">Id</th>
                <th className="border border-slate-600 w-28">Watch Name</th>
                <th className="border border-slate-600 w-28">Img</th>
                <th className="border border-slate-600 w-28">Brand</th>
                <th className="border border-slate-600 w-28">Price</th>
                <th className="border border-slate-600 w-28">Automatic</th>
                <th className="border border-slate-600">Description</th>
                <th className="border border-slate-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {watches.map((watch) => (
                <tr key={watch._id}>
                  <td className="text-center border border-slate-700">
                    {watch?._id}
                  </td>
                  <td className="text-center border border-slate-700">
                    {watch?.watchName}
                  </td>
                  <td className="text-center border border-slate-700">
                    <img
                      className="w-32"
                      src={watch.image}
                      alt={watch?.watchName}
                    />
                  </td>
                  <td className="text-center border border-slate-700">
                    {watch?.brand?.brandName}
                  </td>
                  <td className="text-center border border-slate-700">
                    {watch.price}
                  </td>
                  <td className="text-center border border-slate-700">
                    {watch.automatic ? "Yes" : "No"}
                  </td>
                  <td className="border border-slate-700">
                    <span>{watch.watchDescription}</span>
                  </td>
                  <td className="border-slate-700 flex">
                    <div className="flex w-full mt-4">
                      <Button
                        className="bg-zinc-800 text-white"
                        onClick={() => {
                          setSelectedWatch(watch);
                          setOpenUpdateModal(true);
                          form.setFieldsValue({
                            watchName: watch.watchName,
                            image: watch.image,
                            brand: watch?.brand?._id,
                            price: watch.price,
                            automatic: watch.automatic,
                            watchDescription: watch.watchDescription,
                          });
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        className="bg-white text-zinc-800"
                        onClick={() => {
                          setSelectedWatch(watch);
                          setOpenDeleteModal(true);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        title="Update Watch"
        open={openUpdateModal}
        onOk={() => form.submit()}
        onCancel={() => {
          setOpenUpdateModal(false);
          setSelectedWatch(null);
          form.resetFields();
        }}
        width={500}
      >
        <Form form={form} onFinish={handleUpdate}>
          <Form.Item
            name="watchName"
            label="Watch Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="Watch URL"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
            <select title="" className="border rounded-md ">
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand?.brandName}
                </option>
              ))}
            </select>
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="automatic" label="Automatic" valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item
            name="watchDescription"
            label="Description"
            rules={[{ required: true }]}
          >
            <TextArea rows={5} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Create Watch"
        open={openCreateModal}
        onOk={() => form.submit()}
        onCancel={() => {
          setOpenCreateModal(false);
          form.resetFields();
        }}
        width={500}
      >
        <Form form={form} onFinish={handleCreate}>
          <Form.Item
            name="watchName"
            label="Watch Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="Watch URL"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
            <select title="" className="border rounded-md ">
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.brandName}
                </option>
              ))}
            </select>
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="automatic" label="Automatic" valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item
            name="watchDescription"
            label="Description"
            rules={[{ required: true }]}
          >
            <TextArea rows={5} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Delete Watch"
        open={openDeleteModal}
        onOk={handleDelete}
        onCancel={() => {
          setOpenDeleteModal(false);
          setSelectedWatch(null);
        }}
        width={500}
      >
        <p>Do you want to delete this watch?</p>
      </Modal>
    </div>
  );
};

export default ManageWatchPage;
