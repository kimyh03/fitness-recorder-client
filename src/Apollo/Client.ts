import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

export default new ApolloClient({
  uri: "http://localhost:4000/graphql",
  clientState: {
    defaults,
    resolvers
  },
  headers: {
    "X-JWT": localStorage.getItem("token") || ""
  }
});