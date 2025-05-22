import { Fields } from '../addresses/useCases/lib/formSchema';

export function createFieldsStub() {
    return {
        withBuildingName: function (requirement) {
            this.buildingName = {
                label: 'building name',
                requirement,
            };
            return this;
        },
        withDistrictName: function (requirement) {
            this.districtName = {
                label: 'district',
                requirement,
            };
            return this;
        },
        withStreet: function (requirement) {
            this.street = {
                label: 'street',
                requirement,
            };
            return this;
        },
    };
}
