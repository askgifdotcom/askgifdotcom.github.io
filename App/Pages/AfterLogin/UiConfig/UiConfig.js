'use strict';
define([appLocation.userPostLogin], function (app) {

    app.controller('userAfterLoginUiConfig', function ($scope, $http, $rootScope) {
        $('title').html("edit page"); //TODO: change the title so cann't be tracked in log
        
        $scope.saveUiConfig = function () {
            updateUiConfig();
        };

        function updateUiConfig() {

            startBlockUI('wait..', 3);

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/UserProfile',
                method: "PUT",
                data: JSON.stringify($rootScope.UserData),
                headers: headers
            }).success(function (data, status, headers, config) {
                stopBlockUI();
                $rootScope.UserInfo = data.payload.userInfo;
                showToastMessage("Success", "Successfully Updated User Information.");
            }).error(function (data, status, headers, config) {
                stopBlockUI();
                if (status === statusCodes[401]) {
                    logoutUser();
                }
            });

        }
        
        function initUIElements() {
            var $sidebar = $('.control-sidebar-setting')
            var $container = $('<div />', {
                class: 'p-3 control-sidebar-content'
            });

            $sidebar.append($container);
            
            $container.append(
                '<h5>Customize AskGif</h5><hr class="mb-2"/>'
            );

            var $no_border_checkbox = $('<input />', {
                type: 'checkbox',
                value: 1,
                checked: $('.main-header').hasClass('border-bottom-0'),
                'class': 'mr-1'
            }).on('click', function () {
                if ($(this).is(':checked')) {
                    $('.main-header').addClass('border-bottom-0');
                    $rootScope.UserData.uiConfig.no_border_checkbox = true;
                } else {
                    $('.main-header').removeClass('border-bottom-0');
                    $rootScope.UserData.uiConfig.no_border_checkbox = false;
                }
            });

            var $no_border_container = $('<div />', { 'class': 'mb-1' }).append($no_border_checkbox).append('<span>No Navbar border</span>')
            $container.append($no_border_container);

            var $text_sm_body_checkbox = $('<input />', {
                type: 'checkbox',
                value: 1,
                checked: $('body').hasClass('text-sm'),
                'class': 'mr-1'
            }).on('click', function () {
                if ($(this).is(':checked')) {
                    $('body').addClass('text-sm');
                    $rootScope.UserData.uiConfig.text_sm_body_checkbox = true;
                } else {
                    $('body').removeClass('text-sm');
                    $rootScope.UserData.uiConfig.text_sm_body_checkbox = false;
                }
            });
            var $text_sm_body_container = $('<div />', { 'class': 'mb-1' }).append($text_sm_body_checkbox).append('<span>Body small text</span>')
            $container.append($text_sm_body_container);

            var $text_sm_header_checkbox = $('<input />', {
                type: 'checkbox',
                value: 1,
                checked: $('.main-header').hasClass('text-sm'),
                'class': 'mr-1'
            }).on('click', function () {
                if ($(this).is(':checked')) {
                    $('.main-header').addClass('text-sm');
                    $rootScope.UserData.uiConfig.text_sm_header_checkbox = true;
                } else {
                    $('.main-header').removeClass('text-sm');
                    $rootScope.UserData.uiConfig.text_sm_header_checkbox = false;
                }
            });
            var $text_sm_header_container = $('<div />', { 'class': 'mb-1' }).append($text_sm_header_checkbox).append('<span>Navbar small text</span>')
            $container.append($text_sm_header_container);

            var $text_sm_sidebar_checkbox = $('<input />', {
                type: 'checkbox',
                value: 1,
                checked: $('.nav-sidebar').hasClass('text-sm'),
                'class': 'mr-1'
            }).on('click', function () {
                if ($(this).is(':checked')) {
                    $('.nav-sidebar').addClass('text-sm');
                    $rootScope.UserData.uiConfig.text_sm_sidebar_checkbox = true;
                } else {
                    $('.nav-sidebar').removeClass('text-sm');
                    $rootScope.UserData.uiConfig.text_sm_sidebar_checkbox = false;
                }
            });
            var $text_sm_sidebar_container = $('<div />', { 'class': 'mb-1' }).append($text_sm_sidebar_checkbox).append('<span>Sidebar nav small text</span>')
            $container.append($text_sm_sidebar_container);

            var $text_sm_footer_checkbox = $('<input />', {
                type: 'checkbox',
                value: 1,
                checked: $('.main-footer').hasClass('text-sm'),
                'class': 'mr-1'
            }).on('click', function () {
                if ($(this).is(':checked')) {
                    $('.main-footer').addClass('text-sm');
                    $rootScope.UserData.uiConfig.text_sm_footer_checkbox = true;
                } else {
                    $('.main-footer').removeClass('text-sm');
                    $rootScope.UserData.uiConfig.text_sm_footer_checkbox = false;
                }
            });
            var $text_sm_footer_container = $('<div />', { 'class': 'mb-1' }).append($text_sm_footer_checkbox).append('<span>Footer small text</span>')
            $container.append($text_sm_footer_container);

            var $flat_sidebar_checkbox = $('<input />', {
                type: 'checkbox',
                value: 1,
                checked: $('.nav-sidebar').hasClass('nav-flat'),
                'class': 'mr-1'
            }).on('click', function () {
                if ($(this).is(':checked')) {
                    $('.nav-sidebar').addClass('nav-flat');
                    $rootScope.UserData.uiConfig.flat_sidebar_checkbox = true;
                } else {
                    $('.nav-sidebar').removeClass('nav-flat');
                    $rootScope.UserData.uiConfig.flat_sidebar_checkbox = false;
                }
            });
            var $flat_sidebar_container = $('<div />', { 'class': 'mb-1' }).append($flat_sidebar_checkbox).append('<span>Sidebar nav flat style</span>')
            $container.append($flat_sidebar_container);

            var $legacy_sidebar_checkbox = $('<input />', {
                type: 'checkbox',
                value: 1,
                checked: $('.nav-sidebar').hasClass('nav-legacy'),
                'class': 'mr-1'
            }).on('click', function () {
                if ($(this).is(':checked')) {
                    $('.nav-sidebar').addClass('nav-legacy');
                    $rootScope.UserData.uiConfig.legacy_sidebar_checkbox = true;
                } else {
                    $('.nav-sidebar').removeClass('nav-legacy');
                    $rootScope.UserData.uiConfig.legacy_sidebar_checkbox = false;
                }
            })
            var $legacy_sidebar_container = $('<div />', { 'class': 'mb-1' }).append($legacy_sidebar_checkbox).append('<span>Sidebar nav legacy style</span>')
            $container.append($legacy_sidebar_container);

            var $compact_sidebar_checkbox = $('<input />', {
                type: 'checkbox',
                value: 1,
                checked: $('.nav-sidebar').hasClass('nav-compact'),
                'class': 'mr-1'
            }).on('click', function () {
                if ($(this).is(':checked')) {
                    $('.nav-sidebar').addClass('nav-compact');
                    $rootScope.UserData.uiConfig.compact_sidebar_checkbox = true;
                } else {
                    $('.nav-sidebar').removeClass('nav-compact');
                    $rootScope.UserData.uiConfig.compact_sidebar_checkbox = false;
                }
            });
            var $compact_sidebar_container = $('<div />', { 'class': 'mb-1' }).append($compact_sidebar_checkbox).append('<span>Sidebar nav compact</span>')
            $container.append($compact_sidebar_container);

            var $child_indent_sidebar_checkbox = $('<input />', {
                type: 'checkbox',
                value: 1,
                checked: $('.nav-sidebar').hasClass('nav-child-indent'),
                'class': 'mr-1'
            }).on('click', function () {
                if ($(this).is(':checked')) {
                    $('.nav-sidebar').addClass('nav-child-indent');
                    $rootScope.UserData.uiConfig.child_indent_sidebar_checkbox = true;
                } else {
                    $('.nav-sidebar').removeClass('nav-child-indent');
                    $rootScope.UserData.uiConfig.child_indent_sidebar_checkbox = false;
                }
            });
            var $child_indent_sidebar_container = $('<div />', { 'class': 'mb-1' }).append($child_indent_sidebar_checkbox).append('<span>Sidebar nav child indent</span>')
            $container.append($child_indent_sidebar_container);

            var $no_expand_sidebar_checkbox = $('<input />', {
                type: 'checkbox',
                value: 1,
                checked: $('.main-sidebar').hasClass('sidebar-no-expand'),
                'class': 'mr-1'
            }).on('click', function () {
                if ($(this).is(':checked')) {
                    $('.main-sidebar').addClass('sidebar-no-expand');
                    $rootScope.UserData.uiConfig.no_expand_sidebar_checkbox = true;
                } else {
                    $('.main-sidebar').removeClass('sidebar-no-expand');
                    $rootScope.UserData.uiConfig.no_expand_sidebar_checkbox = false;
                }
            });
            var $no_expand_sidebar_container = $('<div />', { 'class': 'mb-1' }).append($no_expand_sidebar_checkbox).append('<span>Main Sidebar disable hover/focus auto expand</span>')
            $container.append($no_expand_sidebar_container)

            var $text_sm_brand_checkbox = $('<input />', {
                type: 'checkbox',
                value: 1,
                checked: $('.brand-link').hasClass('text-sm'),
                'class': 'mr-1'
            }).on('click', function () {
                if ($(this).is(':checked')) {
                    $('.brand-link').addClass('text-sm');
                    $rootScope.UserData.uiConfig.text_sm_brand_checkbox = true;
                } else {
                    $('.brand-link').removeClass('text-sm');
                    $rootScope.UserData.uiConfig.text_sm_brand_checkbox = false;
                }
            });
            var $text_sm_brand_container = $('<div />', { 'class': 'mb-4' }).append($text_sm_brand_checkbox).append('<span>Brand small text</span>')
            $container.append($text_sm_brand_container);

            $container.append('<h6>Navbar Variants</h6>');

            var $navbar_variants = $('<div />', {
                'class': 'd-flex'
            });
            
            var $navbar_variants_colors = createSkinBlock(navbar_all_colors, function (e) {
                var color = $(this).data('color')
                var $main_header = $('.main-header')
                $main_header.removeClass('navbar-dark').removeClass('navbar-light')
                navbar_all_colors.map(function (color) {
                    $main_header.removeClass(color)
                })

                if (navbar_dark_skins.indexOf(color) > -1) {
                    $main_header.addClass('navbar-dark');
                } else {
                    $main_header.addClass('navbar-light');
                }

                $main_header.addClass(color);
                $rootScope.UserData.uiConfig.navbar_Variants = color;
            })

            $navbar_variants.append($navbar_variants_colors)

            $container.append($navbar_variants)
            
            $container.append('<h6>Accent Color Variants</h6>')
            var $accent_variants = $('<div />', {
                'class': 'd-flex'
            })
            $container.append($accent_variants)
            $container.append(createSkinBlock(accent_colors, function () {
                var color = $(this).data('color')
                var accent_class = color;
                var $body = $('body');
                accent_colors.map(function (skin) {
                    $body.removeClass(skin);
                })

                $body.addClass(accent_class);
                $rootScope.UserData.uiConfig.accent_Color_Variants = accent_class;
            }))

            $container.append('<h6>Dark Sidebar Variants</h6>')
            var $sidebar_variants_dark = $('<div />', {
                'class': 'd-flex'
            })
            $container.append($sidebar_variants_dark)
            $container.append(createSkinBlock(sidebar_colors, function () {
                var color = $(this).data('color')
                var sidebar_class = 'sidebar-dark-' + color.replace('bg-', '')
                var $sidebar = $('.main-sidebar')
                sidebar_skins.map(function (skin) {
                    $sidebar.removeClass(skin)
                })

                $sidebar.addClass(sidebar_class);
                $rootScope.UserData.uiConfig.dark_Sidebar_Variants = sidebar_class;
                $rootScope.UserData.uiConfig.light_Sidebar_Variants = '';
            }))

            $container.append('<h6>Light Sidebar Variants</h6>')
            var $sidebar_variants_light = $('<div />', {
                'class': 'd-flex'
            })
            $container.append($sidebar_variants_light)
            $container.append(createSkinBlock(sidebar_colors, function () {
                var color = $(this).data('color')
                var sidebar_class = 'sidebar-light-' + color.replace('bg-', '')
                var $sidebar = $('.main-sidebar')
                sidebar_skins.map(function (skin) {
                    $sidebar.removeClass(skin)
                })

                $sidebar.addClass(sidebar_class)
                $rootScope.UserData.uiConfig.light_Sidebar_Variants = sidebar_class;
                $rootScope.UserData.uiConfig.dark_Sidebar_Variants = '';
            }))
            
            $container.append('<h6>Brand Logo Variants</h6>')
            var $logo_variants = $('<div />', {
                'class': 'd-flex'
            })
            $container.append($logo_variants)
            var $clear_btn = $('<a />', {
                href: 'javascript:void(0)'
            }).text('clear').on('click', function () {
                var $logo = $('.brand-link')
                logo_skins.map(function (skin) {
                    $logo.removeClass(skin)
                })
            })
            
            $container.append(createSkinBlock(logo_skins, function () {
                var color = $(this).data('color')
                var $logo = $('.brand-link')
                logo_skins.map(function (skin) {
                    $logo.removeClass(skin)
                })
                $logo.addClass(color)
                $rootScope.UserData.uiConfig.brand_Logo_Variants = color;
            }).append($clear_btn));

            function createSkinBlock(colors, callback) {
                var $block = $('<div />', {
                    'class': 'd-flex flex-wrap mb-3'
                })

                colors.map(function (color) {
                    var $color = $('<div />', {
                        'class': (typeof color === 'object' ? color.join(' ') : color).replace('navbar-', 'bg-').replace('accent-', 'bg-') + ' elevation-2'
                    })

                    $block.append($color)

                    $color.data('color', color)

                    $color.css({
                        width: '40px',
                        height: '20px',
                        borderRadius: '25px',
                        marginRight: 10,
                        marginBottom: 10,
                        opacity: 0.8,
                        cursor: 'pointer'
                    })

                    $color.hover(function () {
                        $(this).css({ opacity: 1 }).removeClass('elevation-2').addClass('elevation-4')
                    }, function () {
                        $(this).css({ opacity: 0.8 }).removeClass('elevation-4').addClass('elevation-2')
                    })

                    if (callback) {
                        $color.on('click', callback)
                    }
                })

                return $block
            }

            $('.product-image-thumb').on('click', function () {
                const image_element = $(this).find('img');
                $('.product-image').prop('src', $(image_element).attr('src'))
                $('.product-image-thumb.active').removeClass('active');
                $(this).addClass('active');
            });
        }

        $scope.$on('configureui', function () {
            console.log("broadcasted configureui");
            initUIElements();
        });

        if ($rootScope.UserData !== undefined && $rootScope.UserData !== null) {
            initUIElements();
        }
        
    });
    
});

