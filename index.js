const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
app.use(express.json());

generateUUID = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(t) {
    const e = 16 * Math.random() | 0;
    return ("x" === t ? e : 3 & e | 8).toString(16)
}));


app.get('/', (req, res) => {
    // generates a post body with a random partnerUserId
    postBody = {}
    postBody.partnerUserId = generateUUID();
    // I'm OperaGX from www.opera.com ;)
    axios.post('https://api.discord.gx.games/v1/direct-fulfillment', postBody, {
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