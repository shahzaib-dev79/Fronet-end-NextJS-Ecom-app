import React from "react";

export default function Card(props) {
	const { title, desc, price, image, category } = props;
	return (
		<div class="w-[23%] sm:max-w-sm border border-gray-300 rounded-3xl ">
			<figure>
				<img
					src="https://cdn.flyonui.com/fy-assets/components/card/image-9.png"
					alt="Watch"
					className="rounded-t-3xl h-[300px]"
				/>
			</figure>
			<div class=" p-5">
				<h5 class="text-lg font-semibold mb-2.5">Apple Smart Watch</h5>
				<p class="mb-4">
					Stay connected, motivated, and healthy with the latest Apple Watch.
				</p>
				<h3 className="font-semibold text-3xl">price$</h3>
				<div className="flex gap-4 mt-3">
					<button class=" rounded-md p-3 text-center bg-orange-600 cursor-pointer text-black font-semibold active:bg-orange-700 outline-0">
						Buy Now
					</button>
					<button class="rounded-md p-3 text-center bg-blue-900 cursor-pointer text-white active:bg-blue-950">
						Add to cart
					</button>
				</div>
			</div>
		</div>
	);
}
