/**
 * Mock Payment API service that processes payments
 * @param {Object} order - The order details
 * @param {number} amount - The payment amount
 * @returns {Promise<Object>} Payment result
 */
const processPayment = async (order, amount) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // 80% success rate
  const success = Math.random() < 0.8;

  if (success) {
    return {
      success: true,
      transactionId: `tx_${Date.now()}`,
      amount,
      currency: 'USD',
      status: 'completed',
      timestamp: new Date().toISOString()
    };
  } else {
    // Simulate different failure reasons
    const failureReasons = [
      'Insufficient funds',
      'Card declined',
      'Network error',
      'Invalid card details',
      'Transaction timeout'
    ];
    const reason = failureReasons[Math.floor(Math.random() * failureReasons.length)];

    return {
      success: false,
      error: {
        code: 'PAYMENT_FAILED',
        message: reason
      },
      amount,
      currency: 'USD',
      status: 'failed',
      timestamp: new Date().toISOString()
    };
  }
};

/**
 * Validate payment details
 * @param {Object} paymentDetails - Payment information
 * @returns {boolean} Whether the payment details are valid
 */
const validatePaymentDetails = (paymentDetails) => {
  // Mock validation - in a real app, this would check card number, expiry, etc.
  return true;
};

module.exports = {
  processPayment,
  validatePaymentDetails
}; 