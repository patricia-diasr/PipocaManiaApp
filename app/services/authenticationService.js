import { apiMovieTheater } from "./apiClient";

export async function login(loginData) {
    try {
        const response = await apiMovieTheater.get(`/users.json`);
        const usersData = response.data;
        const user = usersData.find((user) => user.login === loginData.login);

        if (user && user.password === loginData.password) {
            return {
                message: "Login successful",
                user: {
                    name: user.name,
                    id: user.id,
                    role: user.role,
                },
            };
        } else {
            throw new Error("Invalid login or password");
        }
    } catch (error) {
        throw new Error(`Error during login: ${error.message}`);
    }
}

export async function signup(signupData) {
    try {
        const response = await apiMovieTheater.get(`/users.json`);
        const usersData = response.data || {};
        const userId = Date.now();

        const newUser = {
            id: userId,
            name: signupData.name,
            login: signupData.login,
            password: signupData.password,
            role: "client",
            tickets: [],
            watchlist: [],
            myReviews: [],
        };

        usersData.push(newUser);

        const updateResponse = await apiMovieTheater.put(`/users.json`, usersData);

        if (updateResponse.status === 200) {
            return {
                message: "Signup successful",
                user: {
                    name: newUser.name,
                    id: userId,
                    role: newUser.role,
                },
            };
        } else {
            throw new Error("Failed to update users");
        }
    } catch (error) {
        throw new Error(`Error during signup: ${error.message}`);
    }
}
