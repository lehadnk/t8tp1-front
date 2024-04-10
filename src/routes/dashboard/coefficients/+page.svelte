<script>
    import {page} from "$app/stores";
    import {goto} from "$app/navigation";

    export let data;

    const currentPage = $page.url.searchParams.has('page') ? $page.url.searchParams.get("page") : 1;

    async function calculate(event)
    {
        const response = await fetch(data.backendUrl + `/coefficient_setups/${event.id}/calculate/`, {
            method: "POST",
            body: "",
            // @ts-ignore
            headers: {
                'Content-Type': 'application/json',
                'Authorization': data.authCookie
            }
        })
        const calculationData = await response.json()

        goto(`/dashboard/experiments/${calculationData.id}`)
    }
</script>

<div class="ui segment">
    <a class="ui button" href="/dashboard/coefficients/create">Создать</a>

    <table class="ui fixed single line celled table">
        <thead>
        <tr>
            <th style="width: 70px;">ID</th>
            <th>Название</th>
            <th style="width: 70px;">α</th>
            <th style="width: 70px;">β</th>
            <th style="width: 70px;">μ</th>
            <th style="width: 70px;">G</th>
            <th style="width: 70px;">A</th>
            <th style="width: 70px;">N</th>
            <th>Действия</th>
        </tr></thead>
        <tbody>
        {#each data.coefficients.items as {id, name, alpha, beta, mu, g, a, n}}
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{alpha}</td>
            <td>{beta}</td>
            <td>{mu}</td>
            <td>{g} кг/ч</td>
            <td>{a} Кпа</td>
            <td>{n} об/с</td>
            <td>
                <div class="ui basic buttons">
                    <div class="ui button" on:click={() => calculate({id})} on:keypress={() => calculate({id})} role="button" tabindex="-10">Рассчитать</div>
                    <a href="/dashboard/coefficients/{id}/" class="ui button">Редактировать</a>
                </div>
            </td>
        </tr>
        {/each}
    </table>

    <div class="ui small basic icon buttons">
        {#each {length: data.coefficients.pages} as _, i}
            <a href="/dashboard/coefficients?page={i + 1}" class:active={currentPage == (i + 1)} class="ui button">{i + 1}</a>
        {/each}
    </div>
</div>