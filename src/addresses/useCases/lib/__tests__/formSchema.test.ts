import { describe, expect, it } from 'vitest';
import { createFormSchema } from '../formSchema';
import { createFieldsStub } from '../../../../testing/fields.stub';

describe('formSchema', () => {
    it('should create a form schema with the correct fields', () => {
        // const fields = {
        //     buildingName: { label: 'Building Name', requirement: 'MANDATORY' },
        //     street: { label: 'Street', requirement: 'MANDATORY' },
        //     districtName: { label: 'District Name', requirement: 'OPTIONAL' },
        // } satisfies Fields;

        const fields = createFieldsStub()
            .withBuildingName('OPTIONAL')
            .withDistrictName('MANDATORY')
            .withStreet('OPTIONAL');

        const schema = createFormSchema(fields);

        const result = schema.validateSync({
            buildingName: 'Building',
            street: 'Street',
            districtName: 'D',
        });

        expect(result).toEqual({
            buildingName: 'Building',
            street: 'Street',
            districtName: 'D',
        });
    });

    it('should fail when not filling the fields correctly', () => {
        const fields = createFieldsStub()
            .withBuildingName('OPTIONAL')
            .withDistrictName('OPTIONAL')
            .withStreet('MANDATORY');

        const schema = createFormSchema(fields);

        expect(() => {
            schema.validateSync({
                buildingName: 'Building',
                districtName: 'D',
            });
        }).toThrowError('street is missing.');
    });
});
