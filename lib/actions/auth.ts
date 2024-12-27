import bcrypt from "bcryptjs";

export async function signup(formData: SignupForm) {

    const password = formData.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const res = await fetch(`../api/users`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email: formData.email,
            firstname: formData.firstname,
            lastname: formData.lastname,
            username: formData.username,
            password: hashedPassword,
        })
    });
    
    if (!res.ok) {
        console.log("An error occurred while creating your account.");
        return {
            message: "An error occurred while creating your account.",
        }
    }
}