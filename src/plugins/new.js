    define(function() {
        
        return {
            setup:function (actionBar, fileBrowser, editor) { 
                var id = 'newplugin';
                actionBar.addButton(id, 'fa fa-plus fa-lg');
                $('#' + id).css({'color':'whiteSmoke'})
                $('#' + id).click(function () { 
                    window.classic_code["untitled"] = ""; 
                    fileBrowser.refresh(window.classic_code);
                })
            },
        }
    })
    
