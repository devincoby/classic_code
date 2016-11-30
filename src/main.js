requirejs.config({
        "baseUrl": "/",
        "paths": {
            "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
            "jquerycss":"//code.jquery.com/ui/1.12.1/themes/base/jquery-ui",
            "jqueryui":"https://code.jquery.com/ui/1.12.1/jquery-ui",
            "ace"   : "https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.5/ace",
            "jstree": "https://cdnjs.cloudflare.com/ajax/libs/jstree/3.3.3/jstree.min",
            "css":    "https://cdnjs.cloudflare.com/ajax/libs/require-css/0.1.8/css.min",
            "jstreecss": "https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min",
            "spin":"https://cdnjs.cloudflare.com/ajax/libs/spin.js/2.3.2/spin.min",
            "fontawesome":"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min",
            "qurl":"@thewackness@qurl.min"
        }
    });

    define("component", ["jquery"], function($) {
        $( "body" ).append('<div id="container" style="display:none"></div>');
        $("#container").css({
            "position":"absolute",
            "height":"100%",
            "width":"100%",
            "top":0,
            "left":0,
            "bottom":0,
            "right":0,
            "overflow":"hidden",
            //"font-family":"Roboto,RobotoDraft,Helvetica,Arial,sans-serif",
            "font-family":"Circular-Book',Helvetica,Arial,sans-serif",
        }) 
        return {
            createRoot:function(html) {
                $("#container").append(html)
            }
        }
    })

    define("main", ["jsonjs!", "jsonjs!defaultconfig.js", "jsonjs!filebrowser.js", "jsonjs!actionbar.js", "jsonjs!editor.js", "jsonjs!data.js", "jquery", "qurl", "spin", "ace", "jqueryui","jstree", "css!jquerycss",  "css!jstreecss", "css!fontawesome"], 
    function(pkg, defaultConfig, fileBrowser, actionBar, editor, fileBrowserData, $, qurl, spin, ace) {
        /**Get the arguments */
        var args = Qurl.create();
        var pkg = args.query('edit');
        var editorTheme = args.query('theme');
        var fileBrowserTheme = args.query('files_theme')
        if (pkg) {
            $.get(pkg, function( data ) {
                var obj = {}
                try {
                    obj = JSON.parse(data);
                    if (!Object.keys(obj).length > 0) throw ''
                } catch (e) {
                    obj[pkg] = data
                }
                window.classic_code = obj;
            });
        } else {
            window.classic_code = {}
        }
        
        //Start the loading spinner.
        var spinner = new spin().spin();
        $("body").append(spinner.el);

        function removeSpinner() {
            // Since editor takes longest to load, wait till it finishes before displaying.
            $( "#container" ).css('display', 'block');
            spinner.stop();
        }
        
        editor.style(defaultConfig.styles.editor);
        fileBrowser.style(defaultConfig.styles.filebrowser);
        actionBar.style(defaultConfig.styles.actionbar);
        var plugins = defaultConfig.plugins;
        for (var i = 0; i < plugins.length; i++ ) {
            require([plugins[i]], function(plugin) {
                (plugin && typeof plugin.setup == 'function') ? plugin.setup(actionBar, fileBrowser, editor) : null;
            })
        }
        define("fileBrowserData", function () {
            return fileBrowserData;
        })

        /** Finally, call them when everything is ready */
        $(function(){
            if (!window.ace) {
                setTimeout(function() {editor.setup(removeSpinner)},1000);
            } else {
                editor.setup(removeSpinner)
            }
        })
        $( function() {
            $( "#filebrowser" ).resizable();
            $(window).resize(function(){
                var leftwards = $("#filebrowser").width() + $("#actionbar").width();
                $('#editorContainer').width($("#container").width()-leftwards); 
                $('#editorContainer').css('margin-left', leftwards);
                $('#filebrowser').height($("#container").height()); 
            });
        } );
    });

    require(["main"])
