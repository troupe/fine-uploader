/*globals qq*/
qq.UploadButton = function(o) {
    "use strict";

    var input,
        disposeSupport = new qq.DisposeSupport(),
        options = {
            element: null,
            // if set to true adds multiple attribute to file input
            multiple: false,
            acceptFiles: null,
            // name attribute of file input
            name: 'file',
            onChange: function(input) {},
            hoverClass: 'qq-upload-button-hover',
            focusClass: 'qq-upload-button-focus'
        };

    function createInput() {
        var input = document.createElement("input");

        if (options.multiple){
            input.setAttribute("multiple", "multiple");
        }

        if (options.acceptFiles) {
            input.setAttribute("accept", options.acceptFiles);
        }

        input.setAttribute("type", "file");
        input.setAttribute("name", options.name);

        qq(input).css({
            //position: 'absolute',
            //width: '32px',
            //height: '32px',
            overflow: 'hidden',
            // Make sure browse button is in the right side
            // in Internet Explorer
            direction: 'ltr',
            cursor: 'pointer'
        });

        options.element.appendChild(input);

        disposeSupport.attach(input, 'change', function(){
            options.onChange(input);
        });

        disposeSupport.attach(input, 'mouseover', function(){
            qq(options.element).addClass(options.hoverClass);
        });
        disposeSupport.attach(input, 'mouseout', function(){
            qq(options.element).removeClass(options.hoverClass);
        });
        disposeSupport.attach(input, 'focus', function(){
            qq(options.element).addClass(options.focusClass);
        });
        disposeSupport.attach(input, 'blur', function(){
            qq(options.element).removeClass(options.focusClass);
        });

        // IE and Opera, unfortunately have 2 tab stops on file input
        // which is unacceptable in our case, disable keyboard access
        if (window.attachEvent){
            // it is IE or Opera
            input.setAttribute('tabIndex', "-1");
        }

        return input;
    }


    qq.extend(options, o);

    // make button suitable container for input
    qq(options.element).css({
        position: 'relative',
        overflow: 'hidden',
        // Make sure browse button is in the right side
        // in Internet Explorer
        direction: 'ltr'
    });

    input = createInput();

    return {
        getInput: function(){
            return input;
        },

        reset: function(){
            if (input.parentNode){
                qq(input).remove();
            }

            qq(options.element).removeClass(options.focusClass);
            input = createInput();
        }
    };
};
