import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

import {
  Box,
  Input,
  Heading,
  Center,
  Stack,
  Text,
  Alert,
  AlertIcon,
  Link as ReachLink,
  Button
} from "@chakra-ui/react";
import API from "../utils/API";
import useStore from "../utils/store";

export default function Login() {
  const [formValues, setFormValues] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setCurrentUser } = useStore();
  const history = useHistory();

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleFormSubmit = async event => {
    if (formValues.email === "") setError("Must provide email");
    else {
      setLoading(true);
      let result = await API.authorize(formValues.email);
      setLoading(false);
      if (result.data.success) {
        setCurrentUser(result.data.response);
        history.push("/home");
      } else setError("User does not exist");
    }
  };

  return (
    <>
      <Center mt="auto" mb="auto" min-height="70vh">
        <Stack>
          <Box
            borderWidth="2px"
            borderColor="gray.500"
            borderRadius="7px"
            w="500px"
            minheight="360px"
            mt="3em"
            mb=".5em"
            p="1.5em"
          >
            <Center>
              <Heading>Log In</Heading>
            </Center>

            <Text>Email: </Text>
            <Input
              my="1em"
              onChange={handleInputChange}
              name="email"
              value={formValues.email}
              placeholder="Enter email here"
              isRequired
            />

            {error && (
              <Alert status="danger">
                <AlertIcon />
                {error}
              </Alert>
            )}

            <Button
              bg="#071330"
              _hover={{ bg: "#0a1c47" }}
              isDisabled={loading}
              onClick={handleFormSubmit}
            >
              Submit
            </Button>
          </Box>
          <Center>
            <Text color="yellow.400">
              Don't have an account?{" "}
              <ReachLink as={Link} to="/signup">
                Sign Up
              </ReachLink>
            </Text>
          </Center>
        </Stack>
      </Center>
    </>
  );
}
