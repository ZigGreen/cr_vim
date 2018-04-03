const specialKeys = require('cr-event-tools').specialKeys;


/**
 *
 * @param commands команда вида: "ihello world". Может содержать спецсимволы перечисленные в cr-event-tools.specialKeys
 * @param text любая строчка
 * @param caret текущая позиция курсовра
 * @returns {({caret: number, str: string})}
 */
function vim(commands, text = '', caret = 0) {
    const commandsParsed = commands.split(/(\d+|\w|\\<\w+>?)/).filter(Boolean);
    let editMode = false;

    return commandsParsed.reduce((state, word) => {
        if (!editMode && word === 'i') {
            editMode = true;
            return state;
        }
        // specialKeys.BS -- соответствует клавише Backspace
        // specialKeys.esc -- соответствует клавише esc
        if (word === specialKeys.BS) {
            return {
                str: state.str.slice(0,-1),
                caret: Math.max(state.caret - 1, 0) // не допускаем отрицательный курсор
            };
        }

        return {
            str: state.str + word,
            caret: state.caret + word.length
        };
    }, { caret, str: text });
}



module.exports = { vim };
