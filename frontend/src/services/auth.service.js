export const forgotPassword = async(BACKEND_URL,formData)=>{
    return await fetch(BACKEND_URL + '/api/login/send-otp-forgot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: formData.email }),
        })
            .then((res) => res.json())
            .then((data) => {
                return data;
            })
            .catch((err) => {
                
                throw new Error(err);
            });
}