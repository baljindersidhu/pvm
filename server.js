(() => {

    'use strict';

    const express   = require('express');
    const app       = express();
    const PORT      = process.env.PORT || 8080;

    // Static Directory location
    app.use(express.static(__dirname + "/web/src/app"));

    // REST PATHS
    app.get("/", (req,res) => res.sendFile("index.html"));

    app.listen(PORT, () => console.log(
        `You can access the console at: http://localhost:${PORT}`
    ));

})();