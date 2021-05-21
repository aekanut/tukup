const line = require('@line/bot-sdk');
const express = require('express');
require('dotenv').config()

// create LINE SDK config from env variables
const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

let check = {
    "1": true,
    "2": true
}

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), async (req, res) => {
    const event = req.body.events[0]
    try {
        console.log(event);

        if (event.type === 'message' && event.message.type === 'text') {
            await client.replyMessage(event.replyToken, {
                type: 'text',
                text: 'อย่าบ่นครับ'
            });
        }

        if (event.type === 'postback') {
            if (check["1"]) {
                let user = await client.getProfile(event.source.userId)
                await client.pushMessage(event.source.groupId, {
                    "type": "image",
                    "originalContentUrl": user.pictureUrl,
                    "previewImageUrl": user.pictureUrl
                })
                await client.pushMessage(event.source.groupId, {
                    "type": "text",
                    text: `คุณ ${user.displayName} รับรายการที่ ${1}`
                })
                check["1"] = false
            } else {
                await client.pushMessage(event.source.groupId, {
                    "type": "text",
                    text: `มีคนรับรายการที่ ${1} ไปแล้ว`
                })
            }
        }

        return res.status(200)

    } catch (err) {
        console.log(3, err)
        return res.status(500).end()
    }
});

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.post('/test', async (req, res) => {
    const {
        id: accessId,
        queue,
        name,
        phone,
        number,
        source,
        destination,
        time
    } = req.body
    if (accessId !== 'loveTukUpSoMuch') return res.json({
        status: 'error',
        error: 'wrong id'
    })

    let bubble = {
        "type": "bubble",
        "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [{
                    "type": "text",
                    "text": "รายละเอียดลูกค้า",
                    "weight": "bold",
                    "size": "xl",
                    "color": "#008805FF",
                    "contents": []
                },
                {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "margin": "lg",
                    "contents": [{
                            "type": "box",
                            "layout": "horizontal",
                            "spacing": "sm",
                            "contents": [{
                                    "type": "text",
                                    "text": "คิวที่ :",
                                    "weight": "bold",
                                    "size": "lg",
                                    "color": "#000000FF",
                                    "flex": 2,
                                    "contents": []
                                },
                                {
                                    "type": "text",
                                    "text": queue,
                                    "weight": "bold",
                                    "size": "lg",
                                    "color": "#383838FF",
                                    "gravity": "center",
                                    "flex": 5,
                                    "wrap": true,
                                    "contents": []
                                }
                            ]
                        },
                        {
                            "type": "box",
                            "layout": "vertical",
                            "spacing": "sm",
                            "margin": "lg",
                            "contents": [{
                                "type": "box",
                                "layout": "vertical",
                                "spacing": "sm",
                                "contents": [{
                                        "type": "text",
                                        "text": "ชื่อลูกค้า :",
                                        "weight": "bold",
                                        "size": "lg",
                                        "color": "#000000FF",
                                        "flex": 1,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": name,
                                        "weight": "bold",
                                        "size": "sm",
                                        "color": "#383838FF",
                                        "flex": 5,
                                        "align": "start",
                                        "gravity": "center",
                                        "wrap": true,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": "เบอร์ลูกค้า :",
                                        "weight": "bold",
                                        "size": "lg",
                                        "color": "#000000FF",
                                        "flex": 1,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": phone,
                                        "weight": "bold",
                                        "size": "sm",
                                        "color": "#383838FF",
                                        "flex": 5,
                                        "align": "start",
                                        "gravity": "center",
                                        "wrap": true,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": "จำนวนลูกค้า :",
                                        "weight": "bold",
                                        "size": "lg",
                                        "color": "#000000FF",
                                        "flex": 1,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": number,
                                        "weight": "bold",
                                        "size": "sm",
                                        "color": "#383838FF",
                                        "flex": 5,
                                        "align": "start",
                                        "gravity": "center",
                                        "wrap": true,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": "จุดที่ไปรับ :",
                                        "weight": "bold",
                                        "size": "lg",
                                        "color": "#000000FF",
                                        "flex": 1,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": source,
                                        "weight": "bold",
                                        "size": "sm",
                                        "color": "#383838FF",
                                        "flex": 5,
                                        "align": "start",
                                        "gravity": "center",
                                        "wrap": true,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": "จุดที่ไปส่ง :",
                                        "weight": "bold",
                                        "size": "lg",
                                        "color": "#000000FF",
                                        "flex": 1,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": destination,
                                        "weight": "bold",
                                        "size": "sm",
                                        "color": "#383838FF",
                                        "flex": 5,
                                        "align": "start",
                                        "gravity": "center",
                                        "wrap": true,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": "เวลาที่ไปรับ :",
                                        "weight": "bold",
                                        "size": "lg",
                                        "color": "#000000FF",
                                        "flex": 1,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": time,
                                        "weight": "bold",
                                        "size": "sm",
                                        "color": "#383838FF",
                                        "flex": 5,
                                        "align": "start",
                                        "gravity": "center",
                                        "wrap": true,
                                        "contents": []
                                    }
                                ]
                            }]
                        }
                    ]
                }
            ]
        },
        "footer": {
            "type": "box",
            "layout": "vertical",
            "flex": 0,
            "spacing": "sm",
            "contents": [{
                    "type": "button",
                    "action": {
                        "type": "postback",
                        "label": "รับลูกค้า",
                        "data": queue
                    },
                    "height": "sm",
                    "style": "primary"
                },
                {
                    "type": "spacer",
                    "size": "sm"
                }
            ]
        }
    }

    try {
        await client.pushMessage('C01ea39533a360ee3424d4fbf8bba65b5', {
            "type": "flex",
            "altText": `ไปรับที่ ${source}`,
            "contents": bubble
        })
    } catch (err) {
        return res.json({
            status: 'error',
            error: err
        })
    }

    res.json({
        status: 'ok'
    })
})

