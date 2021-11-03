import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../utils/API";
import {
  Box,
  Input,
  Heading,
  Center,
  Stack,
  HStack,
  Text,
  Alert,
  AlertIcon,
  Link as ReachLink,
  Button,
  Image
} from "@chakra-ui/react";
import useStore from "../utils/store";

const initalValues = {
  email: "",
  image: "",
  name: ""
};

export default function Signup() {
  const { setCurrentUser } = useStore();

  const [showNext, setShowNext] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [profileValue, setProfileValue] = useState("");

  const [formValues, setFormValues] = useState(initalValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const history = useHistory();

  useEffect(() => {
    getDefaultName();
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleNext = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (formValues.email === "") setError("Must enter an email");
    else if (!emailRegex.test(formValues.email)) setError("Email is not valid");
    else {
      setShowNext(!showNext);
      setError("");
    }
  };

  async function getDefaultName() {
    let nameResult = await API.getScreenName();
    let imageResult = await API.getProfile(nameResult.data.join("-"));
    setNameValue(nameResult.data.join("-"));
    setProfileValue(imageResult.config.url);
  }

  const handleFormSubmit = async event => {
    event.preventDefault();

    const newUserData = {
      screen_name: nameValue,
      email: formValues.email,
      profile_image: profileValue
    };

    try {
      setLoading(true);

      let result = await API.addUser(newUserData);

      if (result.data.success) {
        setCurrentUser(result.data.response);
        history.push("/home");
      }
      setError(result.data.msg);
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error(error);
    }
    setLoading(false);
  };

  function handleEnter(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      setShowNext(!showNext);
    }
  }

  return (
    <>
      <Center mt="auto" mb="auto" h="70vh">
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
              <Heading>Sign Up</Heading>
            </Center>

            <Input
              my="1em"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              placeholder="Enter your email here"
            />

            <Button
              onClick={handleNext}
              bg="#071330"
              _hover={{ bg: "#0a1c47" }}
              isDisabled={showNext}
            >
              Continue
            </Button>

            {showNext ? (
              <>
                <HStack my="1.5em">
                  <Image
                    boxSize="200px"
                    src={profileValue}
                    borderWidth="1px"
                    borderColor="gray"
                  />

                  <Stack>
                    <Text>Screen Name:</Text>
                    <Input value={nameValue} isReadOnly />
                    <Button
                      bg="#C3CEDA"
                      color="#071330"
                      _hover={{ bg: "gray.400" }}
                      onClick={getDefaultName}
                    >
                      Re-Generate
                    </Button>
                  </Stack>
                </HStack>

                <Button
                  bg="#071330"
                  _hover={{ bg: "#0a1c47" }}
                  isDisabled={loading}
                  onClick={handleFormSubmit}
                >
                  Submit
                </Button>
              </>
            ) : null}

            {error && (
              <Alert mt="1.5em" status="error" color="black">
                <AlertIcon />
                {error}
              </Alert>
            )}
          </Box>
          <Center>
            <Text>
              Already have an account?{" "}
              <ReachLink as={Link} to="/login" color="yellow.400">
                Log In
              </ReachLink>
            </Text>
          </Center>
        </Stack>
      </Center>
    </>
  );
}
