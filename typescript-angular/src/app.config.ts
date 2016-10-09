namespace app {
    'use strict';

    function run($location: ng.ILocationService, $log: ng.ILogService) {
        $log.info('Hey there, I am a typescript angular app!!');
    }
    run.$inject = ['$location', '$log'];

    angular.module('app').run(run);
}
