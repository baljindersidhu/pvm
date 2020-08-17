(() => {

    'use strict';

    const express   = require('express');
    const app       = express();
    const PORT      = process.env.PORT || 8080;

    // Static Directory location
    app.use(express.static(__dirname + "/"));

    // REST PATHS
    app.get("/", (req,res) => res.send("Hello World from NPM!"));

    app.listen(PORT, () => console.log(`You can access the console at: http://localhost:${PORT}`));
})();