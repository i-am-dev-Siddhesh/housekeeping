"use client"
import LoginForm from "@/components/Forms/LoginForm";
import Head from "next/head";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useCustomToast } from "../../hooks/useCustomToast";
import AuthService from "../../services/Auth";
import { setAdmin } from "../../store/reducers/admin.reducer";
import { errorFormatter } from "../../utils/helpers";

export default function SignIn() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toastAlert } = useCustomToast();
  const dispatch = useDispatch();

  const onSubmit = async (values: any) => {
    try {      
      setIsSubmitting(true);
      const resp = await AuthService.loginUser({
        email: values?.email as string,
        password: values?.password as string,
      });
      dispatch(setAdmin({ data: resp?.data?.data }));
      router.push("/");
      toastAlert("Success", "Logged in success", "success");
    } catch (error: any) {
      const message = errorFormatter(error);
      toastAlert("Error", message, "error");
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign In: RICHOSHETH</title>
        <meta name="description" content="Sign In page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </>
  );
}
