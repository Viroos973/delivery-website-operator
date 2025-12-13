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
            //Добавление комментария к заказу
            cy.get('[role="dialog"]').contains('Сохранить').click();
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

    describe(`Проверка добавления пустого комментария к заказу`, () => {
        it('Выдает предупреждение', () => {
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
            //Добавление комментария к заказу
            cy.get('[role="dialog"]').contains('Сохранить').click();
            // Проверка на наличие предупреждения
            cy.get('[data-slot="form-message"]')
                .should('be.visible')
                .and('contain.text', 'Это поле обязательно');
        })
    })

    describe(`Назначение себя оператором`, () => {
        it('Назначение себя оператором', () => {
            cy.intercept('PUT', '**/order/change-operator-for-order/**').as('appointOperatorRequest');

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

    describe(`Редактирование информации о компании`, () => {
        it('Редактирование информации о компании', () => {
            cy.intercept('PUT', '**/api/about/**').as('editAboutRequest');

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

            cy.get('a[href="#/about"]').click();

            // Кликаем на кнопку редактирования
            cy.get('button.cursor-pointer').contains('Редактировать').click();

            // Проверяем, что модальное окно открылось
            cy.get('[role="dialog"]').should('be.visible');

            // Ввод данных в форму
            cy.get('input[placeholder="Наименование компании"]').type("HITs Delivery service");
            cy.get('input[placeholder="Почтовый адрес"]').type("Пр. Ленина");
            cy.get('input[placeholder="Email для связи"]').type("delivery@list.ru");
            cy.get('input[placeholder="Телефон менеджера"]').type("+79547856512");
            cy.get('input[placeholder="Телефон оператора"]').type("89134587596");

            // Редактирование данных
            cy.get('[role="dialog"]').contains('Сохранить').click();

            // Проверяем, что модальное окно исчезло
            cy.get('[role="dialog"]').should('not.exist');

            cy.wait('@editAboutRequest').then((interception: Interception) => {
                // Проверяем тело запроса
                expect(interception.response?.body).to.exist;
            });
        });
    })

    describe(`Отмена редактирования информации о компании`, () => {
        it('Отмена редактирования информации о компании', () => {
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

            cy.get('a[href="#/about"]').click();

            // Кликаем на кнопку редактирования
            cy.get('button.cursor-pointer').contains('Редактировать').click();

            // Проверяем, что модальное окно открылось
            cy.get('[role="dialog"]').should('be.visible');

            // Сохраняем изначальные данные
            let originalData = {
                companyName: '',
                mailAddress: '',
                contactEmail: '',
                managerPhone: '',
                operatorPhone: ''
            };

            cy.get('input[placeholder="Наименование компании"]')
                .invoke('val')
                .then(val => { originalData.companyName = val; });
            cy.get('input[placeholder="Почтовый адрес"]')
                .invoke('val')
                .then(val => { originalData.mailAddress = val; });
            cy.get('input[placeholder="Email для связи"]')
                .invoke('val')
                .then(val => { originalData.contactEmail = val; });
            cy.get('input[placeholder="Телефон менеджера"]')
                .invoke('val')
                .then(val => { originalData.managerPhone = val; });
            cy.get('input[placeholder="Телефон оператора"]')
                .invoke('val')
                .then(val => { originalData.operatorPhone = val; });

            // Ввод новых данных в форму
            cy.get('input[placeholder="Наименование компании"]').type("HITs Delivery service");
            cy.get('input[placeholder="Почтовый адрес"]').type("Пр. Ленина");
            cy.get('input[placeholder="Email для связи"]').type("delivery@list.ru");
            cy.get('input[placeholder="Телефон менеджера"]').type("+79547856512");
            cy.get('input[placeholder="Телефон оператора"]').type("89134587596");

            // Отмена редактирования данных
            cy.get('[role="dialog"]').contains('Отмена').click();

            // Проверяем, что модальное окно исчезло
            cy.get('[role="dialog"]').should('not.exist');

            // Проверяем, что данные на странице не изменились 
            cy.get('.name-company').should('contain.text', originalData.companyName);
            cy.get('[data-testid="about-item-Почтовый адрес:"]').should('contain.text', originalData.mailAddress);
            cy.get('[data-testid="about-item-Email для связи:"]').should('contain.text', originalData.contactEmail);
            cy.get('[data-testid="about-item-Телефон менеджера:"]').should('contain.text', originalData.managerPhone);
            cy.get('[data-testid="about-item-Телефон оператора:"]').should('contain.text', originalData.operatorPhone);
        });
    })

    const testEditAboutData = [
        {
            companyName: '',
            mailAddress: '',
            contactEmail: '',
            managerPhone: '',
            operatorPhone: ''
        },
        {
            companyName: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            mailAddress: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            contactEmail: 'emailv@ru',
            managerPhone: '78984',
            operatorPhone: '7895142348452'
        },
        {
            companyName: 'a',
            mailAddress: 'a',
            contactEmail: 'email',
            managerPhone: '7898435353535355',
            operatorPhone: '78951422'
        }
    ];
    describe(`Проверка валидаци при редактировании информации о компании`, () => {
        testEditAboutData.forEach(({ companyName, mailAddress, contactEmail, managerPhone, operatorPhone }) => {
            it('Выдает предупреждения', () => {
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

                cy.get('a[href="#/about"]').click();

                // Кликаем на кнопку редактирования
                cy.get('button.cursor-pointer').contains('Редактировать').click();

                // Проверяем, что модальное окно открылось
                cy.get('[role="dialog"]').should('be.visible');

                // Ввод данных в форму
                cy.get('input[placeholder="Наименование компании"]').type(companyName);
                cy.get('input[placeholder="Почтовый адрес"]').type(mailAddress);
                cy.get('input[placeholder="Email для связи"]').type(contactEmail);
                cy.get('input[placeholder="Телефон менеджера"]').type(managerPhone);
                cy.get('input[placeholder="Телефон оператора"]').type(operatorPhone);

                // Редактирование данных
                cy.get('[role="dialog"]').contains('Сохранить').click();

                // Массив полей и сообщений
                const validationFields = [
                    {
                        selector: 'input[placeholder="Наименование компании"]',
                        message: [
                            'Минимум 2 символа',
                            'Максимум 50 символов'
                        ]
                    },
                    {
                        selector: 'input[placeholder="Почтовый адрес"]',
                        message: [
                            'Минимум 2 символа',
                            'Максимум 50 символов'
                        ]
                    },
                    {
                        selector: 'input[placeholder="Email для связи"]',
                        message: 'Введите корректный email'
                    },
                    {
                        selector: 'input[placeholder="Телефон менеджера"]',
                        message: 'Введите корректный телефон менеджера'
                    },
                    {
                        selector: 'input[placeholder="Телефон оператора"]',
                        message: 'Введите корректный телефон оператора'
                    }
                ];

                // Проверка на наличие предупреждений
                validationFields.forEach(field => {
                    cy.get(field.selector)
                        .parent()
                        .find('[data-slot="form-message"]')
                        .should('be.visible')
                        .and('contain.text', field.message);
                });
            });
        })
    })
})