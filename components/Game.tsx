import React from "react";
import {
  Box,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import { Game as IGame } from "../types";

interface Props {
  round: number;
  updateTeamName(id: number, team: number, value: string): void;
  updateTeamScore(id: number, team: number, value: string): void;
}

export const Game = ({
  round,
  id,
  team1,
  team2,
  score1,
  score2,
  winner,
  updateTeamName,
  updateTeamScore,
}: IGame & Props) => {
  return (
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
        <Editable
          value={team1}
          isDisabled={round > 1}
          fontWeight="semibold"
          as="h4"
          onChange={(val) => updateTeamName(id, 1, val)}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
        <Editable
          value={team2}
          isDisabled={round > 1}
          onChange={(val) => updateTeamName(id, 2, val)}
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
      </Box>
      <Box ml="auto">
        <Box>
          <Editable
            defaultValue="0"
            value={score1.toString()}
            onChange={(val) => updateTeamScore(id, 1, val)}
            color={winner !== undefined && winner === team1 ? "teal.500" : "gray.500"}
            fontWeight="semibold"
            letterSpacing="wide"
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </Box>
        <Box>
          <Editable
            defaultValue="0"
            value={score2.toString()}
            onChange={(val) => updateTeamScore(id, 2, val)}
            color={winner !== undefined && winner === team2 ? "teal.500" : "gray.500"}
            fontWeight="semibold"
            letterSpacing="wide"
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </Box>
      </Box>
    </Box>
  );
};
