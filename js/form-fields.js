
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

        $(document).bind('formDropdown.toggle', function () {
            if (target.is(':visible')) {
                $('#form-overlay').remove();
                target.hide();
            } else {
                $('body').append('<div id="form-overlay"></div>');
                target.show();
            }
        });

        // Toggles the dropdown field.
        dropdown.bind('click', function () {
            $(document).trigger('formDropdown.toggle');
        });

        // Handles the change input event. Removes all
        // checked classes from li items then adds on the
        // closest of current element.
        target.on('change', 'input', function () {
            target.find('li').removeClass('checked');
            $(this).closest('li').addClass('checked');
            dropdown.text($(this).next('label').text());

            $(document).trigger('formDropdown.toggle');
        });

        // The footer action. Closes on each button.
        target.on('click', '.footer-action a', function () {
            $(document).trigger('formDropdown.toggle');
            return false;
        });

        // Closes the form dropdown on click on overlay.
        $('#form-overlay').live('click', function () {
            $(document).trigger('formDropdown.toggle');
        });
    });

    /**
     * The exanded and multiple choice box action.
     * That are choice types with expanded and multiple attributes.
     * The form inputs are checkboxes.
     */
    $('.form-expanded-multiple-choice-row').each(function () {
        var row          = $(this),
            target       = row.find('> div'),
            dropdown     = row.find('.form-dropdown-field'),
            checkedItems = [];

        // Pushs the current items into the checkedItems
        // array to restore the current state. The collection
        // must be resetted on each call.
        $(document).bind('formDropdown.show', function () {
            checkedItems = [];

            $(target).find('input').each(function () {
                if (this.checked) {
                    checkedItems.push(this.id);
                }
            });

            $('body').append('<div id="form-overlay"></div>');

            target.show();
        });

        $(document).bind('formDropdown.cancel', function () {
            $(target).find('input').each(function () {
                if ($.inArray(this.id, checkedItems) >= 0) {
                    this.checked = 'checked';
                    $(this).closest('li').addClass('checked');
                } else {
                    $(this).removeAttr('checked');
                    $(this).closest('li').removeClass('checked');
                }
            });
        });

        $(document).bind('formDropdown.close', function () {
            $('#form-overlay').remove();
            target.hide();
        });

        // Shows the dropdown field and register
        // the ids of current choices
        dropdown.bind('click', function () {
            $(document).trigger('formDropdown.show');
        });

        // Adds a class to the closest li item of checked element.
        // Its confusing if el is not checked then the attribute will
        // added, but on change the attributes changed before.
        target.on('change', 'input', function () {
            if (!this.checked) {
                $(this).removeAttr('checked');
            } else {
                this.checked = 'checked';
            }

            $(this).closest('li').toggleClass('checked');
        });

        // Traverses all items and resets the checked
        // status to the default state before the dropdown
        // was opened.
        target.on('click', '.footer-action .cancel', function () {
            $(document).trigger('formDropdown.cancel');
            $(document).trigger('formDropdown.close');
            return false;
        });

        // find all checked items and push them into
        // the result container.
        target.on('click', '.footer-action .apply', function () {
            $(document).trigger('formDropdown.close');
            return false;
        });

        // Closes the form dropdown on click on overlay and
        // cancels the choices
        $('#form-overlay').live('click', function () {
            $(document).trigger('formDropdown.cancel');
            $(document).trigger('formDropdown.close');
        });
    });
});
