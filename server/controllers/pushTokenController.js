const {PushTokenModel} = require( './../models/pushtokenModel' );
const webpush = require( 'web-push' );

const vapidKeys = {
    "publicKey":"BOVjl3y_07wpUquE0I4B4lTv6VyjCps7u881hpzybLu3XUSLu_HY-RfebVGMGrWR-Z0DP5A8NRzU0qofgbt_thU",
    "privateKey":"yJjwe9a1J6wLs6A5KZeNYYZbeOYrGiPMqyYP4holS_I"
}

webpush.setVapidDetails(
	'mailto:johandrogonzales@mail.com',
	vapidKeys.publicKey,
	vapidKeys.privateKey
)

const PushTokenController = {

    savePush : function (req,res) {

        let token = JSON.stringify(req.body.token)

        newtoken = {
            token : token
        }

        PushTokenModel.createToken(newtoken)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(400).json({done: "Este token ya fue registrado"})
        })

    },

    sendBroadcastPush : function (info) {

        const payload = {
            notification:{
                title: info.title,
                body: info.body,
                vibrate: [100,50,100],
                image: info.image,
                actions: [
                    {
                    action: info.action,
                    title: info.actionti,
                    },
                ],
                data: {
                    data1: info.data1,
                    data2: info.data2
                }
            }
        }


        PushTokenModel.findallTokens()
        .then(data=>{

            data.forEach((token)=>{
                let tokenParse = JSON.parse(token.token);

                webpush.sendNotification(tokenParse,JSON.stringify(payload))
                .then(data=>{
                    console.log("Notificaciones enviadas");
                })
                .catch(err=>{
                    console.log("Error al enviar notificaciones");
                })
            })

        })


    },

}


module.exports = {PushTokenController}