'use strict';
define([appLocation.userPostLogin], function (app) {

    app.controller('userAfterLoginAdminGeetCodeAssetsEdit', function ($scope, $http, $rootScope, $routeParams) {
        $('title').html("edit page"); //TODO: change the title so cann't be tracked in log
        $scope.searchOption = 'contains';       
        console.log($routeParams.id);

        $scope.GifData = {
            id:'',
            gifUrl: '',
            title: '',
            titleHindi: '',
            tags: [],
            newTags: [],
        };

        

        tinymce.init({
            selector: 'textarea#full-featured-non-premium',
            plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
            imagetools_cors_hosts: ['picsum.photos'],
            menubar: 'file edit view insert format tools table help',
            toolbar: 'undo redo | bold italic underline strikethrough | codesample code | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
            toolbar_sticky: true,
            autosave_ask_before_unload: true,
            autosave_interval: '30s',
            autosave_prefix: '{path}{query}-{id}-',
            autosave_restore_when_empty: false,
            autosave_retention: '2m',
            image_advtab: true,
            link_list: [
                { title: 'My page 1', value: 'http://www.tinymce.com' },
                { title: 'My page 2', value: 'http://www.moxiecode.com' }
            ],
            image_list: [
                { title: 'My page 1', value: 'http://www.tinymce.com' },
                { title: 'My page 2', value: 'http://www.moxiecode.com' }
            ],
            image_class_list: [
                { title: 'None', value: '' },
                { title: 'Some class', value: 'class-name' }
            ],
            importcss_append: true,
            file_picker_callback: function (callback, value, meta) {
                /* Provide file and text for the link dialog */
                if (meta.filetype === 'file') {
                    callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
                }

                /* Provide image and alt text for the image dialog */
                if (meta.filetype === 'image') {
                    callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
                }

                /* Provide alternative source and posted for the media dialog */
                if (meta.filetype === 'media') {
                    callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
                }
            },
            templates: [
                { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
                { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
                { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
            ],
            template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
            template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
            height: 600,
            image_caption: true,
            quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
            noneditable_noneditable_class: 'mceNonEditable',
            toolbar_mode: 'sliding',
            contextmenu: 'link image imagetools table',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        });

        tinymce.init({
            selector: 'textarea#full-featured-non-premium2',
            plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
            imagetools_cors_hosts: ['picsum.photos'],
            menubar: 'file edit view insert format tools table help',
            toolbar: 'undo redo | bold italic underline strikethrough | codesample code | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
            toolbar_sticky: true,
            autosave_ask_before_unload: true,
            autosave_interval: '30s',
            autosave_prefix: '{path}{query}-{id}-',
            autosave_restore_when_empty: false,
            autosave_retention: '2m',
            image_advtab: true,
            link_list: [
                { title: 'My page 1', value: 'http://www.tinymce.com' },
                { title: 'My page 2', value: 'http://www.moxiecode.com' }
            ],
            image_list: [
                { title: 'My page 1', value: 'http://www.tinymce.com' },
                { title: 'My page 2', value: 'http://www.moxiecode.com' }
            ],
            image_class_list: [
                { title: 'None', value: '' },
                { title: 'Some class', value: 'class-name' }
            ],
            importcss_append: true,
            file_picker_callback: function (callback, value, meta) {
                /* Provide file and text for the link dialog */
                if (meta.filetype === 'file') {
                    callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
                }

                /* Provide image and alt text for the image dialog */
                if (meta.filetype === 'image') {
                    callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
                }

                /* Provide alternative source and posted for the media dialog */
                if (meta.filetype === 'media') {
                    callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
                }
            },
            templates: [
                { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
                { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
                { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
            ],
            template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
            template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
            height: 600,
            image_caption: true,
            quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
            noneditable_noneditable_class: 'mceNonEditable',
            toolbar_mode: 'sliding',
            contextmenu: 'link image imagetools table',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        });

        var inputElm = document.querySelector('input[name=inputAdminImageAssetsEdit]'),
            whitelist = [];


        // initialize Tagify on the above input node reference
        var tagify = new Tagify(inputElm, {
            enforceWhitelist: true,
            whitelist: inputElm.value.trim().split(/\s*,\s*/) // Array of values. stackoverflow.com/a/43375571/104380
        })

        // Chainable event listeners
        tagify.on('add', onAddTag)
            .on('remove', onRemoveTag)
            //.on('input', onInput)
            .on('edit', onTagEdit)
            .on('invalid', onInvalidTag)
            .on('click', onTagClick)
            .on('focus', onTagifyFocusBlur)
            .on('blur', onTagifyFocusBlur)
            .on('dropdown:hide dropdown:show', e => console.log(e.type))
            .on('dropdown:select', onDropdownSelect)

        // tag added callback
        function onAddTag(e) {
            console.log("onAddTag: ", e.detail);
            console.log("original input value: ", inputElm.value);
            tagify.off('add', onAddTag) // exmaple of removing a custom Tagify event
        }

        // tag remvoed callback
        function onRemoveTag(e) {
            console.log("onRemoveTag:", e.detail, "tagify instance value:", tagify.value);
            var index = $scope.GifData.tags.indexOf(e.detail.data.value);
            $scope.GifData.tags.splice(index, 1);
            console.log("$scope.GifData.tags value: ", $scope.GifData.tags);
        }

        // on character(s) added/removed (user is typing/deleting)
        function onInput(e) {

            if (e.detail.value.length < 2) {
                return;
            } 

            console.log("onInput: ", e.detail);
            tagify.settings.whitelist.length = 0; // reset current whitelist
            tagify.loading(true).dropdown.hide.call(tagify) // show the loader animation

            var val_text = $("#searchbox-dropdown option:selected").val();
            console.log(val_text);

            fetch('/api/searchTag?q=' + e.detail.value + '&searchOption=' + $scope.searchOption)
                .then(RES => RES.json())
                .then(function (whitelist) {
                    // update inwhitelist Array in-place
                    tagify.settings.whitelist.splice(0, whitelist.length, ...whitelist)
                    tagify.loading(false).dropdown.show.call(tagify, e.detail.value); // render the suggestions dropdown
                })
        }

        function onTagEdit(e) {
            console.log("onTagEdit: ", e.detail);
        }

        // invalid tag added callback
        function onInvalidTag(e) {
            console.log("onInvalidTag: ", e.detail);
        }

        // invalid tag added callback
        function onTagClick(e) {
            console.log(e.detail);
            console.log("onTagClick: ", e.detail);
        }

        function onTagifyFocusBlur(e) {
            console.log(e.type, "event fired")
        }

        function onDropdownSelect(e) {
            $scope.GifData.tags.push(e.detail.data.value);
            console.log("$scope.GifData.tags value: ", $scope.GifData.tags);
            console.log("onDropdownSelect: ", e.detail)
        }

        initAutocompleteWhiteList();

        function initAutocompleteWhiteList() {

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/GetAllGifTags',
                method: "GET",
                headers: headers
            }).success(function (data, status, headers, config) {
                tagify.settings.whitelist.splice(0, data.length, ...data)
            }).error(function (data, status, headers, config) {
                if (status === statusCodes[401]) {
                    logoutUser();
                }
            });

        }

        function initEditGif() {

            startBlockUI('wait..', 3);

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/AdminGeetCodeAssets/' + $routeParams.id,
                method: "GET",
                headers: headers
            }).success(function (data, status, headers, config) {
                stopBlockUI();
                
                $scope.GifData.id = data.payload.id;                
                $scope.GifData.title = data.payload.title;
                //$scope.GifData.titleHindi = data.payload.results[0].titleHindi;
                $scope.GifData.imageUrl = data.payload.imageName;
                //$scope.GifData.hdImageUrl = data.payload.results[0].hdImageUrl;
                $scope.GifData.gifUrl = data.payload.imageName;
                $scope.GifData.youtube = data.payload.youtube;

                $scope.imageTags = [];
                for (var i = 0; i < data.payload.topicTags.length; i++) {
                    $scope.imageTags.push(data.payload.topicTags[i].slug);
                }

                $scope.GifData.codeSnippets = [];
                var allowedLang = ["java", "csharp", "cpp", "python3"];
                for (i = 0; i < data.payload.codeSnippets.length; i++) {
                    if (allowedLang.includes(data.payload.codeSnippets[i].langSlug)) {
                        $scope.GifData.codeSnippets.push(data.payload.codeSnippets[i]);
                    }
                }

                $scope.GifData.tags = $scope.imageTags;
                tagify.settings.whitelist.splice(0, $scope.GifData.tags.length, ...$scope.GifData.tags)
                tagify.addTags($scope.GifData.tags); 

                tinyMCE.get('full-featured-non-premium').setContent(data.payload.content);
                tinyMCE.get('full-featured-non-premium2').setContent(data.payload.explanation);
                //tinyMCE.activeEditor.setContent(data.payload.content);

                 
            }).error(function (data, status, headers, config) {
                stopBlockUI();
                if (status === statusCodes[401]) {
                    logoutUser();
                }
            });

        }
        
        $scope.saveUiConfig = function () {
            updateUiConfig();
        };

        $scope.updateSearchOption = function (option) {
            $scope.searchOption = option;
        };

        

        $scope.submitGif = function () {
            
            if ($scope.GifData.title === '') {
                showToastMessage("Error", "Title is mandatory.");
                return;
            };

            if ($scope.GifData.tags.length === 0) {
                showToastMessage("Error", "At least one tag is mandatory.");
                return;
            };

            tinyMCE.triggerSave();
            $scope.GifData.content = $("#full-featured-non-premium").val();
            $scope.GifData.explanation = $("#full-featured-non-premium2").val();

            if ($scope.GifData.content === '') {
                showToastMessage("Error", "Content is mandatory.");
                return;
            };

            startBlockUI('wait..', 3);

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/AdminGeetCodeAssets',
                method: "PUT",
                data: JSON.stringify($scope.GifData),
                headers: headers
            }).success(function (data, status, headers, config) {
                stopBlockUI();
                
                showToastMessage("Success", "Successfully Updated User Information.");
            }).error(function (data, status, headers, config) {
                stopBlockUI();
                if (status === statusCodes[401]) {
                    logoutUser();
                }
            });

        };

        $scope.addTag = function () {
            var regexp = /^[a-zA-Z0-9--]+$/;
            if ($scope.GifData.newTagEnglish.search(regexp) === -1) {
                showToastMessage("Error", "Only Alphanumeric and hyphen (-) allowed.");
            }
            else {
                //make ajax call.
                if ($.inArray($scope.GifData.newTagEnglish, tagify.settings.whitelist) === -1) {
                    startBlockUI('wait..', 3);

                    var headers = {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + getCookie(CookieName.token)
                    };

                    $http({
                        url: '/api/AdminAddNewGeetCodeTag',
                        method: "POST",
                        data: JSON.stringify($scope.GifData),
                        headers: headers
                    }).success(function (data, status, headers, config) {
                        stopBlockUI();
                        showToastMessage("Success", "Successfully Added Tag.");
                        tagify.settings.whitelist.push($scope.GifData.newTagEnglish);
                        tagify.addTags($scope.GifData.newTagEnglish);
                        $scope.GifData.tags.push($scope.GifData.newTagEnglish);
                        $scope.GifData.newTagEnglish = '';
                        $scope.GifData.newTagHindi = '';
                    }).error(function (data, status, headers, config) {
                        stopBlockUI();
                        if (status === statusCodes[401]) {
                            logoutUser();
                        }
                    });
                }
                else {
                    showToastMessage("Error", "This tag already exists.");
                }
            }
        };

        $scope.translatingTitle = false;

        window.onload = function () {

            initEditGif();

        };

    });

    /*
     A directive to enable two way binding of file field
     */
    app.directive('demoFileModel', function ($parse) {
        return {
            restrict: 'A', //the directive can be used as an attribute only

            /*
             link is a function that defines functionality of directive
             scope: scope associated with the element
             element: element on which this directive used
             attrs: key value pair of element attributes
             */
            link: function (scope, element, attrs) {
                var model = $parse(attrs.demoFileModel),
                    modelSetter = model.assign; //define a setter for demoFileModel

                //Bind change event on the element
                element.bind('change', function () {
                    //Call apply on scope, it checks for value changes and reflect them on UI
                    scope.$apply(function () {
                        //set the model value
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    });
    
});

