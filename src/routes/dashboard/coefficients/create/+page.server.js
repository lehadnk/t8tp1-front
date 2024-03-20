import {fail, redirect} from "@sveltejs/kit";
import {VITE_BACKEND_URL} from "$env/static/private";

export const actions = {
    default: async ({cookies, request}) => {
        const data = await request.formData();

        const formErrors = {
            name: false,
            alpha: false,
            beta: false,
            mu: false,
            g: false,
            a: false,
            n: false,
        }

        let hasFormErrors = false;
        const name = String(data.get("name"))
        if (name == null || name === "") {
            formErrors.name = true;
            hasFormErrors = true;
        }
        const alpha = String(data.get("alpha"));
        if (alpha == null || isNaN(parseFloat(alpha))) {
            formErrors.alpha = true;
            hasFormErrors = true;
        }
        const beta = String(data.get("beta"));
        if (beta == null || isNaN(parseFloat(beta))) {
            formErrors.beta = true;
            hasFormErrors = true;
        }
        const mu = String(data.get("mu"));
        if (mu == null || isNaN(parseFloat(mu))) {
            formErrors.mu = true;
            hasFormErrors = true;
        }
        const g = String(data.get("g"));
        if (g == null || isNaN(parseFloat(g))) {
            formErrors.g = true;
            hasFormErrors = true;
        }
        const a = String(data.get("a"));
        if (a == null || isNaN(parseFloat(a))) {
            formErrors.a = true;
            hasFormErrors = true;
        }
        const n = String(data.get("n"));
        if (n == null || isNaN(parseFloat(n))) {
            formErrors.n = true;
            hasFormErrors = true;
        }

        if (hasFormErrors) {
            return fail(400, {hasFormErrors, formErrors})
        }

        const coefficients = {
            id: null,
            name: name,
            alpha: alpha,
            beta: beta,
            mu: mu,
            g: g,
            a: a,
            n: n,
            user_id: 1//await parent().user.id,
        }

        console.log(coefficients)

        const response = await fetch(VITE_BACKEND_URL + `/coefficient_setups/`, {
            method: "POST",
            body: JSON.stringify(coefficients),
            // @ts-ignore
            headers: {
                'Content-Type': 'application/json',
                'Authorization': cookies.get("authentication")
            }
        })

        if (response.status === 200) {
            redirect(303, '/dashboard/coefficients')
        }

        return fail(400, {hasErrors: true, formErrors})
    }
}