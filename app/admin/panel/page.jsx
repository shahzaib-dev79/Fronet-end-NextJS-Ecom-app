"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Page() {
	const [data, setData] = useState({
		user: { name: "", email: "", password: "" }, // single user form
		users: [], // all users
		editingUser: null, // current editing user id
		updatedUser: { name: "", email: "" }, // edited info
	});

	// ✅ Fetch all users
	async function getUsers() {
		try {
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`
			);
			setData((prev) => ({ ...prev, users: res.data.users }));
			console.log("Users fetched successfully");
		} catch (err) {
			console.log("Error fetching users", err);
		}
	}

	useEffect(() => {
		getUsers();
	}, []);

	// ✅ Handle input change for form
	function changeHandler(e) {
		const { name, value } = e.target;
		setData((prev) => ({
			...prev,
			user: { ...prev.user, [name]: value },
		}));
	}

	// ✅ Submit handler (register user)
	async function submitHandler(e) {
		e.preventDefault();
		try {
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/register-user`,
				data.user
			);
			alert(res.data.msg || "User created successfully");

			setData((prev) => ({
				...prev,
				user: { name: "", email: "", password: "" },
			}));

			getUsers();
		} catch (error) {
			alert(error.response?.data?.msg || "Error creating user");
		}
	}

	// ✅ Delete handler
	async function handleDelete(id) {
		if (!confirm("Are you sure you want to delete this user?")) return;
		try {
			await axios.delete(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/delete-user/${id}`
			);
			alert("User deleted successfully");
			getUsers();
		} catch (err) {
			alert("Error deleting user");
		}
	}

	// ✅ Start editing user
	function startEdit(user) {
		setData((prev) => ({
			...prev,
			editingUser: user._id,
			updatedUser: { name: user.name, email: user.email },
		}));
	}

	// ✅ Save after editing
	async function saveEdit(id) {
		try {
			await axios.put(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/edit-user/${id}`,
				data.updatedUser
			);
			alert("User updated successfully");
			setData((prev) => ({
				...prev,
				editingUser: null,
			}));
			getUsers();
		} catch (err) {
			alert("Error updating user");
		}
	}

	return (
		<div className="p-6 max-w-2xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">User Panel (Single useState)</h1>

			<form onSubmit={submitHandler} className="mb-6 space-y-3">
				<input
					type="text"
					name="name"
					placeholder="Name"
					value={data.user.name}
					onChange={changeHandler}
					className="border p-2 w-full rounded"
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={data.user.email}
					onChange={changeHandler}
					className="border p-2 w-full rounded"
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={data.user.password}
					onChange={changeHandler}
					className="border p-2 w-full rounded"
				/>
				<button
					type="submit"
					className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">
					Register
				</button>
			</form>

			<h2 className="text-xl font-semibold mb-3">User List</h2>
			{data.users.length === 0 ? (
				<p>No users found.</p>
			) : (
				<table className="w-full border-collapse border border-gray-300">
					<thead>
						<tr className="bg-gray-200">
							<th className="border p-2">Name</th>
							<th className="border p-2">Email</th>
							<th className="border p-2">Actions</th>
						</tr>
					</thead>
					<tbody>
						{data.users.map((item) => (
							<tr key={item._id} className="text-center">
								<td className="border p-2">
									{data.editingUser === item._id ? (
										<input
											type="text"
											value={data.updatedUser.name}
											onChange={(e) =>
												setData((prev) => ({
													...prev,
													updatedUser: {
														...prev.updatedUser,
														name: e.target.value,
													},
												}))
											}
											className="border p-1 rounded"
										/>
									) : (
										item.name
									)}
								</td>
								<td className="border p-2">
									{data.editingUser === item._id ? (
										<input
											type="email"
											value={data.updatedUser.email}
											onChange={(e) =>
												setData((prev) => ({
													...prev,
													updatedUser: {
														...prev.updatedUser,
														email: e.target.value,
													},
												}))
											}
											className="border p-1 rounded"
										/>
									) : (
										item.email
									)}
								</td>
								<td className="border p-2 space-x-2">
									{data.editingUser === item._id ? (
										<button
											onClick={() => saveEdit(item._id)}
											className="bg-green-500 text-white px-3 py-1 rounded">
											Save
										</button>
									) : (
										<button
											onClick={() => startEdit(item)}
											className="bg-yellow-500 text-white px-3 py-1 rounded">
											Edit
										</button>
									)}
									<button
										onClick={() => handleDelete(item._id)}
										className="bg-red-500 text-white px-3 py-1 rounded">
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}
