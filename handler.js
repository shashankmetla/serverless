'use strict';

const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });

module.exports.sendEmail = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { receiver_email, subject, body_text } = body;

    if (!receiver_email || !subject || !body_text) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' }),
      };
    }

    const params = {
      Destination: {
        ToAddresses: [receiver_email],
      },
      Message: {
        Body: {
          Text: { Data: body_text },
        },
        Subject: { Data: subject },
      },
      Source: 'shashankmetla100@gmail.com',
    };

    await ses.sendEmail(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};
