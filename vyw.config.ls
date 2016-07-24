window.vyw =
    /*
    * You may want to change this if your nginx
    * json listing was set in different location
    */
    prefix: '/.json'

    /*
    * this prefix will be applied when accessing files
    * you can change this according to your real file location
    * as set in nginx
    */
    file-prefix: '/'

    /*
    * specify thumbnailer service to use,
    * `<FILEPATH>` will be substituted with
    * its respective file path
    */
    thumbnailer: \//192.168.77.128<FILEPATH>

    /*
     * this set max file size to allow thumbnail generation
     * `0` means no thumbnail.
     * Only used if thumbnailer value is `local`
     */
    max-size: \100M
