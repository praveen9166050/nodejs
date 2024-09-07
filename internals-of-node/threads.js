// process.env.UV_THREADPOOL_SIZE = 2;
// use the below command to change UV_THREADPOOL_SIZE and run the file
// & cmd /c "set UV_THREADPOOL_SIZE=2 & node threads.js"
const crypto = require('crypto');

const start = Date.now();
setTimeout(() => {
  console.log("setTimeout: 2000");
}, 2000);
for (let i = 1; i <= 4; i++) {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log(`${i}: ${Date.now() - start}`);
  });
}
setImmediate(() => {
  console.log("setImmediate");
});
setTimeout(() => {
  console.log("setTimeout: 1000");
}, 1000);