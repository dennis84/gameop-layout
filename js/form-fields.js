
/*
 * This file is part of the gameop package.
 *
 * (c) Dennis Dietrich <d.dietrich84@googlemail.com/>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

$(function () {
    $('.form-row[data-description]').each(function () {
        $(this).find('label').eq(0)
            .after('<p class="form-description">'+ $(this).attr('data-description') +'</p>');
    });

    /**
     * The range slider.
     *
     * Replaces the original form types with a jquery-ui
     * slider.
     */
    $('.form-range-row').each(function () {
        var row         = $(this),
            rangeSlider = $('<div class="slider-range"></div>').appendTo(row),
            from        = row.find('div input').eq(0),
            to          = row.find('div input').eq(1);

        // Configure the jquery slider component
        rangeSlider.slider({
            range:  true,
            min:    0,
            max:    100,
            values: [0, 20],
            slide: function (event, ui) {
                from.val(ui.values[0]);
                to.val(ui.values[1]);
            }
        });

        // Pre set the actual amount to the
        // hidden form fields.
        from.val(rangeSlider.slider('values', 0));
        to.val(rangeSlider.slider('values', 1));

        // Hides the original form fields.
        // Ensure the posibility to fill the
        // fields if javascript is disabled.
        //row.find('div').eq(0).css('opacity', 0);
    });

    /**
     * The rating row.
     *
     * Sets the background position of active
     * radio button. The background positions have
     * always 50px distance on the y axis to another.
     */
    $('.form-rating-row').each(function () {
        var row    = $(this),
            div    = $(this).find('div');

        row.on('click', 'label', function () {
            var index  = $(this).index('label'),
                offset = index * 50;

            div.css('backgroundPosition', '0 -' + offset + 'px');
        });
    });
});
