const sendEmail = async (to: string, subject: string, text: string) => {
    try {
        const response = await fetch('http://127.0.0.1:5001/foodapp-26d02/us-central1/foodApi/api/v1/email/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to,
                subject,
                text,
            }),
        });

        if (response.status === 200) {
            console.log('Email sent successfully');
        } else {
            console.log('Failed to send email');
        }
    } catch (error) {
        console.error('Error sending email', error);
    }
};

export default sendEmail;
