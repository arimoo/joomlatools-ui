(function($) {

    $(document).ready(function () {

        // Replace stuff
        $(window).bind("styleguide:onRendered", function(e) {
            var imagePlaceholders = $('img[src="{image source}"]'),
                previewElement = $('.k-preview__thumb__element:contains("{preview element}")'),
                unsureText = $('li:contains("{unsureText}")');
            imagePlaceholders.attr('src', 'joomlatools/images/placeholder-16-9.png');
            previewElement.html('<span>{preview element}</span>');
            unsureText.html('If you are unsure how to use this just copy paste complete templates from the <a href="/#/section/5">templates page</a>');
        });

    });

})(kQuery);
