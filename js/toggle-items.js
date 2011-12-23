
/*
 * This file is part of the gameop package.
 *
 * (c) Dennis Dietrich <d.dietrich84@googlemail.com/>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

$(function () {
    $('.label-item').on('click', function () {
        $(this).toggleClass('selected');
    });

    $('.offer-item .icon').on('click', function () {
        if ($(this).parent().hasClass('selected')) {
            $(this).parent().removeClass('selected');
        } else {
            $(this).parent().addClass('selected');
        }

        $(this).next('input[type="checkbox"]')[0].click();
    });

    $('#offer-collection').submit(function () {
        var data = $(this).serialize();
        $(document).trigger('onOfferCollectionSubmit.gameop', [data]);
        return false;
    });
});
