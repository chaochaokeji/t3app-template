import { signOut } from "~/server/auth";

export default function SignOut() {
  return (
    <div className="">
      确定退出登录
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <input type="submit" value="退出登录" />
      </form>
    </div>
  );
}
