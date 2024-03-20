import {VITE_BACKEND_URL} from "$env/static/private";

export async function load({ url, cookies }) {
    const currentPage = url.searchParams.get("page") ?? 1;
    const response = await fetch(VITE_BACKEND_URL + `/coefficient_setups/?page=` + currentPage, {
        method: "GET",
        // @ts-ignore
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookies.get("authentication")
        }
    })

    return {
        coefficients: await response.json(),
        authCookie: cookies.get("authentication"),
        backendUrl: VITE_BACKEND_URL
    }
}