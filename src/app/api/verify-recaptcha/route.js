// Save this file at: app/api/verify-recaptcha/route.js

export async function POST(request) {
    try {
        const { token } = await request.json();

        if (!token) {
            return Response.json({ success: false, error: "No token provided" }, { status: 400 });
        }

        const secretKey = process.env.RECAPTCHA_SECRET_KEY;

        const verifyRes = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
            { method: "POST" }
        );

        const data = await verifyRes.json();
        // data looks like: { success: true, score: 0.9, action: 'submit', challenge_ts, hostname }

        if (!data.success || data.score < 0.5) {
            return Response.json(
                { success: false, error: "Failed captcha verification", score: data.score },
                { status: 400 }
            );
        }

        // Captcha passed — now safe to process the actual form data.
        // TODO: save to database, send email, call CRM API, etc.

        return Response.json({ success: true, score: data.score });
    } catch (err) {
        console.error("reCAPTCHA verify error:", err);
        return Response.json({ success: false, error: "Server error" }, { status: 500 });
    }
}