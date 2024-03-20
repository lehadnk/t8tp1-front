import {VITE_BACKEND_URL} from "$env/static/private";

export async function load({cookies, url}) {

    const currentPage = url.searchParams.get("page") ?? 1;
    const response = await fetch(VITE_BACKEND_URL + `/users/?page=` + currentPage, {
        method: "GET",
        // @ts-ignore
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookies.get("authentication")
        }
    })

    return {
        users: await response.json()
    }
}