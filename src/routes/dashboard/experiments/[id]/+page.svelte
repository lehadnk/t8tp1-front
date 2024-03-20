<script>
import { onMount } from 'svelte';

export let data;

function renderGraph()
{
    const xvalues = [-3, -2, -1, 0, 1, 2, 3];
    const yvalues = [-2, -1, 0, 1, 2, 3, 4, 5, 6];

    const alpha = data.experiment.alpha
    const beta = data.experiment.beta
    const mu = data.experiment.mu
    const G = data.experiment.g
    const A = data.experiment.a
    const N = data.experiment.n
    console.log(alpha, beta, mu, G, A, N)

    const zvalues = []
    for(let t2 = 0; t2 < yvalues.length; t2 += 1) {
        const r = []
        for (let t1 = 0; t1 < xvalues.length; t1 += 1) {
            r.push(
                alpha * (G * mu * ((yvalues[t2] - xvalues[t1]) ** N + (beta * A - xvalues[t1]) ** N))
            );
        }
        zvalues.push(r)
    }

    const data_z1 = {
        x: xvalues,
        y: yvalues,
        z: zvalues,
        type: 'surface',
    };
    const data_z2 = {
        x: [data.experiment.t1],
        y: [data.experiment.t2],
        z: [data.experiment.s],
        mode: 'markers',
        marker: {
            color: 'rgb(127, 127, 127)',
            size: 12,
            symbol: 'circle',
            line: {
                color: 'rgb(204, 204, 204)',
                width: 1},
            opacity: 0.8
        },
        type: "scatter3d"
    }
    const container = document.getElementById('tester');
    const layout = {
        title: "График функции",
        scene: {
            xaxis: {
                title: 't1'
            },
            yaxis: {
                title: 't2'
            },
            zaxis: {
                title: 'S'
            }
        }

    }
    Plotly.newPlot(container, [data_z1, data_z2], layout, {showSendToCloud: true});
}
onMount(() => {
    renderGraph();
});
</script>

<div class="ui segment">
    <table class="ui fixed single line celled table">
        <thead>
        <th>Параметр</th>
        <th>Значение</th>
        </thead>
        <tr>
            <td colspan="2"><b>Входные параметры модели</b></td>
        </tr>
        <tr>
            <td>α (нормирующий множитель)</td>
            <td>{data.experiment.alpha}</td>
        </tr>
        <tr>
            <td>β (нормирующий множитель)</td>
            <td>{data.experiment.beta}</td>
        </tr>
        <tr>
            <td>μ (нормирующий множитель)</td>
            <td>{data.experiment.mu}</td>
        </tr>
        <tr>
            <td>G (расход реакционной массы)</td>
            <td>{data.experiment.g}</td>
        </tr>
        <tr>
            <td>A (давление в реакторе)</td>
            <td>{data.experiment.a}</td>
        </tr>
        <tr>
            <td>N (скорость вращения мешалки)</td>
            <td>{data.experiment.n}</td>
        </tr>
        <tr>
            <td colspan="2"><b>Выходные параметры</b></td>
        </tr>
        <tr>
            <td>T1 (температура в змеевике)</td>
            <td>{data.experiment.t1}</td>
        </tr>
        <tr>
            <td>T2 (температура в рубашке)</td>
            <td>{data.experiment.t2}</td>
        </tr>
        <tr>
            <td>S (количество получаемого целевого компонента)</td>
            <td>{data.experiment.s}</td>
        </tr>
    </table>
</div>
<div class="ui one column center aligned page grid">
    <div id="tester" class="middle aligned" style="width:600px;height:600px;"></div>
</div>