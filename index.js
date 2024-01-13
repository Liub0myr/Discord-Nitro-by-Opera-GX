const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
app.use(express.json());

app.get('/', (req, res) => {
    axios.post('https://api.discord.gx.games/v1/direct-fulfillment', {"partnerUserId":"bc385c68-be5f-43c2-9713-cb2051fef65b"}, {
        // I'm OperaGX from www.opera.com ;)
        headers: {
                "Content-Type": "application/json",
                "Sec-Ch-Ua": "\"Opera GX\";v=\"105\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "cross-site",
                "Origin": "https://www.opera.com",
                "Referer": "https://www.opera.com/"
            }
    })
    .then((response) => {
        if (response.data.token !== undefined) {
            res.redirect(`https://discord.com/billing/partner-promotions/1180231712274387115/${response.data.token}`);
        }
        else {
            res.status(500).send('Looks like it no longer works');
            console.error(response);
        }
    })
    .catch((error) => {
        res.status(500).send('Looks like it no longer works');
        console.error(error);
    });
})

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  console.log(`Yay! It started on port ${port}`);
})