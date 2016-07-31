window.vyw =
    /**
    * You may want to change this if your nginx
    * json listing was set in different location,
    * `<PATHNAME>` will be replaced by its respective
    * path to the directory listing. Listing can accept
    * url with different domain, but the server should
    * support CORS.
    */
    list-endpoint: '<PATHNAME>.json'

    /**
    * this prefix will be applied when accessing files
    * you can change this according to your real file location
    * as set in nginx. Or you can specify file path with different
    * domain, as long as it's corresponds with `<PATHNAME>` value.
    */
    file-endpoint: '<PATHNAME>'

    /**
    * specify thumbnailer service to use,
    * `<PATHNAME>` will be substituted with
    * its respective file path, you can specify
    * `original-image` which essentially equal to specifying
    * `//<HOST><PATHNAME>`, but then displaying thumbnail  will be
    * stricted to file with maximum size = <value of maxSize>
    * If host domain is needed in thumbnailer,
    * `<HOST>` and `<HOSTNAME>` is available to use.
    */
    thumbnailer: \original-image

    /**
     * this set max file size to allow thumbnail generation
     * `0` means no thumbnail.
     * Only used if thumbnailer value is `original-image`.
     */
    max-size: \100M

    /**
     * Image type supported by thumbnailer.
     */
    supported-image-type: [ \jpg \jpeg \gif \png ]
