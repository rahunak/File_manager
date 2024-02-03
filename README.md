# File_manager
NodeJs App - File manager


// 2.can be rewritten with util.promisify(original)
// const newPromise = new Promise((resolve) => {

    //3 need check 
          pathToCopyFile = path.join(
        pathToNewDirectory,
        path.win32.basename(pathToFile),
        path.extname(pathToFile),
      );

For checking Brotli compress I used brotli app from site:
https://manpages.ubuntu.com/manpages/focal/man1/brotli.1.html

//4.For example the create functionality can be re-implemented using writeFile with  wx flag.

'wx': Like 'w' but fails if the path exists.