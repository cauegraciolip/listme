//LIBRARIES
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";

//COMPONENTS
import { Button } from "@mantine/core";

export default function Login() {
  return (
    <div>
      <Button onClick={() => signIn("github")} uppercase>
        GitHub
      </Button>
      <Button onClick={() => signIn("google")} uppercase>
        Google
      </Button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  console.log(session);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
