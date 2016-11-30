define(["jquery", "component"], function($, component) {
        component.createRoot('<div id="filebrowser"><div id="filebrowserTitle">EXPLORER</div><div id="filebrowserMain"></div></div>')

        return {
            style:function(css) {
                $("#filebrowser").css(css.main)
                $("#filebrowserTitle").css(css.title)
            },
            setup:function (app) {
                    var treeId = '#filebrowserMain'
                    $(treeId).jstree({
                        "plugins" : ["contextmenu","dnd","search","types","wholerow"],
                        "core" : {
                                "animation" : 0,
                                "check_callback" : true,
                                'data' : function (obj, callback) {
                                        // Returns an array
                                        require(["fileBrowserData"], function (data) {
                                            callback.call(this, ["Package Name"].concat(data.createTreeData(app)));
                                        })
                                    }
                        },
                        "types" : {
                            "default": {
                                "icon":"fa fa-briefcase",
                            },
                            "package" : {
                                "icon" : "fa fa-briefcase"
                            },
                            "meta": {
                                "icon":"fa fa-cog"
                            },
                            "folder" : {
                                "icon" : "fa fa-folder-o",
                            },
                            "file" : {
                                "icon" : "fa fa-file-code-o",
                            },
                        },
                        "contextmenu": {
                            items: function (node) {
                                // The default set of all items
                                var items = {
                                    renameItem: { // The "rename" menu item
                                        label: "Rename",
                                        action:function (data) {
                                            var inst = $.jstree.reference(data.reference),
                                            obj = inst.get_node(data.reference);
                                            inst.edit(obj);
                                        }
                                    },
                                    deleteItem: { // The "delete" menu item
                                        label: "Delete",
                                        action: function () {}
                                    }
                                };

                                if ($(node).hasClass("folder")) {

                                }

                                return items;
                        }}
                    }); 

                    $(treeId).on("changed.jstree", function (e, data) {
                        if (!data.node) return;
                        var editData = data.node.data;
                        typeof editData == 'string' ? window.AceEditorSession.setValue(editData) : '';
                    });
                },
            refresh:function(newData){
                require(["fileBrowserData"], function (data) {
                    $('#filebrowserMain').jstree(true).settings.core.data =  ["Package Name"].concat(data.createTreeData(newData));
                    $('#filebrowserMain').jstree(true).refresh();
                })
                
            }
        }
    })
