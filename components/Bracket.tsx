import { Box } from "@chakra-ui/react";
import React from "react";
import { SteppedLineTo } from "react-lineto";
import { Game } from "./Game";

const BracketRow = ({ games }) => (
  <>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      padding="50px"
      flex="1 1 0px"
    >
      {games.map((game) => (
        <Box
          display="flex"
          flexDirection="column"
          flexGrow={1}
          justifyContent="center"
          width="100%"
          key={game.id}
        >
          <Game {...game} />
        </Box>
      ))}
    </Box>
    {games.map((game) => (
      <SteppedLineTo
        from={`game${game.id}`}
        to={`game${game.next}`}
        orientation="h"
        fromAnchor="right"
        toAnchor="left"
        borderColor="#718096"
        delay={1}
      />
    ))}
  </>
);

export const Bracket = ({ rounds }) => (
  <Box display="flex" className="wrapper">
    {rounds.map((round) => (
      <BracketRow games={round.games} />
    ))}
  </Box>
);
