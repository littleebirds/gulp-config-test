const myName = 'xxxxxxjh';
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve()
    }, 3000)
})
p1.then(() => {
    document.write('aaa')
})