const { test, expect } = require('@jest/globals');
const { normalizeURL, getURLsFromHTML } = require('./crawl.js');

test('normalizeURL protocol', () => {
    const input = 'https://blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test('normalizeURL slash', () => {
    const input = 'https://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test('normalizeURL http', () => {
    const input = 'http://blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test('normalizeURL slash capitals http', () => {
    const input = 'http://BLOG.boot.DEV/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML absolute-path', () => {
    const inputURL = 'https://blog.boot.dev';
    const inputBody = '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>';
    const actual = getURLsFromHTML(inputBody, inputURL);
    const expected = ['https://blog.boot.dev/'];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML relative-path', () => {
    const inputURL = 'https://blog.boot.dev';
    const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>';
    const actual = getURLsFromHTML(inputBody, inputURL);
    const expected = ['https://blog.boot.dev/path/one'];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML both', () => {
    const inputURL = 'https://blog.boot.dev';
    const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL);
    const expected = ['https://blog.boot.dev/path/one', 'https://other.com/path/one'];
    expect(actual).toEqual(expected)
});

test('getURLsFromHTML handle error', () => {
    const inputURL = 'https://blog.boot.dev';
    const inputBody = '<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>';
    const actual = getURLsFromHTML(inputBody, inputURL);
    const expected = [];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML deeply-nested both', () => {
    const inputURL = 'https://blog.boot.dev';
    const inputBody = '<html><body><main><section><div><ul><li><a href="/path/one"><span>Boot.dev</span></a></li><li><a href="https://other.com/path/one"><span>Boot.dev</span></a></li></ul></div></section></main></body></html>';
    const actual = getURLsFromHTML(inputBody, inputURL);
    const expected = ['https://blog.boot.dev/path/one', 'https://other.com/path/one'];
    expect(actual).toEqual(expected);
});