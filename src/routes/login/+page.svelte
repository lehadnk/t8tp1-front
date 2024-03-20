<script>
    import { enhance } from "$app/forms";
    export let form;
</script>

<div class="ui placeholder segment" style="height: 100%">
    <div class="ui middle aligned very relaxed stackable grid">
        <div class="column">
            <div class="ui form">
                <form method="POST" use:enhance>
                    <div class:error={form?.hasError} class="field">
                        <label for="email">Email</label>
                        <div class="ui left icon input">
                            <input type="email" placeholder="Email" name="email" required>
                            <i class="mail icon"></i>
                        </div>
                    </div>
                    <div class:error={form?.hasError} class="field">
                        <label for="password">Пароль</label>
                        <div class="ui left icon input">
                            <input type="password" name="password" required>
                            <i class="lock icon"></i>
                        </div>
                    </div>

                    <input class="ui blue submit button" type="submit" value="Войти">
                </form>
            </div>
        </div>
    </div>
</div>