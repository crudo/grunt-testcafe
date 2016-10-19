fixture `Form`
    .page('http://localhost:3113/tests/form.html');

test('fill', async t => {
    await t
        .typeText('.input', 'crudo')
        .click('.submit');
});
