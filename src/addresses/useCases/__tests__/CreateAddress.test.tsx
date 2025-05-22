import { App } from '../../../App';
import { createFieldsStub } from '../../../testing/fields.stub';

describe('Create address', () => {
    it('create local address', () => {
        cy.intercept('GET', '**/local', {
            body: {
                id: 'local',
                street: {
                    label: 'Street',
                    requirement: 'MANDATORY',
                    maxLength: 81,
                },
                country: {
                    label: 'Country',
                    requirement: 'OPTIONAL',
                    disabled: true,
                    value: 'AT',
                },
            },
            // body: createFieldsStub('local')
            //     .withStreet({ label: 'Street' })
            //     .withBuildingName({ label: 'Building Name' })
            //     .withCountry({ label: 'Country', disabled: true }),
        });
        cy.intercept('POST', '**/addresses', {}).as('**/addresses');

        cy.mount(<App />, '/');

        cy.findByRole('link', { name: 'Campus Addresses' }).click();
        cy.findByLabelText('Street').type('My street');
        cy.findByRole('button', { name: 'Save' }).click();

        cy.findByText("It's now saved!").should('be.visible');

        cy.wait('@**/addresses')
            .its('request.body')
            .should(
                'deep.equal',
                JSON.stringify({
                    street: 'My street',
                }),
            );
    });

    it('create international address', () => {
        cy.intercept('GET', '**/local', {
            body: {
                id: 'local',
                street: {
                    label: 'Street',
                    requirement: 'MANDATORY',
                    maxLength: 81,
                },
                country: {
                    label: 'Country',
                    requirement: 'OPTIONAL',
                    disabled: true,
                    value: 'AT',
                },
            },
        });
        cy.intercept('GET', '**/international', {
            body: {
                id: 'local',
                street: {
                    label: 'Street',
                    requirement: 'MANDATORY',
                    maxLength: 81,
                },
                districtName: {
                    label: 'District',
                    requirement: 'OPTIONAL',
                },
                country: {
                    label: 'Country',
                    requirement: 'OPTIONAL',
                    disabled: true,
                    value: 'AT',
                },
            },
        });
        cy.intercept('POST', '**/addresses', {}).as('**/addresses');

        cy.mount(<App />, '/');

        cy.findByRole('link', { name: 'Campus Addresses' }).click();
        cy.findByLabelText('Type').select('International');
        cy.findByLabelText('Street').type('My street');
        cy.findByLabelText('District').type('District');
        cy.findByRole('button', { name: 'Save' }).click();

        cy.findByText("It's now saved!").should('be.visible');

        cy.wait('@**/addresses')
            .its('request.body')
            .should(
                'deep.equal',
                JSON.stringify({
                    street: 'My street',
                    districtName: 'District',
                }),
            );
    });

    it.only('see error when mandatory field is empty', () => {
        cy.intercept('GET', '**/local', {
            body: {
                id: 'local',
                street: {
                    label: 'Street',
                    requirement: 'MANDATORY',
                    maxLength: 81,
                },
                country: {
                    label: 'Country',
                    requirement: 'OPTIONAL',
                    disabled: true,
                    value: 'AT',
                },
            },
        });

        cy.mount(<App />, '/');

        cy.findByRole('link', { name: 'Campus Addresses' }).click();
        cy.findByRole('button', { name: 'Save' }).click();

        cy.findByRole('alert', { name: 'Street is missing.' }).should('be.visible');
    });
});
