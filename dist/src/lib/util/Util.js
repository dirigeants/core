"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveEmoji = exports.isSet = exports.isGuildChannel = exports.isGuildTextBasedChannel = exports.isTextBasedChannel = exports.snakeToCamel = void 0;
function snakeToCamel(input) {
    const [first, ...parts] = input.split('_');
    let output = first.toLowerCase();
    for (const part of parts) {
        output += part[0].toUpperCase() + part.substr(1).toLowerCase();
    }
    return output;
}
exports.snakeToCamel = snakeToCamel;
function isTextBasedChannel(channel) {
    return Reflect.has(channel, 'messages');
}
exports.isTextBasedChannel = isTextBasedChannel;
function isGuildTextBasedChannel(channel) {
    return isTextBasedChannel(channel) && isGuildChannel(channel);
}
exports.isGuildTextBasedChannel = isGuildTextBasedChannel;
function isGuildChannel(channel) {
    return Reflect.has(channel, 'guild');
}
exports.isGuildChannel = isGuildChannel;
// eslint-disable-next-line @typescript-eslint/ban-types
function isSet(value, key) {
    return Reflect.has(value, key);
}
exports.isSet = isSet;
function resolveEmoji(emoji) {
    if (typeof emoji === 'string') {
        // <:klasa:354702113147846666> -> :klasa:354702113147846666
        if (emoji.startsWith('<'))
            return emoji.slice(1, -1);
        // :klasa:354702113147846666 -> :klasa:354702113147846666
        // a:klasa:354702113147846666 -> a:klasa:354702113147846666
        if (emoji.startsWith(':') || emoji.startsWith('a:'))
            return emoji;
        // 🚀 -> %F0%9F%9A%80
        return encodeURIComponent(emoji);
    }
    // Safe-guard against https://github.com/discordapp/discord-api-docs/issues/974
    return emoji.id ? `${emoji.animated ? 'a' : ''}:${emoji.name.replace(/~\d+/, '')}:${emoji.id}` : encodeURIComponent(emoji.name);
}
exports.resolveEmoji = resolveEmoji;
//# sourceMappingURL=Util.js.map