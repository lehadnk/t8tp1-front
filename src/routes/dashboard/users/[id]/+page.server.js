import {error, fail, redirect} from "@sveltejs/kit";
import {VITE_BACKEND_URL} from "$env/static/private";

export async function load({ params, cookies })
{
    const response = await fetch(`${VITE_BACKEND_URL}/users/${params.id}/`, {
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
    // params.id
    var user = await response.json();
    return {user}
}

export const actions = {
    default: async ({cookies, request}) => {
        const data = await request.formData();

        const formErrors = {
            email: false,
            role: false,
        }

        const id = data.get("id");
        const email = data.get("email");
        // @ts-ignore
        if (!email.indexOf("@") === -1) {
            formErrors.email = true;
        }
        var password = data.get("password");
        // @ts-ignore
        if (password.length === 0) {
            password = null;
        }
        const role = data.get("role");
        if (role !== "admin" && role !== "researcher") {
            formErrors.role = true;
        }

        if (formErrors.role || formErrors.email) {
            return fail(400, {hasErrors: true, formErrors})
        }

        const response = await fetch(VITE_BACKEND_URL + `/users/`, {
            method: "POST",
            body: JSON.stringify({id, email, password, role}),
            // @ts-ignore
            headers: {
                'Content-Type': 'application/json',
                'Authorization': cookies.get("authentication")
            }
        })
        if (response.status === 200) {
            redirect(303, '/dashboard/users')
        }

        return fail(400, {hasErrors: true, formErrors})
    }
}