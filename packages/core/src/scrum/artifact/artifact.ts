import {Commitment} from "@/scrum/product";

export interface Artifact {
  getCommitments(): Commitment[];
}

export class DefinitionOfDone implements Commitment {
  constructor(
    public readonly definition: string
  ) {}
}

