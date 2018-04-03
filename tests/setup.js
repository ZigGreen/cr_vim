const execSync = require('child_process').execSync;

function runRealVim(command) {
    let stdout = execSync(`vim -c 'execute "normal! ${command}" | execute "w !tee" | execute "q!"'`, {
        env: Object.assign({}, process.env, { TERM: 'dumb' }),
        stdio: ['pipe', 'pipe', 'ignore']
    });

    return stdout.toString().split('\n').slice(1, -1).join('');
}

expect.extend({
    runsCommand(vim, command) {
        const expected = runRealVim(command);
        const actual = vim(command).str;
        const pass = expected === actual;

        if (!pass) {
            return {
                pass,
                message: () => `cannot run command: ${command}. Expected: ${this.utils.printExpected(expected)} but actual is ${this.utils.printReceived(actual)}`
            }
        }

        return {
            pass: pass
        }
    }
});
