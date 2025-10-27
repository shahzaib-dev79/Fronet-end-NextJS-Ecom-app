"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	function changeHandler(e) {
		const name = e.target.name;
		const value = e.target.value;
		setUser((prev) => ({ ...prev, [name]: value }));
	}
	async function submitHandler(e) {
		e.preventDefault();
		const res = await axios
			.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register-user`, user)
			// .post(`http://localhost:8000/api/v1/register-user`, user)
			.then(
				setUser({
					firstName: "",
					lastName: "",
					email: "",
					password: "",
					confirmPassword: "",
				})
			);
		alert(res.data.msg);
	}

	return (
		<section className="text-gray-600 body-font relative">
			<div className="container px-5 py-24 mx-auto">
				<div className="flex flex-col text-center w-full mb-12">
					<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
						Register User
					</h1>
				</div>
				<form className="lg:w-1/2 md:w-2/3 mx-auto" onSubmit={submitHandler}>
					<div className="flex flex-wrap -m-2">
						<div className="p-2 w-full">
							<div className="relative">
								<label
									htmlFor="name"
									className="leading-7 text-sm text-gray-600">
									First Name
								</label>
								<input
									type="text"
									id="firstName"
									name="firstName"
									value={user.firstName}
									onChange={changeHandler}
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								/>
							</div>
						</div>
						<div className="p-2 w-1/2">
							<div className="relative">
								<label
									htmlFor="lastName"
									className="leading-7 text-sm text-gray-600">
									Last Name
								</label>
								<input
									type="text"
									id="lastName"
									name="lastName"
									value={user.lastName}
									onChange={changeHandler}
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								/>
							</div>
						</div>
						<div className="p-2 w-1/2">
							<div className="relative">
								<label
									htmlFor="email"
									className="leading-7 text-sm text-gray-600">
									Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={user.email}
									onChange={changeHandler}
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								/>
							</div>
						</div>
						<div className="p-2 w-1/2">
							<div className="relative">
								<label
									htmlFor="password"
									className="leading-7 text-sm text-gray-600">
									Password
								</label>
								<input
									type="password"
									id="password"
									name="password"
									value={user.password}
									onChange={changeHandler}
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								/>
							</div>
						</div>
						<div className="p-2 w-1/2">
							<div class="relative">
								<label
									htmlFor="confirmPassword"
									class="leading-7 text-sm text-gray-600">
									Confirm Password
								</label>
								<input
									type="password"
									id="confirmPassword"
									name="confirmPassword"
									value={user.confirmPassword}
									onChange={changeHandler}
									class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								/>
							</div>
						</div>
						<div className="p-2 w-full">
							<button
								type="submit"
								className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
								Register User
							</button>
						</div>
					</div>
				</form>
			</div>
		</section>
	);
}
