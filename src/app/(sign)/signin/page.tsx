import { redirect } from "next/navigation";
import { signIn } from "~/server/auth";
import { AuthError } from "next-auth";

const SIGNIN_ERROR_URL = "/error";
const VERIFY_EMAIL_URL = "/verify"; // 邮件发送成功重定向地址

export default async function SignInPage() {
  return (
    <div className="flex flex-col gap-2">
      <form
        action={async (formData) => {
          "use server";
          try {
            console.log(formData);
            await signIn("nodemailer", {
              email: formData.get("email"),
              redirect: false,
            });
            return redirect(VERIFY_EMAIL_URL);
          } catch (error) {
            if (error instanceof AuthError) {
              return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
            }
            throw error;
          }
        }}
      >
        <label htmlFor="email">
          邮箱
          <input name="email" id="email" type="email" required />
        </label>
        <input type="submit" value="登录" />
      </form>
    </div>
  );
}
