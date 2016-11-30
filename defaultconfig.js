 define({
        plugins: [
            //'jsonjs!save.js',
            //'jsonjs!delete',
            //'jsonjs!search.js',
            "jsonjs!new.js",
            'jsonjs!files.js',
            //'@placesandpeople/classic_code:manual'
        ],
        styles: {
            editor: {
                main: {
                    "position":"relative",
                    "margin-left": "260px",
                    "height":"100%",
                },
                textArea: {
                    "position":"absolute",
                    "height":"100%",
                    "width": "100%",
                    "display":"block",
                }
            },
            filebrowser: {
                main:{
                    "position":"absolute",
                    "margin-left":"50px",
                    "width":"210px",
                    "height":"100%",
                    "background":"#f4f4f4",
                    "overflow":"scroll",
                    "color":"#555555",
                    "font-size":"14px",
                },
                title: {
                    "text-align":"left",
                    "font-size":"11px",
                    "font-family":"Arial, Helvetica, sans-serif",
                    "font-weight":"100",
                    "padding":"10px",
                    "padding-left":"20px",
                    "color":"#999999"
                }
            },
            actionbar:{
                "position":"absolute",
                "width":"40px",
                "height":"100%",
                "background":"black",
                "padding":"10px",
                "padding-top":"20px",
                "overflow-y":"hidden",
                "text-align":'center',
            }
        }
        
    })
