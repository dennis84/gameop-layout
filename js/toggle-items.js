
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
});

$(function () {
    $('.offer-item').on('click', function () {
        $(this).toggleClass('selected');
    });
});
