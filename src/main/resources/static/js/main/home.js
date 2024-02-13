const [priceChart, orderChart] = document.querySelectorAll('.chart');
const [order0, order1, order2, order3] = document.querySelectorAll('.order-result');


let myChart;

// 차트 그리기 (chart.js)

fetch('home/price')
    .then(resp => resp.json())
    .then(value => {
        const lastPrice = value[0];
        const thisPrice = value[1];
        myChart = new Chart(priceChart, {
            type: 'line',
            data: {
                labels:[
                    '월', '화', '수', '목', '금', '토', '일'
                ],
                datasets: [
                    {
                        data: [
                            thisPrice['Mon'] === undefined ? 0 : thisPrice['Mon'],
                            thisPrice['Tue'] === undefined ? 0 : thisPrice['Tue'],
                            thisPrice['Wed'] === undefined ? 0 : thisPrice['Wed'],
                            thisPrice['Thu'] === undefined ? 0 : thisPrice['Thu'],
                            thisPrice['Fri'] === undefined ? 0 : thisPrice['Fri'],
                            thisPrice['Sat'] === undefined ? 0 : thisPrice['Sat'],
                            thisPrice['Sun'] === undefined ? 0 : thisPrice['Sun']
                        ],
                        label: "이번주",
                        borderColor: "#3e95cd",
                        fill: false
                    }, {
                        data: [
                            lastPrice['Mon'] === undefined ? 0 : lastPrice['Mon'],
                            lastPrice['Tue'] === undefined ? 0 : lastPrice['Tue'],
                            lastPrice['Wed'] === undefined ? 0 : lastPrice['Wed'],
                            lastPrice['Thu'] === undefined ? 0 : lastPrice['Thu'],
                            lastPrice['Fri'] === undefined ? 0 : lastPrice['Fri'],
                            lastPrice['Sat'] === undefined ? 0 : lastPrice['Sat'],
                            lastPrice['Sun'] === undefined ? 0 : lastPrice['Sun']
                        ],
                        label: "지난주",
                        borderColor: "#8e5ea2",
                        fill: false
                    },
                ]
            },
            options: {
                title: {
                    display: true,
                    text: '주간 매출 차트'
                }
            }
        })
    })

fetch('home/order')
    .then(resp => resp.json())
    .then(value => {
        const lastCount = value[0];
        const thisCount = value[1];
        myChart = new Chart(orderChart, {
            type: 'line',
            data: {
                labels:[
                    '월', '화', '수', '목', '금', '토', '일'
                ],
                datasets: [
                    {
                        data: [
                            thisCount['Mon'] === undefined ? 0 : thisCount['Mon'],
                            thisCount['Tue'] === undefined ? 0 : thisCount['Tue'],
                            thisCount['Wed'] === undefined ? 0 : thisCount['Wed'],
                            thisCount['Thu'] === undefined ? 0 : thisCount['Thu'],
                            thisCount['Fri'] === undefined ? 0 : thisCount['Fri'],
                            thisCount['Sat'] === undefined ? 0 : thisCount['Sat'],
                            thisCount['Sun'] === undefined ? 0 : thisCount['Sun']
                        ],
                        label: "이번주",
                        borderColor: "#3e95cd",
                        fill: false
                    }, {
                        data: [
                            lastCount['Mon'] === undefined ? 0 : lastCount['Mon'],
                            lastCount['Tue'] === undefined ? 0 : lastCount['Tue'],
                            lastCount['Wed'] === undefined ? 0 : lastCount['Wed'],
                            lastCount['Thu'] === undefined ? 0 : lastCount['Thu'],
                            lastCount['Fri'] === undefined ? 0 : lastCount['Fri'],
                            lastCount['Sat'] === undefined ? 0 : lastCount['Sat'],
                            lastCount['Sun'] === undefined ? 0 : lastCount['Sun']
                        ],
                        label: "지난주",
                        borderColor: "#8e5ea2",
                        fill: false
                    },
                ]
            },
            options: {
                title: {
                    display: true,
                    text: '주간 주문수 차트'
                }
            }
        })
    })


// order status

fetch('home/status')
    .then(resp => resp.json())
    .then(value => {
        console.log(value)
        order0.innerText = value['0'] !== undefined ? value['0'] : 0;
        order1.innerText = value['1'] !== undefined ? value['1'] : 0;
        order2.innerText = value['2'] !== undefined ? value['2'] : 0;
        order3.innerText = value['3'] !== undefined ? value['3'] : 0;
    })