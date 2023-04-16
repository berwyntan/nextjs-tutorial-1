import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" afterSignUpUrl="/"/>
);

export default SignUpPage;
