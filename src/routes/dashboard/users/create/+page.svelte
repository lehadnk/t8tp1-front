<script>
    import { enhance } from "$app/forms";
    export let form;
</script>

<div class="ui segment">
    {#if (form?.hasErrors)}
    <div class="ui error message">
        <div class="header">Ошибка</div>
        <p>Вы ввели неправильные данные в одно из полей. Пожалуйста, проверьте их и попробуйте снова.</p>
    </div>
    {/if}

    <form method="POST" use:enhance>
    <div class="ui form success">
        <div class:error={form?.formErrors.email} class="field">
            <label for="email">E-mail</label>
            <input type="email" placeholder="joe@schmoe.com" name="email">
        </div>
        <div class="field">
            <label for="password">Пароль</label>
            <input type="password" placeholder="" name="password">
        </div>
        <div class:error={form?.formErrors.role} class="field">
            <label for="role">Роль</label>
            <select class="ui fluid dropdown" name="role">
                <option value="admin">Администратор</option>
                <option value="researcher">Исследователь</option>
            </select>
        </div>

        <input type="submit" class="ui submit button" value="Сохранить" />
    </div>
    </form>

    <script type="text/javascript">
        $('select.dropdown')
            .dropdown()
        ;
    </script>
</div>