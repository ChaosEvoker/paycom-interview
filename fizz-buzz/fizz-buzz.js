$(function () {
    var row = $('<div class="fizz-buzz-row">'),
        body = $('body'),
        alertFizzBuzz = function () {
            alert('FizzBuzz!');
        };
    for (var i = 1; i <= 100; i +=1) {
        var cellData = '',
            cell = $('<div class="cell">');
        if (i % 3 == 0) {
            cellData += 'Fizz';
            cell.addClass('fizz-cell');
        }
        if (i % 5 == 0) {
            cellData += 'Buzz';
            cell.addClass('buzz-cell');
        }
        if (cellData == '') {
            cellData = i;
            cell.addClass('number-cell');
        }
        cell.append(cellData);
        row.append(cell);
        if (i % 10 == 0) {
            body.append(row);
            row = $('<div class="fizz-buzz-row">');
        }
    }
    $('.fizz-cell.buzz-cell').click(alertFizzBuzz);
});
