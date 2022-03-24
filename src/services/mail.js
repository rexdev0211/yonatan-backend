const { MAILGUN_API_KEY, MAILGUN_DOMAIN, SUPPORT_EMAIL, INFO_EMAIL, FRONTEND_ORIGIN } = require('../config');

const mailgun = require('mailgun-js')({
  apiKey: MAILGUN_API_KEY,
  domain: MAILGUN_DOMAIN
});

const createFollowNotifyEmail = (email, artistName, instagramName) => ({
  from: SUPPORT_EMAIL,
  to: email,
  subject: `PRMM.ME - Follow to the ${artistName}`,
  text: `Please create follow request for the https://instagram.com/${instagramName}`,
});

const createEmailForDigitalEvent = (email, event) => ({
  from: INFO_EMAIL,
  to: email,
  subject: `PRMM.ME - You bought ticket on ${event.name}`,
  text: `You can watch the event by follow link ${FRONTEND_ORIGIN}/events/liveEvent/${event.id}`,
});

const createDirectEmailForFollower = (email, artist, message) => ({
  from: SUPPORT_EMAIL,
  to: email,
  subject: `PRMM.ME - Message from ${artist.name}`,
  text: message,
});

const createArtistConfirmationEmail = (email, password) => ({
  from: SUPPORT_EMAIL,
  to: email,
  subject: 'PRMM.ME - Your request has been approved',
  text: `Congratulations! 
  Your request has been approved and now you can start create your account ${FRONTEND_ORIGIN}/users/login .
  Your temporary credentials:
  Login: ${email}
  Password: ${password}
  
  Good luck!`,
});

const createArtistDeclineEmail = (email) => ({
  from: SUPPORT_EMAIL,
  to: email,
  subject: 'PRMM.ME - Your request has been declined',
  text: `Unfortunately, your request with ${email} has been declined.`,
});

const createArtistRequestNotification = (email, name) => ({
  from: SUPPORT_EMAIL,
  to: email,
  subject: `PRMM.ME - Registration request from ${name}`,
  html: `<p>${name} requested a registration in application <a href='${FRONTEND_ORIGIN}/users/login'>PRMM.ME</a> .</p>`
});

const createEventNotificationEmail = (email, artistName, eventName, eventId) => ({
  from: SUPPORT_EMAIL,
  to: email,
  subject: 'PRMM.ME - Event update',
  text: `The ${eventName} event details have been updated by ${artistName} creator. Please check your ticket <a href='${FRONTEND_ORIGIN}/dashboard/events/${eventId}'>${FRONTEND_ORIGIN}/dashboard/events/${eventId}</a> .</p>`
})

function sendEmail(data) {
  return new Promise((resolve, reject) => {
    mailgun.messages().send(data, (err, body) => {
      if (err) reject(err);
      resolve(body);
    });
  });
}

module.exports = {
  sendEmail,
  createFollowNotifyEmail,
  createEmailForDigitalEvent,
  createDirectEmailForFollower,
  createArtistConfirmationEmail,
  createArtistDeclineEmail,
  createArtistRequestNotification,
  createEventNotificationEmail
}
