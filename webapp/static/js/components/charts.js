
export const cpuLoad = (selector, data) => {
    const ctx = selector.getContext('2d');
    const labels = [1, 5, 15];

    new Chart(ctx, {
        type: 'line',
        title: {
            display: false,
        },
        data: {
            datasets: [{
                fill: 'origin',
                data: data,
                borderColor: 'rgba(185, 230, 85, 1)',
                borderWidth: 1,
                pointRadius: 1,
                lineTension: 0,
                backgroundColor: 'rgba(185, 230, 85, .1)'
            }],
            labels: labels,
        },
        options: {
            scales: {
                xAxes: [{
                    display: false,
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 100,
                    },
                    display: false,
                }]
            }
        },
    });
}