"use client";

import { Input } from "@mantine/core";
import { updatePassword } from "./action";

const Page = () => {
  return (
    <form>
      <Input />
      <button formAction={updatePassword} type="submit">
        更新
      </button>
    </form>
  );
};

export default Page;
