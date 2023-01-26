export type $Letter = {
  id: string;
  letter: string | null;
  status: "empty" | "filled" | "correct" | "incorrect" | "misplaced";
};
