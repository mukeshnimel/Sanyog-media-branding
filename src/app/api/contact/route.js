import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        const data = await req.json();
        const { name, phone, email, service, requirements } = data;

        if (!name || !phone || !email) {
            return Response.json(
                { success: false, error: "Missing fields" },
                { status: 400 }
            );
        }

        await resend.emails.send({
            from: "Website Contact <onboarding@resend.dev>",
            to: process.env.CONTACT_EMAIL,
            subject: `New Enquiry from ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Service:</strong> ${service}</p>
                <p><strong>Requirements:</strong> ${requirements || "N/A"}</p>
            `,
        });

        return Response.json({ success: true });
    } catch (err) {
        console.error("Contact form error:", err);
        return Response.json({ success: false, error: "Server error" }, { status: 500 });
    }
}