const main = require('./main.js')

describe('parse', () => {
    it('data format check', () => {
        const notquery = [
            "name",
            "name&age=10",
            "name=&age=10",
            "name&age&height"
        ]

        for(let i = 0; i < notquery.length; i++) {
            expect(main.dataCheck(notquery[i])).toBe(null)
        }
    })

    it('parse data', () => {
        const data = "name=park&age=20&height=175cm"

        const result = main.parse(data)

        expect(result).toEqual(eval(result))
    })
})
