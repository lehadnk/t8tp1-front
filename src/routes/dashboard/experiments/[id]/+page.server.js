import {error} from "@sveltejs/kit";
import {VITE_BACKEND_URL} from "$env/static/private";

export const csr = false;

export async function load({ params, cookies })
{
    const response = await fetch(VITE_BACKEND_URL + `/calculation_results/${params.id}/`, {
        method: "GET",
        // @ts-ignore
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookies.get("authentication")
        }
    })
    if (response.status !== 200) {
        throw error(404);
    }

    const experiment = await response.json();
    return {experiment}
}