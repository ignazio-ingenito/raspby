
import _ from 'lodash'


export function toFrequency(value: number, precision: number = 0): string {

    // Convert the size in a readable format.
    const unit: string[] = ['MHz', 'GHz', 'THz']
    const max: number = unit.length - 1

    let res: any = value
    let n: number = 0

    while (res >= 1000 && n < max) {
        res = res / 1000
        n++
    }
    n = Math.min(n, max)

    res = res.toFixed(precision)
    res = precision == 0 ? parseInt(res) : res
    return `${res} ${unit[n]}`.trim()
}

export function toMemory(value: number = 0, precision: number = 0): string {
    // Convert the size in a readable format.
    const unit: string[] = ['b', 'KB', 'MB', 'GB', 'TB']
    let max: number = unit.length - 1

    let res: any = value
    let n: number = 0

    while (res >= 1024 && n < max) {
        res = res / 1024
        n++
    }
    n = Math.min(n, max)

    res = res.toFixed(precision)
    res = precision == 0 ? parseInt(res) : res
    return `${res} ${unit[n]}`.trim()
}

export function toDecimal(value: number = 0, precision: number = 0, use = 'symbol'): string {
    // Convert the size in a readable format.

    //     """
    //     yotta	Y	 10^24	septillion
    //     zetta	Z	 10^21	sextillion
    //     exa	    E	 10^18	quintillion
    //     peta	P	 10^15	quadrillion
    //     tera	T	 10^12	trillion
    //     giga	G	 10^9	billion
    //     mega	M	 10^6	million
    //     kilo	k	 10^3	thousand
    //     hecto	h	 10^2	hundred
    //     deca	da	 10^1	ten
    //     """    

    const unit = [
        { "name": "", "symbol": "", "value": 1, "full_name": "" },
        { "name": "deca", "symbol": "da", "value": 10 ** 1, "full_name": "ten" },
        { "name": "hecto", "symbol": "h", "value": 10 ** 2, "full_name": "hundred" },
        { "name": "kilo", "symbol": "k", "value": 10 ** 3, "full_name": "thousand" },
        { "name": "mega", "symbol": "M", "value": 10 ** 6, "full_name": "million" },
        { "name": "giga", "symbol": "G", "value": 10 ** 9, "full_name": "billion" },
        { "name": "tera", "symbol": "T", "value": 10 ** 12, "full_name": "trillion" },
        // {"name": "peta", "symbol": "P", "value": 10**15, "full_name": "quadrillion"},
        // {"name": "exa", "symbol": "E", "value": 10**18, "full_name": "quintillion"},
        // {"name": "zetta", "symbol": "Z", "value": 10**21, "full_name": "sextillion"},
        // {"name": "yotta", "symbol": "Y", "value": 10**24, "full_name": "septillion"},
    ]
    const max: number = Object.keys(unit).length - 1

    let res: any = value
    let n: number = 0

    while (res >= 10 && n < max) {
        res = res / 10
        n++
    }
    n = Math.min(n, max)

    res = res.toFixed(precision)
    res = precision == 0 ? parseInt(res) : res
    const post: string = _.get(unit, `[${n}].${use}`)
    return `${res} ${post}`.trim()
}