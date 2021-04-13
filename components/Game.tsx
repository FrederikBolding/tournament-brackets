import React from "react";
import { Box } from "@chakra-ui/react";

export const Game = ({ id, team1, team2, score1, score2, winner }) => (
  <Box
    display="flex"
    flexDirection="row"
    borderWidth="1px"
    borderRadius="lg"
    p="2"
    m="1"
    width="100%"
    className={`game${id}`}
  >
    <Box mr="2">
      <Box fontWeight="semibold" as="h4">
        {team1}
      </Box>
      <Box fontWeight="semibold" as="h4" lineHeight="tight">
        {team2}
      </Box>
    </Box>
    <Box ml="auto">
      <Box
        color={winner === team1 ? "teal.500" : "gray.500"}
        fontWeight="semibold"
        letterSpacing="wide"
      >
        {score1}
      </Box>
      <Box
        color={winner === team2 ? "teal.500" : "gray.500"}
        fontWeight="semibold"
        letterSpacing="wide"
      >
        {score2}
      </Box>
    </Box>
  </Box>
);
