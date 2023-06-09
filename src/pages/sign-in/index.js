import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <SignIn
    path="/sign-in"
    routing="path"
    signUpUrl="/sign-up"
    afterSignInUrl="/"
    afterSignUpUrl="/"
    redirectUrl="/"
  />
);

export default SignInPage;
