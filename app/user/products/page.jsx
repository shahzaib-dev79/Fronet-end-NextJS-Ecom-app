"use client";
import AddToCartButton from "../../components/AddToCartButton";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function page() {
	const [productData, setProducts] = useState([]);
	async function getProducts() {
		try {
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`
			);
			console.log("Products fetched successfully");
			setProducts(res.data.products || []);
		} catch (err) {
			console.log("Error occured in fetching data", err);
			setProducts([]);
		}
	}
	useEffect(() => {
		getProducts();
	}, []);

	return (
		<div>
			<div className="text-center mt-15 mb-20">
				<h1 className="text-4xl font-semibold ">Products</h1>
			</div>
			<div className="flex flex-wrap gap-5  m-auto justify-center">
				{productData.map((myProducts) => {
					return (
						<div
							key={myProducts._id || myProducts.id || myProducts.title}
							className="w-[23%] sm:max-w-sm border border-gray-300 rounded-3xl ">
							<figure>
								<img
									src={myProducts.image || myProducts.img}
									alt={myProducts.title || myProducts.name}
									className="rounded-t-3xl h-[300px]"
								/>
							</figure>
							<div className="p-5">
								<h5 className="text-lg font-semibold mb-2.5">
									{myProducts.title || myProducts.name}
								</h5>
								<p className="mb-4">
									{myProducts.description || myProducts.desc}
								</p>
								<h3 className="font-semibold text-3xl">{myProducts.price}$</h3>
								<span className="inline-block bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded mt-2">
									{myProducts.category}
								</span>
								<div className="flex gap-4 mt-3">
									<button className=" rounded-md p-3 text-center bg-orange-600 cursor-pointer text-white font-semibold active:bg-orange-700 outline-0">
										Buy Now
									</button>
									<AddToCartButton product={myProducts} />
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
