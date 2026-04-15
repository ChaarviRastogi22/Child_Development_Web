document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('progressChart').getContext('2d');

    // 🔥 Gradient line fill
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "rgba(75, 192, 192, 0.4)");
    gradient.addColorStop(1, "rgba(75, 192, 192, 0)");

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
            datasets: [{
                label: 'Emotional Progress',
                data: [0, 0, 0, 0, 0, 0, 0],

                borderColor: '#4bc0c0',
                backgroundColor: gradient,

                borderWidth: 3,
                tension: 0.4,

                pointBackgroundColor: '#4bc0c0',
                pointBorderColor: '#fff',
                pointRadius: 5,
                pointHoverRadius: 7,

                fill: true
            }]
        },
        options: {
            responsive: true,

            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#333',
                        font: {
                            size: 14
                        }
                    }
                }
            },

            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#666'
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    },
                    ticks: {
                        color: '#666',
                        stepSize: 1
                    }
                }
            }
        }
    });
});