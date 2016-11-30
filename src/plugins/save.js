    define(function() {
        return {
            setup:function (actionBar, fileBrowser, editor) {
                actionBar.addButton('saveplugin', 'fa fa-floppy-o fa-lg');
                $('#saveplugin').css({'color':'whiteSmoke'})
                $('#saveplugin').click(function () { 
                    fileBrowser.clear();
                })
            },
            click:function () {

            }
        }
    })
    
