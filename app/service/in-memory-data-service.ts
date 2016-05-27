/**
 * Created by Maycon Ribeiro on 27/05/2016.
 */
export class InMemoryDataService {

    createDb() {
        let heroes = [
            {"id": 12, "name": "Mr. Nice"},
            {"id": 13, "name": "Narco"},
            {"id": 15, "name": "Bombasto"},
            {"id": 14, "name": "Celeritas"},
            {"id": 16, "name": "Magneta"},
            {"id": 17, "name": "RubberMan"},
            {"id": 18, "name": "Dynana"},
            {"id": 19, "name": "Magma"},
            {"id": 20, "name": "Tornado"}
        ];

        return {heroes};
    }

}