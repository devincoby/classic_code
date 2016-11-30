    define(function() {
        
        return {
            setup:function (actionBar, fileBrowser, editor) { 
                var id = 'filesplugin';
                actionBar.addButton(id, 'fa fa-files-o fa-lg');
                $('#' + id).css({'color':'whiteSmoke'})
                $('#' + id).click(function () { 
                    require(["jsonjs!"], function (app) {
                        fileBrowser.setup(window.classic_code)
                    })
                })
                $('#' + id).trigger('click');
            },
        }
    })
    
