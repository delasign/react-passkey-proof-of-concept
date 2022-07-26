import React from "react";
import { Container, Copy } from "components/shared";
interface Props {}

// markup
const SignedIn = ({}: Props) => {
  return (
    <Container>
      <Copy>You have succesfully signed in!</Copy>
    </Container>
  );
};

export default SignedIn;
