<script>
    import {page} from "$app/stores";

    export let data;

    const currentPage = $page.url.searchParams.has('page') ? $page.url.searchParams.get("page") : 1;
</script>

<div class="ui segment">
    <table class="ui fixed single line celled table">
        <thead>
        <tr>
            <th>ID</th>
            <th>α</th>
            <th>β</th>
            <th>μ</th>
            <th>G</th>
            <th>A</th>
            <th>N</th>
            <th>T1</th>
            <th>T2</th>
            <th>S</th>
            <th>Действия</th>
        </tr></thead>
        <tbody>
        {#each data.experiments.items as {id, alpha, beta, mu, g, a, n, t1, t2, s}}
        <tr>
            <td>{id}</td>
            <td>{alpha}</td>
            <td>{beta}</td>
            <td>{mu}</td>
            <td>{g} кг/ч</td>
            <td>{a} Кпа</td>
            <td>{n} об/с</td>
            <td>{t1} °C</td>
            <td>{t2} °C</td>
            <td>{s} кг</td>
            <td>
                <div class="ui basic buttons">
                    <a href="/dashboard/experiments/{id}" class="ui button">Просмотр</a>
                </div>
            </td>
        </tr>
        {/each}
        </tbody>
    </table>

    <div class="ui small basic icon buttons">
        {#each {length: data.experiments.pages} as _, i}
            <a href="/dashboard/coefficients?page={i + 1}" class:active={currentPage == (i + 1)} class="ui button">{i + 1}</a>
        {/each}
    </div>
</div>