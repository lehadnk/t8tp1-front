import {fail, redirect} from "@sveltejs/kit";
import {VITE_BACKEND_URL} from "$env/static/private";

export const actions = {
    default: async ({cookies, request}) => {
        const data = await request.formData();
        const email = data.get("email");
        const password = data.get("password");

        const response = await fetch(VITE_BACKEND_URL + `/auth/login/`, {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (response.status === 200) {
            const responseData = await response.json()
            cookies.set('authentication', responseData.auth_token, { path: '/' })

            redirect(303, '/dashboard')
        }

        return fail(400,{ hasError: true })
    }
}