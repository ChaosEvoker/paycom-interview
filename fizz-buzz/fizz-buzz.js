var alertFizzBuzz = function () {
    alert('FizzBuzz!');
};

$(function () {
    var row = $('<div class="fizz-buzz-row">'),
        body = $('body'),
        _alert = window.alert;
    // Go through numbers from 1 to 100 (inclusive)
    for (var i = 1; i <= 100; i +=1) {
        var cellData = '',
            cell = $('<div class="cell">');
        // By using appending with "Fizz" and "Buzz", we can avoid checking
        // "FizzBuzz" as it's own case.
        if (i % 3 == 0) {
            cellData += 'Fizz';
            cell.addClass('fizz-cell');
        }
        if (i % 5 == 0) {
            cellData += 'Buzz';
            cell.addClass('buzz-cell');
        }
        // If cellData is still an empty string, then show a number
        if (cellData == '') {
            cellData = i;
            cell.addClass('number-cell');
        }
        cell.append(cellData);
        row.append(cell);
        // Start a new row every 10 numbers.
        if (i % 10 == 0) {
            body.append(row);
            row = $('<div class="fizz-buzz-row">');
        }
    }
    // Add a listener for FizzBuzz cells.
    $('.fizz-cell.buzz-cell').click(alertFizzBuzz);
});
