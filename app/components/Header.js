import Link from "next/link";
import CartIcon from "./CartIcon";

export default function Header() {
	return (
		<header className="bg-white shadow-sm border-b">
			<div className="container mx-auto px-4 py-4">
				<div className="flex justify-between items-center">
					<nav className="flex items-center space-x-6">
						<Link href="/" className="hover:text-blue-600">
							Home
						</Link>
						<Link href="/user/products" className="hover:text-blue-600">
							Products
						</Link>
						<CartIcon />
					</nav>
				</div>
			</div>
		</header>
	);
}