app.post('/zone1', async (req, res) => {
    const {
        id: accessId,
        queue,
        name,
        phone,
        number,
        source,
        destination,
        time
    } = req.body
    if (accessId !== 'loveTukUpSoMuch') return res.json({
        status: 'error',
        error: 'wrong id'
    })

    let bubble = {
        "type": "bubble",
        "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [{
                    "type": "text",
                    "text": "รายละเอียดลูกค้า",
                    "weight": "bold",
                    "size": "xl",
                    "color": "#008805FF",
                    "contents": []
                },
                {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "margin": "lg",
                    "contents": [{
                            "type": "box",
                            "layout": "horizontal",
                            "spacing": "sm",
                            "contents": [{
                                    "type": "text",
                                    "text": "คิวที่ :",
                                    "weight": "bold",
                                    "size": "lg",
                                    "color": "#000000FF",
                                    "flex": 2,
                                    "contents": []
                                },
                                {
                                    "type": "text",
                                    "text": queue,
                                    "weight": "bold",
                                    "size": "lg",
                                    "color": "#383838FF",
                                    "gravity": "center",
                                    "flex": 5,
                                    "wrap": true,
                                    "contents": []
                                }
                            ]
                        },
                        {
                            "type": "box",
                            "layout": "vertical",
                            "spacing": "sm",
                            "margin": "lg",
                            "contents": [{
                                "type": "box",
                                "layout": "vertical",
                                "spacing": "sm",
                                "contents": [{
                                        "type": "text",
                                        "text": "ชื่อลูกค้า :",
                                        "weight": "bold",
                                        "size": "lg",
                                        "color": "#000000FF",
                                        "flex": 1,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": name,
                                        "weight": "bold",
                                        "size": "sm",
                                        "color": "#383838FF",
                                        "flex": 5,
                                        "align": "start",
                                        "gravity": "center",
                                        "wrap": true,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": "เบอร์ลูกค้า :",
                                        "weight": "bold",
                                        "size": "lg",
                                        "color": "#000000FF",
                                        "flex": 1,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": phone,
                                        "weight": "bold",
                                        "size": "sm",
                                        "color": "#383838FF",
                                        "flex": 5,
                                        "align": "start",
                                        "gravity": "center",
                                        "wrap": true,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": "จำนวนลูกค้า :",
                                        "weight": "bold",
                                        "size": "lg",
                                        "color": "#000000FF",
                                        "flex": 1,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": number,
                                        "weight": "bold",
                                        "size": "sm",
                                        "color": "#383838FF",
                                        "flex": 5,
                                        "align": "start",
                                        "gravity": "center",
                                        "wrap": true,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": "จุดที่ไปรับ :",
                                        "weight": "bold",
                                        "size": "lg",
                                        "color": "#000000FF",
                                        "flex": 1,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": source,
                                        "weight": "bold",
                                        "size": "sm",
                                        "color": "#383838FF",
                                        "flex": 5,
                                        "align": "start",
                                        "gravity": "center",
                                        "wrap": true,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": "จุดที่ไปส่ง :",
                                        "weight": "bold",
                                        "size": "lg",
                                        "color": "#000000FF",
                                        "flex": 1,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": destination,
                                        "weight": "bold",
                                        "size": "sm",
                                        "color": "#383838FF",
                                        "flex": 5,
                                        "align": "start",
                                        "gravity": "center",
                                        "wrap": true,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": "เวลาที่ไปรับ :",
                                        "weight": "bold",
                                        "size": "lg",
                                        "color": "#000000FF",
                                        "flex": 1,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": time,
                                        "weight": "bold",
                                        "size": "sm",
                                        "color": "#383838FF",
                                        "flex": 5,
                                        "align": "start",
                                        "gravity": "center",
                                        "wrap": true,
                                        "contents": []
                                    }
                                ]
                            }]
                        }
                    ]
                }
            ]
        },
        "footer": {
            "type": "box",
            "layout": "vertical",
            "flex": 0,
            "spacing": "sm",
            "contents": [{
                    "type": "button",
                    "action": {
                        "type": "postback",
                        "label": "รับลูกค้า",
                        "data": queue
                    },
                    "height": "sm",
                    "style": "primary"
                },
                {
                    "type": "spacer",
                    "size": "sm"
                }
            ]
        }
    }

    try {
        await client.pushMessage('C3010a9b88b25866b1102ea515a200a5d', {
            "type": "flex",
            "altText": `ไปรับที่ ${source}`,
            "contents": bubble
        })
    } catch (err) {
        return res.json({
            status: 'error',
            error: err
        })
    }

    res.json({
        status: 'ok'
    })
})

