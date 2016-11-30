    define(["jquery", "component"], function($, component) {
        component.createRoot('<div id="editorContainer"><div id="editorTitles" hidden>Explorers</div><div id="editor"> This is a functions </div> </div>')

        return {
            style: function(css) { 
                $("#editorContainer").css(css.main)
                $( "#editor" ).css(css.textArea)
             },
             setup: function(onFinish) {
                /** Setup the ace editor */
                window.AceEditorSession = window.ace.edit( "editor" );
                window.AceEditorSession.setTheme( "ace/theme/monokai" );
                window.AceEditorSession.getSession().setMode( "ace/mode/typescript" );

                onFinish();
             } 
        }
    })
