<script>
    import {page} from '$app/stores';

    export let data;
    const currentPage = $page.url.searchParams.has('page') ? $page.url.searchParams.get("page") : 1;
</script>

<div class="ui segment">
    <a class="ui button" href="/dashboard/users/create">Создать</a>

    <table class="ui fixed single line celled table">
        <thead>
        <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Роль</th>
            <th>Действия</th>
        </tr></thead>
        <tbody>
        {#each data.users.items as {id, email, role}}
            <tr>
                <td>{id}</td>
                <td>{email}</td>
                <td>{#if role == "researcher"}Исследователь{:else}Администратор{/if}</td>
                <td>
                    <div class="ui basic buttons">
                        <a href="/dashboard/users/{id}" class="ui button">Редактировать</a>
                    </div>
                </td>
            </tr>
        {/each}
    </table>

    <div class="ui small basic icon buttons">
        {#each {length: data.users.pages} as _, i}
            <a href="/dashboard/users?page={i + 1}" class:active={currentPage == (i + 1)} class="ui button">{i + 1}</a>
        {/each}
    </div>
</div>