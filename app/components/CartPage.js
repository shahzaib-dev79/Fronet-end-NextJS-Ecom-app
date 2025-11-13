"use client";
import { useCart } from "../../context/CartContex";
import Link from "next/link";

export default function CartPage() {
	const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } =
		useCart();

	if (
		typeof window !== "undefined" &&
		process.env.NEXT_PUBLIC_BACKEND_URL !== "production"
	) {
		console.debug("[CartPage] items:", items);
	}

	if (items.length === 0) {
		return (
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-8">Your Cart</h1>
				<div className="text-center py-12">
					<h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
					<Link
						href="/user/products"
						className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
						Continue Shopping
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">Your Cart</h1>
				<button
					onClick={clearCart}
					className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
					Clear Cart
				</button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2">
					{items.map((item) => (
						<div
							key={item.id}
							className="flex items-center border-b border-gray-200 py-4">
							<img
								src={item.image || "/placeholder-image.jpg"}
								alt={item.name}
								className="w-20 h-20 object-cover rounded-lg"
							/>

							<div className="flex-1 ml-4">
								<h3 className="text-lg font-semibold">{item.name}</h3>
								<p className="text-gray-600">${item.price}</p>
							</div>

							<div className="flex items-center space-x-2">
								<button
									onClick={() => updateQuantity(item.id, item.quantity - 1)}
									className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded">
									-
								</button>
								<span className="w-8 text-center">{item.quantity}</span>
								<button
									onClick={() => updateQuantity(item.id, item.quantity + 1)}
									className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded">
									+
								</button>
							</div>

							<div className="ml-4 text-right">
								<p className="font-semibold">
									${(item.price * item.quantity).toFixed(2)}
								</p>
								<button
									onClick={() => removeFromCart(item.id)}
									className="text-red-500 hover:text-red-700 text-sm mt-1">
									Remove
								</button>
							</div>
						</div>
					))}
				</div>

				<div className="bg-gray-50 p-6 rounded-lg h-fit">
					<h3 className="text-xl font-semibold mb-4">Order Summary</h3>
					<div className="space-y-2 mb-4">
						<div className="flex justify-between">
							<span>Subtotal</span>
							<span>${getCartTotal().toFixed(2)}</span>
						</div>
						<div className="flex justify-between">
							<span>Shipping</span>
							<span>Free</span>
						</div>
						<div className="flex justify-between font-semibold text-lg border-t pt-2">
							<span>Total</span>
							<span>${getCartTotal().toFixed(2)}</span>
						</div>
					</div>
					<button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold">
						Checkout
					</button>
				</div>
			</div>
		</div>
	);
}
