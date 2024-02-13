const [startDate, endDate] = document.querySelectorAll('.date-input');

let sDate = new Date();
let eDate = new Date();

sDate.setDate(sDate.getDate() - 90);

let minDate = sDate.toISOString().split('T')[0];
let MaxDate = eDate.toISOString().split('T')[0];


console.log(eDate.toISOString().split('T')[0]);

startDate.setAttribute('min', minDate);
startDate.setAttribute('max', MaxDate);
startDate.setAttribute('value', minDate);

endDate.setAttribute('value', eDate.toISOString().split('T')[0]);

startDate.onchange = () => {
    endDate.setAttribute('min', startDate.value);
    endDate.setAttribute('max', eDate.toISOString().split('T')[0]);
}


