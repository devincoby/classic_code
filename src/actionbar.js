    define(["jquery", "component", "jsonjs!filebrowser.js"], function($, component, filebrowser) {
        component.createRoot('<div id="actionbar"></div>')

        return {
            style: function(css) {
                $("#actionbar").css(css)
            },
            addButton: function(iconId, iconClass) {
                iconClass = iconClass || '';
                iconId = iconId || '';
                $('#actionbar').append(
                      '<div id="'+ iconId + '"><i class="' + iconClass + '" aria-hidden="true"></i></div>'
                )
                $('#actionbar i').css({
                    "padding-bottom":"20px",
                })
            },
        }
    })
    
