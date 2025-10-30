import React from "react";

export default function Card(props) {
	const { title, desc, price, image, category } = props;
	console.log(props);
	return (
		<div class="w-[23%] sm:max-w-sm border border-gray-300 rounded-3xl ">
			<figure>
				<img src={image} alt="Watch" className="rounded-t-3xl h-[300px]" />
			</figure>
			<div class=" p-5">
				<h5 class="text-lg font-semibold mb-2.5">{title}</h5>
				<p class="mb-4">{desc}</p>
				<h3 className="font-semibold text-3xl">{price}$</h3>
				<h3 className=" text-xl">{category}$</h3>
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
}
