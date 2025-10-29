"use client";
import Card from "@/app/components/Card";
import React, { useState } from "react";

export default function page() {
	const [productData, setProducts] = useState([]);
	async function getProducts() {
		const product = await axios
			.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`)
			.then(
				console
					.log("Products fetched successfully")
					.catch((err) => console.log("Error occured in fetching data", err))
			);
		setProducts(product.data);
	}
	return (
		<div>
			<div className="text-center mt-15 mb-20">
				<h1 className="text-4xl font-semibold ">Products</h1>
			</div>
			<div className="flex flex-wrap gap-5  m-auto justify-center">
				{productData.map((myProducts) => {
					return (
						<Card
							title={myProducts.title}
							desc={myProducts.description}
							price={myProducts.price}
							image={myProducts.image}
							category={myProducts.category}
						/>
					);
				})}
			</div>
		</div>
	);
}
