import { Resolver, Query, Mutation, Arg, Field, InputType, Int} from "type-graphql";

import { User } from "../models/user";

@InputType()
class userData {
    @Field()
  firstName!: string;

     @Field()
  lastName!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}

@InputType()
class userDataUpdate {
    @Field(() => String, {nullable: true})
  firstName!: string;

  @Field(() => String, {nullable: true})
  lastName!: string;

  @Field(() => String, {nullable: true})
  email!: string;

  @Field(() => String, {nullable: true})
  password!: string;
}

@Resolver()
export class userResolver {
    @Mutation(() => User)
    async createUser(
        @Arg("data", () => userData) data : userData
        ) {
           const newUser = User.create(data);
           console.log(newUser)
            return await newUser.save();
    }

    @Query(() => [User])
    getUsers(){
        return User.find()
    }

    @Mutation(() => Boolean)
  async updateUser(
    @Arg("idUser", () => Int) idUser: number,
    @Arg("fields", () => userDataUpdate) fields: userDataUpdate
  ) {
      console.log("updated user with id: ", idUser)
    await User.update({idUser} , fields);
    return true;
  }

    @Mutation(() => Boolean)
    async deleteUser(@Arg("idUser", () => Int) idUser: number) {
        await User.delete(idUser);
        console.log("deleted user with id: ", idUser);
        return true;
    }
}