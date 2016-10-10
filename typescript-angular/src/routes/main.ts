module app {
    'use strict';


    export class MainController {
        constructor(private ComposersApi: IComposersApi, public name: string, public composers: Composer[]) {
            this.name = 'I am a controller.';
        }

        public async loadComposers() : Promise<void> {
            let composers = await this.ComposersApi.getComposers();
            this.composers = composers;
        }
    }

    MainController.$inject = ['ComposersApi'];
    angular.module('app').controller('MainController', MainController);

}
