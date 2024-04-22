const { sortPages } = require('./report.js');
const { test, expect } = require('@jest/globals');

test('sortPages', () => {
    const input = { URL1: 115, URL2: 10, URL3: 33, URL4: 12, URL5: 71, URL6: 5 };
    const actual = sortPages(input);
    const expected = [ ['URL1', 115], ['URL5', 71], ['URL3', 33], ['URL4', 12], ['URL2', 10], ['URL6', 5] ];
    expect(actual).toEqual(expected);
});

test('sortPages null case', () => {
    const input = {};
    const actual = sortPages(input);
    const expected = [];
    expect(actual).toEqual(expected);
});