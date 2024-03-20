<script>
    import { enhance } from "$app/forms";
    export let form;
    export let data;
</script>

<div class="ui segment">
    {#if (form?.hasErrors)}
        <div class="ui error message">
            <div class="header">Ошибка</div>
            <p>Вы ввели неправильные данные в одно из полей. Пожалуйста, проверьте их и попробуйте снова.</p>
        </div>
    {/if}

    <form method="POST" use:enhance>
        <input type="hidden" name="id" value="{data.coefficient.id}">
        <div class="ui form success">
            <div class="field" class:error={form?.formErrors.name}>
                <label for="alpha">Название</label>
                <input type="text" placeholder="Название" name="name" value="{data.coefficient.name}" required>
            </div>
            <div class="field" class:error={form?.formErrors.alpha}>
                <label for="alpha">α (нормирующий множитель)</label>
                <input type="number" placeholder="1" name="alpha" value="{data.coefficient.alpha}" required>
            </div>
            <div class="field" class:error={form?.formErrors.beta}>
                <label for="beta">β (нормирующий множитель)</label>
                <input type="number" placeholder="1" name="beta" value="{data.coefficient.beta}" required>
            </div>
            <div class="field" class:error={form?.formErrors.mu}>
                <label for="mu">μ (нормирующий множитель)</label>
                <input type="number" placeholder="1" name="mu" value="{data.coefficient.mu}" required>
            </div>
            <div class="field" class:error={form?.formErrors.g}>
                <label for="g">G (расход реакционной массы)</label>
                <input type="number" placeholder="1" name="g" value="{data.coefficient.g}" required>
            </div>
            <div class="field" class:error={form?.formErrors.a}>
                <label for="a">A (давление в реакторе)</label>
                <input type="number" placeholder="1" name="a" value="{data.coefficient.a}" required>
            </div>
            <div class="field" class:error={form?.formErrors.n}>
                <label for="n">N (скорость вращения мешалки)</label>
                <input type="number" placeholder="1" name="n" value="{data.coefficient.n}" required>
            </div>

            <input type="submit" class="ui submit button" value="Сохранить" />
        </div>
    </form>
</div>