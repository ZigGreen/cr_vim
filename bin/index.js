const fs = require('fs');
const Renderer = require('cr-event-tools').Renderer;
let vim = require('../src/vim').vim;


fs.watch('./src', function (event, filename) { // sub directory changes are not seen
    if (!/.*.js$/.test(filename)) {
        return;
    }
    delete require.cache[require.resolve('../src/vim')];
    try {
        vim = require('../src/vim').vim;
        renderer.render(vim(commands, text));
    } catch (e) {
        console.log(e.message);
        console.log(e.stack.split('\n').slice(0,4).join('\n'));
    }
});

const text = '';
let commands = '';

const renderer = new Renderer({
    onData: key => {
        commands += key;

        renderer.render(vim(commands, text));
    },
    stats: true
});

renderer.render(vim(commands, text));
