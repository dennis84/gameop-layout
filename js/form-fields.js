
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
     * Appends the form overlay at the bottom
     * of the body.
     */
    $('body').append('<div id="form-overlay" style="display:none"></div>');

    /**
     * The exanded choice box action.
     * That are choice types with expanded attribute. The form
     * inputs are radio buttons.
     */
    $('.form-expanded-choice-row').each(function () {
        var row      = $(this),
            target   = row.find('> div'),
            dropdown = row.find('.form-choicebox');

        // Fills the choicebox field on load.
        target.find('input').each(function () {
            dropdown.text($(this).next('label').text());
        });

        // On toggle dropdown. The overlay events gets started
        // and must closed.
        $(document).on('expandedChoice.toggle', function () {
            if (target.is(':visible')) {
                $('#form-overlay').hide().off('click');
                target.hide();
            } else {
                $('#form-overlay').show().on('click', function () {
                    $(document).trigger('expandedChoice.toggle');
                });

                target.show();
            }
        });

        // Toggles the dropdown field.
        dropdown.on('click', function () {
            $(document).trigger('expandedChoice.toggle');
        });

        // Handles the change input event. Removes all
        // checked classes from li items then adds on the
        // closest of current element.
        target.on('change', 'input', function () {
            target.find('li').removeClass('checked');
            $(this).closest('li').addClass('checked');
            dropdown.text($(this).next('label').text());

            $(document).trigger('expandedChoice.toggle');
        });

        // The footer action. Closes on each button.
        target.on('click', '.footer-action a', function () {
            $(document).trigger('expandedChoice.toggle');
            return false;
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
            dropdown     = row.find('.form-multiple-choicebox'),
            checkedItems = [];

        // Pushs the current items into the checkedItems
        // array to restore the current state. The collection
        // must be resetted on each call.
        $(document).on('expandedMultipleChoice.show', function () {
            checkedItems = [];

            $(target).find('input').each(function () {
                if (this.checked) {
                    checkedItems.push(this.id);
                }
            });

            $('#form-overlay').show().on('click', function () {
                $(document).trigger('expandedMultipleChoice.cancel');
                $(document).trigger('expandedMultipleChoice.close');
            });

            target.show();
        });

        // Apllies the current selection. Appends the options
        // to the dropdown field.
        $(document).on('expandedMultipleChoice.apply', function () {
            dropdown.html('');
            $(target).find('input:checked').each(function () {
                var label = $(this).next('label').text();
                dropdown.append('<span>' + label + '</span>')
            });
        });

        // Fills the current selection on loads.
        // We can simply fire the apply trigger.
        $(document).trigger('expandedMultipleChoice.apply');

        // Cancels the selection. Restores the
        // html checked attributes.
        $(document).on('expandedMultipleChoice.cancel', function () {
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

        // Closes the dropdown. The overlay event must stopped.
        // otherwise another event on the same element can be
        // triggered.
        $(document).on('expandedMultipleChoice.close', function () {
            $('#form-overlay').hide().off('click');
            target.hide();
        });

        // Shows the dropdown field and register
        // the ids of current choices
        dropdown.on('click', function () {
            $(document).trigger('expandedMultipleChoice.show');
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
            $(document).trigger('expandedMultipleChoice.cancel');
            $(document).trigger('expandedMultipleChoice.close');
            return false;
        });

        // find all checked items and push them into
        // the result container.
        target.on('click', '.footer-action .apply', function () {
            $(document).trigger('expandedMultipleChoice.apply');
            $(document).trigger('expandedMultipleChoice.close');
            return false;
        });
    });
});
