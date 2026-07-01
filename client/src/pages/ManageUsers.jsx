import { useState, useEffect} from "react"
import API from "../api/axios"
import { toast } from "react-toastify"
import { FaUsers, FaTrash } from "react-icons/fa"

export default function ManageUsers(){
    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = async () => {
        try {
            const res = await API.get("/users")
            setUsers(res.data)
        } catch (error) {
            toast.error("Error to load users")
        }
    }

    const deleteUser = async(id) => {
        if(!window.confirm("Delete this user?")) return

        try {
            await API.delete(`/users/${id}`)
            toast.success("User deleted successfully")
            loadUsers()
        } catch (error) {
            toast.error("Error to delete user")
        }
    }

    const changeRole = async (id, role) => {
        try {
            await API.put(`/users/${id}/role`, { role })
            toast.success("Role updated")
            loadUsers()
        } catch (error) {
             toast.error("Unable to update role")
        }
    }
    return(
        <div className="min-h-screen bg-linear-to-br from-slate-200 via-blue-100 to-indigo-200
        p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 sm:mb-8">
                    <div className="bg-indigo-600 text-white p-3 sm:p-4 w-fit rounded-2xl shadow-lg">
                        <FaUsers size={30} />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                            Manage Users
                        </h1>
                        <p className="text-sm sm:text-base text-gray-500">
                            View, Update Roles & Manage Users
                        </p>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl 
                shadow-2xl overflow-hidden border border-white">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px]">
                            <thead className="bg-linear-to-r from-indigo-600 to-cyan-500 text-white text-sm sm:text-base">
                                <tr>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left">User</th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left">Email</th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left">Role</th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left">Joined</th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}
                                    className="border-b hover:bg-indigo-200 transition text-sm sm:text-base">
                                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-r
                                                from-indigo-500 to-cyan-500 text-white flex items-center
                                                justify-center font-bold text-lg">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-800 text-sm sm:text-base">
                                                        {user.name}
                                                    </h3>
                                                    <p className="text-xs sm:text-sm">
                                                        User ID <span className="text-purple-600 font-bold">{user._id}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 font-semibold sm:px-6 py-3 sm:py-4 text-gray-600 text-xs sm:text-sm">
                                            {user.email}
                                        </td>
                                         <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600">
                                           <select
                                           value={user.role}
                                           onChange={(e) => changeRole(user._id, e.target.value)}
                                           className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg border font-medium outline-none text-xs sm:text-sm
                                            ${user.role === "admin" ? 
                                                "bg-green-200 text-green-700 border-green-300" 
                                                : "bg-purple-200 text-purple-700 border-purple-300"
                                                }`}
                                           >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                           </select>
                                        </td>

                                        <td className="px-4 sm:px-6 py-3 font-semibold sm:py-4 text-xs sm:text-sm text-center text-gray-600">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>

                                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-center">
                                            <button onClick={() => deleteUser(user._id)}
                                                className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600
                                                text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg transition shadow-md text-xs sm:text-sm">
                                                    <FaTrash />
                                                    Delete
                                                </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}