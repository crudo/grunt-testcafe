import { Selector } from 'testcafe';

fixture `Typescript`
    .page('http://localhost:3113/tests/form.html');

test('fill form', async (t) => {
    await t
        .typeText('.input', 'crudo')
        .click('.submit');
});
