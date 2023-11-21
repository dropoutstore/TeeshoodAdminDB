/* eslint-disable @typescript-eslint/ban-ts-comment */
import logo from '../../assets/LOGO.png';
export const loadScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const loadRZP = async (orderId: string, callBack?: () => void) => {
  const razorload = await loadScript(
    `https://checkout.razorpay.com/v1/checkout.js`
  );
  if (razorload) {
    const options = {
      key: 'rzp_test_VUTwOmKcdt3jkD', // Enter the Key ID generated from the Dashboard
      name: 'Teeshood',
      description: 'Test Transaction',
      image: logo,
      order_id: orderId,
      handler: function () {
        alert('success');
        callBack && callBack();
      },
      'payment-capture': true,
      // prefill: {
      //   name: 'Soumya Dey',
      //   email: 'SoumyaDey@example.com',
      //   contact: '9999999999',
      // },
      // notes: {
      //   address: 'Soumya Dey Corporate Office',
      // },
      // theme: {
      //   color: '#61dafb',
      // },
    };
    //@ts-ignore
    const paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', function () {
      callBack && callBack();
    });
    paymentObject.on('payment.cancelled', function () {
      callBack && callBack();
    });

    paymentObject.open();
  } else {
    alert(
      'razorpay loading failed, check your internet connection. if you are connected razorpay might be down. please wait some time and try again or use other paymnet options'
    );
    callBack && callBack();
  }
};
