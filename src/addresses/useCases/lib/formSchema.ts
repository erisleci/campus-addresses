import { object, string } from 'yup';

export type Field = {
    label: string;
    requirement: 'MANDATORY' | 'OPTIONAL';
    maxLength?: number;
    disabled?: boolean;
    value?: string;
};
export type Fields = Partial<{
    buildingName: Field;
    street: Field;
    districtName: Field;
    postalCode: Field;
    townName: Field;
    regionName: Field;
    country: Field;
}>;

export const createFormSchema = (fields: Fields) => {
    const schema = Object.entries(fields).reduce((result, [key, field]) => {
        if (field.requirement !== 'MANDATORY') {
            return result;
        }

        return {
            ...result,
            [key]: string().required(`${field.label} is missing.`),
        };
    }, {});
    return object(schema);
};
