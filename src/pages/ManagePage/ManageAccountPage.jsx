import { useEffect, useState } from "react";
import memberApi from "../../api/memberApi";

const ManageAccountPage = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await memberApi.getAllAccounts();
        setAccounts(response.data);
      } catch (error) {
        console.error("Failed to fetch accounts:", error);
      }
    };
    fetchAccounts();
  }, []);

  return (
    <div>
      <div className="my-10">
        <p className="flex justify-center text-2xl font-semibold">
          Manage Account
        </p>
        <div className="w-full flex justify-center">
          <table className="mx-20 border-collapse border border-slate-500 mt-5 w-full">
            <thead className="bg-zinc-800 text-white">
              <tr>
                <th className="border border-slate-600 w-32">Id</th>
                <th className="border border-slate-600 w-32">Member Name</th>
                <th className="border border-slate-600 w-32">Name</th>
                <th className="border border-slate-600 w-32">YOB</th>
                <th className="border border-slate-600 w-32">Is Admin</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account._id}>
                  <td className="text-center border border-slate-700">
                    {account._id}
                  </td>
                  <td className="text-center border border-slate-700">
                    {account.membername}
                  </td>
                  <td className="text-center border border-slate-700">
                    {account.name}
                  </td>
                  <td className="text-center border border-slate-700">
                    {account.YOB}
                  </td>
                  <td className="text-center border border-slate-700">
                    {account.isAdmin ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageAccountPage;
