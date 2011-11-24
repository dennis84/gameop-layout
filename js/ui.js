
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
        var dropdownToggle = function () {
            if (drop.is(':visible')) {
                $('#dropdown-overlay').hide().off('click');
                drop.hide();
            } else {
                $('#dropdown-overlay').show().on('click', function () {
                    dropdownToggle();
                });

                drop.show();
            }
        };

        // On click the dropdown field
        self.on('click', '.field', function () {
            dropdownToggle();
        });

        // Closes the dropdown menu on
        // the close button.
        drop.on('click', '.close', function () {
            dropdownToggle();
        });
    });
});
