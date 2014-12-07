{
    appDir: '../www',
    baseUrl: 'assets/js',
    paths: {
        apps: 'apps',
        domReady: 'libs/domReady-2.0.1',
        jquery: 'libs/jquery-2.1.1',
        //modernizr: 'libs/modernizr-3.0.0',
        modernizr: 'libs/modernizr-2.8.3.min',
        require: 'libs/require-2.1.15'
    },
    shim: {
        'modernizr' : {
            exports: 'modernizr'
        }
    },
    dir: '../www-built',
    modules: [
        {
            name: './common',

            include: [
                'domReady',
                'jquery',
                'modernizr'
            ]
        },
        {
            name: './index',
            include: ['apps/mybook',
                        'apps/mybook',
                        'apps/book',
                        'apps/testAjax',
                        'apps/index',
            ],
            exclude: ['./common',
                        'modernizr',
                        'domReady'
            ],
        }
    ]
}
