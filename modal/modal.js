var generateRandomHexColor = function () {
    var randColor = '#',
        brightness = 0,
        hexNumber,
        multiplier,
        randNumber;
    // Create 3 random numbers from 0-255
    for (var i = 0; i < 3; i += 1) {
        randNumber = Math.floor(Math.random() * 255);
        // Convert the number to Hex
        hexNumber = randNumber.toString(16);
        //Prepend 0s if needed
        if (hexNumber.length < 2) {
            hexNumber = '0' + hexNumber;
        }
        randColor += hexNumber;
        // Calculate brightness (based on ITU standards)
        switch (i) {
            case 0: multiplier = 0.2126; break;
            case 1: multiplier = 0.7152; break;
            case 2: multiplier = 0.0722; break;
            default: multiplier = 1;
        }
        brightness += multiplier * randNumber;
    }
    return [randColor, brightness];
};

var evaluateBrightness = function (brightness) {
    var isBright = brightness > 150;
    // If the color is bright, give it a dark background, otherwise a light one
    if (isBright) {
        $('.color-display').addClass('dark-blue-background').removeClass('white-background');
        $('.color-brightness').html('Bright')
    } else {
        $('.color-display').removeClass('dark-blue-background').addClass('white-background');
        $('.color-brightness').html('Dark')
    }
}

var launchDialogWithColor = function (event) {
    var target = $(event.currentTarget),
        hexColor = target.attr('data-rand-color'),
        brightness = parseFloat(target.attr('data-brightness'));
    $('.color-display').html(hexColor).css('color', hexColor);
    evaluateBrightness(brightness);
    $('.modal-overlay').fadeIn();
    // Once the modal is done animating in, show the buttons. Otherwise it looks
    // a little weird while it's animating.
    $('.modal').slideDown().promise().done(function () {
        $('.modal-footer').show();
    });
};

var dismissDialog = function () {
    $('.modal-footer').hide();
    $('.modal').slideUp();
    $('.modal-overlay').fadeOut();
};

var generateNewColor = function () {
    var generatedColor = generateRandomHexColor(),
        color = generatedColor[0],
        brightness = generatedColor[1];
    $('.color-display').html(color).css('color', color);
    evaluateBrightness(brightness);
};

$(function () {
    var buttonsWrapper = $('.buttons')
    // Generate some buttons with random colors.
    for (var x = 0; x < 10; x += 1) {
        var button = $('<button class="btn dark-blue-background white-text dialog-btn">Click Me!</button>'),
            colorAndBrightness = generateRandomHexColor(),
            color = colorAndBrightness[0],
            brightness = colorAndBrightness[1];
        button.attr('data-rand-color', color);
        button.attr('data-brightness', brightness);
        buttonsWrapper.append(button);
    }
    $('.dialog-btn').click(launchDialogWithColor);
    $('.closer').click(dismissDialog);
    $('.new-color').click(generateNewColor);
});
