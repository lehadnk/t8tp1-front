<script>
    import {goto} from "$app/navigation";
    import { page } from '$app/stores';

    export let data;

    function handleLogout()
    {
        document.cookie = "authentication= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path = /"
        goto("/login")
    }
</script>

<div class="ui secondary pointing menu">
    {#if data.user.role === "admin"}
    <a class:active={$page.url.pathname.startsWith('/dashboard/users')} class="item" href="/dashboard/users">
        Пользователи
    </a>
    {/if}

    {#if data.user.role === "researcher"}
    <a class:active={$page.url.pathname.startsWith('/dashboard/coefficients')} class="item" href="/dashboard/coefficients">
        Коэффициенты
    </a>
    <a class:active={$page.url.pathname.startsWith('/dashboard/experiments')} class="item" href="/dashboard/experiments">
        Результаты экспериментов
    </a>
    {/if}

    <div class="right menu">
        <a class="ui item" on:click|preventDefault={handleLogout} on:keyup|preventDefault={handleLogout} href="#?logout">
            Выйти
        </a>
    </div>
</div>

<slot />