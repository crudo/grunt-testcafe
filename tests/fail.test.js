fixture `Failing`
    .page('http://localhost:3113/tests/form.html');

test('should fail', async t => {
    await t
        .typeText('.input', 'crudo')
        .click('.non-existing');
});
