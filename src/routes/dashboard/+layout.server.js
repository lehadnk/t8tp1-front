import {redirect} from "@sveltejs/kit";
import {VITE_BACKEND_URL} from "$env/static/private";

export async function load({ cookies }) {
    const authenticationToken = cookies.get("authentication");
    if (!authenticationToken) {
        redirect(307, '/login')
    }

    const response = await fetch(VITE_BACKEND_URL + `/auth/profile/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authenticationToken
        }
    })
    if (response.status !== 200) {
        redirect(307, '/login')
    }

    return { user: await response.json() }
}