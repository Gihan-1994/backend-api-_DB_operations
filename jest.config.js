module.exports= {
    preset : 'ts-jest',
    testEnvironment: 'node',
    //testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',

    // Files to ignore
    testPathIgnorePatterns: [
        '/node_modules/',
        '/dist/'
    ],
}