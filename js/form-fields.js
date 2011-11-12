
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

            target.hide();
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
            checkedItems     = [];

        // Shows the dropdown field and register
        // the ids of current choices
        dropdown.bind('click', function () {
            $(target).find('input').each(function () {
                if (this.checked) {
                    checkedItems.push(this.id);
                }
            });

            target.show();
        });

        // Adds a class to the closest li item of
        // checked element.
        target.find('input').change(function (event) {
            $(this).closest('li').toggleClass('checked');
        });

        // Traverses all items and resets the checked
        // status to the default state before the dropdown
        // was opened.
        target.find('.footer-action .cancel').bind('click', function () {
            $(target).find('input').each(function () {
                if ($.inArray(this.id, checkedItems) >= 0) {
                    $(this).checked;
                    $(this).closest('li').addClass('checked');
                } else {
                    $(this).removeProp('checked');
                    $(this).closest('li').removeClass('checked');
                }
            });

            target.hide();

            return false;
        });

        // find all checked items and push them into
        // the result container.
        target.find('.footer-action .apply').bind('click', function () {
            output.html('');
            $(target).find('input').each(function () {
                if (this.checked) {
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
