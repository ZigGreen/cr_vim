const vim = require('../src/vim').vim;
const { BS } = require('cr-event-tools').specialKeys;

test('simple', () => {
    expect(vim).runsCommand(`ihello Worldi${BS}`);
});