"use server"
import { _createServerClient } from "@/lib/supabase/server"

export async function updatePassword(formData: FormData) {
  const supabase = await _createServerClient()
  const _formData = {
    password: formData.get('password') as string,
  }
  await supabase.auth.onAuthStateChange(async (event) => {
    if (event == "PASSWORD_RECOVERY") {
      const newPassword = _formData.password
      const { data, error } = await supabase.auth
        .updateUser({ password: newPassword })
      if (data) alert("Password updated successfully!")
      if (error) alert("There was an error updating your password.")
    }
  })
}