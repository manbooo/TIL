function parse(data) {

    dataCheck(data)

    const query = data.split('&')
    const result = {}

    // console.log(query)

    query.map(q => {
        let temp = q.split('=')
        result[temp[0]] = temp[1]
    })

    return result
}

function dataCheck(data) {
    const re = /^((?:[a-zA-Z0-9_]+\=[a-zA-Z0-9_]+)?(?:\&[a-zA-Z0-9_]+\=[a-zA-Z0-9_]+)*)$/

    const result = re.exec(data)

    return result
}

const data = "name=park&age=20&height=175cm"

// console.log(parse(data))

module.exports = {parse, dataCheck}
