import http from "./http";

export async function register(firstName, lastName, email, password, role) {
	const res = await http.post("/register", {
		firstName,
		lastName,
		email,
		password,
		role,
	});
	return res.data;
}

export async function login(email, password, role) {
	const res = await http.post("/login", { email, password, role });
	return res.data;
}

// export async function getProfile() {
//   try {
//     const res = await http.get("/auth/profile");
//     return res.data;
//   } catch {
//     return null;
//   }
// }

export async function logoutApi() {
	localStorage.removeItem("token");
}
