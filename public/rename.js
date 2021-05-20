const fs = require("fs");
const reg = /^[a-z]/gm;
const path = require("path");

fs.readdir(
  "/Users/waldolavautnazario/Documents/cubason_nextjs/public/country-flags/svg",
  (err, files) => {
    if (err) {
      console.log("Could not list the directory", err);
    }

    files.forEach((file, index) => {
      fs.rename(
        `/Users/waldolavautnazario/Documents/cubason_nextjs/public/country-flags/svg/${file}`,
        `/Users/waldolavautnazario/Documents/cubason_nextjs/public/country-flags/svg/${file.replace(
          reg,
          file[0].toUpperCase()
        )}`,
        function (err) {
          if (err) console.log("ERROR: " + err);
        }
      );
    });
  }
);
