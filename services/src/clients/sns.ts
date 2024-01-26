import AWS from 'aws-sdk';

const sns = new AWS.SNS();

export const publishOTP = (params: any) => {
  return new Promise((resolve, reject) => {
    sns.publish(params, (err, data) => {
      if (err) {
        console.error('Error sending OTP:', err);
        reject(err); // Reject the promise with the error
      } else {
        resolve(data); // Resolve the promise with the data
      }
    });
  });
};
