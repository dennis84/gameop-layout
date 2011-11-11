$(function () {
    $('.form-expanded-choice-row').each(function (event) {
        var field  = $(this);
        var fields = $(this).find('input');
        var target = field.find('> div');
        var fake   = field.find('.form-field-value');

        fake.bind('click', function () {
            target.toggle();
        });

        target.find('input').change(function () {
            target.find('li').removeClass('checked');
            $(this).closest('li').addClass('checked');
            fake.text($(this).next('label').text());
            setTimeout(function () {
                target.hide()
            }, 100);
        })
    });
});