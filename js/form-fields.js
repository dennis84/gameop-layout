
/*
 * This file is part of the gameop package.
 *
 * (c) Dennis Dietrich <d.dietrich84@googlemail.com/>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

$(function () {
    $('#price').append('<div id="price-slider-range"></div>');

    $('#price-slider-range').slider({
        range: true,
        min: 0,
        max: 100,
        values: [ 0, 20 ],
        slide: function(event, ui) {
            $('#amount').val(ui.values[0] + ' - ' + ui.values[1]);
        }
    });

    $('#amount').val(
        $('#slider-range').slider('values', 0) + ' - ' + $('#slider-range').slider('values', 1)
    );
});
