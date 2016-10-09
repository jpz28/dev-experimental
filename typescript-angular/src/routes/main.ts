namespace app {
    'use strict';

    // class ViewModel {
    //     constructor(public name: string) {}
    // }

    class mainCtrl  {
        constructor(private $state: ng.ui.IState, public vm: any = {}) {
            vm.name = 'test'
        }
    }
    // function mainCtrl($state: ng.ui.IState): ng.IControllerConstructor {
    //     this.vm = {
    //         name: 'I am a controller!!!'
    //     };
    //     return this;
    // }
    mainCtrl.$inject = ['$state'];

    angular.module('app').controller('mainCtrl', mainCtrl);
}
