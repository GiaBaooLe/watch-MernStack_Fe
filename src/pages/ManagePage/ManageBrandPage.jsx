import { useState, useEffect } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import brandApi from "../../api/brandApi";

const ManageBrandPage = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await brandApi.getAllBrand();
        setBrands(response.data);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }
    };
    fetchBrands();
  }, []);

  const handleCreate = async (values) => {
    try {
      await brandApi.addBrand(values);
      const response = await brandApi.getAllBrand();
      setBrands(response.data);
      setOpenCreateModal(false);
      form.resetFields();
      message.success("Brand created successfully");
    } catch (error) {
      console.error("Failed to create brand:", error);
      if (error.response && error.response.data && error.response.data.error) {
        message.error(error.response.data.error);
      } else {
        message.error("Failed to create brand");
      }
    }
  };

  const handleUpdate = async (data) => {
    try {
      await brandApi.updateBrand({ ...data, id: selectedBrand._id });
      const response = await brandApi.getAllBrand();
      setBrands(response.data);
      setOpenUpdateModal(false);
      setSelectedBrand(null);
      form.resetFields();
    } catch (error) {
      console.error("Failed to update brand:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await brandApi.deleteBrand(selectedBrand._id);
      setBrands(brands.filter((brand) => brand._id !== selectedBrand._id)); // Cập nhật trạng thái trực tiếp
      setOpenDeleteModal(false);
      setSelectedBrand(null);
      message.success("Brand deleted successfully");
    } catch (error) {
      console.error("Failed to delete brand:", error);
      message.error("Failed to delete brand");
    }
  };

  return (
    <div className="w-full">
      <div className="my-10">
        <p className="flex justify-center text-2xl font-semibold">
          Manage Brand
        </p>
        <div className="flex justify-end mr-8 mb-5">
          <Button
            className="bg-zinc-800 text-white"
            onClick={() => setOpenCreateModal(true)}
          >
            Create
          </Button>
        </div>
        <div className="w-full flex justify-center">
          <table className="mx-20 border-collapse border border-slate-500 mt-5 w-full">
            <thead className="bg-zinc-800 text-white">
              <tr>
                <th className="border border-slate-600 w-32">Id</th>
                <th className="border border-slate-600 w-32">Brand Name</th>
                <th className="border border-slate-600 w-32">Action</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => (
                <tr key={brand._id}>
                  <td className="text-center border border-slate-700">
                    {brand._id}
                  </td>
                  <td className="text-center border border-slate-700">
                    {brand?.brandName}
                  </td>
                  <td className="flex justify-center border-slate-700">
                    <div className="flex w-full justify-center">
                      <Button
                        className="bg-zinc-800 text-white"
                        onClick={() => {
                          setSelectedBrand(brand);
                          setOpenUpdateModal(true);
                          form.setFieldsValue({ brandName: brand?.brandName });
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        className="bg-white text-zinc-800"
                        onClick={() => {
                          setSelectedBrand(brand);
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
        title="Update Brand"
        open={openUpdateModal}
        onOk={() => form.submit()}
        onCancel={() => {
          setOpenUpdateModal(false);
          setSelectedBrand(null);
          form.resetFields();
        }}
        width={500}
      >
        <Form form={form} onFinish={handleUpdate}>
          <Form.Item name="brandName" label="Brand Name">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Create Brand"
        open={openCreateModal}
        onOk={() => form.submit()}
        onCancel={() => {
          setOpenCreateModal(false);
          form.resetFields();
        }}
        width={500}
      >
        <Form form={form} onFinish={handleCreate}>
          <Form.Item name="brandName" label="Brand Name">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Delete Brand"
        open={openDeleteModal}
        onOk={handleDelete}
        onCancel={() => {
          setOpenDeleteModal(false);
          setSelectedBrand(null);
        }}
        width={500}
      >
        <p>Do you want to delete this brand?</p>
      </Modal>
    </div>
  );
};

export default ManageBrandPage;
