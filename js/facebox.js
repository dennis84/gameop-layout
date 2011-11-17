/*
 * This file is part of the gameop package.
 *
 * (c) Dennis Dietrich <d.dietrich84@googlemail.com/>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

$(function() {
    /**
     * Simpelst way to open a DOM-Node with facebox
     *
     * <a href="#my-node" class="facebox">show</a>
     * <div id="my-node">whatever..</div>
     */
    $('.facebox').facebox();

    /**
     * Simple XmlHttpRequest Call using Facebox
     *
     * <div data-link="http://example.com" class="facebox-xhr">Ajax-Link</div>
     * <a href="http://example.com" class="facebox-xhr">Ajax-Link</a>
     */
    $('.facebox-xhr').bind('click', function() {
        var uri    = $(this).attr('href') || $(this).attr('data-link');
        $.facebox({ ajax: uri });

        return false;
    });

    /**
     * Opens a facebox by selector.
     *
     * <div class="facebox-anchor" data-selector="#foo"></div>
     * <a href="#foo" class="facebox-anchor"></a>
     */
    $('.facebox-anchor').bind('click', function() {
        var selector = $(this).attr('href') || $(this).attr('data-selector');
        $.facebox({ div: selector });

        return false;
    });

    /**
     * Opens a facebox within an iframe.
     *
     * <a
     *     href="http://example.com"
     *     class="facebox-iframe"
     *     data-width="300"
     *     data-height="200">
     *     Iframe link
     * </a>
     */
    $('.facebox-iframe').bind('click', function () {
        var uri    = $(this).attr('href') || $(this).attr('data-link');
        var width  = $(this).attr('data-width') || 640;
        var height = $(this).attr('data-height') || 320;

        var html   = '\
            <iframe \
                id="facebox-iframe" \
                scrolling="no" \
                width="' + width + '" \
                height="' + height + '" \
                frameborder="0" \
                src="' + uri + '" \
                marginheight="0"\
            ></iframe>';

        $.facebox(html);

        return false;
    });

    /**
     * Displays the main flah messages with facebox.
     */
    if ($('#main-flash-message').length > 0) {
        $.facebox($('#main-flash-message'));
    };
});
