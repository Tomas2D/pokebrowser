import { objectType } from "nexus";
import { typedResolver } from "@app/graphql/utilities";
import { UserModel } from "@app/database/models/UserModel";
import { PokemonVoteModel } from "@app/database/models/PokemonVoteModel";

export const UserSchema = objectType({
  name: "User",
  definition(t) {
    t.id("id");
    t.list.int("voteIds", {
      resolve: typedResolver(async (parent: UserModel) => {
        const response = await parent.$relatedQuery<PokemonVoteModel>(
          "voteIds"
        );
        return response.map((res) => res.pokemonId);
      }),
    });
  },
});
