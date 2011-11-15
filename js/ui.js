
/*
 * This file is part of the gameop package.
 *
 * (c) Dennis Dietrich <d.dietrich84@googlemail.com/>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

$(function () {
    /**
     * Appends the dropdown overlay at the bottom
     * of the body.
     */
    $('body').append('<div class="overlay" id="dropdown-overlay" style="display:none"></div>');

    /**
     * The dropdown button.
     */
    $('.dropdown-button').each(function () {
        var self = $(this),
            drop = $(this).find('.drop');

        // On toggle dropdown. The overlay events
        // gets started and must closed.
        $(document).on('dropdown.toggle', function () {
            if (drop.is(':visible')) {
                $('#dropdown-overlay').hide().off('click');
                drop.hide();
            } else {
                $('#dropdown-overlay').show().on('click', function () {
                    $(document).trigger('dropdown.toggle');
                });

                drop.show();
            }
        });

        // On click the dropdown field
        self.on('click', '.field', function () {
            $(document).trigger('dropdown.toggle');
        });
    });
});