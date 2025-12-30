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
                    cy.get('.select-change-status').invoke('text').then((text: string) => text.trim()).as('orderStatus');
                })

            cy.get('@orderStatus').then((status: string) => {
                //проверяем,что открылся
                cy.get('[data-slot="select-content"]', { timeout: 5000 }).should('be.visible');

                //тыкаем на нужный статус
                if (status === 'Новый') {
                    cy.get('.select-item-CONFIRMED').click({ force: true });
                } else {
                    cy.get('.select-item-NEW').click({ force: true });
                }

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

    describe(`Отмена заказа оператором`, () => {
        it('Отмена заказа и проверка валидации пустой причины', () => {
            cy.intercept('GET', '**/order/find-by/**').as('getOrderDetails');
            cy.intercept('PUT', '**/order/cancel-order/**').as('cancelOrderRequest');

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

            // Переходим на страницу заказов
            cy.get('a[href="#/orders"]').click();

            // Ищем заказ, который не отменен (статус не "Отменен"/"CANCELLED")
            cy.get('div.order-item', { timeout: 5000 })
                .should('have.length.greaterThan', 0)
                .each(($order) => {
                    cy.wrap($order).within(() => {
                        // Ищем кнопку "Отменить" и проверяем, что она не заблокирована
                        cy.get('button')
                            .filter(':contains("Отменить")')
                            .then(($cancelButtons) => {
                                // Проверяем, есть ли активные (не disabled) кнопки
                                const activeButtons = $cancelButtons.filter(':not(:disabled)');

                                if (activeButtons.length > 0) {
                                    // Нашли активную кнопку "Отменить"
                                    cy.wrap(activeButtons.first())
                                        .should('be.visible')
                                        .and('not.be.disabled')
                                        .as('cancelButton');

                                    // Нажимаем кнопку отмены заказа
                                    cy.get('@cancelButton').click();

                                    return false; // Прерываем цикл each
                                }
                            });
                    });
                });

            //Проверяем, что модальное окно открылось
            cy.get('[role="dialog"]').should('be.visible');
            //Добавление причины отмены заказа
            cy.get('[role="dialog"]').contains('Сохранить').click();
            // Проверка на наличие предупреждения
            cy.get('[data-slot="form-message"]')
                .should('be.visible')
                .and('contain.text', 'Это поле обязательно');
        });
    });

    describe(`Назначение себя оператором`, () => {
        it('Назначение себя оператором', () => {
            cy.intercept('PUT', '**/order/change-operator-for-order**').as('appointOperatorRequest');

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

            cy.get('div.order-item', { timeout: 3000 }).each(($el, index) => {
                // Проверяем, есть ли внутри элемента кнопка с нужным текстом
                const $btn = $el.find('button.cursor-pointer:contains("Назначить себя оператором")');

                // Если кнопка не найдена, переходим к следующему элементу
                if ($btn.length === 0) {
                    cy.log(`Элемент ${index} не содержит нужную кнопку, пропускаем`);
                } else {
                    // Если кнопка найдена, выполняем действия
                    cy.wrap($btn)
                        .should('be.visible')
                        .click();

                    // Ожидаем запроса
                    cy.wait('@appointOperatorRequest').then((interception: Interception) => {
                        expect(interception.response?.body).to.deep.equal({
                            message: "Operator changed successfully"
                        });
                    });

                    // Прерываем цикл после успешного выполнения
                    return false;
                }
            });
        });
    })

    describe(`Редактирование информации о компании`, () => {
        it('Редактирование информации о компании', () => {
            cy.intercept('PUT', '**/api/about').as('editAboutRequest');

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

            // Кликаем на кнопку редактирования
            cy.get('button.cursor-pointer').contains('Редактировать').click();

            // Проверяем, что модальное окно открылось
            cy.get('[role="dialog"]').should('be.visible');

            // Ввод данных в форму
            cy.get('input[placeholder="Наименование компании"]').clear().type("HITs Delivery service");
            cy.get('input[placeholder="Почтовый адрес"]').clear().type("Пр. Ленина");
            cy.get('input[placeholder="Email для связи"]').clear().type("delivery@list.ru");
            cy.get('input[placeholder="Телефон менеджера"]').clear().type("+79547856512");
            cy.get('input[placeholder="Телефон оператора"]').clear().type("89134587596");

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

            // Кликаем на кнопку редактирования
            cy.get('button.cursor-pointer').contains('Редактировать').click();

            // Проверяем, что модальное окно открылось
            cy.get('[role="dialog"]').should('be.visible');

            // Сохраняем изначальные данные
            const originalData = {
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
            cy.get('input[placeholder="Наименование компании"]').clear().type("HITs Delivery service");
            cy.get('input[placeholder="Почтовый адрес"]').clear().type("Пр. Ленина");
            cy.get('input[placeholder="Email для связи"]').clear().type("delivery@list.ru");
            cy.get('input[placeholder="Телефон менеджера"]').clear().type("+79547856512");
            cy.get('input[placeholder="Телефон оператора"]').clear().type("89134587596");

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
            operatorPhone: '7'
        },
        {
            companyName: 'a',
            mailAddress: 'a',
            contactEmail: 'email',
            managerPhone: '7',
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

                // Кликаем на кнопку редактирования
                cy.get('button.cursor-pointer').contains('Редактировать').click();

                // Проверяем, что модальное окно открылось
                cy.get('[role="dialog"]').should('be.visible');

                // Ввод данных в форму
                cy.get('input[placeholder="Наименование компании"]').clear();
                if (companyName !== '') cy.get('input[placeholder="Наименование компании"]').type(companyName);

                cy.get('input[placeholder="Почтовый адрес"]').clear();
                if (mailAddress !== '') cy.get('input[placeholder="Почтовый адрес"]').type(mailAddress);

                cy.get('input[placeholder="Email для связи"]').clear();
                if (contactEmail !== '') cy.get('input[placeholder="Email для связи"]').type(contactEmail);

                cy.get('input[placeholder="Телефон менеджера"]').clear();
                if (managerPhone !== '') cy.get('input[placeholder="Телефон менеджера"]').type(managerPhone);

                cy.get('input[placeholder="Телефон оператора"]').clear();
                if (operatorPhone !== '') cy.get('input[placeholder="Телефон оператора"]').type(operatorPhone);

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
                        .parent().parent()
                        .find('[data-slot="form-message"]')
                        .should('be.visible')
                        .invoke('text')
                        .should('satisfy', (text: string) => {
                            const messages = Array.isArray(field.message) ? field.message : [field.message];
                            return messages.some(msg => text.includes(msg));
                        });
                });
            });
        })
    })

    const testAddNewOperatorData = [
        {
            fullName: '',
            password: '',
            phone: '',
            username: ''
        },
        {
            fullName: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
                'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
                'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            password: 'abc=def',
            phone: '78984',
            username: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        },
        {
            fullName: 'aa',
            password: 'abcdef1234567890!?#$%',
            phone: '7',
            username: 'a'
        }
    ];
    describe(`Проверка валидаци при добавлении нового оператора`, () => {
        testAddNewOperatorData.forEach(({ fullName, password, phone, username }) => {
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

                cy.get('a[href="#/operators"]').click();

                // Кликаем на кнопку добавления
                cy.get('.add-operator').click();

                // Проверяем, что модальное окно открылось
                cy.get('[role="dialog"]').should('be.visible');

                // Ввод данных в форму
                cy.get('input[placeholder="ФИО"]').clear();
                if (fullName) cy.get('input[placeholder="ФИО"]').type(fullName);

                cy.get('input[placeholder="Пароль"]').clear();
                if (password) cy.get('input[placeholder="Пароль"]').type(password);

                cy.get('input[placeholder="Номер телефона"]').clear();
                if (phone) cy.get('input[placeholder="Номер телефона"]').type(phone);

                cy.get('input[placeholder="Логин"]').clear();
                if (username) cy.get('input[placeholder="Логин"]').type(username);

                // Сохранение данных
                cy.get('[role="dialog"]').contains('Создать').click();

                // Массив полей и сообщений
                const validationFields = [
                    {
                        selector: 'input[placeholder="ФИО"]',
                        message: [
                            'Минимум 3 символа',
                            'Максимум 255 символов'
                        ]
                    },
                    {
                        selector: 'input[placeholder="Пароль"]',
                        message: 'Введите корректный пароль'
                    },
                    {
                        selector: 'input[placeholder="Номер телефона"]',
                        message: 'Введите корректный номер телефона'
                    },
                    {
                        selector: 'input[placeholder="Логин"]',
                        message: [
                            'Минимум 3 символа',
                            'Максимум 100 символов'
                        ]
                    }
                ];

                // Проверка на наличие предупреждений
                validationFields.forEach(field => {
                    cy.get(field.selector)
                        .parent().parent()
                        .find('[data-slot="form-message"]')
                        .should('be.visible')
                        .invoke('text')
                        .should('satisfy', (text: string) => {
                            const messages = Array.isArray(field.message) ? field.message : [field.message];
                            return messages.some(msg => text.includes(msg));
                        });
                });
            });
        })
    })

    describe(`Добавление нового оператора`, () => {
        it('Добавление нового оператора', () => {
            cy.intercept('POST', '**/api/users/registration/operator').as('addNewOperatorRequest');

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

            cy.get('a[href="#/operators"]').click();

            cy.get('.add-operator').click();

            // Проверяем, что модальное окно открылось
            cy.get('[role="dialog"]').should('be.visible');

            // Ввод данных в форму
            cy.get('input[placeholder="ФИО"]').type('Иванов Иван Иванович');
            cy.get('input[placeholder="Пароль"]').type('abcde12345');
            cy.get('input[placeholder="Номер телефона"]').type('89138527548');
            cy.get('input[placeholder="Логин"]').type('login');

            // Сохранение данных
            cy.get('[role="dialog"]').contains('Создать').click();

            //Проверяем, что модальное окно исчезло
            cy.get('[role="dialog"]').should('not.exist');

            cy.wait('@addNewOperatorRequest').then((interception: Interception) => {
                // Проверяем тело запроса
                expect(interception.response?.body).to.exist;
            });
        })
    })

    describe(`Удаление оператора`, () => {
        it('Удаление оператора', () => {
            cy.intercept('DELETE', '**/api/users/operators/**').as('deleteOperatorRequest');

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

            cy.get('a[href="#/operators"]').click();

            cy.get('div.operator-item', { timeout: 3000 })
                .should('have.length.greaterThan', 0)
                .first().as('firstOperator');

            cy.get('@firstOperator')
                .within(() => {
                    // Кликаем на кнопку удаления оператора
                    cy.get('button.cursor-pointer').contains('Удалить аккаунт оператора').click();
                })

            cy.wait('@deleteOperatorRequest').then((interception: Interception) => {
                // Проверяем тело запроса
                expect(interception.response?.body).to.exist;
            });
        })
    })

    describe(`Назначение оператора`, () => {
        it('Оператором заказ не должен быть клиент', () => {
            cy.intercept('GET', '**/users/operators').as('getOperators');

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
                    // Переходим в детали заказа
                    cy.get('a.cursor-pointer').contains('Заказ').click();
                })

            cy.wait('@getOperators').then((interception) => {
                const operators = interception.response.body;

                // Проверяем, что это массив
                expect(operators).to.be.an('array');

                // Проверяем каждый оператор
                operators.forEach((operator, index) => {
                    expect(operator.role, `Оператор ${index} (${operator.name || operator.id}) должен иметь role = "OPERATOR"`)
                        .to.equal('OPERATOR');
                });
            })
        })
    })

    describe(`Добавление блюда в заказ`, () => {
        it('Добавление блюда в заказ и проверка количества', () => {
            // Объявляем переменную для хранения начального количества блюд
            let initialDishCount: number;

            cy.intercept('PUT', '**/order/add-dish/*/*').as('addDishRequest');
            cy.intercept('GET', '**/order/find-by/**').as('getOrderDetails');

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

            // Переходим на страницу заказов
            cy.get('a[href="#/orders"]').click();

            // Ожидаем загрузку списка заказов
            cy.get('div.order-item', { timeout: 5000 })
                .should('have.length.greaterThan', 0)
                .first().as('firstOrder');

            // Переходим в детали заказа
            cy.get('@firstOrder')
                .within(() => {
                    cy.get('a.cursor-pointer').contains('Заказ').click();
                });

            // Ожидаем загрузки деталей заказа
            cy.wait('@getOrderDetails').its('response.statusCode').should('eq', 200);

            // Получаем начальное количество блюд в заказе и сохраняем в переменную
            cy.get('.dish-list-item', { timeout: 5000 })
                .find('> *')
                .then(($dishes) => {
                    initialDishCount = $dishes.length;
                    cy.log(`Начальное количество блюд: ${initialDishCount}`);
                });

            // Нажимаем кнопку "Добавить блюдо"
            cy.get('button.cursor-pointer').contains('Добавить блюдо').click();

            // Проверяем, что модальное окно с блюдами открылось
            cy.get('[role="dialog"]').should('be.visible');
            cy.get('[role="dialog"]').contains('Меню').should('be.visible');

            // Ждем загрузки блюд в модальном окне
            cy.get('[role="dialog"]', { timeout: 5000 }).within(() => {
                // Проверяем наличие блюд
                cy.get('.dish-item-card', { timeout: 5000 })
                    .should('have.length.greaterThan', 0)
                    .first()
                    .as('firstDishCard');
            });

            // Добавляем первое доступное блюдо в заказ
            cy.get('@firstDishCard').within(() => {
                // Нажимаем кнопку добавления блюда
                cy.get('button').contains('Добавить в заказ').click({ force: true });
            });

            // Ожидаем успешного запроса на добавление блюда
            cy.wait('@addDishRequest').then((interception) => {
                expect(interception.response?.statusCode).to.equal(200);
                expect(interception.response?.body).to.have.property('message');
            });

            // ЗАКРЫВАЕМ МОДАЛЬНОЕ ОКНО КЛИКОМ НА КРЕСТИК
            cy.get('[role="dialog"]').within(() => {
                cy.get('button[data-slot="dialog-close"]').click();
            });

            // Проверяем, что модальное окно закрылось
            cy.get('[role="dialog"]').should('not.exist');

            // Ожидаем обновления данных заказа
            cy.wait('@getOrderDetails');

            // Проверяем, что количество блюд увеличилось на 1
            cy.get('.dish-list-item', { timeout: 5000 })
                .find('> *')
                .then(($dishes) => {
                    const currentDishCount = $dishes.length;
                    cy.log(`Текущее количество блюд: ${currentDishCount}`);
                    cy.log(`Начальное количество было: ${initialDishCount}`);

                    // Проверяем, что количество увеличилось на 1
                    expect(currentDishCount).to.equal(initialDishCount + 1);
                });

            // Дополнительная проверка: проверяем, что появилось новое блюдо в списке
            cy.get('.dish-list-item', { timeout: 5000 })
                .find('> *')
                .last()
                .should('be.visible');
        });
    });

    describe(`Редактирование блюда администратором`, () => {
        it('Удаление фотографии блюда', () => {
            let dishId: string;
            let initialPhotoCount: number;

            cy.intercept('POST', '**/api/foods/filter').as('getDishes');
            cy.intercept('PUT', '**/api/foods/**').as('updateDish');

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

            // Переход на страницу блюд
            cy.get('a[href="#/dishManagement"]').click();

            // Получаем данные блюда через API
            cy.wait('@getDishes').then((interception) => {
                const dishes = interception.response.body;
                const dishWithPhotos = dishes?.find(d => d.photos?.length > 0);

                if (!dishWithPhotos) {
                    cy.log('Нет блюд с фотографиями, пропускаем тест');
                    return;
                }

                dishId = dishWithPhotos.id;
                initialPhotoCount = dishWithPhotos.photos.length;

                cy.log(`Тестируем блюдо ${dishId} с ${initialPhotoCount} фото`);

                // Находим и кликаем на кнопку редактирования этого блюда
                cy.get(`[data-id="${dishId}"].dish-item-card`)
                    .first()
                    .within(() => {
                        cy.get('.edit-btn').click();
                    });
            });

            // Открываем форму редактирования
            cy.get('[role="dialog"]').should('be.visible');

            // Удаляем первую фотографию
            cy.get('[role="dialog"]').within(() => {
                // Находим первую кнопку удаления фотографии
                cy.get('.remove-photo-into-order')
                    .first()
                    .click({ force: true });

                // Сохраняем изменения
                cy.get('button[type="submit"]').contains('Сохранить').click();
            });

            // Проверяем запрос на обновление
            cy.wait('@updateDish').then((interception) => {
                const requestBody = interception.request.body;
                const updatedPhotoCount = requestBody?.photos?.length || 0;

                expect(updatedPhotoCount).to.be.lessThan(initialPhotoCount);
            });
        });
    });
})