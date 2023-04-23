import twilio from "twilio";
// https://ahoy.twilio.com/twilio-brand-sales-namer-1?utm_source=bing&utm_medium=cpc&utm_term=twilio&utm_campaign=B_S_NAMER_Brand_Twilio&cq_src=bing_ads&cq_cmp=B_S_NAMER_Brand_Twilio&cq_con=Twilio%20-%20Phrase&cq_term=twilio&cq_med=&cq_net=o&cq_plt=bp&msclkid=0591aec99862142fb04fca8de5261164&utm_content=Twilio%20-%20Phrase
const account = "twilio_account";
const token = "twilio_token";
const client = twilio(account, token);

client.message
  .create({
    body: "change this",
    from: "twilio_phone_number",
    to: "reciept_phone_number",
  })
  .then((message) => console.log(message.sid));
