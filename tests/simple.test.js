const vim = require('../src/vim').vim;
const { BS } = require('cr-event-tools').specialKeys;

test('simple', () => {
    expect(vim(`ihello Worldi${BS}`).str).toBe('hello World');
});