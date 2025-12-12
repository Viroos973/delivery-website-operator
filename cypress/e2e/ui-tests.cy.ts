import type { Interception } from 'cypress/types/net-stubbing';

describe('UI-tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4175');
        cy.viewport(1280, 768);
    });

    describe(`Проверка входа при пустых полях`, () => {
        it('Выдает предупреждение', () => {
            cy.get('.cursor-pointer').contains('Войти').click();

            // Авторизация
            cy.get('[role="dialog"]').contains('Войти').click();

            // Проверка на наличие предупреждения
            cy.get('[data-slot="form-message"]')
                .should('be.visible')
                .and('contain.text', 'Поле должно быть заполнено');
        });
    });

    const testLoginData = [
        {
            email: 'test@operator1',
            password: 'password123'
        },
        {
            email: 'admin@test',
            password: 'password123'
        }
    ];
    describe(`Проверка входа`, () => {
        testLoginData.forEach(({ email, password }) => {
            it('Проверка данных пользователя при авторизации', () => {
                cy.get('button.cursor-pointer').contains('Войти').click();

                // Проверяем, что модальное окно открылось
                cy.get('[role="dialog"]').should('be.visible');

                // Ввод данных в форму
                if (email !== "") cy.get('input[placeholder="Введите логин оператора"]').type(email);
                if (password !== "") cy.get('input[placeholder="Введите пароль"]').type(password);

                // Авторизация
                cy.get('[role="dialog"]').contains('Войти').click();

                // Проверяем, что модальное окно исчезло
                cy.get('[role="dialog"]').should('not.exist');
            })
        })
    })

    describe(`Смена статуса у заказа`, () => {
        it('Смена статуса у заказа', () => {
            cy.intercept('PUT', '**/order/change-order-status/**').as('statusChangeRequest');

            cy.get('button.cursor-pointer').contains('Войти').click();

            // Проверяем, что модальное окно открылось
            cy.get('[role="dialog"]').should('be.visible');

            // Ввод данных в форму
            cy.get('input[placeholder="Введите логин оператора"]').type("admin@test");
            cy.get('input[placeholder="Введите пароль"]').type("password123");

            // Авторизация
            cy.get('[role="dialog"]').contains('Войти').click();

            // Проверяем, что модальное окно исчезло
            cy.get('[role="dialog"]').should('not.exist');

            cy.get('a[href="#/orders"]').click();

            cy.get('div.order-item', { timeout: 3000 })
                .should('have.length.greaterThan', 0)
                .first().as('firstOrder');

            cy.get('@firstOrder')
                .within(() => {
                    //кликаем на селект
                    cy.get('.select-change-status').click();
                })

            //проверяем,что открылся
            cy.get('[data-slot="select-content"]', { timeout: 5000 }).should('be.visible');
            //тыкаем на нужный статус
            cy.get('.select-item-CONFIRMED').click({ force: true });
            //проверяем, что селект закрылся
            cy.get('[data-slot="select-content"]', { timeout: 5000 }).should('not.exist');

            cy.wait('@statusChangeRequest').then((interception: Interception) => {
                // Проверяем тело запроса
                expect(interception.response?.body).to.deep.equal({
                    message: "Order status updated successfully"
                });
            });

            cy.get('@firstOrder')
                .within(() => {
                    //кликаем на селект
                    cy.get('.select-change-status').click();
                })

            //проверяем,что открылся
            cy.get('[data-slot="select-content"]', { timeout: 5000 }).should('be.visible');
            //тыкаем на нужный статус
            cy.get('.select-item-NEW').click({ force: true });
            //проверяем, что селект закрылся
            cy.get('[data-slot="select-content"]', { timeout: 5000 }).should('not.exist');

            cy.wait('@statusChangeRequest').then((interception: Interception) => {
                // Проверяем тело запроса
                expect(interception.response?.body).to.deep.equal({
                    message: "Order status updated successfully"
                });
            });
        })
    })

    describe(`Добавление комментария к заказу`, () => {
        it('Добавление комментария к заказу', () => {
            cy.intercept('PUT', '**/order/comment/**').as('addCommentRequest');

            cy.get('button.cursor-pointer').contains('Войти').click();

            // Проверяем, что модальное окно открылось
            cy.get('[role="dialog"]').should('be.visible');

            // Ввод данных в форму
            cy.get('input[placeholder="Введите логин оператора"]').type("test@operator1");
            cy.get('input[placeholder="Введите пароль"]').type("password123");

            // Авторизация
            cy.get('[role="dialog"]').contains('Войти').click();

            // Проверяем, что модальное окно исчезло
            cy.get('[role="dialog"]').should('not.exist');

            cy.get('a[href="#/orders"]').click();

            cy.get('div.order-item', { timeout: 3000 })
                .should('have.length.greaterThan', 0)
                .first().as('firstOrder');

            cy.get('@firstOrder')
                .within(() => {
                    //кликаем на иконку комментария
                    cy.get('.add-comment').click();
                })

            //Проверяем, что модальное окно открылось
            cy.get('[role="dialog"]').should('be.visible');
            //Ввод данных в форму
            cy.get('input[placeholder="Комментарий к заказу"]').type("Комментарий к заказу");
            //Проверяем, что модальное окно исчезло
            cy.get('[role="dialog"]').should('not.exist');

            cy.wait('@addCommentRequest').then((interception: Interception) => {
                // Проверяем тело запроса
                expect(interception.response?.body).to.deep.equal({
                    message: "Comment added successfully"
                });
            });
        })
    })

    describe(`Назначение себя оператором`, () => {
        it('Назначение себя оператором', () => {
            cy.intercept('PUT', '**/order/change-operator-for-order/**').as('appointOperatorRequest');

            cy.get('button.cursor-pointer').contains('Войти').click();

            // Проверяем, что модальное окно открылось
            cy.get('[role="dialog"]').should('be.visible');

            // Ввод данных в форму
            cy.get('input[placeholder="Введите логин оператора"]').type("admin@test");
            cy.get('input[placeholder="Введите пароль"]').type("password123");

            // Авторизация
            cy.get('[role="dialog"]').contains('Войти').click();

            // Проверяем, что модальное окно исчезло
            cy.get('[role="dialog"]').should('not.exist');

            cy.get('a[href="#/orders"]').click();

            cy.get('div.order-item', { timeout: 3000 }).each(($el, index, $list) => {
                cy.wrap($el).find('button.cursor-pointer').contains('Назначить себя оператором').then($btn => {
                    if ($btn.length > 0 && $btn.should('be.visible')) {
                        //Тыкаем на кнопку
                        cy.get('button.cursor-pointer').contains('Назначить себя оператором').click();

                        //Проверяем, что кнопка исчезла
                        cy.get('button.cursor-pointer').contains('Назначить себя оператором', { timeout: 5000 }).should('not.exist');

                        cy.wait('@appointOperatorRequest').then((interception: Interception) => {
                            // Проверяем тело запроса
                            expect(interception.response?.body).to.deep.equal({
                                message: "Operator changed successfully"
                            });
                        });

                        return false;
                    }
                });
            });
        });
    })
})