app.post('/zone2', async (req, res) => {
    const {
        id: accessId,
        queue,
        name,
        phone,
        number,
        source,
        destination,
        time
    } = req.body
    if (accessId !== 'loveTukUpSoMuch') return res.json({
        status: 'error',
        error: 'wrong id'
    })

    let bubble = {
        "type": "bubble",
        "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [{
                    "type": "text",
                    "text": "รายละเอียดลูกค้า",
                    "weight": "bold",
                    "size": "xl",
                    "color": "#008805FF",
                    "contents": []
                },
                {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "margin": "lg",
                    "contents": [{
                            "type": "box",
                            "layout": "horizontal",
                            "spacing": "sm",
                            "contents": [{
                                    "type": "text",
                                    "text": "คิวที่ :",
                                    "weight": "bold",
                                    "size": "lg",
                                    "color": "#000000FF",
                                    "flex": 2,
                                    "contents": []
                                },
                                {
                                    "type": "text",
                                    "text": queue,
                                    "weight": "bold",
                                    "size": "lg",
                                    "color": "#383838FF",
                                    "gravity": "center",
                                    "flex": 5,
                                    "wrap": true,
                                    "contents": []
                                }
                            ]
                        },
                        {
                            "type": "box",
                            "layout": "vertical",
                            "spacing": "sm",
                            "margin": "lg",
                            "contents": [{
                                "type": "box",
                                "layout": "vertical",
                                "spacing": "sm",
                                "contents": [{
                                        "type": "text",
                                        "text": "ชื่อลูกค้า :",
                                        "weight": "bold",
                                        "size": "lg",
                                        "color": "#000000FF",
                                        "flex": 1,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": name,
                                        "weight": "bold",
                                        "size": "sm",
                                        "color": "#383838FF",
                                        "flex": 5,
                                        "align": "start",
                                        "gravity": "center",
                                        "wrap": true,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": "เบอร์ลูกค้า :",
                                        "weight": "bold",
                                        "size": "lg",
                                        "color": "#000000FF",
                                        "flex": 1,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": phone,
                                        "weight": "bold",
                                        "size": "sm",
                                        "color": "#383838FF",
                                        "flex": 5,
                                        "align": "start",
                                        "gravity": "center",
                                        "wrap": true,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": "จำนวนลูกค้า :",
                                        "weight": "bold",
                                        "size": "lg",
                                        "color": "#000000FF",
                                        "flex": 1,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": number,
                                        "weight": "bold",
                                        "size": "sm",
                                        "color": "#383838FF",
                                        "flex": 5,
                                        "align": "start",
                                        "gravity": "center",
                                        "wrap": true,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": "จุดที่ไปรับ :",
                                        "weight": "bold",
                                        "size": "lg",
                                        "color": "#000000FF",
                                        "flex": 1,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": source,
                                        "weight": "bold",
                                        "size": "sm",
                                        "color": "#383838FF",
                                        "flex": 5,
                                        "align": "start",
                                        "gravity": "center",
                                        "wrap": true,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": "จุดที่ไปส่ง :",
                                        "weight": "bold",
                                        "size": "lg",
                                        "color": "#000000FF",
                                        "flex": 1,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": destination,
                                        "weight": "bold",
                                        "size": "sm",
                                        "color": "#383838FF",
                                        "flex": 5,
                                        "align": "start",
                                        "gravity": "center",
                                        "wrap": true,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": "เวลาที่ไปรับ :",
                                        "weight": "bold",
                                        "size": "lg",
                                        "color": "#000000FF",
                                        "flex": 1,
                                        "contents": []
                                    },
                                    {
                                        "type": "text",
                                        "text": time,
                                        "weight": "bold",
                                        "size": "sm",
                                        "color": "#383838FF",
                                        "flex": 5,
                                        "align": "start",
                                        "gravity": "center",
                                        "wrap": true,
                                        "contents": []
                                    }
                                ]
                            }]
                        }
                    ]
                }
            ]
        },
        "footer": {
            "type": "box",
            "layout": "vertical",
            "flex": 0,
            "spacing": "sm",
            "contents": [{
                    "type": "button",
                    "action": {
                        "type": "postback",
                        "label": "รับลูกค้า",
                        "data": queue
                    },
                    "height": "sm",
                    "style": "primary"
                },
                {
                    "type": "spacer",
                    "size": "sm"
                }
            ]
        }
    }

    try {
        await client.pushMessage('C3fe8f1d70fa28c0fb1d37300cb18e929', {
            "type": "flex",
            "altText": `ไปรับที่ ${source}`,
            "contents": bubble
        })
    } catch (err) {
        return res.json({
            status: 'error',
            error: err
        })
    }

    res.json({
        status: 'ok'
    })
})

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});