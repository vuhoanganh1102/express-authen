"use strict";
console.log("0");
setTimeout(function () {
    console.log("1");
    Promise.resolve().then(() => console.log("checking1"));
});
Promise.resolve().then(() => console.log("checking"));
new Promise(function (resolve, reject) {
    console.log("2");
    resolve(3);
    process.nextTick(function () {
        console.log("check");
    });
})
    .then(function (val) {
    console.log("val");
})
    .then(function (val) {
    console.log("then..1");
})
    .then(function () {
    console.log("then 2");
})
    .then(function () {
    console.log("then 3");
});
// new Promise(function (resolve: any, reject: any) {
//   console.log("4");
//   resolve(5);
// })
//   .then(function (val: any) {
//     console.log(val);
//   })
//   .then(function (val) {
//     console.log("then..6");
//   })
//   .then(function () {
//     console.log("then 4");
//   });
// function test() {
//   console.log("test");
//   console.log("test1");
// }
// test();
console.log("7");
