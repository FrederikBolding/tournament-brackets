import { Box } from "@chakra-ui/react";
import React from "react";
import { SteppedLineTo } from "react-lineto";
import { Game } from "./Game";

const BracketRow = ({ round, updateTeamName, updateTeamScore }) => (
  <>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      padding="50px"
      flex="1 1 0px"
    >
      {round.games.map((game) => (
        <Box
          display="flex"
          flexDirection="column"
          flexGrow={1}
          justifyContent="center"
          width="100%"
          key={game.id}
        >
          <Game
            updateTeamName={updateTeamName}
            updateTeamScore={updateTeamScore}
            round={round.round}
            {...game}
          />
        </Box>
      ))}
    </Box>
    {round.games.map((game) => (
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

export const Bracket = ({ rounds, updateTeamName, updateTeamScore }) => (
  <Box display="flex" className="wrapper">
    {rounds.map((round) => (
      <BracketRow
        key={round}
        round={round}
        updateTeamName={updateTeamName}
        updateTeamScore={updateTeamScore}
      />
    ))}
  </Box>
);
