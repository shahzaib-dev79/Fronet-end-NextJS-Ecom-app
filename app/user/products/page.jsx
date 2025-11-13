"use client";
import Card from "../../components/Card";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function page() {
	const [productData, setProducts] = useState([]);
	async function getProducts() {
		const product = await axios
			.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`)
			.then(console.log("Products fetched successfully"))
			.catch((err) => console.log("Error occured in fetching data", err));
		setProducts(product.data.products);
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
						<div class="w-[23%] sm:max-w-sm border border-gray-300 rounded-3xl ">
							<figure>
								<img
									src={myProducts.image}
									alt="Watch"
									className="rounded-t-3xl h-[300px]"
								/>
							</figure>
							<div class=" p-5">
								<h5 class="text-lg font-semibold mb-2.5">{myProducts.title}</h5>
								<p class="mb-4">{myProducts.desc}</p>
								<h3 className="font-semibold text-3xl">{myProducts.price}$</h3>
								<h3 className=" text-xl">{myProducts.category}$</h3>
								<div className="flex gap-4 mt-3">
									<button className=" rounded-md p-3 text-center bg-orange-600 cursor-pointer text-black font-semibold active:bg-orange-700 outline-0">
										Buy Now
									</button>
									<button className="rounded-md p-3 text-center bg-blue-900 cursor-pointer text-white active:bg-blue-950">
										Add to cart
									</button>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
