
/*
 * This file is part of the gameop package.
 *
 * (c) Dennis Dietrich <d.dietrich84@googlemail.com/>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

$(function () {
    $('.form-expanded-choice-row').each(function () {
        var row      = $(this);
        var target   = row.find('> div');
        var dropdown = row.find('.form-dropdown-field');

        dropdown.bind('click', function () {
            target.toggle();
        });

        target.find('input').change(function () {
            target.find('li').removeClass('checked');
            $(this).closest('li').addClass('checked');
            dropdown.text($(this).next('label').text());
            setTimeout(function () {
                target.hide()
            }, 100);
        })

        target.find('.footer-action a').bind('click', function () {
            target.hide();
            return false;
        });
    });

    $('.form-expanded-multiple-choice-row').each(function () {
        var row      = $(this);
        var target   = row.find('> div');
        var dropdown = row.find('.form-dropdown-field');

        dropdown.bind('click', function () {
            target.toggle();
        });

        target.find('input').change(function () {
            target.find('li').removeClass('checked');
            $(this).closest('li').addClass('checked');
            dropdown.text($(this).next('label').text());
            setTimeout(function () {
                target.hide()
            }, 100);
        })

        target.find('.footer-action a').bind('click', function () {
            target.hide();
            return false;
        });
    });
});
