"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function page() {
	const router = useRouter();
	const [product, setProduct] = useState({
		title: "",
		description: "",
		price: "",
		category: "",
		image: "",
	});

	function changeHandler(e) {
		const name = e.target.name;
		const value = e.target.value;
		setProduct((prev) => ({ ...prev, [name]: value }));
	}
	async function submitHandler(e) {
		e.preventDefault();
		try {
			const res = await axios
				.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/create-product`, product);
				(
					setProduct({
						title: "",
						description: "",
						price: "",
						category: "",
						image: "",
					})
				);
				    router.push("/admin/admin-panel");

			console.log(res);
			console.log(res.data.msg);
			alert(res.data.msg);
		} catch (error) {
			alert(error.response.data.msg);
		}
	}

	return (
		<section className="text-gray-600 body-font relative">
			<div className="container px-5 py-24 mx-auto">
				<div className="flex flex-col text-center w-full mb-12">
					<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
						Create Products
					</h1>
				</div>
				<form className="lg:w-1/2 md:w-2/3 mx-auto" onSubmit={submitHandler}>
					<div className="flex flex-wrap -m-2">
						<div className="p-2 w-full">
							<div className="relative">
								<label
									htmlFor="title"
									className="leading-7 text-sm text-gray-600">
									Title
								</label>
								<input
									type="text"
									id="title"
									name="title"
									value={product.title}
									onChange={changeHandler}
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								/>
							</div>
						</div>
						<div className="p-2 w-1/2">
							<div className="relative">
								<label
									htmlFor="description"
									className="leading-7 text-sm text-gray-600">
									Description
								</label>
								<input
									type="text"
									id="description"
									name="description"
									value={product.description}
									onChange={changeHandler}
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								/>
							</div>
						</div>
						<div className="p-2 w-1/2">
							<div className="relative">
								<label
									htmlFor="price"
									className="leading-7 text-sm text-gray-600">
									Price
								</label>
								<input
									type="number"
									id="price"
									name="price"
									value={product.price}
									onChange={changeHandler}
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								/>
							</div>
						</div>
						<div className="p-2 w-1/2">
							<div className="relative">
								<label
									htmlFor="category"
									className="leading-7 text-sm text-gray-600">
									Category
								</label>
								<input
									type="text"
									id="category"
									name="category"
									value={product.category}
									onChange={changeHandler}
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								/>
							</div>
						</div>
						<div className="p-2 w-1/2">
							<div class="relative">
								<label htmlFor="image" class="leading-7 text-sm text-gray-600">
									Image URL
								</label>
								<input
									type="text"
									id="image"
									name="image"
									value={product.image}
									onChange={changeHandler}
									class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								/>
							</div>
						</div>
						<div className="p-2 w-full">
							<button
								type="submit"
								className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
								Create Product
							</button>
						</div>
					</div>
				</form>
			</div>
		</section>
	);
}
