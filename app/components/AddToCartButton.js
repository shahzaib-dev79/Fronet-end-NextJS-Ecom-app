"use client";
import { useCart } from "../../context/CartContex";

export default function AddToCartButton({ product }) {
	const { addToCart } = useCart();

	const handleAddToCart = () => {
		// Normalize product shape so cart always has predictable fields
		const normalized = {
			id: product?._id ?? product?.id ?? product?.title ?? String(Date.now()),
			name: product?.title ?? product?.name ?? product?.desc ?? "Untitled",
			price: Number(product?.price ?? 0),
			image: product?.image ?? product?.img ?? "/placeholder-image.jpg",
			category: product?.category ?? "",
			description: product?.description ?? product?.desc ?? "",
		};

		addToCart(normalized);
		// Use normalized.name to avoid undefined
		alert(`${normalized.name} added to cart!`);
	};

	return (
		<button
			onClick={handleAddToCart}
			className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
			Add to Cart
		</button>
	);
}
