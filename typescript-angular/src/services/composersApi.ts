module app {

    export interface IComposersApi {
        getComposers() : Promise<Composer[]>;
    }

    export class ComposersApi implements IComposersApi {

        constructor(private $http: ng.IHttpService, private $q: ng.IQService) { }

        public async getComposers() : Promise<Composer[]> {
            let result = await this.$http.get<Composer[]>('/data/composers.json');
            return result.data;
        }

    }

    ComposersApi.$inject = ['$http', '$q'];
    angular.module('app').service('ComposersApi', ComposersApi);

}