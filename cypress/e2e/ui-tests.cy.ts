import { beforeEach, describe, it } from "node:test";

describe('UI-tests', () => {
    beforeEach(() => {
        cy.visit('https://viroos973.github.io/delivery-website-operator/orders');
    });

    const testOrder = [
        {
            newStatus: "CONFIRMED",
            id: "orderId"
        }
    ]

    describe(`Смена статуса у заказа`, () => {
        testOrder.forEach(({ newStatus, id }) => {
            it('Смена статуса у заказа', () => {
                //кликаем на селект
                cy.get('.select-change-status').click();
                //проверяем,что открылся
                cy.get('.select-content').should('be.visible');
                //тыкаем на нужный статус
                cy.get('.select-item-CONFIRMED').click({ force: true });
                //проверяем, что селект закрылся
                cy.get('.select-content').should('not.exist');
                //проверяем, что статус поменялся
                cy.get('@changeStatus').should('have.been.calledWith', newStatus, id);
                cy.get('.order-status').should('contain', 'Подтвержден');
            })
        })
    })
})