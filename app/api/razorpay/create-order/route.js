import Razorpay from "razorpay";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const { plan = "yearly", amount = 499 } = body;

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Plan pricing in paise (1 INR = 100 paise)
    const amountInPaise = Math.round(Number(amount) * 100) || 49900;

    // If live/test Razorpay API keys are configured, use official SDK
    if (keyId && keySecret && !keyId.includes("demo")) {
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const orderOptions = {
        amount: amountInPaise,
        currency: "INR",
        receipt: `rcpt_${Date.now()}`,
        notes: {
          plan,
          description: "Skylimits VIP Pro Subscription",
        },
      };

      const order = await razorpay.orders.create(orderOptions);
      return Response.json({
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        key: keyId,
      });
    }

    // Dev/Sandbox simulation when keys are not yet configured in .env
    const simulatedOrderId = `order_sim_${Date.now()}`;
    return Response.json({
      id: simulatedOrderId,
      amount: amountInPaise,
      currency: "INR",
      key: keyId || "rzp_test_skylimits_demo",
      isSimulated: true,
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return Response.json(
      { error: "Failed to create Razorpay order", details: error.message },
      { status: 500 }
    );
  }
}
