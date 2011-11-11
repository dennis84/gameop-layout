
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
     * The exanded choice box action.
     * That are choice types with expanded attribute. The form
     * inpputs are radio buttons.
     */
    $('.form-expanded-choice-row').each(function () {
        var row      = $(this),
            target   = row.find('> div'),
            dropdown = row.find('.form-dropdown-field');

        dropdown.bind('click', function () {
            target.toggle();
        });

        target.find('input').change(function () {
            target.find('li').removeClass('checked');
            $(this).closest('li').addClass('checked');
            dropdown.text($(this).next('label').text());

            var t = setTimeout(function () {
                target.hide();
            }, 100);
        });

        target.find('.footer-action a').bind('click', function () {
            target.hide();
            return false;
        });
    });

    /**
     * The exanded and multiple choice box action.
     * That are choice types with expanded and multiple attributes.
     * The form inputs are checkboxes.
     */
    $('.form-expanded-multiple-choice-row').each(function () {
        var row              = $(this),
            target           = row.find('> div'),
            output           = row.find('.form-dropdown-selection'),
            dropdown         = row.find('.form-dropdown-field'),
            dropdownItemHtml = '<span class="form-dropdown-item"></span>',
            checked          = [];

        // register the current choices
        dropdown.bind('click', function () {
            $(target).find('input').each(function () {
                if ($(this).is(':checked')) {
                    checked.push($(this));
                }
            });

            target.show();
        });

        // shows the dropdown field
        target.find('input').change(function (event) {
            $(this).closest('li').toggleClass('checked');
        });

        // traverses all items and disable them then traverses
        // the checked items and enable them again.
        target.find('.footer-action .cancel').bind('click', function () {
            $(target).find('input').each(function () {
                $(this).attr('checked', '');
                $(this).closest('li').removeClass('checked');
            });

            $.each(checked, function (i, el) {
                $(el).attr('checked', 'checked');
                $(this).closest('li').addClass('checked');
            });

            target.hide();

            return false;
        });

        // find all checked items and push them into
        // the result container.
        target.find('.footer-action .apply').bind('click', function () {
            output.html('');
            $(target).find('input').each(function () {
                if ($(this).is(':checked')) {
                    var dropdownItem = $(dropdownItemHtml)
                        .html($(this).next('label').text())
                        .appendTo(output);
                }
            });

            target.hide();
            return false;
        });
    });
});
