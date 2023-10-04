import { Arg, Field, Mutation, Resolver, InputType } from "type-graphql";
import { Author } from "../entity/author.entity";
import { getRepository, Repository } from "typeorm";
import { error } from "console";

@InputType()
class AuthorInput {
  @Field()
  fullName!: string;
}

@Resolver()
export class AuthorResolver {
  authorRepository: Repository<Author>;

  constructor() {
    this.authorRepository = getRepository(Author);
  }

  @Mutation(() => Author)
  async createAuthor(
    @Arg("input", () => AuthorInput) input: AuthorInput
  ): Promise<Author | null> {
    try {
      // Cambia el tipo de retorno a Author | null
      const createdAuthor = await this.authorRepository.insert({
        fullName: input.fullName,
      });
      const result = await this.authorRepository.findOne(
        createdAuthor.identifiers[0].id
      );
      return result || null; // Devuelve null si result es undefined
    } catch {
      console.error(error);
      throw error;
    }
  }
}
