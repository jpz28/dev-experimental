module app {

    export class Film {

        constructor(
            public id: number,
            public name: string) { }

        // static fromJson(data: any) {
        //     return new Film(data.id, data.name);
        // }
    }


    export class Composer {

        constructor(
            public id: number,
            public firstName: string,
            public lastName: string) { }

        // static fromJson(data: any) {
        //     return new Composer(data.id, data.firstName, data.lastName);
        // }

    }

}