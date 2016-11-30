define({
        createTreeData: 
            function(obj) {
                if (!obj) {
                    return [];
                }
                var arr = [];
                var allKeys = Object.keys(obj);
                var metaFile;
                for (var i = 0; i < allKeys.length; i++) {
                    var key = allKeys[i];
                    var value = obj[key];
                    if (key.startsWith('_')) {
                        metaFile = metaFile || {'text':'_', 'type':'meta', data:{}}
                        metaFile.data[key] = value;
                    } else {
                        switch (typeof value) {
                            case 'string' : arr.push({
                                'text': key, 
                                'type':'file',
                                'data': value,
                            }); break;
                            case 'object':  arr.push({
                                'text': key, 
                                'type': 'folder',
                                'children': recurse(obj[key]),
                            }); break;
                        }
                    }
                }
                if (metaFile) {
                    metaFile.data = JSON.stringify(metaFile.data, null, "\t");
                    return [metaFile].concat(arr);
                }
                return arr;
        },
    })
